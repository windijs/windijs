import { createUtility, backgroundColor, colors, backgroundClip, backgroundClipConfig, sm, md, lg, xl, xxl, _sm, _md, _lg, _xl, _xxl, $sm, $md, $lg, $xl, $xxl, motionSafe, motionReduce, dark, light, $dark, $light, portrait, landscape, ltr, rtl } from "../../src";

const bg = createUtility()
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("mobile first screens", () => {
  expect(sm(...utilities)).toMatchSnapshot("sm");
  expect(md(...utilities)).toMatchSnapshot("md");
  expect(lg(...utilities)).toMatchSnapshot("lg");
  expect(xl(...utilities)).toMatchSnapshot("xl");
  expect(xxl(...utilities)).toMatchSnapshot("xxl");
});

test("desktop first screens", () => {
  expect(_sm(...utilities)).toMatchSnapshot("_sm");
  expect(_md(...utilities)).toMatchSnapshot("_md");
  expect(_lg(...utilities)).toMatchSnapshot("_lg");
  expect(_xl(...utilities)).toMatchSnapshot("_xl");
  expect(_xxl(...utilities)).toMatchSnapshot("_xxl");
});

test("only screens", () => {
  expect($sm(...utilities)).toMatchSnapshot("$sm");
  expect($md(...utilities)).toMatchSnapshot("$md");
  expect($lg(...utilities)).toMatchSnapshot("$lg");
  expect($xl(...utilities)).toMatchSnapshot("$xl");
  expect($xxl(...utilities)).toMatchSnapshot("$xxl");
});

test("motions", () => {
  expect(motionSafe(...utilities)).toMatchSnapshot("motionSafe");
  expect(motionReduce(...utilities)).toMatchSnapshot("motionReduce");
});

test("themes", () => {
  expect(dark(...utilities)).toMatchSnapshot("dark");
  expect(light(...utilities)).toMatchSnapshot("light");
  expect($dark(...utilities)).toMatchSnapshot("$dark");
  expect($light(...utilities)).toMatchSnapshot("$light");
});

test("orientations", () => {
  expect(portrait(...utilities)).toMatchSnapshot("portrait");
  expect(landscape(...utilities)).toMatchSnapshot("landscape");
});

test("directions", () => {
  expect(ltr(...utilities)).toMatchSnapshot("ltr");
  expect(rtl(...utilities)).toMatchSnapshot("rtl");
});
