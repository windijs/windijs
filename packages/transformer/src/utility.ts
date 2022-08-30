import { Node, SourceFile, TransformerFactory, factory, isCallExpression, isIdentifier, isSpreadAssignment, visitEachChild, visitNode } from "typescript";

/**
 * Typescript Transform Plugin.
 *
 * This transformer transform `configHandler` and `colorHandler` to a arrowFunction, after generate .dts, it will leave a marker for inject config/color,
 * then we can use the generated dts template to speed up .dts regeneration.
 */
export const utilityTransformer: TransformerFactory<SourceFile> = context => {
  return sourceFile => {
    const visitor = (node: Node): Node => {
      if (isCallExpression(node)) {
        if (isIdentifier(node.expression)) {
          if ((node.expression.escapedText === "configHandler" || node.expression.escapedText === "fontSizeHandler") && isIdentifier(node.arguments[0])) {
            return factory.createObjectLiteralExpression([
              factory.createPropertyAssignment("type", factory.createStringLiteral("config")),
              factory.createPropertyAssignment("get", factory.createArrowFunction(undefined, undefined, [], undefined, undefined,
                factory.createAsExpression(factory.createObjectLiteralExpression([], false), factory.createTypeReferenceNode("Pick", [factory.createTypeReferenceNode("StyleProxy", [factory.createTypeQueryNode(factory.createIdentifier(node.arguments[0].escapedText.toString()))]), factory.createLiteralTypeNode(factory.createStringLiteral("$windi.config." + node.arguments[0].escapedText.toString() + ".proxy"))])),
              )),
            ], false);
          }

          if (node.expression.escapedText === "colorHandler" && isIdentifier(node.arguments[0])) {
            return factory.createObjectLiteralExpression([
              factory.createPropertyAssignment("type", factory.createStringLiteral("color")),
              factory.createPropertyAssignment("get", factory.createArrowFunction(undefined, undefined, [], undefined, undefined,
                factory.createAsExpression(factory.createObjectLiteralExpression([], false), factory.createTypeReferenceNode("Pick", [factory.createTypeReferenceNode("ColorStyleProxy", [factory.createTypeQueryNode(factory.createIdentifier(node.arguments[0].escapedText.toString()))]), factory.createLiteralTypeNode(factory.createStringLiteral("$windi.color." + node.arguments[0].escapedText.toString() + ".proxy"))])),
              )),
            ], false);
          }
        }
      }

      if (isSpreadAssignment(node) && isIdentifier(node.expression) && node.expression.escapedText === "colors") {
        return factory.updateSpreadAssignment(node, factory.createObjectLiteralExpression([factory.createPropertyAssignment("$" + node.expression.escapedText, factory.createAsExpression(factory.createStringLiteral(""), factory.createLiteralTypeNode(factory.createStringLiteral("windiColorInject"))))]));
      }

      return visitEachChild(node, visitor, context);
    };

    const transformed = visitNode(sourceFile, visitor);
    return factory.updateSourceFile(transformed, [
      factory.createImportDeclaration(undefined, undefined, factory.createImportClause(false, undefined, factory.createNamedImports([
        factory.createImportSpecifier(false, undefined, factory.createIdentifier("StyleProxy")),
        factory.createImportSpecifier(false, undefined, factory.createIdentifier("ColorStyleProxy")),
      ])), factory.createStringLiteral("@windijs/helpers")), ...transformed.statements]);
  };
};
