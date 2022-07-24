import { $default, active, backgroundClip, backgroundClipConfig, backgroundColor, checked, colors, createUtility, empty, enabled, even, evenOfType, first, firstOfType, focus, focusVisible, focusWithin, hover, indeterminate, invalid, last, lastOfType, link, notChecked, notDisabled, notFirst, notFirstOfType, notLast, notLastOfType, notOnlyChild, notOnlyOfType, odd, oddOfType, onlyChild, onlyOfType, optional, placeholderShown, readOnly, readWrite, required, root, target, valid, visited } from "../../src";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("first", () => {
  expect(first(...utilities).css).toMatchSnapshot();
});

test("last", () => {
  expect(last(...utilities).css).toMatchSnapshot();
});

test("odd", () => {
  expect(odd(...utilities).css).toMatchSnapshot();
});

test("even", () => {
  expect(even(...utilities).css).toMatchSnapshot();
});

test("visited", () => {
  expect(visited(...utilities).css).toMatchSnapshot();
});

test("checked", () => {
  expect(checked(...utilities).css).toMatchSnapshot();
});

test("focusWithin", () => {
  expect(focusWithin(...utilities).css).toMatchSnapshot();
});

test("hover", () => {
  expect(hover(...utilities).css).toMatchSnapshot();
});

test("focus", () => {
  expect(focus(...utilities).css).toMatchSnapshot();
});

test("focusVisible", () => {
  expect(focusVisible(...utilities).css).toMatchSnapshot();
});

test("active", () => {
  expect(active(...utilities).css).toMatchSnapshot();
});

test("link", () => {
  expect(link(...utilities).css).toMatchSnapshot();
});

test("target", () => {
  expect(target(...utilities).css).toMatchSnapshot();
});

test("notChecked", () => {
  expect(notChecked(...utilities).css).toMatchSnapshot();
});

test("enabled", () => {
  expect(enabled(...utilities).css).toMatchSnapshot();
});

test("indeterminate", () => {
  expect(indeterminate(...utilities).css).toMatchSnapshot();
});

test("invalid", () => {
  expect(invalid(...utilities).css).toMatchSnapshot();
});

test("valid", () => {
  expect(valid(...utilities).css).toMatchSnapshot();
});

test("optional", () => {
  expect(optional(...utilities).css).toMatchSnapshot();
});

test("required", () => {
  expect(required(...utilities).css).toMatchSnapshot();
});

test("placeholderShown", () => {
  expect(placeholderShown(...utilities).css).toMatchSnapshot();
});

test("readOnly", () => {
  expect(readOnly(...utilities).css).toMatchSnapshot();
});

test("readWrite", () => {
  expect(readWrite(...utilities).css).toMatchSnapshot();
});

test("notDisabled", () => {
  expect(notDisabled(...utilities).css).toMatchSnapshot();
});

test("firstOfType", () => {
  expect(firstOfType(...utilities).css).toMatchSnapshot();
});

test("notFirstOfType", () => {
  expect(notFirstOfType(...utilities).css).toMatchSnapshot();
});

test("lastOfType", () => {
  expect(lastOfType(...utilities).css).toMatchSnapshot();
});

test("notLastOfType", () => {
  expect(notLastOfType(...utilities).css).toMatchSnapshot();
});

test("notFirst", () => {
  expect(notFirst(...utilities).css).toMatchSnapshot();
});

test("notLast", () => {
  expect(notLast(...utilities).css).toMatchSnapshot();
});

test("onlyChild", () => {
  expect(onlyChild(...utilities).css).toMatchSnapshot();
});

test("notOnlyChild", () => {
  expect(notOnlyChild(...utilities).css).toMatchSnapshot();
});

test("onlyOfType", () => {
  expect(onlyOfType(...utilities).css).toMatchSnapshot();
});

test("notOnlyOfType", () => {
  expect(notOnlyOfType(...utilities).css).toMatchSnapshot();
});

test("root", () => {
  expect(root(...utilities).css).toMatchSnapshot();
});

test("empty", () => {
  expect(empty(...utilities).css).toMatchSnapshot();
});

test("evenOfType", () => {
  expect(evenOfType(...utilities).css).toMatchSnapshot();
});

test("oddOfType", () => {
  expect(oddOfType(...utilities).css).toMatchSnapshot();
});

test("default", () => {
  expect($default(...utilities).css).toMatchSnapshot();
});
