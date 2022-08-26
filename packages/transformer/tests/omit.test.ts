import { omitTransformer, useTransformer } from "../src";

test("Transform omit", () => {
  const code = `
  export declare const fill: Omit<{
    $colors: StyleObject<{}>;
    "none": StyleObject<{}>;
  }, "DEFAULT" | "a">;

  export declare const stroke: Omit<{
    DEFAULT: StyleObject<{}>;
    $colors: StyleObject<{}>;
    a: StyleObject<{}>;
    "none": StyleObject<{}>;
  }, "DEFAULT" | "a">;
  `;

  expect(useTransformer(code, omitTransformer)).toMatchSnapshot();
});
