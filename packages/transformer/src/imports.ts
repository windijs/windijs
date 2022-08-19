import { Bundle, Node, SourceFile, TransformerFactory, factory, isIdentifier, isImportDeclaration, isImportTypeNode, isLiteralTypeNode, isNamedImports, isStringLiteral, visitEachChild, visitNode } from "typescript";

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
