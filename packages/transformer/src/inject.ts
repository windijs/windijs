import { Bundle, SourceFile, SyntaxKind, TransformerFactory, Visitor, factory, isIdentifier, isImportDeclaration, isLiteralTypeNode, isStringLiteral, isTypeReferenceNode, visitEachChild, visitNode } from "typescript";

/**
 * Typescript Transform Plugin.
 *
 * Convert `Pick<..., "$...">` to `Inject<..., "$...">`, also add the Inject type.
 */
export const injectTransformer: TransformerFactory<Bundle | SourceFile> = context => {
  return sourceFile => {
    const visitor: Visitor = (node) => {
      if (isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "Pick" && node.typeArguments && isLiteralTypeNode(node.typeArguments[1]) && isStringLiteral(node.typeArguments[1].literal) && node.typeArguments[1].literal.text.startsWith("$windi.")) {
        return factory.updateTypeReferenceNode(node, factory.createIdentifier("Inject"), node.typeArguments);
      }
      return visitEachChild(node, visitor, context);
    };
    const transformed = visitNode(sourceFile, visitor) as SourceFile;
    return factory.updateSourceFile(transformed, [
      ...transformed.statements.filter(i => isImportDeclaration(i)),
      factory.createTypeAliasDeclaration(undefined, undefined, "Inject", [factory.createTypeParameterDeclaration(undefined, "A"), factory.createTypeParameterDeclaration(undefined, "B")], factory.createConditionalTypeNode(factory.createTypeReferenceNode("B"), factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword), factory.createTypeReferenceNode("B"), factory.createTypeReferenceNode("A"))),
      ...transformed.statements.filter(i => !isImportDeclaration(i)),
    ]);
  };
};
