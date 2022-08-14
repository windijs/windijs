import { boxDecorationBreakConfig, fontFamilyConfig, fontSizeConfig, fontStyleConfig, fontVariantNumericConfig, fontWeightConfig, hyphensConfig, letterSpacingConfig, lineHeightConfig, opacityConfig, tabSizeConfig, textAlignConfig, textDecorationOffsetConfig, textDecorationStyleConfig, textDecorationThicknessConfig, textDecorationTypeConfig, textIndentConfig, textShadowConfig, textStrokeWidthConfig, textTransformConfig, verticalAlignConfig, whiteSpaceConfig, writingModeConfig, writingOrientationConfig } from "@windi/config";
import { buildWritingMode, colorHandler, configHandler, createUtility, cssHandler, fontFamilyHandler, fontSizeHandler, guard, meld, pxHandler } from "@windi/core";

import type { StyleObject } from "@windi/helpers";
import { colors } from "./colors";
import { prop } from "@windi/helpers";

export const font = createUtility("font")
  .case("normal", cssHandler({ fontStyle: "normal", fontWeight: fontWeightConfig.normal }))
  .case("antialiased", meld(
    cssHandler({
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    }),
    guard("auto", cssHandler({
      "-webkit-font-smoothing": "auto",
      "-moz-osx-font-smoothing": "auto",
    })),
  ))
  .use(fontFamilyHandler(fontFamilyConfig))
  .use(configHandler(fontStyleConfig, "fontStyle"))
  .use(configHandler(fontWeightConfig, "fontWeight"))
  .use(configHandler(fontVariantNumericConfig, "fontVariantNumeric"))
  .init();

export const text = createUtility("text")
  .use(fontSizeHandler(fontSizeConfig))
  .use(configHandler(textAlignConfig, "textAlign"))
  .use(configHandler(verticalAlignConfig, "verticalAlign"))
  .use(configHandler(textTransformConfig, "textTransform"))
  .use(colorHandler(colors, "color", "--w-text-opacity"))
  .case("opacity", configHandler(opacityConfig, prop`--w-text-opacity`))
  .case("shadow", configHandler(textShadowConfig, "textShadow"))
  .case("stroke", meld(
    configHandler(textStrokeWidthConfig, prop`-webkit-text-stroke-width`),
    colorHandler(colors, prop`-webkit-text-stroke-color`, "--w-text-stroke-opacity"),
    pxHandler<Record<0|1|2|3|4|5|6|7|8, StyleObject>>(prop`-webkit-text-stroke-width`),
    guard("opacity", configHandler(opacityConfig, prop`--w-text-stroke-opacity`)),
  ))
  .case("space", configHandler(whiteSpaceConfig, "whiteSpace"))
  .case("break", meld(
    guard("normal", cssHandler({ wordBreak: "normal", overflowWrap: "normal" })),
    guard("words", cssHandler({ overflowWrap: "break-word" })),
    guard("all", cssHandler({ wordBreak: "break-all" })),
  ))
  .init();

export const hyphens = createUtility("hyphens")
  .use(configHandler(hyphensConfig, [prop`-webkit-hyphens`, prop`-ms-hyphens`, "hyphens"]))
  .init();

export const tracking = createUtility("tracking")
  .use(configHandler(letterSpacingConfig, "letterSpacing"))
  .init();

export const leading = createUtility("leading")
  .use(configHandler(lineHeightConfig, "lineHeight"))
  .init();

export const tab = createUtility("tab")
  .use(configHandler(tabSizeConfig, [prop`-moz-tab-size`, prop`-o-tab-size`, "tabSize"]))
  .init();

export const decoration = createUtility("decoration")
  .use(configHandler(textDecorationTypeConfig, [prop`-webkit-text-decoration-line`, "textDecorationLine"]))
  .use(configHandler(textDecorationStyleConfig, [prop`-webkit-text-decoration-style`, "textDecorationStyle"]))
  .use(configHandler(textDecorationThicknessConfig, "textDecorationThickness"))
  .use(configHandler(boxDecorationBreakConfig, [prop`-webkit-box-decoration-break`, prop`box-decoration-break`]))
  .use(colorHandler(colors, [prop`-webkit-text-decoration-color`, "textDecorationColor"], "--w-text-decoration-opacity"))
  .case("opacity", configHandler(opacityConfig, prop`--w-text-decoration-opacity`))
  .case("offset", configHandler(textDecorationOffsetConfig, "textUnderlineOffset"))
  .init();

export const indent = createUtility("indent")
  .use(configHandler(textIndentConfig, "textIndent"))
  .init();

export const write = createUtility("write")
  .use(configHandler(writingModeConfig, buildWritingMode))
  .use(configHandler(writingOrientationConfig, [prop`-webkit-text-orientation`, "textOrientation"]))
  .init();
