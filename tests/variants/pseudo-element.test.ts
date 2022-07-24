import { after, backdrop, backgroundClip, backgroundClipConfig, backgroundColor, before, colors, createUtility, firstLetter, firstLine, marker, selection } from "../../src";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("after", () => {
  expect(after(...utilities).css).toMatchSnapshot();
});

test("backdrop", () => {
  expect(backdrop(...utilities).css).toMatchSnapshot();
});

test("before", () => {
  expect(before(...utilities).css).toMatchSnapshot();
});

test("firstLetter", () => {
  expect(firstLetter(...utilities).css).toMatchSnapshot();
});

test("firstLine", () => {
  expect(firstLine(...utilities).css).toMatchSnapshot();
});

test("marker", () => {
  expect(marker(...utilities).css).toMatchSnapshot();
});

test("selection", () => {
  expect(selection(...utilities).css).toMatchSnapshot();
});
