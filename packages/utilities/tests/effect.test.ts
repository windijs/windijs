import { blend, opacity, shadow } from "../src";

test("Shadow", () => {
  expect(shadow.css).toMatchSnapshot();
  expect(shadow.sm.css).toMatchSnapshot();
  expect(shadow.xxl.css).toMatchSnapshot();
  expect(shadow.inner.css).toMatchSnapshot();
  expect(shadow.none.css).toMatchSnapshot();
  expect(shadow.yellow[500].css).toMatchSnapshot();
  expect(shadow.yellow[500].opacity(90).css).toMatchSnapshot();
  expect(shadow.opacity[30].css).toMatchSnapshot();
});

test("Opacity", () => {
  expect(opacity[0].css).toMatchSnapshot();
  expect(opacity[50].css).toMatchSnapshot();
  expect(opacity[100].css).toMatchSnapshot();
});

test("Mix Blend Mode", () => {
  expect(blend.normal.css).toMatchSnapshot();
  expect(blend.darken.css).toMatchSnapshot();
  expect(blend.color.css).toMatchSnapshot();
  expect(blend.color.dodge.css).toMatchSnapshot();
  expect(blend.color.burn.css).toMatchSnapshot();
  expect(blend.hardLight.css).toMatchSnapshot();
});
