import { configHandler, createUtility } from "@windijs/core";

import { prop } from "@windijs/helpers";
import { transitionTimingFunctionConfig } from "@windijs/config";

export default createUtility("ease")
  .use(configHandler(transitionTimingFunctionConfig, [prop`-webkit-transition-timing-function`, prop`-o-transition-timing-function`, "transitionTimingFunction"]))
  .init();
