import { intersectionTransformer, useTransformer } from "../src";

test("Intersection type", () => {
  const code = `
declare const test: {
  reverse: StyleObject<{}>;
} & {
  ring: StyleObject<{}>;
  shadow: StyleObject<{}>;
} & {
  color: StyleObject<{}>;
}`;

  expect(useTransformer(code, intersectionTransformer)).toMatchSnapshot();
});

test("Intersection shouldn't bundle index signature", () => {
  const code = `
declare const animate: {
  none: StyleObject<{}>;
} & {
  w: Record<1 | 2 | 3, StyleObject<{}>> & Record<number, StyleObject<{}>>;
} & {
  h: Record<1 | 2 | 3, StyleObject<{}>> & Record<number, StyleObject<{}>>;
} & {
  [key: string]: StyleObject<{}>;
}`;

  expect(useTransformer(code, intersectionTransformer)).toMatchSnapshot();
});
