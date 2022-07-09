import { createUtility, backgroundColor, colors, backgroundClip, backgroundClipConfig, before, after, fileSelectorButton, firstLetter, firstLine, marker, selection } from "../../src";

const bg = createUtility()
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("before", () => {
  expect(before(...utilities)).toMatchSnapshot();
});

test("after", () => {
  expect(after(...utilities)).toMatchSnapshot();
});

test("fileSelectorButton", () => {
  expect(fileSelectorButton(...utilities)).toMatchSnapshot();
});

test("firstLetter", () => {
  expect(firstLetter(...utilities)).toMatchSnapshot();
});

test("firstLine", () => {
  expect(firstLine(...utilities)).toMatchSnapshot();
});

test("marker", () => {
  expect(marker(...utilities)).toMatchSnapshot();
});

test("selection", () => {
  expect(selection(...utilities)).toMatchSnapshot();
});
