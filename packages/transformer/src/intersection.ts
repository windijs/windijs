import { Bundle, Node, SourceFile, TransformerFactory, factory, isIndexSignatureDeclaration, isIntersectionTypeNode, isTypeLiteralNode, visitEachChild, visitNode } from "typescript";

/**
 * Typescript Transform Plugin.
 *
 * This transformer combine seperated object type in intersection type. For Example
 *
 * ```ts
 * { a: string } & { b: string } -> { a: string; b: string; }
 * ```
 */
export const intersectionTransformer: TransformerFactory<Bundle | SourceFile> = context => {
  return sourceFile => {
    const visitor = (node: Node): Node => {
      if (isIntersectionTypeNode(node)) {
        const literals = [];
        const newTypes = [];
        for (const type of node.types) {
          if (isTypeLiteralNode(type) && !type.members.find(i => isIndexSignatureDeclaration(i))) {
            literals.push(...type.members);
          } else {
            newTypes.push(type);
          }
        }

        if (literals.length > 0) newTypes.unshift(factory.createTypeLiteralNode(literals));

        return factory.createIntersectionTypeNode(newTypes);
      }

      return visitEachChild(node, visitor, context);
    };

    return visitNode(sourceFile, visitor);
  };
};
