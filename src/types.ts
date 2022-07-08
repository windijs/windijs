export type StyleProperties = keyof Omit<CSSStyleDeclaration, "getPropertyPriority" | "getPropertyValue" | "item" | "removeProperty" | "setProperty" | "length">;

export type CSSColors = "aqua" | "black" | "blue" | "fuchsia" | "gray" | "green" | "lime" | "maroon" | "navy" | "olive" | "orange" | "purple" | "red" | "silver" | "teal" | "white" | "yellow" |
    "aliceblue" | "antiquewhite" | "aquamarine" | "azure" | "beige" | "bisque" | "blanchedalmond" | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" | "darkgreen" | "darkgrey" | "darkkhaki" | "darkmagenta" | "darkolivegreen" | "darkorange" | "darkorchid" | "darkred" | "darksalmon" | "darkseagreen" | "darkslateblue" | "darkslategray" | "darkslategrey" | "darkturquoise" | "darkviolet" | "deeppink" | "deepskyblue" | "dimgray" | "dimgrey" | "dodgerblue" | "firebrick" | "floralwhite" | "forestgreen" | "gainsboro" | "ghostwhite" | "gold" | "goldenrod" | "greenyellow" | "grey" | "honeydew" | "hotpink" | "indianred" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderblush" | "lawngreen" | "lemonchiffon" | "lightblue" | "lightcoral" | "lightcyan" | "lightgoldenrodyellow" | "lightgray" | "lightgreen" | "lightgrey" | "lightpink" | "lightsalmon" | "lightseagreen" | "lightskyblue" | "lightslategray" | "lightslategrey" | "lightsteelblue" | "lightyellow" | "limegreen" | "linen" | "magenta" | "mediumaquamarine" | "mediumblue" | "mediumorchid" | "mediumpurple" | "mediumseagreen" | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise" | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" | "moccasin" | "navajowhite" | "oldlace" | "olivedrab" | "orangered" | "orchid" | "palegoldenrod" | "palegreen" | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" | "peru" | "pink" | "plum" | "powderblue" | "rebeccapurple" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon" | "sandybrown" | "seagreen" | "seashell" | "sienna" | "skyblue" | "slateblue" | "slategray" | "slategrey" | "snow" | "springgreen" | "steelblue" | "tan" | "thistle" | "tomato" | "transparent" | "turquoise" | "violet" | "wheat" | "whitesmoke" | "yellowgreen"

export type CSSLength = number | string;
export type CSSAngle = number | string;
export type CSSPercentage = number | string;
export type CSSFlex = "1fr"; // number + fr
export type CSSFillRule = "nonzero" | "evenodd";

export type CSSAttributeType = "string" | "color" | "url" | "integer" | "number" | "length" | "em" | "ex" | "px" | "rem" | "vw" | "vh" | "vmin" | "vmax" | "mm" | "cm" | "in" | "pt" | "pc" | "angle" | "deg" | "grad" | "rad" | "time" | "s" | "ms" | "frequency" | "Hz" | "kHz";

export type NumberDict = { [key: number]: string };

export type CSSDict = {
  // eslint-disable-next-line no-unused-vars
  [key in StyleProperties]?: string;
}

export type CSSObject = CSSDict & {[key: string]: CSSObject | string}

export interface StyleObject {
    /** @internal */
    css: CSSObject
}

export type StyleBuilder = (key: string) => StyleObject;

// eslint-disable-next-line no-unused-vars
export type ObjectEntry<T> = { [key in keyof T]: StyleObject }

export interface BgColorStyle extends StyleObject {
    opacity: (op: number) => StyleObject
}

export type VariantBuilder = (...utilities: StyleObject[]) => StyleObject;
