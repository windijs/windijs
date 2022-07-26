import { $default, active, backgroundClip, backgroundClipConfig, backgroundColor, bundle, checked, colors, createUtility, empty, enabled, even, evenOfType, first, firstOfType, focus, focusVisible, focusWithin, hover, indeterminate, invalid, last, lastOfType, link, notChecked, notDisabled, notFirst, notFirstOfType, notLast, notLastOfType, notOnlyChild, notOnlyOfType, odd, oddOfType, onlyChild, onlyOfType, optional, placeholderShown, readOnly, readWrite, required, root, target, valid, visited } from "../../src";

const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .use(backgroundClip(backgroundClipConfig))
  .init();

const utilities = [bg.blue[500], bg.clip.content];

test("first", () => {
  expect(bundle(first(...utilities))).toMatchSnapshot();
});

test("last", () => {
  expect(bundle(last(...utilities))).toMatchSnapshot();
});

test("odd", () => {
  expect(bundle(odd(...utilities))).toMatchSnapshot();
});

test("even", () => {
  expect(bundle(even(...utilities))).toMatchSnapshot();
});

test("visited", () => {
  expect(bundle(visited(...utilities))).toMatchSnapshot();
});

test("checked", () => {
  expect(bundle(checked(...utilities))).toMatchSnapshot();
});

test("focusWithin", () => {
  expect(bundle(focusWithin(...utilities))).toMatchSnapshot();
});

test("hover", () => {
  expect(bundle(hover(...utilities))).toMatchSnapshot();
});

test("focus", () => {
  expect(bundle(focus(...utilities))).toMatchSnapshot();
});

test("focusVisible", () => {
  expect(bundle(focusVisible(...utilities))).toMatchSnapshot();
});

test("active", () => {
  expect(bundle(active(...utilities))).toMatchSnapshot();
});

test("link", () => {
  expect(bundle(link(...utilities))).toMatchSnapshot();
});

test("target", () => {
  expect(bundle(target(...utilities))).toMatchSnapshot();
});

test("notChecked", () => {
  expect(bundle(notChecked(...utilities))).toMatchSnapshot();
});

test("enabled", () => {
  expect(bundle(enabled(...utilities))).toMatchSnapshot();
});

test("indeterminate", () => {
  expect(bundle(indeterminate(...utilities))).toMatchSnapshot();
});

test("invalid", () => {
  expect(bundle(invalid(...utilities))).toMatchSnapshot();
});

test("valid", () => {
  expect(bundle(valid(...utilities))).toMatchSnapshot();
});

test("optional", () => {
  expect(bundle(optional(...utilities))).toMatchSnapshot();
});

test("required", () => {
  expect(bundle(required(...utilities))).toMatchSnapshot();
});

test("placeholderShown", () => {
  expect(bundle(placeholderShown(...utilities))).toMatchSnapshot();
});

test("readOnly", () => {
  expect(bundle(readOnly(...utilities))).toMatchSnapshot();
});

test("readWrite", () => {
  expect(bundle(readWrite(...utilities))).toMatchSnapshot();
});

test("notDisabled", () => {
  expect(bundle(notDisabled(...utilities))).toMatchSnapshot();
});

test("firstOfType", () => {
  expect(bundle(firstOfType(...utilities))).toMatchSnapshot();
});

test("notFirstOfType", () => {
  expect(bundle(notFirstOfType(...utilities))).toMatchSnapshot();
});

test("lastOfType", () => {
  expect(bundle(lastOfType(...utilities))).toMatchSnapshot();
});

test("notLastOfType", () => {
  expect(bundle(notLastOfType(...utilities))).toMatchSnapshot();
});

test("notFirst", () => {
  expect(bundle(notFirst(...utilities))).toMatchSnapshot();
});

test("notLast", () => {
  expect(bundle(notLast(...utilities))).toMatchSnapshot();
});

test("onlyChild", () => {
  expect(bundle(onlyChild(...utilities))).toMatchSnapshot();
});

test("notOnlyChild", () => {
  expect(bundle(notOnlyChild(...utilities))).toMatchSnapshot();
});

test("onlyOfType", () => {
  expect(bundle(onlyOfType(...utilities))).toMatchSnapshot();
});

test("notOnlyOfType", () => {
  expect(bundle(notOnlyOfType(...utilities))).toMatchSnapshot();
});

test("root", () => {
  expect(bundle(root(...utilities))).toMatchSnapshot();
});

test("empty", () => {
  expect(bundle(empty(...utilities))).toMatchSnapshot();
});

test("evenOfType", () => {
  expect(bundle(evenOfType(...utilities))).toMatchSnapshot();
});

test("oddOfType", () => {
  expect(bundle(oddOfType(...utilities))).toMatchSnapshot();
});

test("default", () => {
  expect(bundle($default(...utilities))).toMatchSnapshot();
});
