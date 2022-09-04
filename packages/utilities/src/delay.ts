import { configHandler, createUtility } from "@windijs/core";

import { prop } from "@windijs/helpers";
import { transitionDelayConfig } from "@windijs/config";

export default createUtility("delay")
  .use(configHandler(transitionDelayConfig, [prop`-webkit-transition-delay`, prop`-o-transition-delay`, "transitionDelay"]))
  .init();
