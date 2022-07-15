import { createUtility, backgroundColor, colors, backgroundClip, backgroundClipConfig, first, last, odd, even, visited, checked, focusWithin, hover, focus, focusVisible, active, link, target, notChecked, enabled, indeterminate, invalid, valid, optional, required, placeholderShown, readOnly, readWrite, notDisabled, firstOfType, notFirstOfType, lastOfType, notLastOfType, notFirst, notLast, onlyChild, notOnlyChild, onlyOfType, notOnlyOfType, root, empty, evenOfType, oddOfType, $default } from "../../src";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("first", () => {
  expect(first(...utilities)).toMatchSnapshot();
});

test("last", () => {
  expect(last(...utilities)).toMatchSnapshot();
});

test("odd", () => {
  expect(odd(...utilities)).toMatchSnapshot();
});

test("even", () => {
  expect(even(...utilities)).toMatchSnapshot();
});

test("visited", () => {
  expect(visited(...utilities)).toMatchSnapshot();
});

test("checked", () => {
  expect(checked(...utilities)).toMatchSnapshot();
});

test("focusWithin", () => {
  expect(focusWithin(...utilities)).toMatchSnapshot();
});

test("hover", () => {
  expect(hover(...utilities)).toMatchSnapshot();
});

test("focus", () => {
  expect(focus(...utilities)).toMatchSnapshot();
});

test("focusVisible", () => {
  expect(focusVisible(...utilities)).toMatchSnapshot();
});

test("active", () => {
  expect(active(...utilities)).toMatchSnapshot();
});

test("link", () => {
  expect(link(...utilities)).toMatchSnapshot();
});

test("target", () => {
  expect(target(...utilities)).toMatchSnapshot();
});

test("notChecked", () => {
  expect(notChecked(...utilities)).toMatchSnapshot();
});

test("enabled", () => {
  expect(enabled(...utilities)).toMatchSnapshot();
});

test("indeterminate", () => {
  expect(indeterminate(...utilities)).toMatchSnapshot();
});

test("invalid", () => {
  expect(invalid(...utilities)).toMatchSnapshot();
});

test("valid", () => {
  expect(valid(...utilities)).toMatchSnapshot();
});

test("optional", () => {
  expect(optional(...utilities)).toMatchSnapshot();
});

test("required", () => {
  expect(required(...utilities)).toMatchSnapshot();
});

test("placeholderShown", () => {
  expect(placeholderShown(...utilities)).toMatchSnapshot();
});

test("readOnly", () => {
  expect(readOnly(...utilities)).toMatchSnapshot();
});

test("readWrite", () => {
  expect(readWrite(...utilities)).toMatchSnapshot();
});

test("notDisabled", () => {
  expect(notDisabled(...utilities)).toMatchSnapshot();
});

test("firstOfType", () => {
  expect(firstOfType(...utilities)).toMatchSnapshot();
});

test("notFirstOfType", () => {
  expect(notFirstOfType(...utilities)).toMatchSnapshot();
});

test("lastOfType", () => {
  expect(lastOfType(...utilities)).toMatchSnapshot();
});

test("notLastOfType", () => {
  expect(notLastOfType(...utilities)).toMatchSnapshot();
});

test("notFirst", () => {
  expect(notFirst(...utilities)).toMatchSnapshot();
});

test("notLast", () => {
  expect(notLast(...utilities)).toMatchSnapshot();
});

test("onlyChild", () => {
  expect(onlyChild(...utilities)).toMatchSnapshot();
});

test("notOnlyChild", () => {
  expect(notOnlyChild(...utilities)).toMatchSnapshot();
});

test("onlyOfType", () => {
  expect(onlyOfType(...utilities)).toMatchSnapshot();
});

test("notOnlyOfType", () => {
  expect(notOnlyOfType(...utilities)).toMatchSnapshot();
});

test("root", () => {
  expect(root(...utilities)).toMatchSnapshot();
});

test("empty", () => {
  expect(empty(...utilities)).toMatchSnapshot();
});

test("evenOfType", () => {
  expect(evenOfType(...utilities)).toMatchSnapshot();
});

test("oddOfType", () => {
  expect(oddOfType(...utilities)).toMatchSnapshot();
});

test("default", () => {
  expect($default(...utilities)).toMatchSnapshot();
});
