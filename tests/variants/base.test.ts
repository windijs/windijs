import { createUtility, backgroundColor, colors, backgroundClip, backgroundClipConfig, useVariant, useMedia, variant, media } from "../../src";

const bg = createUtility()
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("useVariant", () => {
  expect(useVariant("span", utilities)).toMatchSnapshot();
  expect(useVariant("&:hover", utilities)).toMatchSnapshot();
});

test("useMedia", () => {
  expect(useMedia("print", utilities)).toMatchSnapshot();
  expect(useMedia("(min-width: 1000px) and (max-width: 2000px)", utilities)).toMatchSnapshot();
});

test("variant", () => {
  expect(variant("span", bg.green[500], bg.clip.content)).toMatchSnapshot();
  expect(variant("&:hover", bg.green[500], bg.clip.content)).toMatchSnapshot();
});

test("media", () => {
  expect(media("print", bg.green[500], bg.clip.content)).toMatchSnapshot();
  expect(media("(min-width: 1000px) and (max-width: 2000px)", bg.green[500], bg.clip.content)).toMatchSnapshot();
});