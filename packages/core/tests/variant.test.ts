import { media, useMedia, useVariant, variant } from "../src";

import { bg } from "@windijs/utilities";
import { bundle } from "@windijs/helpers";

const utilities = [bg.blue[500], bg.clip.content];

test("useVariant", () => {
  expect(bundle(useVariant("span", utilities))).toMatchSnapshot();
  expect(bundle(useVariant("&:hover", utilities))).toMatchSnapshot();
});

test("useMedia", () => {
  expect(bundle(useMedia("print", utilities))).toMatchSnapshot();
  expect(bundle(useMedia("(min-width: 1000px) and (max-width: 2000px)", utilities))).toMatchSnapshot();
});

test("variant", () => {
  expect(bundle(variant("span", bg.green[500], bg.clip.content))).toMatchSnapshot();
  expect(bundle(variant("&:hover", bg.green[500], bg.clip.content))).toMatchSnapshot();
});

test("media", () => {
  expect(bundle(media("print", bg.green[500], bg.clip.content))).toMatchSnapshot();
  expect(bundle(media("(min-width: 1000px) and (max-width: 2000px)", bg.green[500], bg.clip.content))).toMatchSnapshot();
});
