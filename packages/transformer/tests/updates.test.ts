import { factory } from "typescript";

import { updateVariableType, useTransformer } from "../src";

test("Transform omit", () => {
  const code = `
  export declare const fill: Omit<{
    $colors: StyleObject<{}>;
    "none": StyleObject<{}>;
  }, "DEFAULT" | "a">;
  export declare const stroke: 3;
  `;

  expect(
    useTransformer(
      code,
      updateVariableType({
        fill: () => factory.createLiteralTypeNode(factory.createStringLiteral("hello")),
        stroke: node => factory.createTypeReferenceNode("Pick", [factory.createTypeLiteralNode([]), node]),
      })
    )
  ).toMatchSnapshot();
});
