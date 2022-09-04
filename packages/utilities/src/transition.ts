import { buildTransition, configHandler, createUtility } from "@windijs/core";
import { transitionDurationConfig, transitionPropertyConfig, transitionTimingFunctionConfig } from "@windijs/config";

import { css } from "@windijs/helpers";

export default createUtility("transition").use(configHandler(transitionPropertyConfig, (v) => {
  const timef = transitionTimingFunctionConfig.DEFAULT;
  const dur = transitionDurationConfig.DEFAULT;
  if (v === "none") return css({ transitionProperty: "none" });
  if (typeof v === "string") {
    return css({
      transitionProperty: v,
      "-webkit-transition-timing-function": timef,
      "-o-transition-timing-function": timef,
      transitionTimingFunction: timef,
      "-webkit-transition-duration": dur,
      "-o-transition-duration": dur,
      transitionDuration: dur,
    });
  };
}))
  .init(buildTransition);
