import { createUtility, backgroundAttachment, backgroundAttachmentConfig, backgroundColor, backgroundGeneric, backgroundClip, backgroundClipConfig, colors, styleProperty, px, rem, calc, hover, focus, notChecked, evenOfType, dark, sm, internalGet } from "../../src";

test("Background Color", () => {
  const bg = createUtility()
    .use(backgroundColor(colors))
    .init();

  expect(bg.current.css).toMatchSnapshot();
  expect(bg.white.css).toMatchSnapshot();
  expect(bg.blue[700].css).toMatchSnapshot();
  expect(bg.red[500].css).toMatchSnapshot();
});

test("Background Color With Opacity", () => {
  const bg = createUtility()
    .use(backgroundColor(colors))
    .init();
  expect(bg.black.opacity(50)).toMatchSnapshot();
  expect(bg.amber[100].opacity(50)).toMatchSnapshot();
});

test("Background Color With Different Opacity Name", () => {
  const bg = createUtility()
    .use(backgroundColor(colors, true, "--my-opacity"))
    .init();
  expect(bg.black.opacity(50)).toMatchSnapshot();
  expect(bg.amber[100].opacity(50)).toMatchSnapshot();
});

test("Background Color Without Opacity", () => {
  const bg = createUtility()
    .use(backgroundColor(colors, false))
    .init();
  expect(bg.black).toMatchSnapshot();
  expect(bg.amber[100]).toMatchSnapshot();
});

test("Background Attachment", () => {
  const bg = createUtility()
    .use(backgroundAttachment(backgroundAttachmentConfig))
    .init();

  expect(bg.fixed.css).toMatchSnapshot();
  expect(bg.local.css).toMatchSnapshot();
  expect(bg.scroll.css).toMatchSnapshot();
});

test("Background Clip", () => {
  const bg = createUtility()
    .use(backgroundClip(backgroundClipConfig))
    .init();
  expect(bg.clip.border.css).toMatchSnapshot();
  expect(bg.clip.padding.css).toMatchSnapshot();
  expect(bg.clip.content.css).toMatchSnapshot();
  expect(bg.clip.text.css).toMatchSnapshot();
});

test("Background Clip With Different Key", () => {
  const bg = createUtility()
    .use(backgroundClip(backgroundClipConfig, "clipped"))
    .init();
  expect(bg.clipped.border.css).toMatchSnapshot();
  expect(bg.clipped.padding.css).toMatchSnapshot();
  expect(bg.clipped.content.css).toMatchSnapshot();
  expect(bg.clipped.text.css).toMatchSnapshot();
});

test("Background Generic", () => {
  const bg = createUtility()
    .use(backgroundGeneric())
    .init();
  expect(bg["rgb(22, 22, 22)"].css).toMatchSnapshot();
  expect(bg.red.css).toMatchSnapshot();
  expect(bg.aliceBlue.css).toMatchSnapshot();
  expect(bg[0xffffff].css).toMatchSnapshot();
});
