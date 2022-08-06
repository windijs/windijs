import { backgroundClipConfig, bundle, colorHandler, colors, configHandler, createUtility, media, prop, useMedia, useVariant, variant } from "index";

const bg = createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop`-webkit-background-clip`]))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("useVariant", () => {
  expect(bundle(useVariant("span", utilities))).toMatchSnapshot();
  expect(bundle(useVariant("&:hover", utilities))).toMatchSnapshot();
});

test("useMedia", () => {
  expect(bundle(useMedia("print", utilities))).toMatchSnapshot();
  expect(bundle(useMedia("(min-width: 1000px) and (max-width: 2000px)", utilities))).toMatchSnapshot();
});

test("variant", () => {
  expect(bundle(variant("span", bg.green[500], bg.clip.content))).toMatchSnapshot();
  expect(bundle(variant("&:hover", bg.green[500], bg.clip.content))).toMatchSnapshot();
});

test("media", () => {
  expect(bundle(media("print", bg.green[500], bg.clip.content))).toMatchSnapshot();
  expect(bundle(media("(min-width: 1000px) and (max-width: 2000px)", bg.green[500], bg.clip.content))).toMatchSnapshot();
});
