import { Bundle, Node, SourceFile, TransformerFactory, factory, isIdentifier, isImportDeclaration, isImportTypeNode, isLiteralTypeNode, isNamedImports, isStringLiteral, visitEachChild, visitNode } from "typescript";

// TODO: we switched our dts plugin, maybe this transformer no longer needed.

/**
 * Typescript Transform Plugin.
 *
 * when rollup-plugin-ts generate .dts file, it will leave some extras, for example `import("@windi/helper").StyleObject`, even when `StyleObject` is already imported.
 * this transformer fixed this.
 */
export const importsTransformer: TransformerFactory<Bundle | SourceFile> = context => {
  return sourceFile => {
    const imports: Record<string, string[]> = {};
    const visitor = (node: Node): Node => {
      if (isImportDeclaration(node) && isStringLiteral(node.moduleSpecifier) && node.importClause?.namedBindings) {
        if (isNamedImports(node.importClause.namedBindings)) {
          imports[node.moduleSpecifier.text] = node.importClause.namedBindings.elements.map(i => i.name.escapedText.toString());
        }
      }

      if (isImportTypeNode(node)) {
        if (isLiteralTypeNode(node.argument) && isStringLiteral(node.argument.literal) && node.argument.literal.text in imports && node.qualifier && isIdentifier(node.qualifier) && imports[node.argument.literal.text].includes(node.qualifier.escapedText.toString())) {
          return factory.createTypeReferenceNode(node.qualifier, node.typeArguments);
        }
      }
      return visitEachChild(node, visitor, context);
    };
    return visitNode(sourceFile, visitor);
  };
};

/**
 * Typescript Transform Plugin.
 *
 * Change all Dynamic Imports to Global Imports. For Example, `import("@windi/helpers").StyleObject<{}>` -> `StyleObject<{}>`.
 */
export const importTypesTransformer: TransformerFactory<Bundle | SourceFile> = context => {
  return sourceFile => {
    const imports: Record<string, string[]> = {};
    const visitor = (node: Node): Node => {
      let item: string;
      if (isImportTypeNode(node)) {
        if (isLiteralTypeNode(node.argument) && isStringLiteral(node.argument.literal) && node.qualifier && isIdentifier(node.qualifier)) {
          item = node.qualifier.escapedText.toString();
          if (!(node.argument.literal.text in imports)) {
            imports[node.argument.literal.text] = [item];
          } else if (!imports[node.argument.literal.text].includes(item)) {
            imports[node.argument.literal.text].push(item);
          }
          return factory.createTypeReferenceNode(node.qualifier, node.typeArguments);
        }
      }
      return visitEachChild(node, visitor, context);
    };
    const transformed = visitNode(sourceFile, visitor) as SourceFile;
    return factory.updateSourceFile(transformed, [
      ...Object.entries(imports).map(([k, v]) => factory.createImportDeclaration(undefined, undefined, factory.createImportClause(false, undefined, factory.createNamedImports(v.map(i => factory.createImportSpecifier(false, undefined, factory.createIdentifier(i))))), factory.createStringLiteral(k))),
      ...transformed.statements,
    ]);
  };
};
