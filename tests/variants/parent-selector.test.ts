import { backgroundClipConfig, backgroundColor, bundle, colors, configHandler, createUtility, groupActive, groupFocus, groupHover, groupVisited, prop } from "index";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop`-webkit-background-clip`]))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("groupHover", () => {
  expect(bundle(groupHover(...utilities))).toMatchSnapshot();
});

test("groupFocus", () => {
  expect(bundle(groupFocus(...utilities))).toMatchSnapshot();
});

test("groupActive", () => {
  expect(bundle(groupActive(...utilities))).toMatchSnapshot();
});

test("groupVisited", () => {
  expect(bundle(groupVisited(...utilities))).toMatchSnapshot();
});
