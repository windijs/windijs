import { baseColors, createUtility, prop, windiColors } from "index";
import { borderRadiusConfig, borderStyleConfig, borderWidthConfig } from "config/border";
import { colorHandler, configHandler } from "utilities";

import type { PickValue } from "types";
import { opacityConfig } from "config";

test("Border Radius", () => {
  const rounded = createUtility("rounded")
    .use(configHandler(borderRadiusConfig, "borderRadius"))
    .init();

  // @ts-ignore, hidden property
  expect(rounded.css).toMatchSnapshot("default");
  expect(rounded.full.css).toMatchSnapshot("full");
  expect(rounded[1].css).toMatchSnapshot("1");
  expect(rounded.none.css).toMatchSnapshot("none");
  expect(rounded.sm.css).toMatchSnapshot("sm");
  expect(rounded.md.css).toMatchSnapshot("md");
  expect(rounded.lg.css).toMatchSnapshot("lg");
  expect(rounded.xl.css).toMatchSnapshot("xl");
  expect(rounded.xxl.css).toMatchSnapshot("xxl");
  expect(rounded.xxxl.css).toMatchSnapshot("xxxl");
});

test("Border Style", () => {
  const border = createUtility("border")
    .use(configHandler(borderStyleConfig, "borderStyle"))
    .init();
  expect(border.solid.css).toMatchSnapshot("solid");
  expect(border.dashed.css).toMatchSnapshot("dashed");
  expect(border.dotted.css).toMatchSnapshot("dotted");
  expect(border.double.css).toMatchSnapshot("double");
  expect(border.none.css).toMatchSnapshot("none");
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
  // @ts-ignore
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
