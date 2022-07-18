import { createUtility, backgroundColor, colors, backgroundClip, backgroundClipConfig, svg, all, children, siblings, sibling } from "../../src";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("svg", () => {
  expect(svg(...utilities).css).toMatchSnapshot();
});

test("all", () => {
  expect(all(...utilities).css).toMatchSnapshot();
});

test("children", () => {
  expect(children(...utilities).css).toMatchSnapshot();
});

test("siblings", () => {
  expect(siblings(...utilities).css).toMatchSnapshot();
});

test("sibling", () => {
  expect(sibling(...utilities).css).toMatchSnapshot();
});
