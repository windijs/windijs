import { $dark, $lg, $light, $md, $sm, $xl, $xxl, _lg, _md, _sm, _xl, _xxl, backgroundClip, backgroundClipConfig, backgroundColor, colors, createUtility, dark, landscape, lg, light, ltr, md, motionReduce, motionSafe, portrait, rtl, sm, xl, xxl } from "../../src";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("mobile first screens", () => {
  expect(sm(...utilities).css).toMatchSnapshot("sm");
  expect(md(...utilities).css).toMatchSnapshot("md");
  expect(lg(...utilities).css).toMatchSnapshot("lg");
  expect(xl(...utilities).css).toMatchSnapshot("xl");
  expect(xxl(...utilities).css).toMatchSnapshot("xxl");
});

test("desktop first screens", () => {
  expect(_sm(...utilities).css).toMatchSnapshot("_sm");
  expect(_md(...utilities).css).toMatchSnapshot("_md");
  expect(_lg(...utilities).css).toMatchSnapshot("_lg");
  expect(_xl(...utilities).css).toMatchSnapshot("_xl");
  expect(_xxl(...utilities).css).toMatchSnapshot("_xxl");
});

test("only screens", () => {
  expect($sm(...utilities).css).toMatchSnapshot("$sm");
  expect($md(...utilities).css).toMatchSnapshot("$md");
  expect($lg(...utilities).css).toMatchSnapshot("$lg");
  expect($xl(...utilities).css).toMatchSnapshot("$xl");
  expect($xxl(...utilities).css).toMatchSnapshot("$xxl");
});

test("motions", () => {
  expect(motionSafe(...utilities).css).toMatchSnapshot("motionSafe");
  expect(motionReduce(...utilities).css).toMatchSnapshot("motionReduce");
});

test("themes", () => {
  expect(dark(...utilities).css).toMatchSnapshot("dark");
  expect(light(...utilities).css).toMatchSnapshot("light");
  expect($dark(...utilities).css).toMatchSnapshot("$dark");
  expect($light(...utilities).css).toMatchSnapshot("$light");
});

test("orientations", () => {
  expect(portrait(...utilities).css).toMatchSnapshot("portrait");
  expect(landscape(...utilities).css).toMatchSnapshot("landscape");
});

test("directions", () => {
  expect(ltr(...utilities).css).toMatchSnapshot("ltr");
  expect(rtl(...utilities).css).toMatchSnapshot("rtl");
});
