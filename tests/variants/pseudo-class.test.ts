import { createUtility, backgroundColor, colors, backgroundClip, backgroundClipConfig, first, last, odd, even, visited, checked, focusWithin, hover, focus, focusVisible, active, link, target, notChecked, enabled, indeterminate, invalid, valid, optional, required, placeholderShown, readOnly, readWrite, notDisabled, firstOfType, notFirstOfType, lastOfType, notLastOfType, notFirst, notLast, onlyChild, notOnlyChild, onlyOfType, notOnlyOfType, root, empty, evenOfType, oddOfType, $default } from "../../src";

const bg = createUtility()
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

test("first", () => {
  expect(first(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("last", () => {
  expect(last(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("odd", () => {
  expect(odd(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("even", () => {
  expect(even(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("visited", () => {
  expect(visited(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("checked", () => {
  expect(checked(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("focusWithin", () => {
  expect(focusWithin(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("hover", () => {
  expect(hover(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("focus", () => {
  expect(focus(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("focusVisible", () => {
  expect(focusVisible(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("active", () => {
  expect(active(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("link", () => {
  expect(link(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("target", () => {
  expect(target(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("notChecked", () => {
  expect(notChecked(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("enabled", () => {
  expect(enabled(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("indeterminate", () => {
  expect(indeterminate(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("invalid", () => {
  expect(invalid(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("valid", () => {
  expect(valid(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("optional", () => {
  expect(optional(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("required", () => {
  expect(required(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("placeholderShown", () => {
  expect(placeholderShown(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("readOnly", () => {
  expect(readOnly(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("readWrite", () => {
  expect(readWrite(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("notDisabled", () => {
  expect(notDisabled(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("firstOfType", () => {
  expect(firstOfType(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("notFirstOfType", () => {
  expect(notFirstOfType(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("lastOfType", () => {
  expect(lastOfType(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("notLastOfType", () => {
  expect(notLastOfType(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("notFirst", () => {
  expect(notFirst(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("notLast", () => {
  expect(notLast(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("onlyChild", () => {
  expect(onlyChild(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("notOnlyChild", () => {
  expect(notOnlyChild(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("onlyOfType", () => {
  expect(onlyOfType(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("notOnlyOfType", () => {
  expect(notOnlyOfType(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("root", () => {
  expect(root(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("empty", () => {
  expect(empty(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("evenOfType", () => {
  expect(evenOfType(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("oddOfType", () => {
  expect(oddOfType(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});

test("default", () => {
  expect($default(bg.blue[500], bg.clip.content)).toMatchSnapshot();
});
