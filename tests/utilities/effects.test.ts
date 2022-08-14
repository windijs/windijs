import { blendModeConfig, boxShadowConfig, opacityConfig } from "config";
import { buildBoxShadowColor, buildBoxShadowSize, colorHandler, configHandler, createUtility } from "core";

import { prop } from "helpers";
import { windiColors } from "colors";

test("Shadow", () => {
  const shadow = createUtility("shadow")
    .use(configHandler(boxShadowConfig, buildBoxShadowSize))
    .use(colorHandler(windiColors, buildBoxShadowColor))
    .case("opacity", configHandler(opacityConfig, prop`--w-shadow-color-opacity`))
    .init();

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
  const opacity = createUtility("opacity").use(configHandler(opacityConfig, "opacity")).init();

  expect(opacity[0].css).toMatchSnapshot();
  expect(opacity[50].css).toMatchSnapshot();
  expect(opacity[100].css).toMatchSnapshot();
});

test("Mix Blend Mode", () => {
  const blend = createUtility("blend").use(configHandler(blendModeConfig, "mixBlendMode")).init();

  expect(blend.normal.css).toMatchSnapshot();
  expect(blend.darken.css).toMatchSnapshot();
  expect(blend.color.css).toMatchSnapshot();
  expect(blend.color.dodge.css).toMatchSnapshot();
  expect(blend.color.burn.css).toMatchSnapshot();
  expect(blend.hardLight.css).toMatchSnapshot();
});
