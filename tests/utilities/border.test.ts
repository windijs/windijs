import { border, divide, outline, ring, rounded } from "utilities";
import { createUtility, prop } from "index";

import type { PickValue } from "types";
import { configHandler } from "core";
import { opacityConfig } from "config";

test("Border Radius", () => {
  expect(rounded.css).toMatchSnapshot();
  expect(rounded.full.css).toMatchSnapshot();
  expect(rounded[1].css).toMatchSnapshot();
  expect(rounded.none.css).toMatchSnapshot();
  expect(rounded.sm.css).toMatchSnapshot();
  expect(rounded.md.css).toMatchSnapshot();
  expect(rounded.lg.css).toMatchSnapshot();
  expect(rounded.xl.css).toMatchSnapshot();
  expect(rounded.xxl.css).toMatchSnapshot();
  expect(rounded.xxxl.css).toMatchSnapshot();
});

test("Border Style", () => {
  expect(border.solid.css).toMatchSnapshot();
  expect(border.dashed.css).toMatchSnapshot();
  expect(border.dotted.css).toMatchSnapshot();
  expect(border.double.css).toMatchSnapshot();
  expect(border.none.css).toMatchSnapshot();
});

test("Border With Nested Config", () => {
  const borderStyleHandler = configHandler({
    solid: "solid",
    nested: {
      DEFAULT: "nested",
      dashed: "dashed",
      nested: {
        double: "double",
      },
    },
  }, "borderStyle");

  const border = createUtility("border")
    .use(borderStyleHandler)
    .init();
  expect(border.nested.css).toMatchSnapshot();
  expect(border.solid.css).toMatchSnapshot();
  expect(border.nested.dashed.css).toMatchSnapshot();
  expect(border.nested.nested.double.css).toMatchSnapshot();
});

test("Border Opacity", () => {
  expect(border.opacity[0].css).toMatchSnapshot();
  expect(border.opacity[50].css).toMatchSnapshot();
  expect(border.opacity[30].css).toMatchSnapshot();
  expect(border.opacity[100].css).toMatchSnapshot();
});

test("Border Opacity With Proxy Config", () => {
  const opacityConfigProxy = <T extends object> (cfg: T = {} as T) => new Proxy(cfg, {
    get (target, p: string) {
      return p in target ? Reflect.get(target, p) : (+p / 100).toString();
    },
  }) as PickValue<T & Omit<Record<0 | 5 | 10 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 95 | 100, string>, keyof T>, string | number>;

  const border = createUtility("border")
    .case("opacity", configHandler(opacityConfigProxy<{12: string, 70: null}>(), prop`--w-border-opacity`))
    .init();
  expect(border.opacity[0].css).toMatchSnapshot();
  expect(border.opacity[50].css).toMatchSnapshot();
  expect(border.opacity[30].css).toMatchSnapshot();
  expect(border.opacity[100].css).toMatchSnapshot();
  expect(border.opacity[12].css).toMatchSnapshot();
  // @ts-expect-error should trigger ts-error when set key to null | undefined.
  expect(border.opacity[70].css).toMatchSnapshot();
});

test("Border Opacity With Different Trigger", () => {
  const border = createUtility("border")
    .case("op", configHandler(opacityConfig, prop`--w-border-opacity`))
    .init();

  expect(border.op[0].css).toMatchSnapshot();
  expect(border.op[50].css).toMatchSnapshot();
  expect(border.op[30].css).toMatchSnapshot();
  expect(border.op[100].css).toMatchSnapshot();
});

test("Border Width", () => {
  expect(border[0].css).toMatchSnapshot();
  expect(border[4].css).toMatchSnapshot();
  expect(border.css).toMatchSnapshot();
});

test("Border Color", () => {
  expect(border.current.css).toMatchSnapshot();
  expect(border.white.css).toMatchSnapshot();
  expect(border.blue[700].css).toMatchSnapshot();
  expect(border.red[500].css).toMatchSnapshot();
});

test("Divider Width", () => {
  expect(divide.x[0].css).toMatchSnapshot();
  expect(divide.x[4].css).toMatchSnapshot();
  expect(divide.x.css).toMatchSnapshot();
  expect(divide.x.reverse.css).toMatchSnapshot();
  expect(divide.y[0].css).toMatchSnapshot();
  expect(divide.y[4].css).toMatchSnapshot();
  expect(divide.y.css).toMatchSnapshot();
  expect(divide.y.reverse.css).toMatchSnapshot();
});

test("Divider Color", () => {
  expect(divide.current.css).toMatchSnapshot();
  expect(divide.white.css).toMatchSnapshot();
  expect(divide.blue[700].css).toMatchSnapshot();
  expect(divide.red[500].css).toMatchSnapshot();
  expect(divide.cyan[300].opacity(10).css).toMatchSnapshot();
});

test("Divider Opacity", () => {
  expect(divide.opacity[0].css).toMatchSnapshot();
  expect(divide.opacity[50].css).toMatchSnapshot();
});

test("Divider Style", () => {
  expect(divide.solid.css).toMatchSnapshot();
  expect(divide.dashed.css).toMatchSnapshot();
  expect(divide.dotted.css).toMatchSnapshot();
  expect(divide.double.css).toMatchSnapshot();
  expect(divide.none.css).toMatchSnapshot();
});

test("Outline Color", () => {
  expect(outline.amber[300].css).toMatchSnapshot();
  expect(outline.blue[400].opacity(10).css).toMatchSnapshot();
});

test("Outline Width", () => {
  expect(outline[0].css).toMatchSnapshot();
  expect(outline[4].css).toMatchSnapshot();
  expect(outline.css).toMatchSnapshot();
});

test("Outline Offset", () => {
  expect(outline.offset[2].css).toMatchSnapshot();
});

test("Outline Style", () => {
  expect(outline.solid.css).toMatchSnapshot();
  expect(outline.dashed.css).toMatchSnapshot();
  expect(outline.dotted.css).toMatchSnapshot();
  expect(outline.double.css).toMatchSnapshot();
  expect(outline.none.css).toMatchSnapshot();
});

test("Outline Opacity", () => {
  expect(outline.opacity[0].css).toMatchSnapshot();
  expect(outline.opacity[50].css).toMatchSnapshot();
});

test("Ring Color", () => {
  expect(ring.amber[300].css).toMatchSnapshot();
  expect(ring.blue[400].opacity(10).css).toMatchSnapshot();
});

test("Ring Opacity", () => {
  expect(ring.opacity[0].css).toMatchSnapshot();
  expect(ring.opacity[50].css).toMatchSnapshot();
});

test("Ring Width", () => {
  expect(ring[0].css).toMatchSnapshot();
  expect(ring[4].css).toMatchSnapshot();
  expect(ring.inset.css).toMatchSnapshot();
  expect(ring.css).toMatchSnapshot();
});

test("Ring Offset", () => {
  expect(ring.offset[2].css).toMatchSnapshot();
  expect(ring.offset.cyan[300].css).toMatchSnapshot();
  expect(ring.offset.gray[300].opacity(20).css).toMatchSnapshot();
  expect(ring.offset.opacity[20].css).toMatchSnapshot();
});
