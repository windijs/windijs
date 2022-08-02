import { after, backdrop, backgroundClip, backgroundClipConfig, backgroundColor, before, bundle, colors, createUtility, firstLetter, firstLine, marker, selection } from "index";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("after", () => {
  expect(bundle(after(...utilities))).toMatchSnapshot();
});

test("backdrop", () => {
  expect(bundle(backdrop(...utilities))).toMatchSnapshot();
});

test("before", () => {
  expect(bundle(before(...utilities))).toMatchSnapshot();
});

test("firstLetter", () => {
  expect(bundle(firstLetter(...utilities))).toMatchSnapshot();
});

test("firstLine", () => {
  expect(bundle(firstLine(...utilities))).toMatchSnapshot();
});

test("marker", () => {
  expect(bundle(marker(...utilities))).toMatchSnapshot();
});

test("selection", () => {
  expect(bundle(selection(...utilities))).toMatchSnapshot();
});
