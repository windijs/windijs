```jsx
import {
  $,
  css,
  cssHandler,
  callHandler,
  colorHandler,
  configHandler,
  genericHandler,
  setupHandler,
  numberHandler,
  pxHandler,
  remHandler,
  degHandler,
  msHandler,
  spacingHandler,
  fractionHandler,
  createUtility,
  setupUtility,
  setupVariant,
  createMedia,
  createVariant,
  use,
  guard,
  meld,
  variant,
  media,
  hash,
  quote,
  rgb,
  rgba,
  hsl,
  hsla,
  hwb,
  percent,
  px,
  rem,
  add,
  sub,
  mul,
  div,
  Color,
  range,
  omit,
  roundUp,
  isNumber,
  mergeObject,
  uniqueId,
  camelToDash,
  dashToCamel,
  escapeCSS,
  StyleObject,
} from "windijs";

// create utility

const u1 = createUtility("u1")
  .use(cssHandler({ padding: "1rem", margin: "auto 1rem" }))
  .init();

$.testCSSHandler(u1);

const u2 = createUtility("u2")
  .case(
    "callable",
    callHandler((v: string) => css({ padding: v }))
  )
  .case(
    "callee",
    callHandler((v: string) => css({ marginLeft: v }), cssHandler({ margin: "auto" }))
  )
  .init();

$.testCallHandler(u2.callable("3.5px"), u2.callee, u2.callee("2rem"));

const colors = { red: "#FF3519", blue: { active: "#3F9DE2", dark: "#3F82E2" } };

const u3 = createUtility("u3")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .case("border", colorHandler(colors, "borderColor"))
  .case("accent", colorHandler(colors, "accentColor", "--w-accent-opacity"))
  .init();

$.testColorHandler(u3.red, u3.border.blue.active, u3.accent.blue.dark);

const borderConfig = {
  s: "solid",
  d: "dashed",
  n: "none",
};

const bgConfig = {
  auto: "auto",
  cover: "cover",
  contain: "contain",
};

const u4 = createUtility("u4").use(configHandler(borderConfig, "borderStyle")).case("bg", configHandler(bgConfig, "backgroundSize")).init();

$.testConfigHandler(
  u4.s, // u4.d, u4.n
  u4.bg.cover // u4.bg.auto, u4.bg.contain
);

function backgroundGenericHandler() {
  return genericHandler<{ [key: number]: StyleObject } & Record<"auto" | "cover" | "contain", StyleObject>>(prop => {
    if (isNumber(prop)) return css({ backgroundColor: "#" + (+prop).toString(16) });
    return css({ backgroundSize: prop })
  });
}

const u5 = createUtility("u5").use(backgroundGenericHandler()).init();

$.testGenericHandler(
  u5[0x1c1c1e],
  u5.cover,
);

const u6 = createUtility("u6")
  .use(numberHandler("order"))
  .case("lh", numberHandler("lineHeight"))
  .case("w", numberHandler("width", "rem"))
  .case("h", numberHandler("height", "px"))
  .case("mw", pxHandler("maxWidth"))
  .case("mh", remHandler("maxHeight"))
  .case("ms", msHandler("animationDuration"))
  .case("deg", degHandler("rotate"))
  .init();

$.testNumberHandler(
  u6[121],
  u6.lh[2],
  u6.w[1.5],
  u6.h[3],
  u6.mw[10],
  u6.mh[100],
  u6.ms[500],
  u6.deg[45],
);

const u7 = createUtility("u7")
  .use(spacingHandler("padding"))
  .case("m", spacingHandler("margin"))
  .init();

$.testSpacingHandler(
  u7[4], // 4 / 4 = 1rem
  u7.m[6], // 6 / 4 = 1.5rem
);

const u8 = createUtility("u8")
  .use(fractionHandler("width"))
  .case("h", fractionHandler("height"))
  .init();

$.testFractionHandler(
  u8["1/2"],
  u8.h["1/4"],
);

// use handler

const u9 = use("u9", spacingHandler("padding"));

$.testUse(
  u9[12],
);

// meld handler

const u10 = use("u10", meld(
  configHandler(borderConfig, "borderStyle"),
  colorHandler(colors, "borderColor"),
));

$.testMeld(
  u10.s,
  u10.blue.active,
);

// guard handler

const u11 = use("u11", meld(
  configHandler(borderConfig, "borderStyle"),
  guard("colors", colorHandler(colors, "borderColor")),
));

$.testGuard(
  u11.s,
  u11.colors.blue.active,
);

// setup handler

const mySetup = {
  red: css({ background: "red" }), // using css
  border: configHandler(borderConfig, "borderStyle"), // using handler
  blue: {
    DEFAULT: css({ color: "blue" }), // default css
    a: css({ borderColor: "blue" }), // deep nested css
    c: {
      d: colorHandler(colors, "outlineColor"), // deep nested handler
    }
  },
  // using handler and css
  bg: {
    DEFAULT: configHandler(bgConfig, "backgroundSize"),
    yellow: css({ backgroundColor: "yellow" })
  },
};

const u12 = use("u12", setupHandler(mySetup));

$.testSetupHandler(
  u12.red,
  u12.blue,
  u12.blue.a,
  u12.blue.c.d.red,
  u12.border.s,
  u12.bg.cover,
  u12.bg.yellow,
);

// setup utility

const u13 = setupUtility("u13", mySetup);

$.testSetupUtility(
  u13.red,
  u13.blue,
  u13.blue.a,
  u13.blue.c.d.red,
  u13.border.s,
  u13.bg.cover,
  u13.bg.yellow,
)

// create variant

const hocus = createVariant("&:hover, &:focus");
const print = createVariant("@media print");

$.testCreateVariant(hocus(p[2], font.bold), print(text.black));

// create media

const hv = createMedia("(hover: hover)");

$.testCreateMedia(hv(p[2], font.bold));

// inline variant

$.testVariant(variant("&:hover, &:focus", p[2], font.bold));

// inline media

$.testMedia(media("(hover: hover)", p[2], font.bold));

// setup variant

const { hs, pr } = setupVariant({
  hs: "&:hover, &:focus",
  pr: "@media print"
});

$.testSetupVariant(
  hs(p[2], font.bold), pr(text.black)
);

// style

$.testStyle(
  // CSS values
  style.backgroundColor.azure, // color values
  style.backgroundPosition.bottom,
  style.borderStyle.dashed,
  style.fontWeight.bold,
  // ...

  // Length Values
  style.width.rem[1.5], // rem length
  // style.width.cm[3], style.width.mm[4], style.width.Q[5], style.width.in[6], style.width.fr[2],
  style.height.px[3], // px length
  style.maxWidth.percent[10], // 10%
  style.imageOrientation.deg[30], // deg
  // style.imageOrientation.turn[30], style.imageOrientation.rad[30], style.imageOrientation.grad[30],
  style.transitionDelay.ms[300], // time
  // style.transitionDelay.s[300]
  // ...

  // CSS Functions
  style.borderColor.rgba(22, 22, 22, 0.5), // using rgba color
  style.accentColor.hsl(10, percent[10], percent[20]), // using hsl color
  style.color.hwb(10, percent[10], percent[20], 0.2), // using hwb color
  style.content.quote("Hello World"), // quoted string
  style.background.url("https://example.com/test.png"), // url
  style.maxHeight.calc("100% - 1rem"), // calc
  style.outlineColor.var("w-outline-color", "blue"), // var
  style.clipPath.circle("closest-side", percent[40]), // circle
  style.clipPath.ellipse("closest-side", "closest-side", percent[10]), // ellipse
  style.filter.blur(px[20]), // filters
  style.transitionTimingFunction.cubicBezier(0.075, 0.82, 0.165, 1), // cubic bezier
  // ...

  // Numbers
  style.lineHeight[5], // number
  style.order[3], // integer
  // ...

  // Strings
  style.fontSize["1rem"], // equal to style.fontStyle.rem[1]
  style.borderColor["rgb(22, 22, 22)"], // equal to style.borderColor.rgb(22, 22, 22)
  // ...

  // Property
  style["--test-variable"].azure,
  style["-webkit-backdrop-filter"].blur(px[20])
);

$.testMath(
  style["--math-add1"][add(rem[3], rem[1])],
  style["--math-add2"][add(px[3], rem[1])],
  style["--math-sub"][sub(px[2.5], px[1.2])],
  style["--math-mul1"][mul(3, rem[1.5])],
  style["--math-mul2"][mul(rem[2], 3)],
  style["--math-div"][div(rem[3], 2)],
  style["--math-roundUp"][roundUp(3.1415926, 3)],
  style["--math-range"][range(1, 10).join(", ")]
);

// quote

$.testQuote(fontFamily[quote("Icon Font")], content.quote("\\f112"));

// color

$.testColorString(
  style["--color-rgb"][rgb(204, 102, 153)],
  style["--color-rgba"][rgba(107, 113, 127, 0.8)],
  style["--color-hsl"][hsl(228, percent[7], percent[86])],
  style["--color-hsla"][hsla(20, percent[20], percent[85], 0.7)],
  style["--color-hwb"][hwb(12, percent[50], percent[0])]
);

$.testColorInit(
  style["--color-hex"][Color.hex("#1c1c1e").hex],
  style["--color-rgb"][Color.rgb(204, 102, 153).hex],
  style["--color-rgba"][Color.rgba(204, 102, 153, 0.5).rgbaStr],
  style["--color-hsl"][Color.hsl(228, 7, 86).rgbStr],
  style["--color-hsla"][Color.hsla(228, 7, 86, 0.5).rgbaStr],
  style["--color-hwb"][Color.hwb(12, 50, 0).rgbStr]
);

const venus = Color.hex("#998099");

$.testColorDisplay(
  style["--color-hex"][venus.hex],
  style["--color-ie-hex"][venus.ieHexStr],
  style["--color-rgb"][venus.rgbStr],
  style["--color-rgba"][venus.rgbaStr],
  style["--color-hsl"][venus.hslStr],
  style["--color-hsla"][venus.hslaStr],
  style["--color-hwb"][venus.hwbStr]
);

$.testColorProcessing(
  style["--adjust-color1"][Color.hex("#6b717f").adjust({ red: 15 }).hex],
  style["--adjust-color1"][Color.hex("#d2e1dd").adjust({ red: -10, blue: 10 }).hex],
  style["--adjust-color2"][venus.adjust({ lightness: -30, alpha: -0.4 }).rgbaStr],

  style["--adjust-hue1"][Color.hex("#6b717f").adjustHue(60).hex],
  style["--adjust-hue2"][Color.hex("#d2e1dd").adjustHue(-60).hex],
  style["--adjust-hue3"][Color.hex("#036").adjustHue(45).hex],

  style["--get-hue-value"][Color.hex("#e1d7d2").hue],
  style["--get-saturation-value"][Color.hex("#e1d7d2").saturation],
  style["--get-lightness-value"][Color.hex("#e1d7d2").lightness],
  style["--get-whiteness-value"][Color.hex("#e1d7d2").whiteness],
  style["--get-blackness-value"][Color.hex("#e1d7d2").blackness],
  style["--get-red-value"][Color.hex("#e1d7d2").red],
  style["--get-green-value"][Color.hex("#e1d7d2").green],
  style["--get-blue-value"][Color.hex("#e1d7d2").blue],
  style["--get-alpha-value"][Color.hex("#e1d7d2").alpha],
  style["--get-opacity-value"][Color.rgba(210, 225, 221, 0.4).opacity],

  style["--change-color1"][Color.hex("#6b717f").change({ red: 100 }).hex],
  style["--change-color2"][Color.hex("#d2e1dd").change({ red: 100, blue: 50 }).hex],
  style["--change-color3"][venus.change({ lightness: 30, alpha: 0.5 }).rgbaStr],

  style["--complement-color1"][Color.hex("#6b717f").complement().hex],
  style["--complement-color2"][Color.hex("#d2e1dd").complement().hex],
  style["--complement-color3"][Color.hex("#036").complement().hex],

  style["--darken-color1"][Color.hex("#b37399").darken(20).hex],
  style["--darken-color2"][Color.hex("#f2ece4").darken(40).hex],
  style["--darken-color3"][Color.hex("#036").darken(30).hex],

  style["--desaturate-color1"][Color.hex("#b37399").desaturate(30).hex],
  style["--desaturate-color2"][Color.hex("#f2ece4").desaturate(20).hex],
  style["--desaturate-color3"][Color.hex("#036").desaturate(20).hex],

  style["--grayscale-color1"][Color.hex("#6b717f").grayscale().hex],
  style["--grayscale-color2"][Color.hex("#d2e1dd").grayscale().hex],
  style["--grayscale-color3"][Color.hex("#036").grayscale().hex],

  style["--invert-color1"][Color.hex("#b37399").invert().hex],
  style["--invert-color2"][Color.hex("#000").invert().hex],
  style["--invert-color3"][Color.hex("#550e0c").invert(20).hex],

  style["--lighten-color1"][Color.hex("#6b717f").lighten(20).hex],
  style["--lighten-color2"][Color.hex("#036").lighten(60).hex],
  style["--lighten-color3"][Color.hex("#e1d7d2").lighten(30).hex],

  style["--mix-color1"][Color.mix(venus, Color.hex("#191970")).hex],
  style["--mix-color2"][Color.mix(Color.hex("#036"), Color.hex("#d2e1dd")).hex],
  style["--mix-color3"][Color.mix(Color.hex("#036"), Color.hex("#d2e1dd"), 75).hex],
  style["--mix-color4"][Color.mix(Color.hex("#036"), Color.hex("#d2e1dd"), 25).hex],
  style["--mix-color5"][Color.mix(Color.rgba(242, 236, 228, 0.5), Color.hex("#6b717f")).rgbaStr],

  style["--opacify-color"][Color.rgba(107, 113, 127, 0.2).opacify(0.2).rgbaStr],
  style["--fade-in-color"][Color.rgba(225, 215, 210, 0.5).fadeIn(0.4).rgbaStr],
  style["--transparentize-color"][Color.rgba(107, 113, 127, 0.2).transparentize(0.2).rgbaStr],
  style["--fade-out-color"][Color.rgba(225, 215, 210, 0.5).fadeOut(0.4).rgbaStr],

  style["--saturate-color1"][Color.hex("#c69").saturate(20).hex],
  style["--saturate-color2"][Color.hex("#f2ece4").saturate(50).hex],
  style["--saturate-color3"][Color.hex("#0e4982").saturate(30).hex],

  style["--scale-color1"][venus.scale({ lightness: 15 }).hex],
  style["--scale-color2"][Color.hex("#6b717f").scale({ red: 15 }).hex],
  style["--scale-color3"][Color.hex("#d2e1dd").scale({ lightness: -10, saturation: 10 }).hex],
  style["--scale-color4"][Color.hex("#998099").scale({ alpha: -40 }).rgbaStr]
);

// deep merge

const lightWeights = { lightest: 100, light: 300 };
const heavyWeights = { medium: 500, bold: 700 };

$.testMerge(Object.entries(mergeObject(lightWeights, heavyWeights)).map(([k, v]) => style[`--${k}`][v]));

$.testOveride(Object.entries(mergeObject(heavyWeights, { medium: 700 })).map(([k, v]) => style[`--${k}`][v]));

const deepWeights = { lightest: 100, medium: 500, bold: { a: 700, b: 700 } };
const overWeights = { medium: 600, bold: { b: 800, c: 900, d: 1000 } };

$.testDeepMerge(
  Object.entries(mergeObject(deepWeights, overWeights))
    .map(([k, v]) => (typeof v === "object" ? Object.entries(v).map(([k2, v2]) => style[`--${k}-${k2}`][v2]) : style[`--${k}`][v]))
    .flat()
);

// omit

$.testOmit(
  Object.entries(omit({ light: 300, lighter: 400, medium: 500, bold: 700 }, { light: true, lighter: true })).map(([k, v]) => style[`--${k}`][v])
);

// escape

$[escapeCSS("should-[escape]")](p[1]);

// hash

$["u" + hash("abc")](p[2]);

// unique-id
$[uniqueId()](font.bold);

// camelToDash

$[camelToDash("setFontBold")](font.bold);

// dashToCamel

$[dashToCamel("set-font-light")](font.light);
```
