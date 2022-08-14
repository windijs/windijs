import { buildTransition, configHandler, createUtility, msHandler } from "utilities";
import { css, prop } from "helpers";
import { transitionDelayConfig, transitionDurationConfig, transitionPropertyConfig, transitionTimingFunctionConfig } from "config";

import type { StyleObject } from "types";

test("Transition", () => {
  const transition = createUtility("transition").use(configHandler(transitionPropertyConfig, (v) => {
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

  expect(transition.css).toMatchSnapshot();
  expect(transition.all.css).toMatchSnapshot();
  expect(transition.none.css).toMatchSnapshot();
  expect(transition.shadow.css).toMatchSnapshot();
});

test("Transition As Function", () => {
  const transition = createUtility("transition").init(buildTransition);
  const property = transitionPropertyConfig;
  const duration = createUtility("duration").use(configHandler(transitionDurationConfig, [prop`-webkit-transition-duration`, prop`-o-transition-duration`, "transitionDuration"])).init();
  const ease = createUtility("ease").use(configHandler(transitionTimingFunctionConfig, [prop`-webkit-transition-timing-function`, prop`-o-transition-timing-function`, "transitionTimingFunction"])).init();
  const delay = createUtility("delay").use(configHandler(transitionDelayConfig, [prop`-webkit-transition-delay`, prop`-o-transition-delay`, "transitionDelay"])).init();
  expect(transition(property.all, duration[150], ease.linear, delay[100]).css).toMatchSnapshot();
});

test("Transition Duration", () => {
  const duration = createUtility("duration").use(configHandler(transitionDurationConfig, [prop`-webkit-transition-duration`, prop`-o-transition-duration`, "transitionDuration"])).init();
  expect(duration[75].css).toMatchSnapshot();
  expect(duration[200].css).toMatchSnapshot();
});

test("Transition Duration without config", () => {
  const duration = createUtility("duration").use(msHandler<Record<0 | 50 | 75 | 100 | 150 | 200, StyleObject> & Record<string | number, StyleObject>>([prop`-webkit-transition-duration`, prop`-o-transition-duration`, "transitionDuration"])).init();

  expect(duration[50].css).toMatchSnapshot();
  expect(duration[350].css).toMatchSnapshot();
  expect(duration[456].css).toMatchSnapshot();
});

test("Transition Timing Function", () => {
  const ease = createUtility("ease").use(configHandler(transitionTimingFunctionConfig, [prop`-webkit-transition-timing-function`, prop`-o-transition-timing-function`, "transitionTimingFunction"])).init();

  expect(ease.linear.css).toMatchSnapshot();
  expect(ease.in.css).toMatchSnapshot();
  expect(ease.inOut.css).toMatchSnapshot();
});

test("Transition Delay", () => {
  const delay = createUtility("delay").use(configHandler(transitionDelayConfig, [prop`-webkit-transition-delay`, prop`-o-transition-delay`, "transitionDelay"])).init();
  expect(delay[75].css).toMatchSnapshot();
  expect(delay[200].css).toMatchSnapshot();
});

test("Transition Delay without config", () => {
  const delay = createUtility("delay").use(msHandler<Record<0 | 50 | 75 | 100 | 150 | 200, StyleObject> & Record<string | number, StyleObject>>([prop`-webkit-transition-delay`, prop`-o-transition-delay`, "transitionDelay"])).init();

  expect(delay[50].css).toMatchSnapshot();
  expect(delay[350].css).toMatchSnapshot();
  expect(delay[456].css).toMatchSnapshot();
});
