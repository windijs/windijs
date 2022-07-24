import { backgroundClip, backgroundClipConfig, backgroundColor, colors, createUtility, groupActive, groupFocus, groupHover, groupVisited } from "../../src";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("groupHover", () => {
  expect(groupHover(...utilities).css).toMatchSnapshot();
});

test("groupFocus", () => {
  expect(groupFocus(...utilities).css).toMatchSnapshot();
});

test("groupActive", () => {
  expect(groupActive(...utilities).css).toMatchSnapshot();
});

test("groupVisited", () => {
  expect(groupVisited(...utilities).css).toMatchSnapshot();
});
