import { transitionDelayConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

export default createUtility("delay")
  .use(configHandler(transitionDelayConfig, [prop`-webkit-transition-delay`, prop`-o-transition-delay`, "transitionDelay"]))
  .init();
