import {
  Bundle,
  Node,
  SourceFile,
  TransformerFactory,
  TypeElement,
  factory,
  isIdentifier,
  isLiteralTypeNode,
  isPropertySignature,
  isStringLiteral,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  visitEachChild,
  visitNode,
} from "typescript";

/**
 * Typescript Transform Plugin.
 *
 * Remove useless Omit, for example, `Omit<{none: StyleObject<{}>}, "DEFAULT">` -> `{none: StyleObject<{}>}`
 */
export const omitTransformer: TransformerFactory<Bundle | SourceFile> = context => {
  return sourceFile => {
    const visitor = (node: Node): Node => {
      if (isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "Omit")
        if (node.typeArguments) {
          const value = node.typeArguments[0];
          const omitted = node.typeArguments[1];
          const keys: string[] = isStringLiteral(omitted)
            ? [omitted.text]
            : isUnionTypeNode(omitted)
            ? omitted.types.map(i => (isLiteralTypeNode(i) && isStringLiteral(i.literal) ? i.literal.text : ""))
            : [];
          if (isTypeLiteralNode(value)) {
            const newMembers: TypeElement[] = [];
            for (const m of value.members) {
              if (isPropertySignature(m)) {
                if (isStringLiteral(m.name) && keys.includes(m.name.text)) continue;
                if (isIdentifier(m.name) && keys.includes(m.name.escapedText.toString())) continue;
              }
              newMembers.push(m);
            }
            return factory.createTypeLiteralNode(newMembers);
          }
        }

      return visitEachChild(node, visitor, context);
    };
    return visitNode(sourceFile, visitor);
  };
};
