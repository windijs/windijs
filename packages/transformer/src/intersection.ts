import { Bundle, Node, PropertySignature, SourceFile, TransformerFactory, factory, isIdentifier, isIndexSignatureDeclaration, isIntersectionTypeNode, isPropertySignature, isStringLiteral, isTypeLiteralNode, visitEachChild, visitNode } from "typescript";

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
        const sigs: Record<string, PropertySignature> = {};
        const newTypes = [];
        for (const type of node.types) {
          if (isTypeLiteralNode(type) && !type.members.find(i => isIndexSignatureDeclaration(i))) {
            for (const m of type.members) {
              if (isPropertySignature(m)) {
                if (isIdentifier(m.name)) {
                  sigs[m.name.escapedText.toString()] = m;
                } else if (isStringLiteral(m.name)) {
                  sigs[m.name.text] = m;
                }
              }
            }
          } else {
            newTypes.push(type);
          }
        }

        if (Object.values(sigs).length > 0) newTypes.unshift(factory.createTypeLiteralNode(Object.values(sigs)));

        return factory.createIntersectionTypeNode(newTypes);
      }

      return visitEachChild(node, visitor, context);
    };

    return visitNode(sourceFile, visitor);
  };
};
