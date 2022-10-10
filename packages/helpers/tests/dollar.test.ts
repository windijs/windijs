import { $, build } from "@windijs/helpers";
import { style } from "@windijs/style";

// TODO: fix type bundler error

const utilities = [style.background.blue, style.padding.rem[4], style.borderRadius.px[4]];

test("dollar select HTML elements", () => {
  expect(build($.A(utilities))).toMatchSnapshot();

  expect(build($.Buttton(utilities))).toMatchSnapshot();

  expect(build($.Textarea(utilities))).toMatchSnapshot();
});

test("dollar with id", () => {
  expect(build($.ID("btn")(utilities))).toMatchSnapshot();
  expect(build($.ID.btn(utilities))).toMatchSnapshot();
  expect(build($.ID["red-button"](utilities))).toMatchSnapshot();
});

test("dollar with attribute", () => {
  expect(build($.ATTR.title(utilities))).toMatchSnapshot();
  expect(build($.ATTR("title")(utilities))).toMatchSnapshot();
  expect(build($.ATTR["some-attr"](utilities))).toMatchSnapshot();
  expect(build($.ATTR.href.match("https://example.org")(utilities))).toMatchSnapshot();
  expect(build($.ATTR.href.includes("example")(utilities))).toMatchSnapshot();
  expect(build($.ATTR.href.startsWith("https")(utilities))).toMatchSnapshot();
  expect(build($.ATTR.href.endsWith(".org")(utilities))).toMatchSnapshot();
  expect(build($.ATTR.class.contains("logo")(utilities))).toMatchSnapshot();
  expect(build($.ATTR.lang.hyphenMatch("zh")(utilities))).toMatchSnapshot();
});

test("dollar wiith all/root/host", () => {
  expect(build($.All(utilities))).toMatchSnapshot();
  expect(build($.Root(utilities))).toMatchSnapshot();
  expect(build($.Host(utilities))).toMatchSnapshot();
});

test("dollar with classes", () => {
  expect(build($.button(utilities))).toMatchSnapshot();
  expect(build($["bg-red-500"](utilities))).toMatchSnapshot();
});

test("dollar with css object", () => {
  expect(
    build(
      $.button({
        fontSize: "large",
        padding: "1rem",
        "&:hover": {
          background: "gray",
        },
      })
    )
  ).toMatchSnapshot();

  expect(
    build(
      $.ATTR.href.includes("example")({
        fontSize: "large",
        padding: "1rem",
        "&:hover": {
          background: "gray",
        },
      })
    )
  ).toMatchSnapshot();
});

test("dollar multi selectors", () => {
  expect(build($.button.$.A.$.Button(utilities))).toMatchSnapshot();
});

test("dollar nested selectors", () => {
  expect(build($.button.clicked(utilities))).toMatchSnapshot();
  expect(build($.ID["red-btn"].clicked(utilities))).toMatchSnapshot();
  expect(build($.button.clicked.$$.A(utilities))).toMatchSnapshot();
  expect(build($.button.clicked._.button.hovered(utilities))).toMatchSnapshot();
  expect(build($.button.clicked.__.A(utilities))).toMatchSnapshot();
  expect(build($.button.clicked._$_.A(utilities))).toMatchSnapshot();
  expect(build($.A.ATTR.href.endsWith(".org")(utilities))).toMatchSnapshot();
});

test("dollar call", () => {
  expect(build($(".test > a", utilities))).toMatchSnapshot();
  expect(build(Reflect.apply($, undefined, [".test > a", utilities]))).toMatchSnapshot();
});

test("dollar styles and exports", () => {
  $.init();

  const size = 100;

  $.circle(style.width.px[size], style.height.px[size], style.borderRadius.px[size * 0.5]);

  $.rounded(...$.circle.styles, style.fontSize.large);

  expect(build($.exports.map(i => i.style))).toMatchSnapshot();
});

test("extend last style", () => {
  $.init();

  const size = 100;

  $.circle(style.width.px[size], style.height.px[size], style.borderRadius.px[size * 0.5]);

  $.circle(style.backgroundColor.red);

  $.rounded(...$.circle.styles, style.fontSize.large);

  expect(build($.exports.map(i => i.style))).toMatchSnapshot();
});
