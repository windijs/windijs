import { buildPlaceholder, colorHandler, configHandler, createUtility } from "@windijs/core";

import colors from "./colors";
import { opacityConfig } from "@windijs/config";
import { prop } from "@windijs/helpers";

export default createUtility("placeholder")
  .use(colorHandler(colors, buildPlaceholder))
  .case("opacity", configHandler(opacityConfig, prop`--w-placeholder-opacity`))
  .init();
