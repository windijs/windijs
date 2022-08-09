import { $dark, $lg, $light, $md, $sm, $xl, $xxl, _lg, _md, _sm, _xl, _xxl, backgroundClipConfig, bundle, colorHandler, configHandler, createUtility, dark, landscape, lg, light, ltr, md, motionReduce, motionSafe, portrait, prop, rtl, sm, windiColors, xl, xxl } from "index";

const bg = createUtility("bg")
  .use(colorHandler(windiColors, "backgroundColor", "--w-bg-opacity"))
  .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop`-webkit-background-clip`]))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("mobile first screens", () => {
  expect(bundle(sm(...utilities))).toMatchSnapshot("sm");
  expect(bundle(md(...utilities))).toMatchSnapshot("md");
  expect(bundle(lg(...utilities))).toMatchSnapshot("lg");
  expect(bundle(xl(...utilities))).toMatchSnapshot("xl");
  expect(bundle(xxl(...utilities))).toMatchSnapshot("xxl");
});

test("desktop first screens", () => {
  expect(bundle(_sm(...utilities))).toMatchSnapshot("_sm");
  expect(bundle(_md(...utilities))).toMatchSnapshot("_md");
  expect(bundle(_lg(...utilities))).toMatchSnapshot("_lg");
  expect(bundle(_xl(...utilities))).toMatchSnapshot("_xl");
  expect(bundle(_xxl(...utilities))).toMatchSnapshot("_xxl");
});

test("only screens", () => {
  expect(bundle($sm(...utilities))).toMatchSnapshot("$sm");
  expect(bundle($md(...utilities))).toMatchSnapshot("$md");
  expect(bundle($lg(...utilities))).toMatchSnapshot("$lg");
  expect(bundle($xl(...utilities))).toMatchSnapshot("$xl");
  expect(bundle($xxl(...utilities))).toMatchSnapshot("$xxl");
});

test("motions", () => {
  expect(bundle(motionSafe(...utilities))).toMatchSnapshot("motionSafe");
  expect(bundle(motionReduce(...utilities))).toMatchSnapshot("motionReduce");
});

test("themes", () => {
  expect(bundle(dark(...utilities))).toMatchSnapshot("dark");
  expect(bundle(light(...utilities))).toMatchSnapshot("light");
  expect(bundle($dark(...utilities))).toMatchSnapshot("$dark");
  expect(bundle($light(...utilities))).toMatchSnapshot("$light");
});

test("orientations", () => {
  expect(bundle(portrait(...utilities))).toMatchSnapshot("portrait");
  expect(bundle(landscape(...utilities))).toMatchSnapshot("landscape");
});

test("directions", () => {
  expect(bundle(ltr(...utilities))).toMatchSnapshot("ltr");
  expect(bundle(rtl(...utilities))).toMatchSnapshot("rtl");
});
