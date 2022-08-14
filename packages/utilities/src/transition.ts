import { buildTransition, configHandler, createUtility } from "@windi/core";
import { css, prop } from "@windi/helpers";
import { transitionDelayConfig, transitionDurationConfig, transitionPropertyConfig, transitionTimingFunctionConfig } from "@windi/config";

export const transition = createUtility("transition").use(configHandler(transitionPropertyConfig, (v) => {
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

export const duration = createUtility("duration")
  .use(configHandler(transitionDurationConfig, [prop`-webkit-transition-duration`, prop`-o-transition-duration`, "transitionDuration"]))
  .init();

export const ease = createUtility("ease")
  .use(configHandler(transitionTimingFunctionConfig, [prop`-webkit-transition-timing-function`, prop`-o-transition-timing-function`, "transitionTimingFunction"]))
  .init();

export const delay = createUtility("delay")
  .use(configHandler(transitionDelayConfig, [prop`-webkit-transition-delay`, prop`-o-transition-delay`, "transitionDelay"]))
  .init();
