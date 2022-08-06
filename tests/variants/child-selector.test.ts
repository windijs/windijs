import { all, backgroundClipConfig, bundle, children, colorHandler, colors, configHandler, createUtility, prop, sibling, siblings, svg } from "index";

const bg = createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
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
