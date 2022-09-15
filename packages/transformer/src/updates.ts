import {
  Bundle,
  Node,
  SourceFile,
  TransformerFactory,
  TypeNode,
  factory,
  isIdentifier,
  isVariableDeclaration,
  visitEachChild,
  visitNode,
} from "typescript";

/**
 * Typescript Transform Plugin.
 * Transform variable type to another type
 */
export function updateVariableType(dict: Record<string, (node: TypeNode) => TypeNode>) {
  const constsTransformer: TransformerFactory<Bundle | SourceFile> = context => {
    return sourceFile => {
      const visitor = (node: Node): Node => {
        if (isVariableDeclaration(node) && isIdentifier(node.name) && node.type) {
          const key = node.name.escapedText.toString();
          if (key in dict) return factory.updateVariableDeclaration(node, node.name, node.exclamationToken, dict[key](node.type), node.initializer);
        }
        return visitEachChild(node, visitor, context);
      };
      return visitNode(sourceFile, visitor);
    };
  };
  return constsTransformer;
}
