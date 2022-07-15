import { createUtility, backgroundColor, colors, backgroundClip, backgroundClipConfig, groupHover, groupFocus, groupActive, groupVisited } from "../../src";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("groupHover", () => {
  expect(groupHover(...utilities)).toMatchSnapshot();
});

test("groupFocus", () => {
  expect(groupFocus(...utilities)).toMatchSnapshot();
});

test("groupActive", () => {
  expect(groupActive(...utilities)).toMatchSnapshot();
});

test("groupVisited", () => {
  expect(groupVisited(...utilities)).toMatchSnapshot();
});
