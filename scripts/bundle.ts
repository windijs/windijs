/**
 * Script for generating dts.
 */

import { CompilerOptions, ExportDeclaration, ImportDeclaration, ModuleKind, Node, ScriptTarget, SourceFile, TransformerFactory, Visitor, createCompilerHost, createProgram, factory, isExportDeclaration, isImportDeclaration, isNamedImports, isNamespaceImport, isStringLiteral, visitEachChild, visitNode } from "typescript";
/* eslint-disable no-console */
import fs, { readFileSync } from "fs";

import { handleError } from "./utils";
import path from "path";
import { useTransformer } from "../packages/transformer/src";

let EXPORTS: string[] = [];

/** Extract all exports of SourceFile and save to Array */
const extractExports: TransformerFactory<SourceFile> = context => {
  EXPORTS = [];
  return sourceFile => {
    const visitor: Visitor = (node: Node) => {
      // extract all relative path from entry
      if (isExportDeclaration(node) && node.moduleSpecifier && isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith("./")) {
        EXPORTS.push(node.moduleSpecifier.text);
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
export function emitDecl (fileNames: string[], options: CompilerOptions) {
  const host = createCompilerHost(options);
  const outputs = fileNames.map(i => i.replace(".ts", ".d.ts"));
  host.writeFile = (output: string, contents: string) => {
    if (outputs.includes(output)) {
      console.log(`generate ${output}`);
      fs.writeFile(output, contents, handleError);
    }
  };

  const program = createProgram(fileNames, options, host);
  const emitted = program.emit();

  if (emitted.emitSkipped) {
    handleError(`Emit failed, found ${emitted.diagnostics.length} errors`);
    handleError(emitted.diagnostics.map((d, i) => i + 1 + ". " + d.messageText).join("\n"));
  }
}

/** Bundle .ts files, organize imports and exports */
export function bundleTS (entry: string): string {
  const base = path.dirname(entry);
  const src = readFileSync(entry).toString();

  const dest = [
    useTransformer(src, extractExports),
    ...EXPORTS.map(i => path.join(base, i)).map(i => fs.existsSync(i) && fs.statSync(i).isDirectory() ? path.join(i, "index.ts") : (i.endsWith(".ts") ? i : (i + ".ts"))).map(i => readFileSync(i).toString()),
  ].join("\n");

  return useTransformer(dest, organizeImportsExports);
}

/** Bundle .ts first, then generate dts for bundled file, then remove bundled .ts file, only keep generated .dts */
export function bundleDts (entries: { input: string, output: string }[], options: CompilerOptions) {
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
    const temp = output.replace(".d.ts", ".ts");
    fs.writeFileSync(temp, bundleTS(input));
    return temp;
  });

  emitDecl(temps, options);

  temps.map(i => fs.rm(i, handleError));
};

bundleDts([
  {
    input: "packages/utilities/src/index.ts",
    output: "packages/utilities/dist/utilities.d.ts",
  },
  {
    input: "packages/config/src/index.ts",
    output: "packages/config/dist/config.d.ts",
  },
  {
    input: "packages/colors/src/index.ts",
    output: "packages/colors/dist/colors.d.ts",
  },
  {
    input: "packages/variants/src/index.ts",
    output: "packages/variants/dist/variants.d.ts",
  },
  {
    input: "packages/core/src/index.ts",
    output: "packages/core/dist/core.d.ts",
  },
  {
    input: "packages/helpers/src/index.ts",
    output: "packages/helpers/dist/helpers.d.ts",
  },
  {
    input: "packages/shared/src/index.ts",
    output: "packages/shared/dist/shared.d.ts",
  },
  {
    input: "packages/style/src/index.ts",
    output: "packages/style/dist/style.d.ts",
  },
  {
    input: "packages/windijs/src/index.ts",
    output: "packages/windijs/dist/windijs.d.ts",
  },
],
{
  target: ScriptTarget.ES2017,
  module: ModuleKind.ESNext,
  paths: {
    "@windi/*": ["packages/*/src/index.ts"],
  },
});
