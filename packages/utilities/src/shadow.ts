import { boxShadowConfig, opacityConfig } from "@windijs/config";
import { buildBoxShadowColor, buildBoxShadowSize, colorHandler, configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

import colors from "./colors";

export default createUtility("shadow")
  .use(configHandler(boxShadowConfig, buildBoxShadowSize))
  .use(colorHandler(colors, buildBoxShadowColor))
  .case("opacity", configHandler(opacityConfig, prop`--w-shadow-color-opacity`))
  .init();
