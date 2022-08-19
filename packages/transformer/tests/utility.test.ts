import { useTransformer, utilityTransformer } from "../src";

test("Transform configHandler", () => {
  const code = `
export const rounded = createUtility("rounded")
  .use(configHandler(borderRadiusConfig, "borderRadius"))
  .init();
  `;

  expect(useTransformer(code, utilityTransformer)).toMatchSnapshot();
});

test("Transform colorHandler", () => {
  const code = `
export const bg = createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .init();
  `;
  expect(useTransformer(code, utilityTransformer)).toMatchSnapshot();
});

test("Transform with cases", () => {
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
  expect(useTransformer(code, utilityTransformer)).toMatchSnapshot();
});
