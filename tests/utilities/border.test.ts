import { baseColors, createUtility, prop, windiColors } from "index";
import { borderRadiusConfig, borderStyleConfig, borderWidthConfig, opacityConfig, outlineOffsetConfig, ringOffsetConfig } from "config";
import { buildDivideColor, buildDivideOpacity, buildDivideStyle, buildDivideX, buildDivideY, buildRingWidth, colorHandler, configHandler, cssHandler, divideXReverseHandler, divideYReverseHandler, guard, meld } from "utilities";

import type { PickValue } from "types";

test("Border Radius", () => {
  const rounded = createUtility("rounded")
    .use(configHandler(borderRadiusConfig, "borderRadius"))
    .init();

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
  const border = createUtility("border")
    .use(configHandler(borderStyleConfig, "borderStyle"))
    .init();
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
  // @ts-ignore
  expect(border.nested.css).toMatchSnapshot();
  expect(border.solid.css).toMatchSnapshot();
  expect(border.nested.dashed.css).toMatchSnapshot();
  expect(border.nested.nested.double.css).toMatchSnapshot();
});

test("Border Opacity", () => {
  const border = createUtility("border")
    .case("opacity", configHandler(opacityConfig, prop`--w-border-opacity`))
    .init();
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
  const border = createUtility("border")
    .use(configHandler(borderWidthConfig, "borderWidth"))
    .init();
  expect(border[0].css).toMatchSnapshot();
  expect(border[4].css).toMatchSnapshot();
  expect(border.css).toMatchSnapshot();
});

test("Border Color", () => {
  const border = createUtility("border")
    .use(colorHandler({ ...baseColors, ...windiColors }, "borderColor", "--w-border-opacity"))
    .init();

  expect(border.current.css).toMatchSnapshot();
  expect(border.white.css).toMatchSnapshot();
  expect(border.blue[700].css).toMatchSnapshot();
  expect(border.red[500].css).toMatchSnapshot();
});

test("Divider Width", () => {
  const divide = createUtility("divide")
    .case("x", meld(
      guard("reverse", divideXReverseHandler()),
      configHandler(borderWidthConfig, buildDivideX),
    ))
    .case("y", meld(
      guard("reverse", divideYReverseHandler()),
      configHandler(borderWidthConfig, buildDivideY),
    ))
    .init();

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
  const divide = createUtility("divide")
    .use(colorHandler({ ...baseColors, ...windiColors }, buildDivideColor))
    .init();

  expect(divide.current.css).toMatchSnapshot();
  expect(divide.white.css).toMatchSnapshot();
  expect(divide.blue[700].css).toMatchSnapshot();
  expect(divide.red[500].css).toMatchSnapshot();
  expect(divide.cyan[300].opacity(10).css).toMatchSnapshot();
});

test("Divider Opacity", () => {
  const divide = createUtility("divide")
    .case("opacity", configHandler(opacityConfig, buildDivideOpacity))
    .init();

  expect(divide.opacity[0].css).toMatchSnapshot();
  expect(divide.opacity[50].css).toMatchSnapshot();
});

test("Divider Style", () => {
  const divide = createUtility("divide")
    .use(configHandler(borderStyleConfig, buildDivideStyle))
    .init();

  expect(divide.solid.css).toMatchSnapshot();
  expect(divide.dashed.css).toMatchSnapshot();
  expect(divide.dotted.css).toMatchSnapshot();
  expect(divide.double.css).toMatchSnapshot();
  expect(divide.none.css).toMatchSnapshot();
});

test("Outline Color", () => {
  const outline = createUtility("outline")
    .use(colorHandler(windiColors, "outlineColor", "--w-outline-opacity"))
    .init();

  expect(outline.amber[300].css).toMatchSnapshot();
  expect(outline.blue[400].opacity(10).css).toMatchSnapshot();
});

test("Outline Width", () => {
  const outline = createUtility("outline")
    .use(configHandler(borderWidthConfig, "outlineWidth"))
    .init();
  expect(outline[0].css).toMatchSnapshot();
  expect(outline[4].css).toMatchSnapshot();
  expect(outline.css).toMatchSnapshot();
});

test("Outline Offset", () => {
  const outline = createUtility("outline")
    .case("offset", configHandler(outlineOffsetConfig, "outlineOffset"))
    .init();

  expect(outline.offset[2].css).toMatchSnapshot();
});

test("Outline Style", () => {
  const outline = createUtility("outline")
    .use(configHandler(borderStyleConfig, "outlineStyle"))
    .init();
  expect(outline.solid.css).toMatchSnapshot();
  expect(outline.dashed.css).toMatchSnapshot();
  expect(outline.dotted.css).toMatchSnapshot();
  expect(outline.double.css).toMatchSnapshot();
  expect(outline.none.css).toMatchSnapshot();
});

test("Outline Opacity", () => {
  const outline = createUtility("outline")
    .case("opacity", configHandler(opacityConfig, prop`--w-outline-opacity`))
    .init();

  expect(outline.opacity[0].css).toMatchSnapshot();
  expect(outline.opacity[50].css).toMatchSnapshot();
});

test("Ring Color", () => {
  const ring = createUtility("ring")
    .use(colorHandler(windiColors, prop`--w-ring-color`, "--w-ring-opacity"))
    .init();

  expect(ring.amber[300].css).toMatchSnapshot();
  expect(ring.blue[400].opacity(10).css).toMatchSnapshot();
});

test("Ring Opacity", () => {
  const ring = createUtility("ring")
    .case("opacity", configHandler(opacityConfig, prop`--w-ring-opacity`))
    .init();

  expect(ring.opacity[0].css).toMatchSnapshot();
  expect(ring.opacity[50].css).toMatchSnapshot();
});

test("Ring Width", () => {
  const ring = createUtility("ring")
    .use(configHandler(borderWidthConfig, buildRingWidth))
    .case("inset", cssHandler({ "--w-ring-inset": "inset" }))
    .init();
  expect(ring[0].css).toMatchSnapshot();
  expect(ring[4].css).toMatchSnapshot();
  expect(ring.inset.css).toMatchSnapshot();
  expect(ring.css).toMatchSnapshot();
});

test("Ring Offset", () => {
  const ring = createUtility("ring")
    .case("offset", meld(
      colorHandler(windiColors, prop`--w-ring-offset-color`, "--w-ring-offset-opacity"),
      configHandler(ringOffsetConfig, prop`--w-ring-offset-width`),
      guard("opacity", configHandler(opacityConfig, prop`--w-ring-offset-opacity`)),
    ))
    .init();

  expect(ring.offset[2].css).toMatchSnapshot();
  expect(ring.offset.cyan[300].css).toMatchSnapshot();
  expect(ring.offset.gray[300].opacity(20).css).toMatchSnapshot();
  expect(ring.offset.opacity[20].css).toMatchSnapshot();
});
