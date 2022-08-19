import { $ } from "../src";
import { style } from "@windi/style";

// TODO: fix type bundler error

const utilities = [style.background.blue, style.padding.rem[4], style.borderRadius.px[4]];

test("dollar select HTML elements", () => {
  expect($.A(utilities)).toMatchSnapshot();

  expect($.Buttton(utilities)).toMatchSnapshot();

  expect($.Textarea(utilities)).toMatchSnapshot();
});

test("dollar with id", () => {
  expect($.ID("btn")(utilities)).toMatchSnapshot();
  expect($.ID.btn(utilities)).toMatchSnapshot();
  expect($.ID["red-button"](utilities)).toMatchSnapshot();
});

test("dollar with attribute", () => {
  expect($.ATTR.title(utilities)).toMatchSnapshot();
  expect($.ATTR("title")(utilities)).toMatchSnapshot();
  expect($.ATTR["some-attr"](utilities)).toMatchSnapshot();
  expect($.ATTR.href.match("https://example.org")(utilities)).toMatchSnapshot();
  expect($.ATTR.href.includes("example")(utilities)).toMatchSnapshot();
  expect($.ATTR.href.startsWith("https")(utilities)).toMatchSnapshot();
  expect($.ATTR.href.endsWith(".org")(utilities)).toMatchSnapshot();
  expect($.ATTR.class.contains("logo")(utilities)).toMatchSnapshot();
  expect($.ATTR.lang.hyphenMatch("zh")(utilities)).toMatchSnapshot();
});

test("dollar wiith all/root/host", () => {
  expect($.All(utilities)).toMatchSnapshot();
  expect($.Root(utilities)).toMatchSnapshot();
  expect($.Host(utilities)).toMatchSnapshot();
});

test("dollar with classes", () => {
  expect($.button(utilities)).toMatchSnapshot();
  expect($["bg-red-500"](utilities)).toMatchSnapshot();
});

test("dollar multi selectors", () => {
  expect($.button.$.A.$.Button(utilities)).toMatchSnapshot();
});

test("dollar nested selectors", () => {
  expect($.button.clicked(utilities)).toMatchSnapshot();
  expect($.ID["red-btn"].clicked(utilities)).toMatchSnapshot();
  expect($.button.clicked.$$.A(utilities)).toMatchSnapshot();
  expect($.button.clicked._.button.hovered(utilities)).toMatchSnapshot();
  expect($.button.clicked.__.A(utilities)).toMatchSnapshot();
  expect($.button.clicked._$_.A(utilities)).toMatchSnapshot();
  expect($.A.ATTR.href.endsWith(".org")(utilities)).toMatchSnapshot();
});

test("dollar call", () => {
  expect($(".test > a", utilities)).toMatchSnapshot();
  expect(Reflect.apply($, undefined, [".test > a", utilities])).toMatchSnapshot();
});
