import { borderStyleConfig, borderWidthConfig, opacityConfig } from "@windijs/config";
import { colorHandler, configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

import colors from "./colors";

export default createUtility("border")
  .use(configHandler(borderStyleConfig, "borderStyle"))
  .use(configHandler(borderWidthConfig, "borderWidth"))
  .use(colorHandler(colors, "borderColor", "--w-border-opacity"))
  .case("opacity", configHandler(opacityConfig, prop`--w-border-opacity`))
  .init();
