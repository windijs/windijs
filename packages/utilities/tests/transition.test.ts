import { createUtility, msHandler } from "@windijs/core";
import { delay, duration, ease, transition } from "../src";

import type { StyleObject } from "@windijs/helpers";
import { prop } from "@windijs/helpers";
import { transitionPropertyConfig as property } from "@windijs/config";

test("Transition", () => {
  expect(transition.css).toMatchSnapshot();
  expect(transition.all.css).toMatchSnapshot();
  expect(transition.none.css).toMatchSnapshot();
  expect(transition.shadow.css).toMatchSnapshot();
});

test("Transition As Function", () => {
  expect(transition(property.all, duration[150], ease.linear, delay[100]).css).toMatchSnapshot();
});

test("Transition Duration", () => {
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
  expect(ease.linear.css).toMatchSnapshot();
  expect(ease.in.css).toMatchSnapshot();
  expect(ease.inOut.css).toMatchSnapshot();
});

test("Transition Delay", () => {
  expect(delay[75].css).toMatchSnapshot();
  expect(delay[200].css).toMatchSnapshot();
});

test("Transition Delay without config", () => {
  const delay = createUtility("delay").use(msHandler<Record<0 | 50 | 75 | 100 | 150 | 200, StyleObject> & Record<string | number, StyleObject>>([prop`-webkit-transition-delay`, prop`-o-transition-delay`, "transitionDelay"])).init();

  expect(delay[50].css).toMatchSnapshot();
  expect(delay[350].css).toMatchSnapshot();
  expect(delay[456].css).toMatchSnapshot();
});
