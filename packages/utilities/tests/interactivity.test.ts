import { createUtility, stylePropertyHandler } from "@windi/core";

import { css } from "@windi/helpers";
import { touchActionConfig } from "@windi/config";

const style = createUtility("style").use(stylePropertyHandler({
  touchAction: touchActionConfig,
  willChange: { scroll: "scroll-position", transform: "transform" },
  resize: { DEFAULT: "both", y: "vertical", x: "horizontal" },
  appearance: { none: css({ "-webkit-appearance": "none", "-moz-appearance": "none", appearance: "none" }) },
})).init();

test("Accent Color", () => {
  const accent = style.accentColor;

  expect(accent.aliceblue.css).toMatchSnapshot();
  expect(accent.rgb(22, 22, 22).css).toMatchSnapshot();
});

test("Appearance", () => {
  const appearance = style.appearance;

  expect(appearance.none.meta).toMatchSnapshot();
  expect(appearance.none.css).toMatchSnapshot();
});

test("Cursor", () => {
  const cursor = style.cursor;

  expect(cursor.auto.css).toMatchSnapshot();
  expect(cursor.default.css).toMatchSnapshot();
  expect(cursor.pointer.css).toMatchSnapshot();
  expect(cursor.wait.css).toMatchSnapshot();
  expect(cursor.text.css).toMatchSnapshot();
  expect(cursor.move.css).toMatchSnapshot();
  expect(cursor.help.css).toMatchSnapshot();
  expect(cursor["not-allowed"].css).toMatchSnapshot();
});

test("Caret Color", () => {
  const caret = style.caretColor;

  expect(caret.aliceblue.css).toMatchSnapshot();
  expect(caret.rgb(22, 22, 22).css).toMatchSnapshot();

  // TODO: caret opacity??
});

test("Pointer Events", () => {
  const pointer = style.pointerEvents;

  expect(pointer.auto.css).toMatchSnapshot();
  expect(pointer.none.css).toMatchSnapshot();
});

test("Resize", () => {
  const resize = style.resize;
  expect(resize.css).toEqual(resize.both.css);
  expect(resize.x.css).toEqual(resize.horizontal.css);
  expect(resize.y.css).toEqual(resize.vertical.css);
  expect(resize.none.css).toMatchSnapshot();
});

test("Scroll Behavior", () => {
  const scroll = style.scrollBehavior;
  expect(scroll.auto.css).toMatchSnapshot();
  expect(scroll.smooth.css).toMatchSnapshot();
});

test("Touch Action", () => {
  const touch = style.touchAction;
  expect(touch.auto.css).toMatchSnapshot();
  expect(touch.none.css).toMatchSnapshot();
  expect(touch.pan.x.css).toMatchSnapshot();
  expect(touch.pan.left.css).toMatchSnapshot();
  expect(touch.pan.right.css).toMatchSnapshot();
  expect(touch.pan.y.css).toMatchSnapshot();
  expect(touch.pan.up.css).toMatchSnapshot();
  expect(touch.pan.down.css).toMatchSnapshot();
  expect(touch["pinch-zoom"].css).toMatchSnapshot();
  expect(touch.manipulation.css).toMatchSnapshot();
});

test("User Select", () => {
  const select = style.userSelect;
  expect(select.none.css).toMatchSnapshot();
  expect(select.text.css).toMatchSnapshot();
  expect(select.all.css).toMatchSnapshot();
  expect(select.auto.css).toMatchSnapshot();
});

test("Will Change", () => {
  const willChange = style.willChange;

  expect(willChange.auto.css).toMatchSnapshot();
  expect(willChange.scroll.css).toMatchSnapshot();
  expect(willChange.contents.css).toMatchSnapshot();
  expect(willChange.transform.css).toMatchSnapshot();
});
