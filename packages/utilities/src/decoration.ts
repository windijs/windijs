import { boxDecorationBreakConfig, opacityConfig, textDecorationOffsetConfig, textDecorationStyleConfig, textDecorationThicknessConfig, textDecorationTypeConfig } from "@windijs/config";
import { colorHandler, configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

import colors from "./colors";

export default createUtility("decoration")
  .use(configHandler(textDecorationTypeConfig, [prop`-webkit-text-decoration-line`, "textDecorationLine"]))
  .use(configHandler(textDecorationStyleConfig, [prop`-webkit-text-decoration-style`, "textDecorationStyle"]))
  .use(configHandler(textDecorationThicknessConfig, "textDecorationThickness"))
  .use(configHandler(boxDecorationBreakConfig, [prop`-webkit-box-decoration-break`, prop`box-decoration-break`]))
  .use(colorHandler(colors, [prop`-webkit-text-decoration-color`, "textDecorationColor"], "--w-text-decoration-opacity"))
  .case("opacity", configHandler(opacityConfig, prop`--w-text-decoration-opacity`))
  .case("offset", configHandler(textDecorationOffsetConfig, "textUnderlineOffset"))
  .init();
