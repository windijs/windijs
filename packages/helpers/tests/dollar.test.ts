import { $, build, css, percent } from "@windijs/helpers";
import { style } from "@windijs/style";
import { hover } from "@windijs/variants";

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

  expect(
    build(
      $({
        "@import": "test.css",
        ".btn": {
          fontSize: "large",
          "&:hover": {
            background: "gray",
          },
        },
      })
    )
  ).toMatchSnapshot();

  expect(
    build(
      $(
        css({
          ".btn": {
            fontSize: "large",
            "&:hover": {
              background: "gray",
            },
          },
        })
      )
    )
  ).toMatchSnapshot();

  expect(
    build(
      $(
        css({
          ".btn": {
            fontSize: "large",
            "&:hover": {
              background: "gray",
            },
          },
        }),
        css({
          ".second": {
            fontSize: "large",
          },
        })
      )
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

test("dollar with any selectors", () => {
  expect(build($(".test > a", utilities))).toMatchSnapshot();
  expect(build(Reflect.apply($, undefined, [".test > a", utilities]))).toMatchSnapshot();
  expect(build($`:where(ol, ul) :where(ol, ul) ol`(style.listStyle["lower-greek"], style.color.chocolate))).toMatchSnapshot();
});

test("dollar styles and exports", () => {
  $.Init();

  const size = 100;

  $.circle(style.width.px[size], style.height.px[size], style.borderRadius.px[size * 0.5]);

  $.rounded(...$.circle.Styles, style.fontSize.large);

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("extend last style", () => {
  $.Init();

  const size = 100;

  $.circle(style.width.px[size], style.height.px[size], style.borderRadius.px[size * 0.5]);

  $.circle(style.backgroundColor.red);

  $.rounded(...$.circle.Styles, style.fontSize.large);

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("nested styles", () => {
  $.Init();

  $.abc(
    $.def(hover(style.fontWeight[200], style.padding.rem[1])),
    $`&:focus`(style.background.red),
    $["@media print"]($.mn(style.borderRadius.px[4]))
  );

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build charset atrules", () => {
  $.Init();

  $.Charset("UTF-8");
  $.Charset("iso-8859-15");

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build counter-style atrules", () => {
  $.Init();

  $.CounterStyle("thumbs", {
    system: "cyclic",
    // symbols: quote("\1F44D"),
    // suffix: quote(" "),
  });

  // TODO: fix crash when using quote

  $.CounterStyle.mycounter(style.system.cyclic); //style.symbols.quote("\1F44D"), style.suffix.quote(" "));

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build font-face atrules", () => {
  $.Init();

  $.FontFace({
    fontFamily: "monospace",
    src: "url(webfont.eot)",
  });

  $.FontFace(style.fontFamily.MyWebFont, style.src.url("webfont.eot"));

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build import atrules", () => {
  $.Init();

  $.Import("custom.css");

  $.Import("fineprint.css", { media: "print" });

  $.Import("narrow.css", { supports: { display: "flex" }, media: "screen and (max-width: 400px)" });

  $.Import("narrow.css", { supports: style.display.flex, media: "screen and (max-width: 400px)" });

  $.Import("theme.css", { layer: "utilities" });

  $.Import("common.css").media("screen");

  $.Import.url("fineprint.css").media("print");

  $.Import.url("theme.css").layer("utilities");

  $.Import.url("theme.css").layer.utilities;

  $.Import.url("theme.css").layer.utilities.media("print, screen");

  $.Import.url("narrow.css").supports({ display: "flex" });

  $.Import.url("narrow.css").supports({ display: "flex" }).media("screen and (max-width: 400px)");

  $.Import.url("theme.css").supports(style.display.flex).media("screen");

  $.Import.url("narrow.css").layer("utilities").supports({ display: "flex" }).media("print");

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build keyframes atrules", () => {
  $.Init();

  $.Keyframes.abc({
    from: {
      transform: "translateX(0%)",
    },
    to: {
      transform: "translateX(100%)",
    },
  });

  $.Keyframes.slidein({
    from: [style.transform.translateX(percent[0])],
    to: [style.transform.translateX(percent[100])],
  });

  $.Keyframes.identifier({
    0: [style.top[0], style.left[0]],
    30: style.top.px[50],
    68: style.left.px[50],
    72: style.left.px[50],
    100: [style.top.px[100], style.left.percent[100]],
  });

  $.Keyframes["some-name"]({
    0: {
      top: 0,
      left: 0,
    },
    50: {
      top: "50px",
      left: "50px",
    },
  });

  $.Keyframes.translate.from({ transfrom: "translateX(0%)" });

  $.Keyframes.translateStyle.from(style.transform.translateX(percent[0]));

  $.Keyframes.translateX.from({ transform: "translateX(0%)" }).to({ transform: "translateX(100%)" });

  $.Keyframes.translateZ
    .from(style.transform.translateX(percent[0]))
    .via(15, style.transform.translateX(percent[15]))
    .via(30, style.transform.translateX(percent[30]))
    .to(style.transform.translateX(percent[100]));

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build layer atrules", () => {
  $.Init();

  $.Layer.utilities(style.fontSize.large);
  $.Layer("theme", "layout")(style.fontSize.large);

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build media atrules", () => {
  $.Init();

  $.Media("screen and (min-width: 900px)")($.abc(style.padding.rem[1]));

  $.Supports(style.display.flex)($.Media("screen and (min-width: 1200px)")($.article(style.display.flex), $.footer(style.fontSize.small)));

  $.Media("(min-width: 640px)")(
    $.Media("(prefers-color-scheme: dark)")($.Supports(style.fontSize.large)($.FontFace(style.fontSize.large)), $.abc(style.padding.rem[1]))
  );

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build namespace atrules", () => {
  $.Init();

  $.Namespace("XML-namespace-URL");
  $.Namespace("XML-namespace-URL").prefix("svg");

  $.Namespace.url("XML-namespace-URL");
  $.Namespace.url("XML-namespace-URL").prefix("svg");
  $.Namespace.prefix("prefix").url("XML-namespace-URL");
  $.Namespace.prefix("prefix")["XML-namespace-URL"];

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build page atrules", () => {
  $.Init();

  $.Page(style.margin.cm[1]);
  $.Page.first(style.margin.cm[2]);
  $.Page({
    padding: "1rem",
  });

  $.Page.blank({
    padding: "2rem",
  });

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build property atrules", () => {
  $.Init();

  $.Property("property-name")(style.syntax.quote("<color>"), style.inherits["false"], style.initialValue["#c0ffee"]);

  $.Property("my-color")({
    syntax: '"<color>"',
    inherits: "false",
    initialValue: "#c0ffee",
  });

  $.Property.camelCasedColor({
    syntax: '"<color>"',
    inherits: "false",
  });

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});

test("build supports atrules", () => {
  $.Init();

  $.Supports(style.display.flex)($.flex(style.display.flex));
  $.Supports(style.transformOrigin["5% 5%"])($.transform(style.transformOrigin.bottom));
  $.Supports({ display: "-ms-flexbox" })($.flex(style.display["-ms-flexbox"]));
  $.Supports.selector("A > B")($.flex(style.display.flex));
  $.Supports.not(style.transformOrigin["10em 10em 10em"])($.flex(style.display.flex));
  $.Supports.not.not(style.transformOrigin.px[2])($.grid(style.transformOrigin.px[4]));
  $.Supports(style.display.grid).or.not(style.display["inline-grid"])($.grid(style.display["inline-grid"]));
  $.Supports(style.display.grid).and.not(style.display["inline-grid"])($.grid(style.display.grid));
  $.Supports(style.display.grid).and.not(style.display["inline-grid"]).and(style.display.flex)($.grid(style.display.flex));
  $.Supports(style.display["table-cell"]).and(style.display.grid)($.grid(style.display.grid));
  $.Supports(style.display["table-cell"]).and(style.display["list-item"]).and(style.display.grid)($.flex(style.display.flex));
  $.Supports(style.transformStyle.preserve).or(style["-moz-transform-style"].preserve).or(style["-webkit-transform-style"].preserve)(
    $.preserve(style.transformStyle.preserve, style["-webkit-transform-style"].preserve)
  );
  $.Supports.not(style.textAlignLast.justify).or(style["-moz-text-align-last"].justify)($.alignLast(style.textAlignLast.justify));
  $.Supports(style["--foo"].green)($.Body(style.color.var("varName")));
  $.Supports.not.selector("A > B")($.flex(style.display.flex));

  expect(build($.Exports.map(i => i.style))).toMatchSnapshot();
});
