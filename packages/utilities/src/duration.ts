import { transitionDurationConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

export default createUtility("duration")
  .use(configHandler(transitionDurationConfig, [prop`-webkit-transition-duration`, prop`-o-transition-duration`, "transitionDuration"]))
  .init();
