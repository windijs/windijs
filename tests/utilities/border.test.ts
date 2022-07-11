import { colors, createUtility } from "../../src";
import { borderRadiusConfig, borderStyleConfig, borderWidthConfig } from "../../src/config/border";
import { opacityConfig } from "../../src/config/opacity";
import { borderColor, borderOpacity, borderRadius, borderStyle, borderWidth } from "../../src/utilities/border";

test("Border Radius", () => {
  const rounded = createUtility()
    .use(borderRadius(borderRadiusConfig))
    .init();

  expect(rounded.default).toMatchSnapshot("default");
  expect(rounded.full).toMatchSnapshot("full");
  expect(rounded[1]).toMatchSnapshot("1");
  expect(rounded.none).toMatchSnapshot("none");
  expect(rounded.sm).toMatchSnapshot("sm");
  expect(rounded.md).toMatchSnapshot("md");
  expect(rounded.lg).toMatchSnapshot("lg");
  expect(rounded.xl).toMatchSnapshot("xl");
  expect(rounded.xxl).toMatchSnapshot("xxl");
  expect(rounded.xxxl).toMatchSnapshot("xxxl");
});

test("Border Style", () => {
  const border = createUtility()
    .use(borderStyle(borderStyleConfig))
    .init();
  expect(border.solid).toMatchSnapshot("solid");
  expect(border.dashed).toMatchSnapshot("dashed");
  expect(border.dotted).toMatchSnapshot("dotted");
  expect(border.double).toMatchSnapshot("double");
  expect(border.none).toMatchSnapshot("none");
});

test("Border Opacity", () => {
  const border = createUtility()
    .use(borderOpacity(opacityConfig))
    .init();
  expect(border.opacity[0]).toMatchSnapshot();
  expect(border.opacity[50]).toMatchSnapshot();
  expect(border.opacity[30]).toMatchSnapshot();
  expect(border.opacity[100]).toMatchSnapshot();
});

test("Border Opacity With Different Trigger", () => {
  const border = createUtility()
    .use(borderOpacity(opacityConfig, "op"))
    .init();

  expect(border.op[0]).toMatchSnapshot();
  expect(border.op[50]).toMatchSnapshot();
  expect(border.op[30]).toMatchSnapshot();
  expect(border.op[100]).toMatchSnapshot();
});

test("Border Width", () => {
  const border = createUtility()
    .use(borderWidth(borderWidthConfig))
    .init();
  expect(border[0]).toMatchSnapshot();
  expect(border[4]).toMatchSnapshot();
  expect(border.default).toMatchSnapshot();
});

test("Border Color", () => {
  const border = createUtility()
    .use(borderColor(colors))
    .init();

  expect(border.current.css).toMatchSnapshot();
  expect(border.white.css).toMatchSnapshot();
  expect(border.blue[700].css).toMatchSnapshot();
  expect(border.red[500].css).toMatchSnapshot();
});
