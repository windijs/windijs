import { analyzeUtilities } from "../src";

test("Analyze single utility", () => {
  const code = `
export const bg = createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .use(configHandler(backgroundAttachmentConfig, "backgroundAttachment"))
  .use(configHandler(backgroundPositionConfig, "backgroundPosition"))
  .use(configHandler(backgroundRepeatConfig, "backgroundRepeat"))
  .use(configHandler(backgroundSizeConfig, "backgroundSize"))
  .use(configHandler(backgroundImageConfig, "backgroundImage"))
  .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop\`-webkit-background-clip\`]))
  .case("blend", configHandler(blendModeConfig, "backgroundBlendMode"))
  .case("origin", configHandler(backgroundOriginConfig, "backgroundOrigin"))
  .case("opacity", configHandler(opacityConfig, prop\`--w-bg-opacity\`))
  .case("gradient", callHandler(buildLinearGradient, meld(
    configHandler(gradientDirectionConfig, buildGradientDirection),
    configHandler(gradientConfig, "backgroundImage"),
  )))
  .init();
  `;

  expect(analyzeUtilities(code)).toMatchSnapshot();
});

test("Analyze multi utilities", () => {
  const code = `
export const shadow = createUtility("shadow")
  .use(configHandler(boxShadowConfig, buildBoxShadowSize))
  .use(colorHandler(colors, buildBoxShadowColor))
  .case("opacity", configHandler(opacityConfig, prop\`--w-shadow-color-opacity\`))
  .init();

export const opacity = createUtility("opacity")
  .use(configHandler(opacityConfig, "opacity"))
  .init();

export const blend = createUtility("blend")
  .use(configHandler(blendModeConfig, "mixBlendMode"))
  .init();
  `;

  expect(analyzeUtilities(code)).toMatchSnapshot();
});
