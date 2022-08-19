import { Node, SourceFile, TransformerFactory, factory, isCallExpression, isIdentifier, isSpreadAssignment, visitEachChild, visitNode } from "typescript";

/**
 * Typescript Transform Plugin.
 *
 * This transformer transform `configHandler` and `colorHandler` to a arrowFunction, after generate .dts, it will leave `windiConfigInject` | `windiColorInject` marker,
 * then we can use the generated dts template to speed up .dts regeneration.
 */
export const utilityTransformer: TransformerFactory<SourceFile> = context => {
  return sourceFile => {
    const visitor = (node: Node): Node => {
      if (isCallExpression(node)) {
        if (isIdentifier(node.expression)) {
          if ((node.expression.escapedText === "configHandler" || node.expression.escapedText === "fontSizeHandler") && isIdentifier(node.arguments[0])) {
            return factory.createArrowFunction(undefined, undefined, [], undefined, undefined,
              factory.createObjectLiteralExpression([factory.createPropertyAssignment("$" + node.arguments[0].escapedText, factory.createAsExpression(factory.createStringLiteral(""), factory.createLiteralTypeNode(factory.createStringLiteral("windiConfigInject"))))]),
            );
          }

          if (node.expression.escapedText === "colorHandler" && isIdentifier(node.arguments[0])) {
            return factory.createArrowFunction(undefined, undefined, [], undefined, undefined,
              factory.createObjectLiteralExpression([factory.createPropertyAssignment("$" + node.arguments[0].escapedText, factory.createAsExpression(factory.createStringLiteral(""), factory.createLiteralTypeNode(factory.createStringLiteral("windiColorInject"))))]),
            );
          }
        }
      }

      if (isSpreadAssignment(node) && isIdentifier(node.expression) && node.expression.escapedText === "colors") {
        return factory.updateSpreadAssignment(node, factory.createObjectLiteralExpression([factory.createPropertyAssignment("$" + node.expression.escapedText, factory.createAsExpression(factory.createStringLiteral(""), factory.createLiteralTypeNode(factory.createStringLiteral("windiColorInject"))))]));
      }

      return visitEachChild(node, visitor, context);
    };

    return visitNode(sourceFile, visitor);
  };
};
