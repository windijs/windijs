import { transitionTimingFunctionConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

export default createUtility("ease")
  .use(configHandler(transitionTimingFunctionConfig, [prop`-webkit-transition-timing-function`, prop`-o-transition-timing-function`, "transitionTimingFunction"]))
  .init();
