import { backgroundClip, backgroundClipConfig, backgroundColor, colors, createUtility, media, useMedia, useVariant, variant } from "../../src";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("useVariant", () => {
  expect(useVariant("span", utilities).css).toMatchSnapshot();
  expect(useVariant("&:hover", utilities).css).toMatchSnapshot();
});

test("useMedia", () => {
  expect(useMedia("print", utilities).css).toMatchSnapshot();
  expect(useMedia("(min-width: 1000px) and (max-width: 2000px)", utilities).css).toMatchSnapshot();
});

test("variant", () => {
  expect(variant("span", bg.green[500], bg.clip.content).css).toMatchSnapshot();
  expect(variant("&:hover", bg.green[500], bg.clip.content).css).toMatchSnapshot();
});

test("media", () => {
  expect(media("print", bg.green[500], bg.clip.content).css).toMatchSnapshot();
  expect(media("(min-width: 1000px) and (max-width: 2000px)", bg.green[500], bg.clip.content).css).toMatchSnapshot();
});
