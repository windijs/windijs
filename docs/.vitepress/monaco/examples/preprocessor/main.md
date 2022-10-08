```jsx
import { $, createVariant, variant, media, hash, quote, url } from "windijs"
import type { StyleObject, Utilities } from "windijs"

const size = 100
const largeSize = 120

// Basic Usage

$.circle(
  width.px[size],
  height.px[size],
  borderRadius.px[size * 0.5],
  hover(
    bg.gray[200]
  ),
  lg(
    width.px[largeSize],
    height.px[largeSize]
  )
)

// Nesting Properties

$.enlarge(
  fontSize.px[14],
  ...Object.entries({
    property: "font-size",
    duration: "4s",
    delay: "2s"
  }).map(([k, v]) => style["transition-" + k][v]),
  hover(fontSize.px[36])
)

$.enlarge2(
  fontSize.px[14],
  css(Object.fromEntries(
    Object.entries({
      property: "font-size",
      duration: "4s",
      delay: "2s"
    }).map(([k, v]) => ["transition-" + k, v]),
  )),
  hover(fontSize.px[36])
)

// Extending Styles

$.square(width.px[size], height.px[size], borderRadius.px[size * 0.5]);
$.squareExtend(...$.square.styles, fontSize.large);

// Hidden Declarations

const roundedCorners = false;

$.button(
  style.border["1px solid black"],
  borderRadius[roundedCorners ? "5px" : null], // use `null | undefined` in value
  roundedCorners ? borderRadius.px[5] : null, // use `null | undefined` in utilities
  lg(roundedCorners ? borderRadius.px[8] : null) // use `null | undefined` in variants
)

// CSS Variables

const primary = "#81899b"
const accent = "#302e24"

$.Root(
  style["--primary"][primary],
  style["--accent"][accent],

  // TODO: maybe we can have style.$primary[primary] ???

  background.var("primary", "transparent")
)

// Using Variants

const hocus = createVariant("&:hover, &:focus");
$.button(
  hocus(bg.blue[400]), // using created variant
  variant("&:read-only", bg.transparent, text.lg), // using hard coded variant
  media("screen, print", bg.transparent, text.black) // using hard coded media query, shorthand for `variant("@media screen, print")`
)


// Parent Selector
$.alert(
  hover(font.bold),
  variant("[dir=rtl] &", ml[0], mr[2]),
  variant(":not(&)", rounded.lg)
)

// Adding Suffixes with css object

$.accordion(css({
  maxWidth: "600px",
  margin: "4rem auto",
  width: "90%",
  fontFamily: `"Raleway", sans-serif`,
  background: "#f4f4f4",
  "&__copy": {
    display: "none",
    padding: "1rem 1.5rem 2rem 1.5rem",
    color: "gray",
    lineHeight: "1.6",
    fontSize: "14px",
    fontWeight: "500",

    "&--open": {
      display: "block"
    }
  }
}))

// Adding Suffixes with style
$.accordion2(
  maxWidth.px[600],
  mx.auto,
  my[16],
  width.percent[90],
  fontFamily[`"Raleway", sans-serif`],
  background["#f4f4f4"],

  variant("&__copy",
    display.none, pt[4], pl[6], pb[8], pr[6], color.gray, lineHeight[1.6], fontSize.px[14], fontWeight[500],
    variant("&--open", display.block)
  )
)

// Extracting utilitis

const toolbelt = [
  boxSizing["border-box"],
  style.borderTop["1px rgba(#000, .12) solid"],
  py[4],
  px[0],
  w.full,
  hover(style.border["2px rgba(#000, .5) solid"])
]

$["action-buttons"](
  color.rgb(66, 133, 244),
  ...toolbelt
)

$["reset-buttons"](
  color.rgb(205, 220, 57),
  ...toolbelt
)

// Using function generate utilities

function prefix(property: string, value: string, prefixes: string[]) {
  return css({
    ...Object.fromEntries(
      prefixes.map(prefix => [`-${prefix}-${property}`, value])
    ),
    [property]: value
  })
}

$.gray(
  prefix("filter", "grayscale(50%)", ["moz", "webkit"])
)

function prefix2(style: StyleObject, prefixes: string[]) {
  return css(
    Object.fromEntries(
      Object.entries(style.css).map(([k, v]) => [
        ...prefixes.map(prefix => [`-${prefix}-${k}`, v]),
        [k, v]
      ]).flat()
    )
  )
}

$.gray2(
  prefix2(style.filter.grayscale(0.5), ["moz", "webkit"])
)

// Extracting styles

function cornerIcon(name: string, y: "top" | "bottom", x: "left" | "right") {
  $[`.icon-${name}`](
    backgroundImage.url(`/icons/${name}.svg`),
    position.absolute,
    style[y][0],
    style[x][0]
  )
}

cornerIcon("mail", "top", "left")

function inlineAnimation(duration: number, utilities: { from: Utilities[], to: Utilities[] }): StyleObject[] {
  const name = `inline-${hash(duration.toString())}`


  $[`@keyframes ${name}`](
    variant("from", ...utilities.from),
    variant("to", ...utilities.to)
  )

  return [ animationName[name], animationDuration.s[duration], animationIterationCount.infinite ]
}

$.pulse(
  ...inlineAnimation(2, {
    from: [backgroundColor.yellow],
    to: [backgroundColor.red]
  })
)

// Flow Control

// If and else

const darkTheme = true;

if (darkTheme) {
  $.circle(
    bg.gray[100]
  )
} else {
  $.circle(
    bg.gray[500]
  )
}

// ? and :

$.square(
  darkTheme ? bg.gray[100] : bg.gray[500],
  darkTheme ? [rounded.lg, text.white] : [rounded.md, text.black]
)

// For

const paddings = [1, 2, 3, 4, 5];

for (const p of paddings) {
  $[`.p-${p}`](
    padding.rem[p]
  )
}

const icons = { eye: "\f112", start: "\f12e", stop: "\f12f" };

for (const [name, glyph] of Object.entries(icons)) {
  $[`.icon-${name}:before`](
    display["inline-block"],
    fontFamily[quote("Icon Font")],
    content.quote(glyph)
  )
}

// Map

const margins = [1, 2, 3, 4, 5]

margins.map(m => $[`.m-${m}`](
  margin.rem[m]
))

// Using CSS Object

$.testJSS(css({
  backgroundColor: "blue",
  fontSize: "large",
  fontWeight: "700",
  "&:hover": {
    backgroundColor: "red",
  },
  "& .abc": {
    color: "yellow",
  },
  "@media (min-width: 700px)": {
    marginLeft: "auto",
    marginRight: "auto"
  }
}))

// Complex Selector

const utilities = [padding.rem[4], borderRadius.px[4]];

// select classes

$.myClass(utilities) // .myClass { ... }
$["my-class"](utilities) // .my-class { ... }
$[".my-second-class"](utilities) // .my-second-class { ... }
$(".my-custom-class", utilities) // .my-custom-class { ... }

// select HTML elements

$.A(utilities) // a { ... }
$.Button(utilities) // button { ... }
$.Textarea(utilities) // textarea { ... }
$.Body(utilities) // body { ... }
$.All(p[0], rounded.lg) // * { ... }
$.Root(p[0], rounded.lg) // :root { ... }
$.Host(utilities) // :host { ... }

// select id

$.ID("btn")(utilities) // #btn { ... }
$.ID.btn2(utilities) // #btn2 { ... }
$.ID["red-button"](utilities) // #red-button { ... }

// select attribute

$.ATTR.title(utilities) // [title]
$.ATTR.href.match("https://example.org")(utilities) // [href="https://example.org"]
$.ATTR.href.includes("example")(utilities) // [href*="example"]
$.ATTR.href.startsWith("https")(utilities) // [href^="https"]
$.ATTR.href.endsWith(".org")(utilities) // [href$=".org"]
$.ATTR.href.contains("logo")(utilities) // [href~="logo"]
$.ATTR.href.hyphenMatch("zh")(utilities) // [href|="zh"]

// multiple selectors

$.btn.$.A.$.Button(utilities) // .btn, a, button

// nested selectors

$.btn.clicked(utilities) // .btn.clicked
$.btn.$$.A(utilities) // .btn > a
$.btn._.btn.hovered(utilities) // .btn a
$.btn.__.A(utilities) // .btn + a
$.btn._$_.A(utilities) // .btn ~ a
$.A.ATTR.href.endsWith(".org")(utilities) // a[href$=".org"]

// any selectors

$[".test > button"](utilities)
$(".test > a", utilities)

// Media Queries

// @namespace

$["@namespace svg url(http://www.w3.org/2000/svg)"]();

// @font-face

$["@font-face"](
  fontFamily[quote("Open Sans")],
  src[url("/fonts/OpenSans-Regular-webfont.woff2") + ` format("woff2")`]
)

// @counter-style

$["@counter-style thumbs"](
  system.cyclic,
  symbols[`"\\1F44D"`]
)

// @media

$["print-only"](
  display.none,
  media("print", display.block)
)

const layoutBreakpointSmall = 960;

$["hide-extra-small"](
  media(`(min-width: ${layoutBreakpointSmall}px)`, display.none)
)

$.button(
  hover(
    variant("@media (hover: hover)",
      style.border["2px solid black"],
      variant("@media (color)", borderColor["#036"])
    )
  )
)

$["@media (hover: hover)"](
  variant(".button2", hover(
    style.border["2px solid black"],
    variant("@media (color)", borderColor["#036"])
  ))
)

// @supports

$.banner(
  position.fixed,
  variant("@supports (position: sticky)", position.sticky)
)

// @keyframes

$["@keyframes slide-in"](
  variant("from", marginLeft.percent[100], width.percent[300]),
  variant("70%", marginLeft.percent[90], width.percent[150]),
  variant("to", marginLeft.percent[0], width.percent[100]),
)
```
