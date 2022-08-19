import { fixHelperStyle, useTransformer } from "../src";

test("fix StyleObject", () => {
  const code = `
type StyleObject<T> = StyleObjectBase & {
  readonly css: CSSObject | CSSMap;
  readonly meta: UtilityMeta;
} & T;
  `;

  expect(useTransformer(code, fixHelperStyle)).toMatchSnapshot();
});

test("fix StyleProxy", () => {
  const code = "type StyleProxy<T, O> = NestedProxy<T, StyleObject<O>>;";
  expect(useTransformer(code, fixHelperStyle)).toMatchSnapshot();
});
