import { configHandler, createUtility } from "@windijs/core";

import { prop } from "@windijs/helpers";
import { spacingConfig } from "@windijs/config";

export default createUtility("gap")
  .use(configHandler(spacingConfig, ["gridGap", "gap"]))
  .case("x", configHandler(spacingConfig, [prop`-webkit-column-gap`, prop`-moz-column-gap`, "gridColumnGap", "columnGap"]))
  .case("y", configHandler(spacingConfig, [prop`-webkit-row-gap`, prop`-moz-row-gap`, "gridRowGap", "rowGap"]))
  .init();
