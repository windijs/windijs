import { Node, SourceFile, TransformerFactory, factory, isStringLiteral, visitEachChild, visitNode } from "typescript";

import { useTransformer } from "../src";

const testTransformer: TransformerFactory<SourceFile> = context => {
  return sourceFile => {
    const visitor = (node: Node): Node => {
      if (isStringLiteral(node)) return factory.createStringLiteral("world");
      return visitEachChild(node, visitor, context);
    };
    return visitNode(sourceFile, visitor);
  };
};

test("useTransformer", () => {
  expect(useTransformer("const hello = 'hello'", testTransformer)).toEqual("const hello = \"world\";\n");
});
