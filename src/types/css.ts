// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Types

import { StyleObject } from ".";
import { $var, calc, circle, ellipse, hsl, hsla, hwb, inset, linearGradient, polygon, quote, radialGradient, repeatingLinearGradient, repeatingRadialGradient, rgb, rgba, url } from "../helpers";

// pre-defined keywords

export const initial = "initial";
export const inherit = "inherit";
export const unset = "unset";
export const none = "none";

// <custom-indent>

// <dashed-indent>

// <string>

// <url>

export type CSSInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type CSSDimensionObject = { value: number; type: string; valueOf(): string; toString(): string; }

export type CSSLengthType = "px" | "cm" | "mm" | "Q" | "in" | "pc" | "pt" | "ch" | "ex" | "em" | "rem" | "vh" | "vmax" | "vmin" | "vw"

export type CSSAngleType = "deg" | "grad" | "rad" | "turn";

export type CSSResolutionType = "dpi" | "dpcm" | "dppx" | "x";

export type CSSTimeType = "s" | "ms";

export type CSSPercentageType = "percent";

export type CSSFlexType = "fr";

export type CSSFrequencyType = "Hz" | "kHz";

export type CSSSideOrCorner = "to top" | "to bottom" | "to left" | "to right" | "to left top" | "to left bottom" | "to right top" | "to right bottom";

export type CSSLength = (CSSDimensionObject & { type: CSSLengthType }) | 0

export type CSSPercentage = (CSSDimensionObject & { type: CSSPercentageType }) | 0

export type CSSAngle = (CSSDimensionObject & { type: CSSAngleType }) | 0

export type CSSTime = (CSSDimensionObject & { type: CSSTimeType }) | 0

export type CSSFlex = (CSSDimensionObject & { type: CSSFlexType }) | 0

export type CSSFrequency = (CSSDimensionObject & { type: CSSFrequencyType }) | 0

export type CSSResolution = (CSSDimensionObject & { type: CSSResolutionType }) | 0

export type CSSDimension = CSSLength | CSSAngle | CSSTime | CSSResolution

export type CSSLengthPercentage = CSSLength | CSSPercentage;

export type CSSAnglePercentage = CSSAngle | CSSPercentage;

export type CSSTimePercentage = CSSTime | CSSPercentage;

export type CSSFrequencyPercentage = CSSFrequency | CSSPercentage;

export type CSSColorHint = CSSLengthPercentage;

export type CSSLinearColorStopOrHint = string | CSSColorHint | [string, CSSLengthPercentage, (CSSLengthPercentage)?];

export type CSSAngularColorStopOrHint = string | CSSAngle | [string, CSSAngle, CSSAngle?];

export type CSSPosition = "left" | "center" | "right" | "top" | "center" | "bottom" |
["left" | "center" | "right" | CSSLengthPercentage, ("top" | "center" | "bottom" | CSSLengthPercentage)?] |
["left" | "right", CSSLengthPercentage, "top" | "bottom", CSSLengthPercentage];

export type CSSBorderRadiusItem = CSSLengthPercentage | [CSSLengthPercentage, CSSLengthPercentage] | [CSSLengthPercentage, CSSLengthPercentage, CSSLengthPercentage] | [CSSLengthPercentage, CSSLengthPercentage, CSSLengthPercentage, CSSLengthPercentage];
export type CSSBorderRadius = CSSBorderRadiusItem | [CSSBorderRadiusItem, CSSBorderRadiusItem]

// <color>

export type CSSAlphaValue = CSSPercentage | 0 | 0.005 | 0.01 | 0.015 | 0.02 | 0.025 | 0.03 | 0.035 | 0.04 | 0.045 | 0.05 | 0.055 | 0.06 | 0.065 | 0.07 | 0.075 | 0.08 | 0.085 | 0.09 | 0.095 | 0.1 | 0.105 | 0.11 | 0.115 | 0.12 | 0.125 | 0.13 | 0.135 | 0.14 | 0.145 | 0.15 | 0.155 | 0.16 | 0.165 | 0.17 | 0.175 | 0.18 | 0.185 | 0.19 | 0.195 | 0.2 | 0.205 | 0.21 | 0.215 | 0.22 | 0.225 | 0.23 | 0.235 | 0.24 | 0.245 | 0.25 | 0.255 | 0.26 | 0.265 | 0.27 | 0.275 | 0.28 | 0.285 | 0.29 | 0.295 | 0.3 | 0.305 | 0.31 | 0.315 | 0.32 | 0.325 | 0.33 | 0.335 | 0.34 | 0.345 | 0.35 | 0.355 | 0.36 | 0.365 | 0.37 | 0.375 | 0.38 | 0.385 | 0.39 | 0.395 | 0.4 | 0.405 | 0.41 | 0.415 | 0.42 | 0.425 | 0.43 | 0.435 | 0.44 | 0.445 | 0.45 | 0.455 | 0.46 | 0.465 | 0.47 | 0.475 | 0.48 | 0.485 | 0.49 | 0.495 | 0.5 | 0.505 | 0.51 | 0.515 | 0.52 | 0.525 | 0.53 | 0.535 | 0.54 | 0.545 | 0.55 | 0.555 | 0.56 | 0.565 | 0.57 | 0.575 | 0.58 | 0.585 | 0.59 | 0.595 | 0.6 | 0.605 | 0.61 | 0.615 | 0.62 | 0.625 | 0.63 | 0.635 | 0.64 | 0.645 | 0.65 | 0.655 | 0.66 | 0.665 | 0.67 | 0.675 | 0.68 | 0.685 | 0.69 | 0.695 | 0.7 | 0.705 | 0.71 | 0.715 | 0.72 | 0.725 | 0.73 | 0.735 | 0.74 | 0.745 | 0.75 | 0.755 | 0.76 | 0.765 | 0.77 | 0.775 | 0.78 | 0.785 | 0.79 | 0.795 | 0.8 | 0.805 | 0.81 | 0.815 | 0.82 | 0.825 | 0.83 | 0.835 | 0.84 | 0.845 | 0.85 | 0.855 | 0.86 | 0.865 | 0.87 | 0.875 | 0.88 | 0.885 | 0.89 | 0.895 | 0.9 | 0.905 | 0.91 | 0.915 | 0.92 | 0.925 | 0.93 | 0.935 | 0.94 | 0.945 | 0.95 | 0.955 | 0.96 | 0.965 | 0.97 | 0.975 | 0.98 | 0.985 | 0.99 | 0.995 | 1;

export type StyleProperties = keyof Omit<CSSStyleDeclaration, "getPropertyPriority" | "getPropertyValue" | "item" | "removeProperty" | "setProperty" | "length">;

export type CSSColors = "currentColor" | "aqua" | "black" | "blue" | "fuchsia" | "gray" | "green" | "lime" | "maroon" | "navy" | "olive" | "orange" | "purple" | "red" | "silver" | "teal" | "white" | "yellow" |
  "aliceblue" | "antiquewhite" | "aquamarine" | "azure" | "beige" | "bisque" | "blanchedalmond" | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" | "darkgreen" | "darkgrey" | "darkkhaki" | "darkmagenta" | "darkolivegreen" | "darkorange" | "darkorchid" | "darkred" | "darksalmon" | "darkseagreen" | "darkslateblue" | "darkslategray" | "darkslategrey" | "darkturquoise" | "darkviolet" | "deeppink" | "deepskyblue" | "dimgray" | "dimgrey" | "dodgerblue" | "firebrick" | "floralwhite" | "forestgreen" | "gainsboro" | "ghostwhite" | "gold" | "goldenrod" | "greenyellow" | "grey" | "honeydew" | "hotpink" | "indianred" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderblush" | "lawngreen" | "lemonchiffon" | "lightblue" | "lightcoral" | "lightcyan" | "lightgoldenrodyellow" | "lightgray" | "lightgreen" | "lightgrey" | "lightpink" | "lightsalmon" | "lightseagreen" | "lightskyblue" | "lightslategray" | "lightslategrey" | "lightsteelblue" | "lightyellow" | "limegreen" | "linen" | "magenta" | "mediumaquamarine" | "mediumblue" | "mediumorchid" | "mediumpurple" | "mediumseagreen" | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise" | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" | "moccasin" | "navajowhite" | "oldlace" | "olivedrab" | "orangered" | "orchid" | "palegoldenrod" | "palegreen" | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" | "peru" | "pink" | "plum" | "powderblue" | "rebeccapurple" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon" | "sandybrown" | "seagreen" | "seashell" | "sienna" | "skyblue" | "slateblue" | "slategray" | "slategrey" | "snow" | "springgreen" | "steelblue" | "tan" | "thistle" | "tomato" | "transparent" | "turquoise" | "violet" | "wheat" | "whitesmoke" | "yellowgreen"

export type CSSFillRule = "nonzero" | "evenodd";

export type CSSAttributeType = "string" | "color" | "url" | "integer" | "number" | "length" | "em" | "ex" | "px" | "rem" | "vw" | "vh" | "vmin" | "vmax" | "mm" | "cm" | "in" | "pt" | "pc" | "angle" | "deg" | "grad" | "rad" | "time" | "s" | "ms" | "frequency" | "Hz" | "kHz";

export type ColorProperties = "accentColor" | "backgroundColor" | "webkitBackgroundColor" | "webkitBorderAfterColor" | "webkitBorderBeforeColor" | "borderBlockColor" | "borderBlockEndColor" | "borderBlockStartColor" | "borderBottomColor" | "borderColor" | "webkitBorderEndColor" | "borderInlineColor" | "borderInlineEndColor" | "borderInlineStartColor" | "borderLeftColor" | "borderRightColor" | "webkitBorderStartColor" | "borderTopColor" | "caretColor" | "color" | "columnRuleColor" | "webkitColumnRuleColor" | "webkitCompositionFillColor" | "webkitCompositionFrameColor" | "fillColor" | "floodColor" | "lightingColor" | "webkitMatchNearestMailBlockquoteColor" | "outlineColor" | "scrollbarArrowColor" | "scrollbarBaseColor" | "scrollbarColor" | "scrollbarDarkShadowColor" | "scrollbarDarkshadowColor" | "scrollbarFaceColor" | "scrollbarHighlightColor" | "scrollbarShadowColor" | "scrollbarTrackColor" | "scrollbar3dLightColor" | "scrollbar3dlightColor" | "solidColor" | "stopColor" | "strokeColor" | "webkitTapHighlightColor" | "textDecorationColor" | "webkitTextDecorationColor" | "textEmphasisColor" | "webkitTextEmphasisColor" | "webkitTextFillColor" | "textLineThroughColor" | "textOverlineColor" | "webkitTextStrokeColor" | "textUnderlineColor";

type EnvInsetValue = "safe-area-inset-top" | "safe-area-inset-right" | "safe-area-inset-bottom" | "safe-area-inset-left titlebar-area-x" | "titlebar-area-y" | "titlebar-area-width" | "titlebar-area-height";

export interface CSSFunctions {
  // transform functions
  matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): string;
  matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): string;
  perspective(d: CSSLength | number | string): string;
  rotate(a: CSSAngle | number): string;
  rotate3d(a: CSSAngle | number): string;
  rotate3d(x: number, y: number, z: number, a: CSSAngle): string;
  rotateX(a: CSSAngle): string;
  rotateY(a: CSSAngle): string;
  rotateZ(a: CSSAngle): string;
  scale(sx: number | CSSPercentage, sy?: number | CSSPercentage): string;
  scale3d(sx: number, sy: number, sz: number): string;
  scaleX(s: number): string;
  scaleY(s: number): string;
  scaleZ(s: number): string;
  skew(ax: CSSAngle, ay?: CSSAngle): string;
  skewX(a: CSSAngle): string;
  skewY(a: CSSAngle): string;
  translate(tx: CSSLengthPercentage, ty?: CSSLengthPercentage): string;
  translate3d(tx: CSSLengthPercentage, ty?: CSSLengthPercentage, tz?: CSSLength): string;
  translateX(tx: CSSLengthPercentage): string;
  translateY(ty: CSSLengthPercentage): string;
  translateZ(tz: CSSLength): string;
  steps(count: number): string;

  // math functions
  calc(expr: string | CSSDimension | CSSPercentage | number): string;
  clamp(min: CSSLength, val: CSSLength, max: CSSLength): string;
  max(...exprs: (string | CSSDimension | CSSPercentage | number)[]): string;
  min(...exprs: (string | CSSDimension | CSSPercentage | number)[]): string;
  abs(expr: string | CSSDimension | CSSPercentage | number): string;
  sign(expr: string | CSSDimension | CSSPercentage | number): string;

  // filter functions
  blur(radius: CSSLength): string;
  brightness(amount: number | CSSPercentage): string;
  contrast(amount: number | CSSPercentage): string;
  grayscale(amount: number | CSSPercentage): string;
  invert(amount: number | CSSPercentage): string;
  opacity(amount: number | CSSPercentage): string;
  saturate(amount: number | CSSPercentage): string;
  sepia(amount: number | CSSPercentage): string;

  // color functions

  /** Creates a Color from red, green, and blue values. */
  rgb(red: number, green: number, blue: number): string;
  /** Creates a Color from red, green, blue, and alpha values. */
  rgba(red: number, green: number, blue: number, alpha: CSSAlphaValue): string;
  /** Creates a Color from hue, saturation, and lightness values. */
  hsl(hue: number, saturation: CSSPercentage, lightness: CSSPercentage): string;
  /** Creates a Color from hue, saturation, lightness, and alpha values. */
  hsla(hue: number, saturation: CSSPercentage, lightness: CSSPercentage, alpha: CSSAlphaValue): string;

  // others

  counter(name: string, style?: string): string;
  env(inset: EnvInsetValue | string, fallback?: CSSLength): string
  minmax(min: CSSLengthPercentage | CSSFlex | "max-content" | "min-content" | "auto", max: CSSLengthPercentage | CSSFlex | "max-content" | "min-content" | "auto"): string;
  repeat(repeatCount: "auto-fill" | "auto-fit" | number, tracks: string | CSSDimension | CSSPercentage | CSSFlex | number): string;

  // camel cased

  hueRotate(angle: CSSAngle): string;
  fitContent(lengthOrPercent: CSSLengthPercentage): string;
  cubicBezier(x1: number, y1: number, x2: number, y2: number): string;
  linearGradient (direction: CSSSideOrCorner | CSSAngle, ...colorStops: CSSLinearColorStopOrHint[]): string;
  radialGradient (...colors: CSSLinearColorStopOrHint[]): string;
  radialGradient (shapeSizeAtPosition: string | undefined, ...colors: CSSLinearColorStopOrHint[]): string;
  conicGradient(...colorDegrees: CSSAngularColorStopOrHint[]): string;
  conicGradient(fromAngleAtPosition: string | undefined, ...colorDegrees: CSSAngularColorStopOrHint[]): string;
  repeatingLinearGradient(direction: CSSSideOrCorner | CSSAngle, ...colorStops: CSSLinearColorStopOrHint[]): string;
  repeatingRadialGradient(...colors: CSSLinearColorStopOrHint[]): string;
  repeatingRadialGradient(shapeSizeAtPosition: string | undefined, ...colors: CSSLinearColorStopOrHint[]): string;
  repeatingConicGradient(...colorDegrees: CSSAngularColorStopOrHint[]): string;
  repeatingConicGradient(fromAngleAtPosition: string | undefined, ...colorDegrees: CSSAngularColorStopOrHint[]): string;
}

export interface ColorEntry {
  /** The value of the 'color' property. The computed value of the 'currentColor' keyword is the computed value of the 'color' property. If the 'currentColor' keyword is set on the 'color' property itself, it is treated as 'color:inherit' at parse time. */
  currentColor: StyleObject,
  /** Fully transparent. This keyword can be considered a shorthand for rgba(0,0,0,0) which is its computed value. */
  transparent: StyleObject,
  /** #f0f8ff */
  aliceblue: StyleObject,
  /** #faebd7 */
  antiquewhite: StyleObject,
  /** #00ffff */
  aqua: StyleObject,
  /** #7fffd4 */
  aquamarine: StyleObject,
  /** #f0ffff */
  azure: StyleObject,
  /** #f5f5dc */
  beige: StyleObject,
  /** #ffe4c4 */
  bisque: StyleObject,
  /** #000000 */
  black: StyleObject,
  /** #ffebcd */
  blanchedalmond: StyleObject,
  /** #0000ff */
  blue: StyleObject,
  /** #8a2be2 */
  blueviolet: StyleObject,
  /** #a52a2a */
  brown: StyleObject,
  /** #deb887 */
  burlywood: StyleObject,
  /** #5f9ea0 */
  cadetblue: StyleObject,
  /** #7fff00 */
  chartreuse: StyleObject,
  /** #d2691e */
  chocolate: StyleObject,
  /** #ff7f50 */
  coral: StyleObject,
  /** #6495ed */
  cornflowerblue: StyleObject,
  /** #fff8dc */
  cornsilk: StyleObject,
  /** #dc143c */
  crimson: StyleObject,
  /** #00ffff */
  cyan: StyleObject,
  /** #00008b */
  darkblue: StyleObject,
  /** #008b8b */
  darkcyan: StyleObject,
  /** #b8860b */
  darkgoldenrod: StyleObject,
  /** #a9a9a9 */
  darkgray: StyleObject,
  /** #a9a9a9 */
  darkgrey: StyleObject,
  /** #006400 */
  darkgreen: StyleObject,
  /** #bdb76b */
  darkkhaki: StyleObject,
  /** #8b008b */
  darkmagenta: StyleObject,
  /** #556b2f */
  darkolivegreen: StyleObject,
  /** #ff8c00 */
  darkorange: StyleObject,
  /** #9932cc */
  darkorchid: StyleObject,
  /** #8b0000 */
  darkred: StyleObject,
  /** #e9967a */
  darksalmon: StyleObject,
  /** #8fbc8f */
  darkseagreen: StyleObject,
  /** #483d8b */
  darkslateblue: StyleObject,
  /** #2f4f4f */
  darkslategray: StyleObject,
  /** #2f4f4f */
  darkslategrey: StyleObject,
  /** #00ced1 */
  darkturquoise: StyleObject,
  /** #9400d3 */
  darkviolet: StyleObject,
  /** #ff1493 */
  deeppink: StyleObject,
  /** #00bfff */
  deepskyblue: StyleObject,
  /** #696969 */
  dimgray: StyleObject,
  /** #696969 */
  dimgrey: StyleObject,
  /** #1e90ff */
  dodgerblue: StyleObject,
  /** #b22222 */
  firebrick: StyleObject,
  /** #fffaf0 */
  floralwhite: StyleObject,
  /** #228b22 */
  forestgreen: StyleObject,
  /** #ff00ff */
  fuchsia: StyleObject,
  /** #dcdcdc */
  gainsboro: StyleObject,
  /** #f8f8ff */
  ghostwhite: StyleObject,
  /** #ffd700 */
  gold: StyleObject,
  /** #daa520 */
  goldenrod: StyleObject,
  /** #808080 */
  gray: StyleObject,
  /** #808080 */
  grey: StyleObject,
  /** #008000 */
  green: StyleObject,
  /** #adff2f */
  greenyellow: StyleObject,
  /** #f0fff0 */
  honeydew: StyleObject,
  /** #ff69b4 */
  hotpink: StyleObject,
  /** #cd5c5c */
  indianred: StyleObject,
  /** #4b0082 */
  indigo: StyleObject,
  /** #fffff0 */
  ivory: StyleObject,
  /** #f0e68c */
  khaki: StyleObject,
  /** #e6e6fa */
  lavender: StyleObject,
  /** #fff0f5 */
  lavenderblush: StyleObject,
  /** #7cfc00 */
  lawngreen: StyleObject,
  /** #fffacd */
  lemonchiffon: StyleObject,
  /** #add8e6 */
  lightblue: StyleObject,
  /** #f08080 */
  lightcoral: StyleObject,
  /** #e0ffff */
  lightcyan: StyleObject,
  /** #fafad2 */
  lightgoldenrodyellow: StyleObject,
  /** #d3d3d3 */
  lightgray: StyleObject,
  /** #d3d3d3 */
  lightgrey: StyleObject,
  /** #90ee90 */
  lightgreen: StyleObject,
  /** #ffb6c1 */
  lightpink: StyleObject,
  /** #ffa07a */
  lightsalmon: StyleObject,
  /** #20b2aa */
  lightseagreen: StyleObject,
  /** #87cefa */
  lightskyblue: StyleObject,
  /** #778899 */
  lightslategray: StyleObject,
  /** #778899 */
  lightslategrey: StyleObject,
  /** #b0c4de */
  lightsteelblue: StyleObject,
  /** #ffffe0 */
  lightyellow: StyleObject,
  /** #00ff00 */
  lime: StyleObject,
  /** #32cd32 */
  limegreen: StyleObject,
  /** #faf0e6 */
  linen: StyleObject,
  /** #ff00ff */
  magenta: StyleObject,
  /** #800000 */
  maroon: StyleObject,
  /** #66cdaa */
  mediumaquamarine: StyleObject,
  /** #0000cd */
  mediumblue: StyleObject,
  /** #ba55d3 */
  mediumorchid: StyleObject,
  /** #9370d8 */
  mediumpurple: StyleObject,
  /** #3cb371 */
  mediumseagreen: StyleObject,
  /** #7b68ee */
  mediumslateblue: StyleObject,
  /** #00fa9a */
  mediumspringgreen: StyleObject,
  /** #48d1cc */
  mediumturquoise: StyleObject,
  /** #c71585 */
  mediumvioletred: StyleObject,
  /** #191970 */
  midnightblue: StyleObject,
  /** #f5fffa */
  mintcream: StyleObject,
  /** #ffe4e1 */
  mistyrose: StyleObject,
  /** #ffe4b5 */
  moccasin: StyleObject,
  /** #ffdead */
  navajowhite: StyleObject,
  /** #000080 */
  navy: StyleObject,
  /** #fdf5e6 */
  oldlace: StyleObject,
  /** #808000 */
  olive: StyleObject,
  /** #6b8e23 */
  olivedrab: StyleObject,
  /** #ffa500 */
  orange: StyleObject,
  /** #ff4500 */
  orangered: StyleObject,
  /** #da70d6 */
  orchid: StyleObject,
  /** #eee8aa */
  palegoldenrod: StyleObject,
  /** #98fb98 */
  palegreen: StyleObject,
  /** #afeeee */
  paleturquoise: StyleObject,
  /** #d87093 */
  palevioletred: StyleObject,
  /** #ffefd5 */
  papayawhip: StyleObject,
  /** #ffdab9 */
  peachpuff: StyleObject,
  /** #cd853f */
  peru: StyleObject,
  /** #ffc0cb */
  pink: StyleObject,
  /** #dda0dd */
  plum: StyleObject,
  /** #b0e0e6 */
  powderblue: StyleObject,
  /** #800080 */
  purple: StyleObject,
  /** #ff0000 */
  red: StyleObject,
  /** #663399 */
  rebeccapurple: StyleObject,
  /** #bc8f8f */
  rosybrown: StyleObject,
  /** #4169e1 */
  royalblue: StyleObject,
  /** #8b4513 */
  saddlebrown: StyleObject,
  /** #fa8072 */
  salmon: StyleObject,
  /** #f4a460 */
  sandybrown: StyleObject,
  /** #2e8b57 */
  seagreen: StyleObject,
  /** #fff5ee */
  seashell: StyleObject,
  /** #a0522d */
  sienna: StyleObject,
  /** #c0c0c0 */
  silver: StyleObject,
  /** #87ceeb */
  skyblue: StyleObject,
  /** #6a5acd */
  slateblue: StyleObject,
  /** #708090 */
  slategray: StyleObject,
  /** #708090 */
  slategrey: StyleObject,
  /** #fffafa */
  snow: StyleObject,
  /** #00ff7f */
  springgreen: StyleObject,
  /** #4682b4 */
  steelblue: StyleObject,
  /** #d2b48c */
  tan: StyleObject,
  /** #008080 */
  teal: StyleObject,
  /** #d8bfd8 */
  thistle: StyleObject,
  /** #ff6347 */
  tomato: StyleObject,
  /** #40e0d0 */
  turquoise: StyleObject,
  /** #ee82ee */
  violet: StyleObject,
  /** #f5deb3 */
  wheat: StyleObject,
  /** #ffffff */
  white: StyleObject,
  /** #f5f5f5 */
  whitesmoke: StyleObject,
  /** #ffff00 */
  yellow: StyleObject,
  /** #9acd32 */
  yellowgreen: StyleObject
}

export interface TransitionTimingFunctions {
  /** The first parameter specifies the number of intervals in the function. The second parameter, which is optional, is either the value “start” or “end”. */
  steps(count: number, dir?: "start" | "end"): StyleObject;
  /** Specifies a cubic-bezier curve. The four values specify points P1 and P2  of the curve as (x1, y1, x2, y2). */
  cubicBezier(x1: number, y1: number, x2: number, y2: number): StyleObject;
  /** Equivalent to cubic-bezier(0.25, 0.1, 0.25, 1.0). */
  "ease": StyleObject,
  /** Equivalent to cubic-bezier(0.42, 0, 1.0, 1.0). */
  "ease-in": StyleObject,
  /** Equivalent to cubic-bezier(0.42, 0, 0.58, 1.0). */
  "ease-in-out": StyleObject,
  /** Equivalent to cubic-bezier(0, 0, 0.58, 1.0). */
  "ease-out": StyleObject,
  /** Equivalent to cubic-bezier(0.0, 0.0, 1.0, 1.0). */
  "linear": StyleObject,
  /** Equivalent to steps(1, end). */
  "step-end": StyleObject,
  /** Equivalent to steps(1, start). */
  "step-start": StyleObject,
  // /** The first parameter specifies the number of intervals in the function. The second parameter, which is optional, is either the value “start” or “end”. */
  // "steps()": StyleObject,
  // /** Specifies a cubic-bezier curve. The four values specify points P1 and P2  of the curve as (x1, y1, x2, y2). */
  // "cubic-bezier()": StyleObject,
  /** Ease-in Back. Overshoots. */
  "cubic-bezier(0.6, -0.28, 0.735, 0.045)": StyleObject,
  /** Ease-in-out Back. Overshoots. */
  "cubic-bezier(0.68, -0.55, 0.265, 1.55)": StyleObject,
  /** Ease-out Back. Overshoots. */
  "cubic-bezier(0.175, 0.885, 0.32, 1.275)": StyleObject,
  /** Ease-in Circular. Based on half circle. */
  "cubic-bezier(0.6, 0.04, 0.98, 0.335)": StyleObject,
  /** Ease-in-out Circular. Based on half circle. */
  "cubic-bezier(0.785, 0.135, 0.15, 0.86)": StyleObject,
  /** Ease-out Circular. Based on half circle. */
  "cubic-bezier(0.075, 0.82, 0.165, 1)": StyleObject,
  /** Ease-in Cubic. Based on power of three. */
  "cubic-bezier(0.55, 0.055, 0.675, 0.19)": StyleObject,
  /** Ease-in-out Cubic. Based on power of three. */
  "cubic-bezier(0.645, 0.045, 0.355, 1)": StyleObject,
  /** Ease-out Cubic. Based on power of three. */
  "cubic-bezier(0.215, 0.610, 0.355, 1)": StyleObject,
  /** Ease-in Exponential. Based on two to the power ten. */
  "cubic-bezier(0.95, 0.05, 0.795, 0.035)": StyleObject,
  /** Ease-in-out Exponential. Based on two to the power ten. */
  "cubic-bezier(1, 0, 0, 1)": StyleObject,
  /** Ease-out Exponential. Based on two to the power ten. */
  "cubic-bezier(0.19, 1, 0.22, 1)": StyleObject,
  /** Ease-in Sine. */
  "cubic-bezier(0.47, 0, 0.745, 0.715)": StyleObject,
  /** Ease-in-out Sine. */
  "cubic-bezier(0.445, 0.05, 0.55, 0.95)": StyleObject,
  /** Ease-out Sine. */
  "cubic-bezier(0.39, 0.575, 0.565, 1)": StyleObject,
  /** Ease-in Quadratic. Based on power of two. */
  "cubic-bezier(0.55, 0.085, 0.68, 0.53)": StyleObject,
  /** Ease-in-out Quadratic. Based on power of two. */
  "cubic-bezier(0.455, 0.03, 0.515, 0.955)": StyleObject,
  /** Ease-out Quadratic. Based on power of two. */
  "cubic-bezier(0.25, 0.46, 0.45, 0.94)": StyleObject,
  /** Ease-in Quartic. Based on power of four. */
  "cubic-bezier(0.895, 0.03, 0.685, 0.22)": StyleObject,
  /** Ease-in-out Quartic. Based on power of four. */
  "cubic-bezier(0.77, 0, 0.175, 1)": StyleObject,
  /** Ease-out Quartic. Based on power of four. */
  "cubic-bezier(0.165, 0.84, 0.44, 1)": StyleObject,
  /** Ease-in Quintic. Based on power of five. */
  "cubic-bezier(0.755, 0.05, 0.855, 0.06)": StyleObject,
  /** Ease-in-out Quintic. Based on power of five. */
  "cubic-bezier(0.86, 0, 0.07, 1)": StyleObject,
  /** Ease-out Quintic. Based on power of five. */
  "cubic-bezier(0.23, 1, 0.320, 1)": StyleObject
}

export interface ColorFunctions {
  /** Creates a Color from red, green, and blue values. */
  rgb: (...params: Parameters<typeof rgb>) => StyleObject
  /** Creates a Color from red, green, blue, and alpha values. */
  rgba: (...params: Parameters<typeof rgba>) => StyleObject
  /** Creates a Color from hue, saturation, and lightness values. */
  hsl: (...params: Parameters<typeof hsl>) => StyleObject
  /** Creates a Color from hue, saturation, lightness, and alpha values. */
  hsla: (...params: Parameters<typeof hsla>) => StyleObject
  /** Creates a Color from hue, white and black. */
  hwb: (...params: Parameters<typeof hwb>) => StyleObject
}

export type LengthEntry = { [k in "in" | "px" | "pc" | "pt" | "cm" | "mm" | "Q" | "ch" | "ex" | "em" | "rem" | "vw" | "vh" | "vmax" | "vmin" ]: {[value: number]: StyleObject} }
export type PercentEntry = { [k in "percent" | "fr"]: {[value: number]: StyleObject} }
export type AngleEntry = { [k in "deg" | "grad" | "rad" | "turn"]: {[value: number]: StyleObject} }
export type TimeEntry = { [k in "s" | "ms"]: {[value: number]: StyleObject} }

export interface WideEntry {
  /** Represents the computed value of the property on the element's parent. */
  inherit: StyleObject
  /** Represents the value specified as the property's initial value. */
  initial: StyleObject
  /** Acts as either `inherit` or `initial`, depending on whether the property is inherited or not. */
  unset: StyleObject
  /** Evaluates the value of a custom variable. */
  var: (...params: Parameters<typeof $var>) => StyleObject
  /** Evaluates an mathematical expression. The following operators can be used: + - * /. */
  calc: (...params: Parameters<typeof calc>) => StyleObject
}

// TODO: turn other string func into real functions
export interface ImageFunctions {
  /** Reference an image file by URL */
  url: (...params: Parameters<typeof url>) => StyleObject
  /** Provide image fallbacks and annotations. */
  "image()": StyleObject,
  /** Provide multiple resolutions. Remember to use unprefixed image-set() in addition. */
  "-webkit-image-set()": StyleObject,
  /** Provide multiple resolutions of an image and const the UA decide which is most appropriate in a given situation. */
  "image-set()": StyleObject,
  /** Use an element in the document as an image. Remember to use unprefixed element() in addition. */
  "-moz-element()": StyleObject,
  /** Use an element in the document as an image. */
  "element()": StyleObject,
  /** Indicates the two images to be combined and how far along in the transition the combination is. */
  "cross-fade()": StyleObject,
  /** Deprecated. Use modern linear-gradient() or radial-gradient() instead. */
  "-webkit-gradient()": StyleObject,
  /** Linear gradient. Remember to use unprefixed version in addition. */
  "-webkit-linear-gradient()": StyleObject,
  /** Linear gradient. Remember to use unprefixed version in addition. */
  "-moz-linear-gradient()": StyleObject,
  /** Linear gradient. Remember to use unprefixed version in addition. */
  "-o-linear-gradient()": StyleObject,
  /** A linear gradient is created by specifying a straight gradient line, and then several colors placed along that line. */
  linearGradient: (...params: Parameters<typeof linearGradient>) => StyleObject
  /** Repeating Linear gradient. Remember to use unprefixed version in addition. */
  "-webkit-repeating-linear-gradient()": StyleObject,
  /** Repeating Linear gradient. Remember to use unprefixed version in addition. */
  "-moz-repeating-linear-gradient()": StyleObject,
  /** Repeating Linear gradient. Remember to use unprefixed version in addition. */
  "-o-repeating-linear-gradient()": StyleObject,
  /** Same as linear-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position. */
  repeatingLinearGradient: (...params: Parameters<typeof repeatingLinearGradient>) => StyleObject
  /** Radial gradient. Remember to use unprefixed version in addition. */
  "-webkit-radial-gradient()": StyleObject,
  /** Radial gradient. Remember to use unprefixed version in addition. */
  "-moz-radial-gradient()": StyleObject,
  /** Colors emerge from a single point and smoothly spread outward in a circular or elliptical shape. */
  radialGradient: (...params: Parameters<typeof radialGradient>) => StyleObject
  /** Repeating radial gradient. Remember to use unprefixed version in addition. */
  "-webkit-repeating-radial-gradient()": StyleObject,
  /** Repeating radial gradient. Remember to use unprefixed version in addition. */
  "-moz-repeating-radial-gradient()": StyleObject,
  /** Same as radial-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position. */
  repeatingRadialGradient: (...params: Parameters<typeof repeatingRadialGradient>) => StyleObject
}

export interface PositionEntry {
  /** Computes to ‘100%’ for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset. */
  "bottom": StyleObject
  /** Computes to ‘50%’ (‘left 50%’) for the horizontal position if the horizontal position is not otherwise specified, or ‘50%’ (‘top 50%’) for the vertical position if it is. */
  "center": StyleObject
  /** Computes to ‘0%’ for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset. */
  "left": StyleObject
  /** Computes to ‘100%’ for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset. */
  "right": StyleObject
  /** Computes to ‘0%’ for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset. */
  "top": StyleObject
};

export interface RepeatStyleEntry {
  /** Placed once and not repeated in this direction. */
  "no-repeat": StyleObject,
  /** Repeated in this direction as often as needed to cover the background painting area. */
  "repeat": StyleObject,
  /** Computes to ‘repeat no-repeat’. */
  "repeat-x": StyleObject,
  /** Computes to ‘no-repeat repeat’. */
  "repeat-y": StyleObject,
  /** Repeated as often as will fit within the background positioning area. If it doesn’t fit a whole number of times, it is rescaled so that it does. */
  "round": StyleObject,
  /** Repeated as often as will fit within the background positioning area without being clipped and then the images are spaced out to fill the area. */
  "space": StyleObject
};

export interface LineStyleEntry {
  /** A series of square-ended dashes. */
  "dashed": StyleObject,
  /** A series of round dots. */
  "dotted": StyleObject,
  /** Two parallel solid lines with some space between them. */
  "double": StyleObject,
  /** Looks as if it were carved in the canvas. */
  "groove": StyleObject,
  /** Same as ‘none’, but has different behavior in the border conflict resolution rules for border-collapsed tables. */
  "hidden": StyleObject,
  /** Looks as if the content on the inside of the border is sunken into the canvas. */
  "inset": StyleObject,
  /** No border. Color and width are ignored. */
  "none": StyleObject,
  /** Looks as if the content on the inside of the border is coming out of the canvas. */
  "outset": StyleObject,
  /** Looks as if it were coming out of the canvas. */
  "ridge": StyleObject,
  /** A single line segment. */
  "solid": StyleObject
};

export type LineWidthEntry = { [key in "medium" | "thick" | "thin"]: StyleObject };
export type AlphaEntry = { [key in Exclude<CSSAlphaValue, CSSPercentage>]: StyleObject };
export type IntegerEntry = { [ key in CSSInteger]: StyleObject };
export interface URLEntry {
  /** Reference a file by URL */
  url: (...params: Parameters<typeof url>) => StyleObject
}

export interface StringEntry {
  /** Generate quoted String */
  quote: (...params: Parameters<typeof quote>) => StyleObject
}

export interface BoxEntry {
  /** The background is painted within (clipped to) the border box. */
  "border-box": StyleObject
  /** The background is painted within (clipped to) the content box. */
  "content-box": StyleObject
  /** The background is painted within (clipped to) the padding box. */
  "padding-box": StyleObject
};

export interface GeometryBoxEntry {
  /** Uses the margin box as reference box. */
  "margin-box": StyleObject
  /** Uses the object bounding box as reference box. */
  "fill-box": StyleObject
  /** Uses the stroke bounding box as reference box. */
  "stroke-box": StyleObject
  /** Uses the nearest SVG viewport as reference box. */
  "view-box": StyleObject
};

export interface BasicShapeFunctions {
  /** Defines a circle. */
  circle: (...params: Parameters<typeof circle>) => StyleObject
  /** Defines an ellipse. */
  ellipse: (...params: Parameters<typeof ellipse>) => StyleObject
  /** Defines an inset rectangle. */
  inset: (...params: Parameters<typeof inset>) => StyleObject
  /** Defines a polygon. */
  polygon: (...params: Parameters<typeof polygon>) => StyleObject
};
