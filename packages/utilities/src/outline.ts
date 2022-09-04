import { borderStyleConfig, borderWidthConfig, opacityConfig, outlineOffsetConfig } from "@windijs/config";
import { colorHandler, configHandler, createUtility } from "@windijs/core";

import colors from "./colors";
import { prop } from "@windijs/helpers";

export default createUtility("outline")
  .case("offset", configHandler(outlineOffsetConfig, "outlineOffset"))
  .case("opacity", configHandler(opacityConfig, prop`--w-outline-opacity`))

  .use(configHandler(borderWidthConfig, "outlineWidth"))
  .use(configHandler(borderStyleConfig, "outlineStyle"))
  .use(colorHandler(colors, "outlineColor", "--w-outline-opacity"))
  .init();
