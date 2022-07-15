// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Types

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

export type CSSDimensionObject = { value: number; type: string; valueOf(): string; toString(): string;}

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
  [ "left" | "center" | "right" | CSSLengthPercentage, ("top" | "center" | "bottom" | CSSLengthPercentage)? ] |
  [ "left" | "right", CSSLengthPercentage, "top" | "bottom", CSSLengthPercentage ];

export type CSSBorderRadiusItem = CSSLengthPercentage | [CSSLengthPercentage, CSSLengthPercentage] | [CSSLengthPercentage, CSSLengthPercentage, CSSLengthPercentage] | [CSSLengthPercentage, CSSLengthPercentage, CSSLengthPercentage, CSSLengthPercentage];
export type CSSBorderRadius = CSSBorderRadiusItem | [CSSBorderRadiusItem, CSSBorderRadiusItem]

// <color>

export type CSSAlphaValue = CSSPercentage | 0 | 0.005 | 0.01 | 0.015 | 0.02 | 0.025 | 0.03 | 0.035 | 0.04 | 0.045 | 0.05 | 0.055 | 0.06 | 0.065 | 0.07 | 0.075 | 0.08 | 0.085 | 0.09 | 0.095 | 0.1 | 0.105 | 0.11 | 0.115 | 0.12 | 0.125 | 0.13 | 0.135 | 0.14 | 0.145 | 0.15 | 0.155 | 0.16 | 0.165 | 0.17 | 0.175 | 0.18 | 0.185 | 0.19 | 0.195 | 0.2 | 0.205 | 0.21 | 0.215 | 0.22 | 0.225 | 0.23 | 0.235 | 0.24 | 0.245 | 0.25 | 0.255 | 0.26 | 0.265 | 0.27 | 0.275 | 0.28 | 0.285 | 0.29 | 0.295 | 0.3 | 0.305 | 0.31 | 0.315 | 0.32 | 0.325 | 0.33 | 0.335 | 0.34 | 0.345 | 0.35 | 0.355 | 0.36 | 0.365 | 0.37 | 0.375 | 0.38 | 0.385 | 0.39 | 0.395 | 0.4 | 0.405 | 0.41 | 0.415 | 0.42 | 0.425 | 0.43 | 0.435 | 0.44 | 0.445 | 0.45 | 0.455 | 0.46 | 0.465 | 0.47 | 0.475 | 0.48 | 0.485 | 0.49 | 0.495 | 0.5 | 0.505 | 0.51 | 0.515 | 0.52 | 0.525 | 0.53 | 0.535 | 0.54 | 0.545 | 0.55 | 0.555 | 0.56 | 0.565 | 0.57 | 0.575 | 0.58 | 0.585 | 0.59 | 0.595 | 0.6 | 0.605 | 0.61 | 0.615 | 0.62 | 0.625 | 0.63 | 0.635 | 0.64 | 0.645 | 0.65 | 0.655 | 0.66 | 0.665 | 0.67 | 0.675 | 0.68 | 0.685 | 0.69 | 0.695 | 0.7 | 0.705 | 0.71 | 0.715 | 0.72 | 0.725 | 0.73 | 0.735 | 0.74 | 0.745 | 0.75 | 0.755 | 0.76 | 0.765 | 0.77 | 0.775 | 0.78 | 0.785 | 0.79 | 0.795 | 0.8 | 0.805 | 0.81 | 0.815 | 0.82 | 0.825 | 0.83 | 0.835 | 0.84 | 0.845 | 0.85 | 0.855 | 0.86 | 0.865 | 0.87 | 0.875 | 0.88 | 0.885 | 0.89 | 0.895 | 0.9 | 0.905 | 0.91 | 0.915 | 0.92 | 0.925 | 0.93 | 0.935 | 0.94 | 0.945 | 0.95 | 0.955 | 0.96 | 0.965 | 0.97 | 0.975 | 0.98 | 0.985 | 0.99 | 0.995 | 1;

export type StyleProperties = keyof Omit<CSSStyleDeclaration, "getPropertyPriority" | "getPropertyValue" | "item" | "removeProperty" | "setProperty" | "length">;

export type CSSColors = "aqua" | "black" | "blue" | "fuchsia" | "gray" | "green" | "lime" | "maroon" | "navy" | "olive" | "orange" | "purple" | "red" | "silver" | "teal" | "white" | "yellow" |
    "aliceblue" | "antiquewhite" | "aquamarine" | "azure" | "beige" | "bisque" | "blanchedalmond" | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" | "darkgreen" | "darkgrey" | "darkkhaki" | "darkmagenta" | "darkolivegreen" | "darkorange" | "darkorchid" | "darkred" | "darksalmon" | "darkseagreen" | "darkslateblue" | "darkslategray" | "darkslategrey" | "darkturquoise" | "darkviolet" | "deeppink" | "deepskyblue" | "dimgray" | "dimgrey" | "dodgerblue" | "firebrick" | "floralwhite" | "forestgreen" | "gainsboro" | "ghostwhite" | "gold" | "goldenrod" | "greenyellow" | "grey" | "honeydew" | "hotpink" | "indianred" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderblush" | "lawngreen" | "lemonchiffon" | "lightblue" | "lightcoral" | "lightcyan" | "lightgoldenrodyellow" | "lightgray" | "lightgreen" | "lightgrey" | "lightpink" | "lightsalmon" | "lightseagreen" | "lightskyblue" | "lightslategray" | "lightslategrey" | "lightsteelblue" | "lightyellow" | "limegreen" | "linen" | "magenta" | "mediumaquamarine" | "mediumblue" | "mediumorchid" | "mediumpurple" | "mediumseagreen" | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise" | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" | "moccasin" | "navajowhite" | "oldlace" | "olivedrab" | "orangered" | "orchid" | "palegoldenrod" | "palegreen" | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" | "peru" | "pink" | "plum" | "powderblue" | "rebeccapurple" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon" | "sandybrown" | "seagreen" | "seashell" | "sienna" | "skyblue" | "slateblue" | "slategray" | "slategrey" | "snow" | "springgreen" | "steelblue" | "tan" | "thistle" | "tomato" | "transparent" | "turquoise" | "violet" | "wheat" | "whitesmoke" | "yellowgreen"

export type CSSFillRule = "nonzero" | "evenodd";

export type CSSAttributeType = "string" | "color" | "url" | "integer" | "number" | "length" | "em" | "ex" | "px" | "rem" | "vw" | "vh" | "vmin" | "vmax" | "mm" | "cm" | "in" | "pt" | "pc" | "angle" | "deg" | "grad" | "rad" | "time" | "s" | "ms" | "frequency" | "Hz" | "kHz";

export type ColorProperties = "accentColor" | "backgroundColor" | "webkitBackgroundColor" | "webkitBorderAfterColor" | "webkitBorderBeforeColor" | "borderBlockColor" | "borderBlockEndColor" | "borderBlockStartColor" | "borderBottomColor" | "borderColor" | "webkitBorderEndColor" | "borderInlineColor" | "borderInlineEndColor" | "borderInlineStartColor" | "borderLeftColor" | "borderRightColor" | "webkitBorderStartColor" | "borderTopColor" | "caretColor" | "color" | "columnRuleColor" | "webkitColumnRuleColor" | "webkitCompositionFillColor" | "webkitCompositionFrameColor" | "fillColor" | "floodColor" | "lightingColor" | "webkitMatchNearestMailBlockquoteColor" | "outlineColor" | "scrollbarArrowColor" | "scrollbarBaseColor" | "scrollbarColor" | "scrollbarDarkShadowColor" | "scrollbarDarkshadowColor" | "scrollbarFaceColor" | "scrollbarHighlightColor" | "scrollbarShadowColor" | "scrollbarTrackColor" | "scrollbar3dLightColor" | "scrollbar3dlightColor" | "solidColor" | "stopColor" | "strokeColor" | "webkitTapHighlightColor" | "textDecorationColor" | "webkitTextDecorationColor" | "textEmphasisColor" | "webkitTextEmphasisColor" | "webkitTextFillColor" | "textLineThroughColor" | "textOverlineColor" | "webkitTextStrokeColor" | "textUnderlineColor";
