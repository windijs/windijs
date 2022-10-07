```jsx
import { $, createVariant, variant, media, hash } from "windijs"
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

$[".action-buttons"](
  color.rgb(66, 133, 244),
  ...toolbelt
)

$[".reset-buttons"](
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
    fontFamily["Icon Font"],
    content[glyph]
  )
}

// Map

const margins = [1, 2, 3, 4, 5]

margins.map(m => $[`.m-${m}`](
  margin.rem[m]
))


// Using Styles

// Using JSS

// Complex Selector

// HTML Tags

$.Body(
  bg.blue[400],
  text.white,
  text.lg
)

// Media Queries

// Special Functions

const robotoFontPath = "../fonts/roboto"

$["@font-face"](
  src.url(`${robotoFontPath}/Roboto-Regular.woff2) format("woff2")`),
  fontFamily.Roboto,
  fontWeight[300]
)

// Built-in Functions

```
