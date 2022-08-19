import { Bundle, Node, SourceFile, SyntaxKind, TransformerFactory, factory, isIdentifier, isTypeAliasDeclaration, visitEachChild, visitNode } from "typescript";

/**
 * Typescript Transform Plugin.
 *
 * when rollup-plugin-ts generate .dts file, it will ignore default value parameter for type declaration.
 * this transformer fixed this.
 */
export const fixHelperStyle: TransformerFactory<Bundle | SourceFile> = context => {
  return sourceFile => {
    const visitor = (node: Node): Node => {
      if (isTypeAliasDeclaration(node) && isIdentifier(node.name) && node.name.escapedText === "StyleObject") {
        return factory.updateTypeAliasDeclaration(node, node.decorators, node.modifiers, node.name, [factory.createTypeParameterDeclaration(undefined, "T", undefined, factory.createTypeLiteralNode([]))], node.type);
      }

      if (isTypeAliasDeclaration(node) && isIdentifier(node.name) && node.name.escapedText === "StyleProxy") {
        return factory.updateTypeAliasDeclaration(node, node.decorators, node.modifiers, node.name, [factory.createTypeParameterDeclaration(undefined, "T"), factory.createTypeParameterDeclaration(undefined, "O", undefined, factory.createTypeLiteralNode([]))], node.type);
      }

      if (isTypeAliasDeclaration(node) && isIdentifier(node.name) && node.name.escapedText === "BuildFunc") {
        return factory.updateTypeAliasDeclaration(node, node.decorators, node.modifiers, node.name, [factory.createTypeParameterDeclaration(undefined, "V", undefined, factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword)), factory.createTypeParameterDeclaration(undefined, "O", factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword), factory.createTypeLiteralNode([]))], node.type);
      }

      return visitEachChild(node, visitor, context);
    };
    return visitNode(sourceFile, visitor);
  };
};

// export const fixTuplifyUnion: TransformerFactory<Bundle | SourceFile> = context => {
//   return sourceFile => {
//     const visitor = (node: Node): Node => {
//       if (isTypeAliasDeclaration(node) && isIdentifier(node.name) && node.name.escapedText === "TuplifyUnion") {
//         return factory.updateTypeAliasDeclaration(node, node.decorators, node.modifiers, node.name, [
//           factory.createTypeParameterDeclaration(undefined, "T"),
//           factory.createTypeParameterDeclaration(undefined, "L", undefined, factory.createTypeReferenceNode("LastOf", [factory.createTypeReferenceNode("T")])),
//           factory.createTypeParameterDeclaration(undefined, "N", undefined, factory.createConditionalTypeNode(factory.createTupleTypeNode([factory.createTypeReferenceNode("T")]), factory.createTupleTypeNode([factory.createKeywordTypeNode(SyntaxKind.NeverKeyword)]), factory.createLiteralTypeNode(factory.createTrue()), factory.createLiteralTypeNode(factory.createFalse()))),
//         ], node.type);
//       }
//       return visitEachChild(node, visitor, context);
//     };
//     return visitNode(sourceFile, visitor);
//   };
// };
