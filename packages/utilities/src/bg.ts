import { backgroundAttachmentConfig, backgroundClipConfig, backgroundImageConfig, backgroundOriginConfig, backgroundPositionConfig, backgroundRepeatConfig, backgroundSizeConfig, blendModeConfig, gradientConfig, gradientDirectionConfig, opacityConfig } from "@windijs/config";
import { buildGradientDirection, buildLinearGradient, callHandler, colorHandler, configHandler, createUtility, meld } from "@windijs/core";

import colors from "./colors";
import { prop } from "@windijs/helpers";

export default createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .use(configHandler(backgroundAttachmentConfig, "backgroundAttachment"))
  .use(configHandler(backgroundPositionConfig, "backgroundPosition"))
  .use(configHandler(backgroundRepeatConfig, "backgroundRepeat"))
  .use(configHandler(backgroundSizeConfig, "backgroundSize"))
  .use(configHandler(backgroundImageConfig, "backgroundImage"))
  .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop`-webkit-background-clip`]))
  .case("blend", configHandler(blendModeConfig, "backgroundBlendMode"))
  .case("origin", configHandler(backgroundOriginConfig, "backgroundOrigin"))
  .case("opacity", configHandler(opacityConfig, prop`--w-bg-opacity`))
  .case("gradient", callHandler(buildLinearGradient, meld(
    configHandler(gradientDirectionConfig, buildGradientDirection),
    configHandler(gradientConfig, "backgroundImage"),
  )))
  .init();
