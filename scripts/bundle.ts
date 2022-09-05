/**
 * Script for generating dts.
 *
 * api-extractor doesn't support ignore external.
 * rollup-plugin-dts bundle is messy and doesn't support multi entry.
 * rollup-plugin-ts ignore type generic default value and also slow.
 * so we have to create our own dts bundler.
 */

import { CompilerOptions, CustomTransformers, ExportDeclaration, ImportDeclaration, Node, NodeFlags, SourceFile, SyntaxKind, TransformerFactory, Visitor, createCompilerHost, createProgram, factory, isExportAssignment, isExportDeclaration, isImportDeclaration, isNamedExports, isNamedImports, isNamespaceImport, isStringLiteral, visitEachChild, visitNode } from "typescript";
/* eslint-disable no-console */
import fs, { readFileSync } from "fs";
import path, { basename } from "path";

import chalk from "chalk";
import { handleError } from "./utils";
import { useTransformer } from "../packages/transformer/src";

let EXPORTS: string[] = [];
let CURRENT_NAME: string | undefined;
const DEFAULT_IMPORTS: { [key: string]: string } = {};
const DEFAULT_EXPORTS: { [key: string]: string } = {};

/** Extract all exports of SourceFile and save to Array */
const extractExports: TransformerFactory<SourceFile> = context => {
  EXPORTS = [];
  return sourceFile => {
    const visitor: Visitor = (node: Node) => {
      // extract all relative path from entry
      if (isExportDeclaration(node) && node.moduleSpecifier && isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith("./")) {
        if (node.exportClause && isNamedExports(node.exportClause)) {
          for (const el of node.exportClause.elements) {
            if (el.propertyName?.escapedText === "default") {
              DEFAULT_EXPORTS[node.moduleSpecifier.text] = el.name.escapedText.toString();
            };
          }
        }

        EXPORTS.push(node.moduleSpecifier.text);
        return undefined;
      }
      // remove import default declaration
      if (isImportDeclaration(node) && node.moduleSpecifier && isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith("./")) {
        EXPORTS.push(node.moduleSpecifier.text);
        if (node.importClause?.name) {
          DEFAULT_IMPORTS[node.moduleSpecifier.text] = node.importClause.name.escapedText.toString();
        }
        return undefined;
      }

      return visitEachChild(node, visitor, context);
    };
    return visitNode(sourceFile, visitor);
  };
};

/** Dudup import declarations */
function dedupImports (decls: ImportDeclaration[]): ImportDeclaration[] {
  type Imports = {
    module: boolean, // import "..."
    defaults: string[], // import abc
    bindings: [string | undefined, string][], // import {}
    spaces: string[], // import * as name ...
  };

  const imports: Record<string, Imports> = {};

  const smartPush = <T>(target: Array<T>, value: T) => !target.includes(value) && target.push(value);

  let key: string, binding: [string | undefined, string];

  for (const node of decls) {
    if (isStringLiteral(node.moduleSpecifier)) {
      key = node.moduleSpecifier.text;
      if (!(key in imports)) imports[key] = { module: false, defaults: [], bindings: [], spaces: [] };

      if (node.importClause) {
        if (node.importClause.name) smartPush(imports[key].defaults, node.importClause.name.escapedText.toString());

        if (node.importClause.namedBindings) {
          if (isNamedImports(node.importClause.namedBindings)) {
            for (const el of node.importClause.namedBindings.elements) {
              binding = [el.propertyName?.escapedText.toString(), el.name.escapedText.toString()];
              if (imports[key].bindings.find(([a, b]) => (a === binding[0]) && (b === binding[1])) == null) imports[key].bindings.push(binding);
            }
          } else if (isNamespaceImport(node.importClause.namedBindings)) {
            smartPush(imports[key].spaces, node.importClause.namedBindings.name.escapedText.toString());
          }
        }
      } else {
        // import "module-name";
        imports[key].module = true;
      }
    }
  }

  const output: ImportDeclaration[] = [];
  const entries = Object.entries(imports);

  for (const [k, v] of entries) {
    if (v.module) output.push(factory.createImportDeclaration(undefined, undefined, undefined, factory.createStringLiteral(k)));
    if (v.defaults[0]) output.push(...v.defaults.map(i => factory.createImportDeclaration(undefined, undefined, factory.createImportClause(false, factory.createIdentifier(i), undefined), factory.createStringLiteral(k))));
    if (v.spaces[0]) output.push(...v.spaces.map(i => factory.createImportDeclaration(undefined, undefined, factory.createImportClause(false, undefined, factory.createNamespaceImport(factory.createIdentifier(i))), factory.createStringLiteral(k))));
    if (v.bindings[0]) output.push(factory.createImportDeclaration(undefined, undefined, factory.createImportClause(false, undefined, factory.createNamedImports(v.bindings.map(([a, b]) => factory.createImportSpecifier(false, a ? factory.createIdentifier(a) : undefined, factory.createIdentifier(b))))), factory.createStringLiteral(k)));
  }

  return output;
}

/** Transform export default ... to export const ...  */
const transformExportDefault: TransformerFactory<SourceFile> = context => {
  return sourceFile => {
    const visitor: Visitor = (node) => {
      const importName = CURRENT_NAME && DEFAULT_IMPORTS[CURRENT_NAME];
      const exportName = CURRENT_NAME && DEFAULT_EXPORTS[CURRENT_NAME];

      if ((importName || exportName) && isExportAssignment(node)) {
        return factory.createVariableStatement(importName ? undefined : [factory.createModifier(SyntaxKind.ExportKeyword)], factory.createVariableDeclarationList([
          factory.createVariableDeclaration(importName || exportName as string, undefined, undefined, node.expression),
        ], NodeFlags.Const));
      }

      return visitEachChild(node, visitor, context);
    };
    return visitNode(sourceFile, visitor);
  };
};

/** Dedup Import Declarations and move imports to top, exports to bottom */
const organizeImportsExports: TransformerFactory<SourceFile> = context => {
  const imports: ImportDeclaration[] = [];
  const exports: ExportDeclaration[] = [];
  return sourceFile => {
    const visitor: Visitor = (node: Node) => {
      if (isExportDeclaration(node)) {
        // export * from "./xxx"
        if (node.moduleSpecifier && isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith("./")) return undefined;

        exports.push(node);
        return undefined;
      }

      if (isImportDeclaration(node)) {
        // remove all import ... from './..', this maybe dangerous, but works for now.
        if (isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith("./")) return undefined;

        imports.push(node);
        return undefined;
      }

      return visitEachChild(node, visitor, context);
    };

    const transformed = visitNode(sourceFile, visitor);

    return factory.updateSourceFile(transformed, [
      ...dedupImports(imports),
      ...transformed.statements,
      ...exports,
    ]);
  };
};

/** Emit typescript declarations */
export function emitDecl (fileNames: string[], options: CompilerOptions, transformers?: CustomTransformers, beforeWriteFile = (output: string, contents: string) => ({ output, contents })) {
  const host = createCompilerHost(options);
  const outputs = fileNames.map(i => i.replace(".ts", ".d.ts"));
  host.writeFile = (output: string, contents: string) => {
    if (outputs.includes(output)) {
      const processed = beforeWriteFile(output, contents);
      fs.writeFile(processed.output, processed.contents, handleError);
    }
  };

  const program = createProgram(fileNames, options, host);
  const emitted = program.emit(undefined, undefined, undefined, undefined, transformers);

  if (emitted.emitSkipped) {
    handleError(`Emit failed, found ${emitted.diagnostics.length} errors`);
    handleError(emitted.diagnostics.map((d, i) => i + 1 + ". " + d.messageText).join("\n"));
  }
}

/** Bundle .ts files, organize imports and exports */
export function bundleTS (entry: string, ...transformers: TransformerFactory<SourceFile>[]): string {
  const base = path.dirname(entry);
  const src = readFileSync(entry).toString();

  const dest = [
    useTransformer(src, extractExports, ...transformers),
    ...EXPORTS.map(i => path.join(base, i)).map(i => fs.existsSync(i) && fs.statSync(i).isDirectory() ? path.join(i, "index.ts") : (i.endsWith(".ts") ? i : (i + ".ts"))).map(i => (CURRENT_NAME = "./" + basename(i, ".ts")) && useTransformer(readFileSync(i).toString(), transformExportDefault, ...transformers)),
  ].join("\n");

  return useTransformer(dest, organizeImportsExports);
}

/** Bundle .ts first, then generate dts for bundled file, then remove bundled .ts file, only keep generated .dts */
export function bundleDts (entries: { input: string, output: string }[], options: CompilerOptions, transformers?: CustomTransformers, sourceTransformers: TransformerFactory<SourceFile>[] = []) {
  options = Object.assign(options, {
    lib: undefined, // If we set only ESNext and Dom, types like 'HTMLElement'/'CSSStyleDeclaration' will throw 'using private name' error.
    declaration: true,
    emitDeclarationOnly: true,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    noEmitOnError: false,
    preserveSymlinks: true,
  });

  const temps = entries.map(({ input, output }) => {
    console.log(chalk.bold(chalk.cyan(`${input} → ${output}...`)));

    const temp = output.replace(".d.ts", ".ts");
    if (!fs.existsSync(path.dirname(temp))) fs.mkdirSync(path.dirname(temp));
    fs.writeFileSync(temp, bundleTS(input, ...sourceTransformers));
    return temp;
  });

  let start = Date.now();

  emitDecl(temps, options, transformers, (output, contents) => {
    console.log(chalk.green("created ") + chalk.bold(chalk.green(output)) + chalk.green(" in ") + chalk.bold(chalk.green(`${((Date.now() - start) / 1000).toFixed(1) + "s"}\n`)));

    start = Date.now();

    return {
      output,
      contents: contents.replace(/export {};\n/g, ""),
    };
  });

  temps.map(i => fs.rm(i, handleError));
};
