import { opacityConfig } from "@windijs/config";
import { buildPlaceholder, colorHandler, configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

import colors from "./colors";

export default createUtility("placeholder")
  .use(colorHandler(colors, buildPlaceholder))
  .case("opacity", configHandler(opacityConfig, prop`--w-placeholder-opacity`))
  .init();
