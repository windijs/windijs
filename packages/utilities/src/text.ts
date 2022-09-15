import { fontSizeConfig, opacityConfig, textAlignConfig, textShadowConfig, textStrokeWidthConfig, textTransformConfig, verticalAlignConfig, whiteSpaceConfig } from "@windijs/config";
import { colorHandler, configHandler, createUtility, cssHandler, fontSizeHandler, guard, meld, pxHandler } from "@windijs/core";
import { prop, StyleObject } from "@windijs/helpers";

import colors from "./colors";

export default createUtility("text")
  .use(fontSizeHandler(fontSizeConfig))
  .use(configHandler(textAlignConfig, "textAlign"))
  .use(configHandler(verticalAlignConfig, "verticalAlign"))
  .use(configHandler(textTransformConfig, "textTransform"))
  .use(colorHandler(colors, "color", "--w-text-opacity"))
  .case("opacity", configHandler(opacityConfig, prop`--w-text-opacity`))
  .case("shadow", configHandler(textShadowConfig, "textShadow"))
  .case(
    "stroke",
    meld(
      configHandler(textStrokeWidthConfig, prop`-webkit-text-stroke-width`),
      colorHandler(colors, prop`-webkit-text-stroke-color`, "--w-text-stroke-opacity"),
      pxHandler<Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, StyleObject>>(prop`-webkit-text-stroke-width`),
      guard("opacity", configHandler(opacityConfig, prop`--w-text-stroke-opacity`))
    )
  )
  .case("space", configHandler(whiteSpaceConfig, "whiteSpace"))
  .case(
    "break",
    meld(guard("normal", cssHandler({ wordBreak: "normal", overflowWrap: "normal" })), guard("words", cssHandler({ overflowWrap: "break-word" })), guard("all", cssHandler({ wordBreak: "break-all" })))
  )
  .init();
