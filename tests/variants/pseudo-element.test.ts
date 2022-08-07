import { after, backgroundClipConfig, before, bundle, colorHandler, colors, configHandler, createUtility, firstLetter, firstLine, marker, prop, selection } from "index";

const bg = createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop`-webkit-background-clip`]))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("after", () => {
  expect(bundle(after(...utilities))).toMatchSnapshot();
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
