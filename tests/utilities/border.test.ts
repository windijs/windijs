import { borderColor, borderOpacity, borderRadius, borderStyle, borderWidth } from "utilities/border";
import { borderRadiusConfig, borderStyleConfig, borderWidthConfig } from "config/border";
import { colors, createUtility } from "index";
import { opacityConfig, opacityConfigProxy } from "config/opacity";

import { useStaticHandler } from "utilities/handler";

test("Border Radius", () => {
  const rounded = createUtility("rounded")
    .use(borderRadius(borderRadiusConfig))
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
    .use(borderStyle(borderStyleConfig))
    .init();
  expect(border.solid.css).toMatchSnapshot("solid");
  expect(border.dashed.css).toMatchSnapshot("dashed");
  expect(border.dotted.css).toMatchSnapshot("dotted");
  expect(border.double.css).toMatchSnapshot("double");
  expect(border.none.css).toMatchSnapshot("none");
});

test("Border With Nested Config", () => {
  const borderStyle = useStaticHandler((handle, styles) => handle(styles, "borderStyle", undefined, true));
  const border = createUtility("border")
    .use(borderStyle({
      solid: "solid",
      nested: {
        DEFAULT: "nested",
        dashed: "dashed",
        nested: {
          double: "double",
        },
      },
    }))
    .init();
  // @ts-ignore
  expect(border.nested.css).toMatchSnapshot();
  expect(border.solid.css).toMatchSnapshot();
  expect(border.nested.dashed.css).toMatchSnapshot();
  expect(border.nested.nested.double.css).toMatchSnapshot();
});

test("Border Opacity", () => {
  const border = createUtility("border")
    .use(borderOpacity(opacityConfig))
    .init();
  expect(border.opacity[0].css).toMatchSnapshot();
  expect(border.opacity[50].css).toMatchSnapshot();
  expect(border.opacity[30].css).toMatchSnapshot();
  expect(border.opacity[100].css).toMatchSnapshot();
});

test("Border Opacity With Proxy Config", () => {
  const border = createUtility("border")
    .use(borderOpacity(opacityConfigProxy<{12: string, 70: null}>()))
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
    .use(borderOpacity(opacityConfig, "op"))
    .init();

  expect(border.op[0].css).toMatchSnapshot();
  expect(border.op[50].css).toMatchSnapshot();
  expect(border.op[30].css).toMatchSnapshot();
  expect(border.op[100].css).toMatchSnapshot();
});

test("Border Width", () => {
  const border = createUtility("border")
    .use(borderWidth(borderWidthConfig))
    .init();
  expect(border[0].css).toMatchSnapshot();
  expect(border[4].css).toMatchSnapshot();
  // @ts-ignore
  expect(border.css).toMatchSnapshot();
});

test("Border Color", () => {
  const border = createUtility("border")
    .use(borderColor(colors))
    .init();

  expect(border.current.css).toMatchSnapshot();
  expect(border.white.css).toMatchSnapshot();
  expect(border.blue[700].css).toMatchSnapshot();
  expect(border.red[500].css).toMatchSnapshot();
});
