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

test("Background Generic", () => {
  const bg = createUtility()
    .use(backgroundGeneric())
    .init();
  expect(bg["rgb(22, 22, 22)"].css).toMatchSnapshot();
  expect(bg.red.css).toMatchSnapshot();
  expect(bg.aliceBlue.css).toMatchSnapshot();
  expect(bg[0xffffff].css).toMatchSnapshot();
});
