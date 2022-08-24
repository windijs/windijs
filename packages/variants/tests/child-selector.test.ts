import { all, children, sibling, siblings, svg } from "../src/childSelector";
import { bundle, prop } from "@windijs/helpers";
import { colorHandler, configHandler, createUtility } from "@windijs/core";

import { backgroundClipConfig } from "@windijs/config";
import { windiColors } from "@windijs/colors";

const bg = createUtility("bg")
  .use(colorHandler(windiColors, "backgroundColor", "--w-bg-opacity"))
  .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop`-webkit-background-clip`]))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("svg", () => {
  expect(bundle(svg(...utilities))).toMatchSnapshot();
});

test("all", () => {
  expect(bundle(all(...utilities))).toMatchSnapshot();
});

test("children", () => {
  expect(bundle(children(...utilities))).toMatchSnapshot();
});

test("siblings", () => {
  expect(bundle(siblings(...utilities))).toMatchSnapshot();
});

test("sibling", () => {
  expect(bundle(sibling(...utilities))).toMatchSnapshot();
});
