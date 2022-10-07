import { Theme } from "@windijs/config";
export declare type GeneralCSSData = CSSDecls & {
    [key in keyof CSSDecls]: {
        [key: string]: StyleObject;
    };
} & {
    [key: string]: {
        [key: string]: StyleObject;
    };
};
export declare type CSSProps = {
    [prop in keyof CSSDecls]?: {
        [value in keyof CSSDecls[prop]]?: CSSDecls[prop][value] extends Function ? value extends string ? `${value}()` : value : value extends CSSLengthType | CSSAngleType | CSSTimeType | CSSResolutionType | CSSFrequencyType ? `0${value}` : value extends "percent" ? "0%" : value extends "fr" ? "0fr" : value;
    }[keyof CSSDecls[prop]] | String | string[];
};
declare type ExtractAttrName<S extends string> = S extends `${string}[${infer A}]` ? A : S;
export declare type GeneralHTMLAttrs<T> = {
    [key in ExtractAttrName<keyof HTMLAttrs<unknown>>]: T;
} & {
    [key: string]: T;
};
export declare type CSSBlockBody = (string | {
    selector: string;
    body: CSSBlockBody;
})[];
export declare type CSSDecl = {
    property: string;
    value: string | string[];
};
export declare type CSSRule = {
    selector: string;
    children: CSSDecl[];
};
export declare type CSSAtRule = {
    rule: string;
    children: CSSRules;
};
export declare type CSSRules = (CSSRule | CSSAtRule)[];
export declare type CSSStyleSheet = {
    rules: CSSRules;
};
export declare type CSSSelector = String | keyof CSSClasses<unknown> | keyof CSSElements<unknown> | keyof HTMLTags<unknown> | keyof HTMLAttrs<unknown>;
export declare type CSSObject = CSSProps & Partial<CSSAtRules<CSSObject>> & Partial<CSSClasses<CSSObject>> & Partial<CSSElements<CSSObject>> & Partial<HTMLTags<CSSObject>> & Partial<HTMLAttrs<CSSObject>> & {
    [key: string]: CSSObject | CSSMap | String | string[] | number;
};
export declare type CSSMap = Map<keyof CSSProps, string> & Map<keyof CSSAtRules<CSSObject>, CSSObject | CSSMap> & Map<keyof CSSClasses<CSSObject>, CSSObject | CSSMap> & Map<keyof CSSElements<CSSObject>, CSSObject | CSSMap> & Map<keyof HTMLTags<CSSObject>, CSSObject | CSSMap> & Map<string, CSSObject | CSSMap | String | string[] | number>;
export declare type CSSPrefixer = (css: CSSObject) => CSSObject;
export declare type NumberDict = {
    [key: number]: string;
};
export declare type MetaType = "css" | "setup" | "static" | "color" | "generic" | "variant";
export declare type UtilityMeta = {
    uid: string;
    type: MetaType;
    props: string[];
    variants: string[];
} & {
    [key: string]: unknown;
};
export interface StyleObjectBase {
}
export declare type StyleObject<T = {}> = StyleObjectBase & {
    readonly css: CSSObject | CSSMap;
    readonly meta: UtilityMeta;
} & T;
export declare type SafeEntry<T extends {
    DEFAULT?: unknown;
}> = T["DEFAULT"] extends undefined | null | never ? Omit<T, "DEFAULT"> : Omit<T, "DEFAULT"> & T["DEFAULT"];
export declare type StyleEntry<T> = SafeEntry<{
    [key in keyof T]: StyleObject;
}>;
export interface BaseHandler<R> {
    type: string | string;
    meta?: object;
    get: (prop: string) => R;
}
export interface ConfigHandler<R> extends BaseHandler<R> {
    type: "config";
    meta: {
        config: object;
    };
}
export interface ColorHandler<R> extends BaseHandler<R> {
    type: "color";
    meta: {
        colors: object;
        op: string | undefined;
    };
}
export interface CSSHandler<R> extends BaseHandler<R> {
    type: "css";
}
export interface StyleHandler<R> extends BaseHandler<R> {
    type: "style";
}
export interface CallHandler<R> extends BaseHandler<R> {
    type: "call";
}
export interface NumberHandler<R> extends BaseHandler<R> {
    type: "number";
    meta: {
        size: "" | CSSDimensionType;
    };
}
export interface SpacingHandler<R> extends BaseHandler<R> {
    type: "spacing";
}
export interface FractionHandler<R> extends BaseHandler<R> {
    type: "fraction";
}
export interface GenericHandler<R> extends BaseHandler<R> {
    type: "generic";
}
export interface MeldHandler<R> extends BaseHandler<R> {
    type: "meld";
    meta: {
        handlers: Handler<unknown>[];
    };
}
export interface SetupHandler<R> extends BaseHandler<R> {
    type: "setup";
    meta: {
        config: object;
    };
}
export interface GuardHandler<R> extends BaseHandler<R> {
    type: "guard";
    meta: {
        key: string;
        handler: Handler<unknown>;
    };
}
export declare type Handler<R> = ConfigHandler<R> | ColorHandler<R> | CSSHandler<R> | StyleHandler<R> | CallHandler<R> | NumberHandler<R> | SpacingHandler<R> | FractionHandler<R> | GenericHandler<R> | SetupHandler<R> | GuardHandler<R> | MeldHandler<R>;
export declare type UnknownDict = {
    [key: string]: unknown;
};
export declare type TargetCreator = (css: CSSObject | CSSMap, meta: UtilityMeta, data?: UnknownDict) => StyleObjectBase;
export declare type StyleLoader = (css: CSSObject | CSSMap, meta: UtilityMeta, data?: UnknownDict) => StyleObject;
export declare type StyleNamer = (style: StyleObject) => string;
export declare type Utilities = StyleObject | null | undefined | Utilities[];
export declare type VariantBuilder = (...utilities: Utilities[]) => StyleObject[];
export declare type NestedProxy<T, O> = SafeEntry<{
    [key in keyof T]: T[key] extends object ? (T[key] extends Array<unknown> ? O : NestedProxy<T[key], O>) : O;
}>;
export declare type StyleProxy<T, O = {}> = NestedProxy<T, StyleObject<O>>;
export declare type StyleProxyHandler<T> = Handler<StyleProxy<T>>;
export declare type ColorStyleObject = StyleObject<{
    opacity: (op: number) => StyleObject<{
        get gradient(): StyleObject;
    }>;
    get gradient(): StyleObject;
}>;
export declare type ColorStyleProxy<T> = NestedProxy<T, ColorStyleObject>;
export declare type PickValue<T, ValueType> = Pick<T, {
    [key in keyof T]-?: T[key] extends ValueType ? key : never;
}[keyof T]>;
export declare type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}` ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}` : Lowercase<S>;
export declare type BuildFunc<V = unknown, O extends object = {}> = (value: V) => StyleObject<O> | undefined;
export declare const initial = "initial";
export declare const inherit = "inherit";
export declare const unset = "unset";
export declare const none = "none";
export declare type CSSInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export declare type CSSDimensionObject = {
    value: number;
    type: string;
    valueOf(): string;
    toString(): string;
};
export declare type CSSLengthType = "px" | "cm" | "mm" | "Q" | "in" | "pc" | "pt" | "ch" | "ex" | "em" | "rem" | "vh" | "vmax" | "vmin" | "vw";
export declare type CSSAngleType = "deg" | "grad" | "rad" | "turn";
export declare type CSSResolutionType = "dpi" | "dpcm" | "dppx" | "x";
export declare type CSSTimeType = "s" | "ms";
export declare type CSSPercentageType = "percent";
export declare type CSSFlexType = "fr";
export declare type CSSFrequencyType = "Hz" | "kHz";
export declare type CSSSideOrCorner = "to top" | "to bottom" | "to left" | "to right" | "to left top" | "to left bottom" | "to right top" | "to right bottom";
export declare type CSSLength = (CSSDimensionObject & {
    type: CSSLengthType;
}) | 0;
export declare type CSSPercentage = (CSSDimensionObject & {
    type: CSSPercentageType;
}) | 0;
export declare type CSSAngle = (CSSDimensionObject & {
    type: CSSAngleType;
}) | 0;
export declare type CSSTime = (CSSDimensionObject & {
    type: CSSTimeType;
}) | 0;
export declare type CSSFlex = (CSSDimensionObject & {
    type: CSSFlexType;
}) | 0;
export declare type CSSFrequency = (CSSDimensionObject & {
    type: CSSFrequencyType;
}) | 0;
export declare type CSSResolution = (CSSDimensionObject & {
    type: CSSResolutionType;
}) | 0;
export declare type CSSDimension = CSSLength | CSSAngle | CSSTime | CSSResolution;
export declare type CSSDimensionType = CSSLengthType | CSSAngleType | CSSResolutionType | CSSTimeType | CSSFlexType | CSSFrequencyType;
export declare type CSSLengthPercentage = CSSLength | CSSPercentage;
export declare type CSSAnglePercentage = CSSAngle | CSSPercentage;
export declare type CSSTimePercentage = CSSTime | CSSPercentage;
export declare type CSSFrequencyPercentage = CSSFrequency | CSSPercentage;
export declare type CSSColorHint = CSSLengthPercentage;
export declare type CSSLinearColorStopOrHint = string | CSSColorHint | [
    string,
    CSSLengthPercentage,
    CSSLengthPercentage?
];
export declare type CSSAngularColorStopOrHint = string | CSSAngle | [
    string,
    CSSAngle,
    CSSAngle?
];
export declare type CSSPosition = "left" | "center" | "right" | "top" | "center" | "bottom" | [
    "left" | "center" | "right" | CSSLengthPercentage,
    ("top" | "center" | "bottom" | CSSLengthPercentage)?
] | [
    "left" | "right",
    CSSLengthPercentage,
    "top" | "bottom",
    CSSLengthPercentage
];
export declare type CSSBorderRadiusItem = CSSLengthPercentage | [
    CSSLengthPercentage,
    CSSLengthPercentage
] | [
    CSSLengthPercentage,
    CSSLengthPercentage,
    CSSLengthPercentage
] | [
    CSSLengthPercentage,
    CSSLengthPercentage,
    CSSLengthPercentage,
    CSSLengthPercentage
];
export declare type CSSBorderRadius = CSSBorderRadiusItem | [
    CSSBorderRadiusItem,
    CSSBorderRadiusItem
];
export declare type CSSAlphaValue = CSSPercentage | 0 | 0.005 | 0.01 | 0.015 | 0.02 | 0.025 | 0.03 | 0.035 | 0.04 | 0.045 | 0.05 | 0.055 | 0.06 | 0.065 | 0.07 | 0.075 | 0.08 | 0.085 | 0.09 | 0.095 | 0.1 | 0.105 | 0.11 | 0.115 | 0.12 | 0.125 | 0.13 | 0.135 | 0.14 | 0.145 | 0.15 | 0.155 | 0.16 | 0.165 | 0.17 | 0.175 | 0.18 | 0.185 | 0.19 | 0.195 | 0.2 | 0.205 | 0.21 | 0.215 | 0.22 | 0.225 | 0.23 | 0.235 | 0.24 | 0.245 | 0.25 | 0.255 | 0.26 | 0.265 | 0.27 | 0.275 | 0.28 | 0.285 | 0.29 | 0.295 | 0.3 | 0.305 | 0.31 | 0.315 | 0.32 | 0.325 | 0.33 | 0.335 | 0.34 | 0.345 | 0.35 | 0.355 | 0.36 | 0.365 | 0.37 | 0.375 | 0.38 | 0.385 | 0.39 | 0.395 | 0.4 | 0.405 | 0.41 | 0.415 | 0.42 | 0.425 | 0.43 | 0.435 | 0.44 | 0.445 | 0.45 | 0.455 | 0.46 | 0.465 | 0.47 | 0.475 | 0.48 | 0.485 | 0.49 | 0.495 | 0.5 | 0.505 | 0.51 | 0.515 | 0.52 | 0.525 | 0.53 | 0.535 | 0.54 | 0.545 | 0.55 | 0.555 | 0.56 | 0.565 | 0.57 | 0.575 | 0.58 | 0.585 | 0.59 | 0.595 | 0.6 | 0.605 | 0.61 | 0.615 | 0.62 | 0.625 | 0.63 | 0.635 | 0.64 | 0.645 | 0.65 | 0.655 | 0.66 | 0.665 | 0.67 | 0.675 | 0.68 | 0.685 | 0.69 | 0.695 | 0.7 | 0.705 | 0.71 | 0.715 | 0.72 | 0.725 | 0.73 | 0.735 | 0.74 | 0.745 | 0.75 | 0.755 | 0.76 | 0.765 | 0.77 | 0.775 | 0.78 | 0.785 | 0.79 | 0.795 | 0.8 | 0.805 | 0.81 | 0.815 | 0.82 | 0.825 | 0.83 | 0.835 | 0.84 | 0.845 | 0.85 | 0.855 | 0.86 | 0.865 | 0.87 | 0.875 | 0.88 | 0.885 | 0.89 | 0.895 | 0.9 | 0.905 | 0.91 | 0.915 | 0.92 | 0.925 | 0.93 | 0.935 | 0.94 | 0.945 | 0.95 | 0.955 | 0.96 | 0.965 | 0.97 | 0.975 | 0.98 | 0.985 | 0.99 | 0.995 | 1;
export declare type StyleProperties = keyof Omit<CSSStyleDeclaration, "getPropertyPriority" | "getPropertyValue" | "item" | "removeProperty" | "setProperty" | "length">;
export declare type CSSColors = "currentColor" | "aqua" | "black" | "blue" | "fuchsia" | "gray" | "green" | "lime" | "maroon" | "navy" | "olive" | "orange" | "purple" | "red" | "silver" | "teal" | "white" | "yellow" | "aliceblue" | "antiquewhite" | "aquamarine" | "azure" | "beige" | "bisque" | "blanchedalmond" | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" | "darkgreen" | "darkgrey" | "darkkhaki" | "darkmagenta" | "darkolivegreen" | "darkorange" | "darkorchid" | "darkred" | "darksalmon" | "darkseagreen" | "darkslateblue" | "darkslategray" | "darkslategrey" | "darkturquoise" | "darkviolet" | "deeppink" | "deepskyblue" | "dimgray" | "dimgrey" | "dodgerblue" | "firebrick" | "floralwhite" | "forestgreen" | "gainsboro" | "ghostwhite" | "gold" | "goldenrod" | "greenyellow" | "grey" | "honeydew" | "hotpink" | "indianred" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderblush" | "lawngreen" | "lemonchiffon" | "lightblue" | "lightcoral" | "lightcyan" | "lightgoldenrodyellow" | "lightgray" | "lightgreen" | "lightgrey" | "lightpink" | "lightsalmon" | "lightseagreen" | "lightskyblue" | "lightslategray" | "lightslategrey" | "lightsteelblue" | "lightyellow" | "limegreen" | "linen" | "magenta" | "mediumaquamarine" | "mediumblue" | "mediumorchid" | "mediumpurple" | "mediumseagreen" | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise" | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" | "moccasin" | "navajowhite" | "oldlace" | "olivedrab" | "orangered" | "orchid" | "palegoldenrod" | "palegreen" | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" | "peru" | "pink" | "plum" | "powderblue" | "rebeccapurple" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon" | "sandybrown" | "seagreen" | "seashell" | "sienna" | "skyblue" | "slateblue" | "slategray" | "slategrey" | "snow" | "springgreen" | "steelblue" | "tan" | "thistle" | "tomato" | "transparent" | "turquoise" | "violet" | "wheat" | "whitesmoke" | "yellowgreen";
export declare type CSSFillRule = "nonzero" | "evenodd";
export declare type CSSDataTypes = "string" | "url" | "integer" | "number" | "dimension" | "percentage" | "ratio" | "flex" | "length" | "angle" | "time" | "frequency" | "resolution" | "length-percentage" | "frequency-percentage" | "angle-percentage" | "time-percentage" | "color" | "alpha-value" | "image" | "position";
export declare type CSSAttributeType = "string" | "color" | "url" | "integer" | "number" | "length" | "em" | "ex" | "px" | "rem" | "vw" | "vh" | "vmin" | "vmax" | "mm" | "cm" | "in" | "pt" | "pc" | "angle" | "deg" | "grad" | "rad" | "time" | "s" | "ms" | "frequency" | "Hz" | "kHz";
export declare type ColorProperties = "accentColor" | "backgroundColor" | "webkitBackgroundColor" | "webkitBorderAfterColor" | "webkitBorderBeforeColor" | "borderBlockColor" | "borderBlockEndColor" | "borderBlockStartColor" | "borderBottomColor" | "borderColor" | "webkitBorderEndColor" | "borderInlineColor" | "borderInlineEndColor" | "borderInlineStartColor" | "borderLeftColor" | "borderRightColor" | "webkitBorderStartColor" | "borderTopColor" | "caretColor" | "color" | "columnRuleColor" | "webkitColumnRuleColor" | "webkitCompositionFillColor" | "webkitCompositionFrameColor" | "fillColor" | "floodColor" | "lightingColor" | "webkitMatchNearestMailBlockquoteColor" | "outlineColor" | "scrollbarArrowColor" | "scrollbarBaseColor" | "scrollbarColor" | "scrollbarDarkShadowColor" | "scrollbarDarkshadowColor" | "scrollbarFaceColor" | "scrollbarHighlightColor" | "scrollbarShadowColor" | "scrollbarTrackColor" | "scrollbar3dLightColor" | "scrollbar3dlightColor" | "solidColor" | "stopColor" | "strokeColor" | "webkitTapHighlightColor" | "textDecorationColor" | "webkitTextDecorationColor" | "textEmphasisColor" | "webkitTextEmphasisColor" | "webkitTextFillColor" | "textLineThroughColor" | "textOverlineColor" | "webkitTextStrokeColor" | "textUnderlineColor";
declare type EnvInsetValue = "safe-area-inset-top" | "safe-area-inset-right" | "safe-area-inset-bottom" | "safe-area-inset-left titlebar-area-x" | "titlebar-area-y" | "titlebar-area-width" | "titlebar-area-height";
export interface CSSFunctions {
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
    calc(expr: string | CSSDimension | CSSPercentage | number): string;
    clamp(min: CSSLength, val: CSSLength, max: CSSLength): string;
    max(...exprs: (string | CSSDimension | CSSPercentage | number)[]): string;
    min(...exprs: (string | CSSDimension | CSSPercentage | number)[]): string;
    abs(expr: string | CSSDimension | CSSPercentage | number): string;
    sign(expr: string | CSSDimension | CSSPercentage | number): string;
    blur(radius: CSSLength): string;
    brightness(amount: number | CSSPercentage): string;
    contrast(amount: number | CSSPercentage): string;
    grayscale(amount: number | CSSPercentage): string;
    invert(amount: number | CSSPercentage): string;
    opacity(amount: number | CSSPercentage): string;
    saturate(amount: number | CSSPercentage): string;
    sepia(amount: number | CSSPercentage): string;
    /** Creates a Color from red, green, and blue values. */
    rgb(red: number, green: number, blue: number): string;
    /** Creates a Color from red, green, blue, and alpha values. */
    rgba(red: number, green: number, blue: number, alpha: CSSAlphaValue): string;
    /** Creates a Color from hue, saturation, and lightness values. */
    hsl(hue: number, saturation: CSSPercentage, lightness: CSSPercentage): string;
    /** Creates a Color from hue, saturation, lightness, and alpha values. */
    hsla(hue: number, saturation: CSSPercentage, lightness: CSSPercentage, alpha: CSSAlphaValue): string;
    counter(name: string, style?: string): string;
    env(inset: EnvInsetValue | string, fallback?: CSSLength): string;
    minmax(min: CSSLengthPercentage | CSSFlex | "max-content" | "min-content" | "auto", max: CSSLengthPercentage | CSSFlex | "max-content" | "min-content" | "auto"): string;
    repeat(repeatCount: "auto-fill" | "auto-fit" | number, tracks: string | CSSDimension | CSSPercentage | CSSFlex | number): string;
    hueRotate(angle: CSSAngle): string;
    fitContent(lengthOrPercent: CSSLengthPercentage): string;
    cubicBezier(x1: number, y1: number, x2: number, y2: number): string;
    linearGradient(direction: CSSSideOrCorner | CSSAngle, ...colorStops: CSSLinearColorStopOrHint[]): string;
    radialGradient(...colors: CSSLinearColorStopOrHint[]): string;
    radialGradient(shapeSizeAtPosition: string | undefined, ...colors: CSSLinearColorStopOrHint[]): string;
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
    currentColor: StyleObject;
    /** Fully transparent. This keyword can be considered a shorthand for rgba(0,0,0,0) which is its computed value. */
    transparent: StyleObject;
    /** #f0f8ff */
    aliceblue: StyleObject;
    /** #faebd7 */
    antiquewhite: StyleObject;
    /** #00ffff */
    aqua: StyleObject;
    /** #7fffd4 */
    aquamarine: StyleObject;
    /** #f0ffff */
    azure: StyleObject;
    /** #f5f5dc */
    beige: StyleObject;
    /** #ffe4c4 */
    bisque: StyleObject;
    /** #000000 */
    black: StyleObject;
    /** #ffebcd */
    blanchedalmond: StyleObject;
    /** #0000ff */
    blue: StyleObject;
    /** #8a2be2 */
    blueviolet: StyleObject;
    /** #a52a2a */
    brown: StyleObject;
    /** #deb887 */
    burlywood: StyleObject;
    /** #5f9ea0 */
    cadetblue: StyleObject;
    /** #7fff00 */
    chartreuse: StyleObject;
    /** #d2691e */
    chocolate: StyleObject;
    /** #ff7f50 */
    coral: StyleObject;
    /** #6495ed */
    cornflowerblue: StyleObject;
    /** #fff8dc */
    cornsilk: StyleObject;
    /** #dc143c */
    crimson: StyleObject;
    /** #00ffff */
    cyan: StyleObject;
    /** #00008b */
    darkblue: StyleObject;
    /** #008b8b */
    darkcyan: StyleObject;
    /** #b8860b */
    darkgoldenrod: StyleObject;
    /** #a9a9a9 */
    darkgray: StyleObject;
    /** #a9a9a9 */
    darkgrey: StyleObject;
    /** #006400 */
    darkgreen: StyleObject;
    /** #bdb76b */
    darkkhaki: StyleObject;
    /** #8b008b */
    darkmagenta: StyleObject;
    /** #556b2f */
    darkolivegreen: StyleObject;
    /** #ff8c00 */
    darkorange: StyleObject;
    /** #9932cc */
    darkorchid: StyleObject;
    /** #8b0000 */
    darkred: StyleObject;
    /** #e9967a */
    darksalmon: StyleObject;
    /** #8fbc8f */
    darkseagreen: StyleObject;
    /** #483d8b */
    darkslateblue: StyleObject;
    /** #2f4f4f */
    darkslategray: StyleObject;
    /** #2f4f4f */
    darkslategrey: StyleObject;
    /** #00ced1 */
    darkturquoise: StyleObject;
    /** #9400d3 */
    darkviolet: StyleObject;
    /** #ff1493 */
    deeppink: StyleObject;
    /** #00bfff */
    deepskyblue: StyleObject;
    /** #696969 */
    dimgray: StyleObject;
    /** #696969 */
    dimgrey: StyleObject;
    /** #1e90ff */
    dodgerblue: StyleObject;
    /** #b22222 */
    firebrick: StyleObject;
    /** #fffaf0 */
    floralwhite: StyleObject;
    /** #228b22 */
    forestgreen: StyleObject;
    /** #ff00ff */
    fuchsia: StyleObject;
    /** #dcdcdc */
    gainsboro: StyleObject;
    /** #f8f8ff */
    ghostwhite: StyleObject;
    /** #ffd700 */
    gold: StyleObject;
    /** #daa520 */
    goldenrod: StyleObject;
    /** #808080 */
    gray: StyleObject;
    /** #808080 */
    grey: StyleObject;
    /** #008000 */
    green: StyleObject;
    /** #adff2f */
    greenyellow: StyleObject;
    /** #f0fff0 */
    honeydew: StyleObject;
    /** #ff69b4 */
    hotpink: StyleObject;
    /** #cd5c5c */
    indianred: StyleObject;
    /** #4b0082 */
    indigo: StyleObject;
    /** #fffff0 */
    ivory: StyleObject;
    /** #f0e68c */
    khaki: StyleObject;
    /** #e6e6fa */
    lavender: StyleObject;
    /** #fff0f5 */
    lavenderblush: StyleObject;
    /** #7cfc00 */
    lawngreen: StyleObject;
    /** #fffacd */
    lemonchiffon: StyleObject;
    /** #add8e6 */
    lightblue: StyleObject;
    /** #f08080 */
    lightcoral: StyleObject;
    /** #e0ffff */
    lightcyan: StyleObject;
    /** #fafad2 */
    lightgoldenrodyellow: StyleObject;
    /** #d3d3d3 */
    lightgray: StyleObject;
    /** #d3d3d3 */
    lightgrey: StyleObject;
    /** #90ee90 */
    lightgreen: StyleObject;
    /** #ffb6c1 */
    lightpink: StyleObject;
    /** #ffa07a */
    lightsalmon: StyleObject;
    /** #20b2aa */
    lightseagreen: StyleObject;
    /** #87cefa */
    lightskyblue: StyleObject;
    /** #778899 */
    lightslategray: StyleObject;
    /** #778899 */
    lightslategrey: StyleObject;
    /** #b0c4de */
    lightsteelblue: StyleObject;
    /** #ffffe0 */
    lightyellow: StyleObject;
    /** #00ff00 */
    lime: StyleObject;
    /** #32cd32 */
    limegreen: StyleObject;
    /** #faf0e6 */
    linen: StyleObject;
    /** #ff00ff */
    magenta: StyleObject;
    /** #800000 */
    maroon: StyleObject;
    /** #66cdaa */
    mediumaquamarine: StyleObject;
    /** #0000cd */
    mediumblue: StyleObject;
    /** #ba55d3 */
    mediumorchid: StyleObject;
    /** #9370d8 */
    mediumpurple: StyleObject;
    /** #3cb371 */
    mediumseagreen: StyleObject;
    /** #7b68ee */
    mediumslateblue: StyleObject;
    /** #00fa9a */
    mediumspringgreen: StyleObject;
    /** #48d1cc */
    mediumturquoise: StyleObject;
    /** #c71585 */
    mediumvioletred: StyleObject;
    /** #191970 */
    midnightblue: StyleObject;
    /** #f5fffa */
    mintcream: StyleObject;
    /** #ffe4e1 */
    mistyrose: StyleObject;
    /** #ffe4b5 */
    moccasin: StyleObject;
    /** #ffdead */
    navajowhite: StyleObject;
    /** #000080 */
    navy: StyleObject;
    /** #fdf5e6 */
    oldlace: StyleObject;
    /** #808000 */
    olive: StyleObject;
    /** #6b8e23 */
    olivedrab: StyleObject;
    /** #ffa500 */
    orange: StyleObject;
    /** #ff4500 */
    orangered: StyleObject;
    /** #da70d6 */
    orchid: StyleObject;
    /** #eee8aa */
    palegoldenrod: StyleObject;
    /** #98fb98 */
    palegreen: StyleObject;
    /** #afeeee */
    paleturquoise: StyleObject;
    /** #d87093 */
    palevioletred: StyleObject;
    /** #ffefd5 */
    papayawhip: StyleObject;
    /** #ffdab9 */
    peachpuff: StyleObject;
    /** #cd853f */
    peru: StyleObject;
    /** #ffc0cb */
    pink: StyleObject;
    /** #dda0dd */
    plum: StyleObject;
    /** #b0e0e6 */
    powderblue: StyleObject;
    /** #800080 */
    purple: StyleObject;
    /** #ff0000 */
    red: StyleObject;
    /** #663399 */
    rebeccapurple: StyleObject;
    /** #bc8f8f */
    rosybrown: StyleObject;
    /** #4169e1 */
    royalblue: StyleObject;
    /** #8b4513 */
    saddlebrown: StyleObject;
    /** #fa8072 */
    salmon: StyleObject;
    /** #f4a460 */
    sandybrown: StyleObject;
    /** #2e8b57 */
    seagreen: StyleObject;
    /** #fff5ee */
    seashell: StyleObject;
    /** #a0522d */
    sienna: StyleObject;
    /** #c0c0c0 */
    silver: StyleObject;
    /** #87ceeb */
    skyblue: StyleObject;
    /** #6a5acd */
    slateblue: StyleObject;
    /** #708090 */
    slategray: StyleObject;
    /** #708090 */
    slategrey: StyleObject;
    /** #fffafa */
    snow: StyleObject;
    /** #00ff7f */
    springgreen: StyleObject;
    /** #4682b4 */
    steelblue: StyleObject;
    /** #d2b48c */
    tan: StyleObject;
    /** #008080 */
    teal: StyleObject;
    /** #d8bfd8 */
    thistle: StyleObject;
    /** #ff6347 */
    tomato: StyleObject;
    /** #40e0d0 */
    turquoise: StyleObject;
    /** #ee82ee */
    violet: StyleObject;
    /** #f5deb3 */
    wheat: StyleObject;
    /** #ffffff */
    white: StyleObject;
    /** #f5f5f5 */
    whitesmoke: StyleObject;
    /** #ffff00 */
    yellow: StyleObject;
    /** #9acd32 */
    yellowgreen: StyleObject;
}
export interface TransitionTimingFunctions {
    /** The first parameter specifies the number of intervals in the function. The second parameter, which is optional, is either the value “start” or “end”. */
    steps(count: number, dir?: "start" | "end"): StyleObject;
    /** Specifies a cubic-bezier curve. The four values specify points P1 and P2  of the curve as (x1, y1, x2, y2). */
    cubicBezier(x1: number, y1: number, x2: number, y2: number): StyleObject;
    /** Equivalent to cubic-bezier(0.25, 0.1, 0.25, 1.0). */
    ease: StyleObject;
    /** Equivalent to cubic-bezier(0.42, 0, 1.0, 1.0). */
    "ease-in": StyleObject;
    /** Equivalent to cubic-bezier(0.42, 0, 0.58, 1.0). */
    "ease-in-out": StyleObject;
    /** Equivalent to cubic-bezier(0, 0, 0.58, 1.0). */
    "ease-out": StyleObject;
    /** Equivalent to cubic-bezier(0.0, 0.0, 1.0, 1.0). */
    linear: StyleObject;
    /** Equivalent to steps(1, end). */
    "step-end": StyleObject;
    /** Equivalent to steps(1, start). */
    "step-start": StyleObject;
    /** Ease-in Back. Overshoots. */
    "cubic-bezier(0.6, -0.28, 0.735, 0.045)": StyleObject;
    /** Ease-in-out Back. Overshoots. */
    "cubic-bezier(0.68, -0.55, 0.265, 1.55)": StyleObject;
    /** Ease-out Back. Overshoots. */
    "cubic-bezier(0.175, 0.885, 0.32, 1.275)": StyleObject;
    /** Ease-in Circular. Based on half circle. */
    "cubic-bezier(0.6, 0.04, 0.98, 0.335)": StyleObject;
    /** Ease-in-out Circular. Based on half circle. */
    "cubic-bezier(0.785, 0.135, 0.15, 0.86)": StyleObject;
    /** Ease-out Circular. Based on half circle. */
    "cubic-bezier(0.075, 0.82, 0.165, 1)": StyleObject;
    /** Ease-in Cubic. Based on power of three. */
    "cubic-bezier(0.55, 0.055, 0.675, 0.19)": StyleObject;
    /** Ease-in-out Cubic. Based on power of three. */
    "cubic-bezier(0.645, 0.045, 0.355, 1)": StyleObject;
    /** Ease-out Cubic. Based on power of three. */
    "cubic-bezier(0.215, 0.610, 0.355, 1)": StyleObject;
    /** Ease-in Exponential. Based on two to the power ten. */
    "cubic-bezier(0.95, 0.05, 0.795, 0.035)": StyleObject;
    /** Ease-in-out Exponential. Based on two to the power ten. */
    "cubic-bezier(1, 0, 0, 1)": StyleObject;
    /** Ease-out Exponential. Based on two to the power ten. */
    "cubic-bezier(0.19, 1, 0.22, 1)": StyleObject;
    /** Ease-in Sine. */
    "cubic-bezier(0.47, 0, 0.745, 0.715)": StyleObject;
    /** Ease-in-out Sine. */
    "cubic-bezier(0.445, 0.05, 0.55, 0.95)": StyleObject;
    /** Ease-out Sine. */
    "cubic-bezier(0.39, 0.575, 0.565, 1)": StyleObject;
    /** Ease-in Quadratic. Based on power of two. */
    "cubic-bezier(0.55, 0.085, 0.68, 0.53)": StyleObject;
    /** Ease-in-out Quadratic. Based on power of two. */
    "cubic-bezier(0.455, 0.03, 0.515, 0.955)": StyleObject;
    /** Ease-out Quadratic. Based on power of two. */
    "cubic-bezier(0.25, 0.46, 0.45, 0.94)": StyleObject;
    /** Ease-in Quartic. Based on power of four. */
    "cubic-bezier(0.895, 0.03, 0.685, 0.22)": StyleObject;
    /** Ease-in-out Quartic. Based on power of four. */
    "cubic-bezier(0.77, 0, 0.175, 1)": StyleObject;
    /** Ease-out Quartic. Based on power of four. */
    "cubic-bezier(0.165, 0.84, 0.44, 1)": StyleObject;
    /** Ease-in Quintic. Based on power of five. */
    "cubic-bezier(0.755, 0.05, 0.855, 0.06)": StyleObject;
    /** Ease-in-out Quintic. Based on power of five. */
    "cubic-bezier(0.86, 0, 0.07, 1)": StyleObject;
    /** Ease-out Quintic. Based on power of five. */
    "cubic-bezier(0.23, 1, 0.320, 1)": StyleObject;
}
export interface ColorFunctions {
    /** Creates a Color from red, green, and blue values. */
    rgb: (...params: Parameters<typeof rgb>) => StyleObject;
    /** Creates a Color from red, green, blue, and alpha values. */
    rgba: (...params: Parameters<typeof rgba>) => StyleObject;
    /** Creates a Color from hue, saturation, and lightness values. */
    hsl: (...params: Parameters<typeof hsl>) => StyleObject;
    /** Creates a Color from hue, saturation, lightness, and alpha values. */
    hsla: (...params: Parameters<typeof hsla>) => StyleObject;
    /** Creates a Color from hue, white and black. */
    hwb: (...params: Parameters<typeof hwb>) => StyleObject;
}
export declare type LengthEntry = {
    [k in "in" | "px" | "pc" | "pt" | "cm" | "mm" | "Q" | "ch" | "ex" | "em" | "rem" | "vw" | "vh" | "vmax" | "vmin"]: {
        [value: number]: StyleObject;
    };
};
export declare type PercentEntry = {
    [k in "percent" | "fr"]: {
        [value: number]: StyleObject;
    };
};
export declare type AngleEntry = {
    [k in "deg" | "grad" | "rad" | "turn"]: {
        [value: number]: StyleObject;
    };
};
export declare type TimeEntry = {
    [k in "s" | "ms"]: {
        [value: number]: StyleObject;
    };
};
export interface WideEntry {
    /** Represents the computed value of the property on the element's parent. */
    inherit: StyleObject;
    /** Represents the value specified as the property's initial value. */
    initial: StyleObject;
    /** Acts as either `inherit` or `initial`, depending on whether the property is inherited or not. */
    unset: StyleObject;
    /** Evaluates the value of a custom variable. */
    var: (...params: Parameters<typeof $var>) => StyleObject;
    /** Evaluates an mathematical expression. The following operators can be used: + - * /. */
    calc: (...params: Parameters<typeof calc>) => StyleObject;
}
export interface ImageFunctions {
    /** Reference an image file by URL */
    url: (...params: Parameters<typeof url>) => StyleObject;
    /** Provide image fallbacks and annotations. */
    "image()": StyleObject;
    /** Provide multiple resolutions. Remember to use unprefixed image-set() in addition. */
    "-webkit-image-set()": StyleObject;
    /** Provide multiple resolutions of an image and const the UA decide which is most appropriate in a given situation. */
    "image-set()": StyleObject;
    /** Use an element in the document as an image. Remember to use unprefixed element() in addition. */
    "-moz-element()": StyleObject;
    /** Use an element in the document as an image. */
    "element()": StyleObject;
    /** Indicates the two images to be combined and how far along in the transition the combination is. */
    "cross-fade()": StyleObject;
    /** Deprecated. Use modern linear-gradient() or radial-gradient() instead. */
    "-webkit-gradient()": StyleObject;
    /** Linear gradient. Remember to use unprefixed version in addition. */
    "-webkit-linear-gradient()": StyleObject;
    /** Linear gradient. Remember to use unprefixed version in addition. */
    "-moz-linear-gradient()": StyleObject;
    /** Linear gradient. Remember to use unprefixed version in addition. */
    "-o-linear-gradient()": StyleObject;
    /** A linear gradient is created by specifying a straight gradient line, and then several colors placed along that line. */
    linearGradient: (...params: Parameters<typeof linearGradient>) => StyleObject;
    /** Repeating Linear gradient. Remember to use unprefixed version in addition. */
    "-webkit-repeating-linear-gradient()": StyleObject;
    /** Repeating Linear gradient. Remember to use unprefixed version in addition. */
    "-moz-repeating-linear-gradient()": StyleObject;
    /** Repeating Linear gradient. Remember to use unprefixed version in addition. */
    "-o-repeating-linear-gradient()": StyleObject;
    /** Same as linear-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position. */
    repeatingLinearGradient: (...params: Parameters<typeof repeatingLinearGradient>) => StyleObject;
    /** Radial gradient. Remember to use unprefixed version in addition. */
    "-webkit-radial-gradient()": StyleObject;
    /** Radial gradient. Remember to use unprefixed version in addition. */
    "-moz-radial-gradient()": StyleObject;
    /** Colors emerge from a single point and smoothly spread outward in a circular or elliptical shape. */
    radialGradient: (...params: Parameters<typeof radialGradient>) => StyleObject;
    /** Repeating radial gradient. Remember to use unprefixed version in addition. */
    "-webkit-repeating-radial-gradient()": StyleObject;
    /** Repeating radial gradient. Remember to use unprefixed version in addition. */
    "-moz-repeating-radial-gradient()": StyleObject;
    /** Same as radial-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position. */
    repeatingRadialGradient: (...params: Parameters<typeof repeatingRadialGradient>) => StyleObject;
}
export interface PositionEntry {
    /** Computes to ‘100%’ for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset. */
    bottom: StyleObject;
    /** Computes to ‘50%’ (‘left 50%’) for the horizontal position if the horizontal position is not otherwise specified, or ‘50%’ (‘top 50%’) for the vertical position if it is. */
    center: StyleObject;
    /** Computes to ‘0%’ for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset. */
    left: StyleObject;
    /** Computes to ‘100%’ for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset. */
    right: StyleObject;
    /** Computes to ‘0%’ for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset. */
    top: StyleObject;
}
export interface RepeatStyleEntry {
    /** Placed once and not repeated in this direction. */
    "no-repeat": StyleObject;
    /** Repeated in this direction as often as needed to cover the background painting area. */
    repeat: StyleObject;
    /** Computes to ‘repeat no-repeat’. */
    "repeat-x": StyleObject;
    /** Computes to ‘no-repeat repeat’. */
    "repeat-y": StyleObject;
    /** Repeated as often as will fit within the background positioning area. If it doesn’t fit a whole number of times, it is rescaled so that it does. */
    round: StyleObject;
    /** Repeated as often as will fit within the background positioning area without being clipped and then the images are spaced out to fill the area. */
    space: StyleObject;
}
export interface LineStyleEntry {
    /** A series of square-ended dashes. */
    dashed: StyleObject;
    /** A series of round dots. */
    dotted: StyleObject;
    /** Two parallel solid lines with some space between them. */
    double: StyleObject;
    /** Looks as if it were carved in the canvas. */
    groove: StyleObject;
    /** Same as ‘none’, but has different behavior in the border conflict resolution rules for border-collapsed tables. */
    hidden: StyleObject;
    /** Looks as if the content on the inside of the border is sunken into the canvas. */
    inset: StyleObject;
    /** No border. Color and width are ignored. */
    none: StyleObject;
    /** Looks as if the content on the inside of the border is coming out of the canvas. */
    outset: StyleObject;
    /** Looks as if it were coming out of the canvas. */
    ridge: StyleObject;
    /** A single line segment. */
    solid: StyleObject;
}
export declare type LineWidthEntry = {
    [key in "medium" | "thick" | "thin"]: StyleObject;
};
export declare type AlphaEntry = {
    [key in Exclude<CSSAlphaValue, CSSPercentage>]: StyleObject;
};
export declare type IntegerEntry = {
    [key in CSSInteger]: StyleObject;
};
export interface URLEntry {
    /** Reference a file by URL */
    url: (...params: Parameters<typeof url>) => StyleObject;
}
export interface StringEntry {
    /** Generate quoted String */
    quote: (...params: Parameters<typeof quote>) => StyleObject;
}
export interface BoxEntry {
    /** The background is painted within (clipped to) the border box. */
    "border-box": StyleObject;
    /** The background is painted within (clipped to) the content box. */
    "content-box": StyleObject;
    /** The background is painted within (clipped to) the padding box. */
    "padding-box": StyleObject;
}
export interface GeometryBoxEntry {
    /** Uses the margin box as reference box. */
    "margin-box": StyleObject;
    /** Uses the object bounding box as reference box. */
    "fill-box": StyleObject;
    /** Uses the stroke bounding box as reference box. */
    "stroke-box": StyleObject;
    /** Uses the nearest SVG viewport as reference box. */
    "view-box": StyleObject;
}
export interface BasicShapeFunctions {
    /** Defines a circle. */
    circle: (...params: Parameters<typeof circle>) => StyleObject;
    /** Defines an ellipse. */
    ellipse: (...params: Parameters<typeof ellipse>) => StyleObject;
    /** Defines an inset rectangle. */
    inset: (...params: Parameters<typeof inset>) => StyleObject;
    /** Defines a polygon. */
    polygon: (...params: Parameters<typeof polygon>) => StyleObject;
}
export declare type Html5Tags = "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "keygen" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "menuitem" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rb" | "rp" | "rt" | "rtc" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "const" | "video" | "wbr";
export declare type ElementSelectors<T> = {
    /** CSS element selector, select all `<a>` elements. */
    A: T;
    /** CSS element selector, select all `<abbr>` elements. */
    Abbr: T;
    /** CSS element selector, select all `<address>` elements. */
    Address: T;
    /** CSS element selector, select all `<area>` elements. */
    Area: T;
    /** CSS element selector, select all `<article>` elements. */
    Article: T;
    /** CSS element selector, select all `<aside>` elements. */
    Aside: T;
    /** CSS element selector, select all `<audio>` elements. */
    Audio: T;
    /** CSS element selector, select all `<b>` elements. */
    B: T;
    /** CSS element selector, select all `<base>` elements. */
    Base: T;
    /** CSS element selector, select all `<bdi>` elements. */
    Bdi: T;
    /** CSS element selector, select all `<bdo>` elements. */
    Bdo: T;
    /** CSS element selector, select all `<blockquote>` elements. */
    Blockquote: T;
    /** CSS element selector, select all `<body>` elements. */
    Body: T;
    /** CSS element selector, select all `<br>` elements. */
    Br: T;
    /** CSS element selector, select all `<button>` elements. */
    Button: T;
    /** CSS element selector, select all `<canvas>` elements. */
    Canvas: T;
    /** CSS element selector, select all `<caption>` elements. */
    Caption: T;
    /** CSS element selector, select all `<cite>` elements. */
    Cite: T;
    /** CSS element selector, select all `<code>` elements. */
    Code: T;
    /** CSS element selector, select all `<col>` elements. */
    Col: T;
    /** CSS element selector, select all `<colgroup>` elements. */
    Colgroup: T;
    /** CSS element selector, select all `<data>` elements. */
    Data: T;
    /** CSS element selector, select all `<datalist>` elements. */
    Datalist: T;
    /** CSS element selector, select all `<dd>` elements. */
    Dd: T;
    /** CSS element selector, select all `<del>` elements. */
    Del: T;
    /** CSS element selector, select all `<details>` elements. */
    Details: T;
    /** CSS element selector, select all `<dfn>` elements. */
    Dfn: T;
    /** CSS element selector, select all `<dialog>` elements. */
    Dialog: T;
    /** CSS element selector, select all `<div>` elements. */
    Div: T;
    /** CSS element selector, select all `<dl>` elements. */
    Dl: T;
    /** CSS element selector, select all `<dt>` elements. */
    Dt: T;
    /** CSS element selector, select all `<em>` elements. */
    Em: T;
    /** CSS element selector, select all `<embed>` elements. */
    Embed: T;
    /** CSS element selector, select all `<fieldset>` elements. */
    Fieldset: T;
    /** CSS element selector, select all `<figcaption>` elements. */
    Figcaption: T;
    /** CSS element selector, select all `<figure>` elements. */
    Figure: T;
    /** CSS element selector, select all `<footer>` elements. */
    Footer: T;
    /** CSS element selector, select all `<form>` elements. */
    Form: T;
    /** CSS element selector, select all `<h1>` elements. */
    H1: T;
    /** CSS element selector, select all `<h2>` elements. */
    H2: T;
    /** CSS element selector, select all `<h3>` elements. */
    H3: T;
    /** CSS element selector, select all `<h4>` elements. */
    H4: T;
    /** CSS element selector, select all `<h5>` elements. */
    H5: T;
    /** CSS element selector, select all `<h6>` elements. */
    H6: T;
    /** CSS element selector, select all `<head>` elements. */
    Head: T;
    /** CSS element selector, select all `<header>` elements. */
    Header: T;
    /** CSS element selector, select all `<hgroup>` elements. */
    Hgroup: T;
    /** CSS element selector, select all `<hr>` elements. */
    Hr: T;
    /** CSS element selector, select all `<html>` elements. */
    Html: T;
    /** CSS element selector, select all `<i>` elements. */
    I: T;
    /** CSS element selector, select all `<iframe>` elements. */
    Iframe: T;
    /** CSS element selector, select all `<img>` elements. */
    Img: T;
    /** CSS element selector, select all `<input>` elements. */
    Input: T;
    /** CSS element selector, select all `<ins>` elements. */
    Ins: T;
    /** CSS element selector, select all `<kbd>` elements. */
    Kbd: T;
    /** CSS element selector, select all `<keygen>` elements. */
    Keygen: T;
    /** CSS element selector, select all `<label>` elements. */
    Label: T;
    /** CSS element selector, select all `<legend>` elements. */
    Legend: T;
    /** CSS element selector, select all `<li>` elements. */
    Li: T;
    /** CSS element selector, select all `<link>` elements. */
    Link: T;
    /** CSS element selector, select all `<main>` elements. */
    Main: T;
    /** CSS element selector, select all `<map>` elements. */
    Map: T;
    /** CSS element selector, select all `<mark>` elements. */
    Mark: T;
    /** CSS element selector, select all `<menu>` elements. */
    Menu: T;
    /** CSS element selector, select all `<menuitem>` elements. */
    Menuitem: T;
    /** CSS element selector, select all `<meta>` elements. */
    Meta: T;
    /** CSS element selector, select all `<meter>` elements. */
    Meter: T;
    /** CSS element selector, select all `<nav>` elements. */
    Nav: T;
    /** CSS element selector, select all `<noscript>` elements. */
    Noscript: T;
    /** CSS element selector, select all `<object>` elements. */
    Object: T;
    /** CSS element selector, select all `<ol>` elements. */
    Ol: T;
    /** CSS element selector, select all `<optgroup>` elements. */
    Optgroup: T;
    /** CSS element selector, select all `<option>` elements. */
    Option: T;
    /** CSS element selector, select all `<output>` elements. */
    Output: T;
    /** CSS element selector, select all `<p>` elements. */
    P: T;
    /** CSS element selector, select all `<param>` elements. */
    Param: T;
    /** CSS element selector, select all `<picture>` elements. */
    Picture: T;
    /** CSS element selector, select all `<pre>` elements. */
    Pre: T;
    /** CSS element selector, select all `<progress>` elements. */
    Progress: T;
    /** CSS element selector, select all `<q>` elements. */
    Q: T;
    /** CSS element selector, select all `<rb>` elements. */
    Rb: T;
    /** CSS element selector, select all `<rp>` elements. */
    Rp: T;
    /** CSS element selector, select all `<rt>` elements. */
    Rt: T;
    /** CSS element selector, select all `<rtc>` elements. */
    Rtc: T;
    /** CSS element selector, select all `<ruby>` elements. */
    Ruby: T;
    /** CSS element selector, select all `<s>` elements. */
    S: T;
    /** CSS element selector, select all `<samp>` elements. */
    Samp: T;
    /** CSS element selector, select all `<script>` elements. */
    Script: T;
    /** CSS element selector, select all `<section>` elements. */
    Section: T;
    /** CSS element selector, select all `<select>` elements. */
    Select: T;
    /** CSS element selector, select all `<small>` elements. */
    Small: T;
    /** CSS element selector, select all `<source>` elements. */
    Source: T;
    /** CSS element selector, select all `<span>` elements. */
    Span: T;
    /** CSS element selector, select all `<strong>` elements. */
    Strong: T;
    /** CSS element selector, select all `<style>` elements. */
    Style: T;
    /** CSS element selector, select all `<sub>` elements. */
    Sub: T;
    /** CSS element selector, select all `<summary>` elements. */
    Summary: T;
    /** CSS element selector, select all `<sup>` elements. */
    Sup: T;
    /** CSS element selector, select all `<table>` elements. */
    Table: T;
    /** CSS element selector, select all `<tbody>` elements. */
    Tbody: T;
    /** CSS element selector, select all `<td>` elements. */
    Td: T;
    /** CSS element selector, select all `<template>` elements. */
    Template: T;
    /** CSS element selector, select all `<textarea>` elements. */
    Textarea: T;
    /** CSS element selector, select all `<tfoot>` elements. */
    Tfoot: T;
    /** CSS element selector, select all `<th>` elements. */
    Th: T;
    /** CSS element selector, select all `<thead>` elements. */
    Thead: T;
    /** CSS element selector, select all `<time>` elements. */
    Time: T;
    /** CSS element selector, select all `<title>` elements. */
    Title: T;
    /** CSS element selector, select all `<tr>` elements. */
    Tr: T;
    /** CSS element selector, select all `<track>` elements. */
    Track: T;
    /** CSS element selector, select all `<u>` elements. */
    U: T;
    /** CSS element selector, select all `<ul>` elements. */
    Ul: T;
    /** CSS element selector, select all `<const>` elements. */
    Const: T;
    /** CSS element selector, select all `<video>` elements. */
    Video: T;
    /** CSS element selector, select all `<wbr>` elements. */
    Wbr: T;
};
/**
 * Take two objects T and U and create the new one with uniq keys for T a U objectI
 * helper generic for `MergeObject`
 */
declare type GetObjDifferentKeys<T, U, T0 = Omit<T, keyof U> & Omit<U, keyof T>, T1 = {
    [K in keyof T0]-?: T0[K];
}> = T1;
/**
 * Take two objects T and U and create the new one with the same objects keys
 * helper generic for `MergeObject`
 */
declare type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>;
declare type MergeTwoObjects<T, U, T0 = Partial<GetObjDifferentKeys<T, U>> & {
    [K in keyof GetObjSameKeys<T, U>]-?: MergeObject<T[K], U[K]>;
}, T1 = {
    [K in keyof T0]-?: T0[K];
}> = T1;
export declare type MergeObject<T, U> = [
    T,
    U
] extends [
    {
        [key: string]: unknown;
    },
    {
        [key: string]: unknown;
    }
] ? MergeTwoObjects<T, U> : T | U;
/**
 * Merge two object and their nested children
 */
export declare function mergeObject<A extends object, B extends object>(a: A, b: B): MergeObject<A, B>;
/**
 * Build style value string or style target `HTMLElement`.
 * ```jsx
 * <div style={inline(bg.red.500, bg.clip.border)}></div>
 * ```
 * Or with `HTMLElement` as first param
 * ```jsx
 * el = document.getElementById('btn');
 * inline(el, bg.red.500, bg.clip.border);
 * ```
 */
export declare function inline(...utilities: StyleObject[]): string;
export declare function inline(el: HTMLElement, ...utilities: StyleObject[]): void;
export declare function createRules(css: CSSObject | CSSMap, selector: string): CSSRules;
export declare function buildDecl({ value, property }: CSSDecl): string | string[];
export declare function buildRule({ selector, children }: CSSRule, indent?: number): string;
export declare function buildAtRule({ rule, children }: CSSAtRule, indent?: number): string;
export declare function buildRules(rules: CSSRules): string;
export declare function dedupRules(rules: CSSRules): CSSRules;
/** build a single StyleObject to css */
export declare function buildStyle(className: string, style: StyleObject): string;
export declare function atomic(...utilities: Utilities[]): string;
export declare function unify(selector: string, ...utilities: Utilities[]): string;
export declare function unify(...utilities: {
    [key: string]: StyleObject | Utilities[];
}[]): string;
export declare function build(...utilities: Utilities[]): string;
export declare type DarkModeConfig = "class" | "media" | false;
export declare type UtilitiesConfig = {
    [key: string]: Handler<unknown> | Array<Handler<unknown>> | StyleObject | UtilitiesConfig;
};
export declare type VariantsConfig = {
    [key: string]: string | string[];
};
export interface Config<T extends object = Theme> {
    separator?: string;
    important?: boolean | string;
    darkMode?: DarkModeConfig;
    theme?: T;
    utilities?: UtilitiesConfig;
    variants?: VariantsConfig;
    styleLoader?: StyleLoader;
    [key: string]: unknown;
}
export declare function defineConfig(config: Config): Config<Theme>;
export declare type RGB = [
    number,
    number,
    number
];
export declare type RGBA = [
    number,
    number,
    number,
    number
];
export declare type HSL = [
    number,
    number,
    number
];
export declare type HWB = [
    number,
    number,
    number
];
export declare type HSLA = [
    number,
    number,
    number,
    number
];
declare type AdjustColorOptions = Partial<Record<"red" | "green" | "blue" | "hue" | "saturation" | "lightness" | "alpha", number>>;
declare type ScaleColorOptions = Omit<AdjustColorOptions, "hue">;
export declare function digitToHEX(d: number): string;
export declare function rgbToHEX(rgba: RGBA): string;
export declare function hexToRGB(hex: string): [
    number,
    number,
    number,
    number
];
export declare function sliceColor(str: string): string[];
export declare function rgbToHSL(rgba: RGBA): HSLA;
export declare function hueToRGB(p: number, q: number, t: number): number;
export declare function hslToRGB(hsla: HSLA): RGBA;
export declare function hwbToRGB(hue: number, whiteness: number, blackness: number, alpha?: number): RGBA;
export declare function adjustHue(hsla: HSLA, deg: number): HSLA;
export declare const adjustSaturation: (hsla: HSLA, deg?: number, scale?: number) => HSLA;
export declare const adjustLightness: (hsla: HSLA, deg?: number, scale?: number) => HSLA;
export declare const adjustRed: (rgba: RGBA, deg?: number, scale?: number) => RGBA;
export declare const adjustGreen: (rgba: RGBA, deg?: number, scale?: number) => RGBA;
export declare const adjustBlue: (rgba: RGBA, deg?: number, scale?: number) => RGBA;
export declare const adjustAlpha: ((hsla: HSLA, deg?: number, scale?: number) => HSLA) & ((hsla: RGBA, deg?: number, scale?: number) => RGBA);
export declare function mixColor(color1: RGBA, color2: RGBA, w?: number): RGBA;
export declare function subMixColor(color1: RGBA, color2: RGBA, w?: number): RGBA;
export declare class Color {
    private hexval;
    private rgbaval;
    private hslaval;
    constructor(hexval: string);
    constructor(rgbaval: RGB | RGBA);
    constructor(hexval: string, rgbaval: RGBA, hslaval: HSLA);
    static hex(str: string): Color;
    static rgb(r: number, g: number, b: number, a?: number): Color;
    static rgba(r: number, g: number, b: number, a: number): Color;
    static hsl(h: number, s: number, l: number, a?: number): Color;
    static hsla(h: number, s: number, l: number, a: number): Color;
    static hwb(hue: number, whiteness: number, blackness: number, alpha?: number): Color;
    get hex(): string;
    get rgb(): RGB;
    get rgba(): RGBA;
    get hsl(): HSL;
    get hsla(): HSLA;
    get hwb(): HWB;
    static mix(c1: Color, c2: Color, w?: number): Color;
    static subcolormix(c1: Color, c2: Color, w?: number): Color;
    get red(): number;
    get green(): number;
    get blue(): number;
    get hue(): number;
    get saturation(): number;
    get lightness(): number;
    get alpha(): number;
    get opacity(): number;
    get whiteness(): number;
    get blackness(): number;
    get ieHexStr(): string;
    invert(weight?: number): Color;
    adjustRed(deg?: number, scale?: number): Color;
    adjustGreen(deg?: number, scale?: number): Color;
    adjustBlue(deg?: number, scale?: number): Color;
    adjustHue(deg: number): Color;
    adjustSaturation(deg?: number, scale?: number): Color;
    adjustLightness(deg?: number, scale?: number): Color;
    adjustAlpha(deg?: number, scale?: number): Color;
    complement(): Color;
    saturate(deg: number): Color;
    desaturate(deg: number): Color;
    grayscale(): Color;
    lighten(amount: number): Color;
    darken(amount: number): Color;
    opacify(deg: number): Color;
    transparentize(deg: number): Color;
    fadeIn(deg: number): Color;
    fadeOut(deg: number): Color;
    adjust(opt: AdjustColorOptions): Color;
    scale(opt: ScaleColorOptions): Color;
    change(opt: AdjustColorOptions): Color;
    lightenSet(n: number): Color[];
    darkenSet(n: number): Color[];
    desaturateSet(n: number): Color[];
    complementSet(n: number): Color[];
    invertSet(n: number): Color[];
}
export declare function colorLuminance(color: Color): number;
export declare function getLightColor(color: Color, lightness?: number): Color;
export declare function getDarkColor(color: Color, lightness?: number): Color;
export declare const SymbolCSS: unique symbol;
export declare const SymbolMeta: unique symbol;
export declare const SymbolData: unique symbol;
export declare const SymbolProxy: unique symbol;
export declare function isProxy<T extends object | Function>(i: T): boolean;
export declare function isStyleObject(i: unknown): i is StyleObject;
export declare function isStyleArray(i: unknown): boolean;
export declare function getStyleVariants(style: StyleObject): string[];
export declare function getStyleProps(style: StyleObject): string[];
export declare function getStyleIdent(style: StyleObject): string;
export declare function getFirstVar(style: StyleObject): [
    string,
    string
] | undefined;
export declare function applyVariant(utility: StyleObject): CSSObject | CSSMap;
export declare function useArrayHelper(): void;
/**
 * Bundle all utilities to a single css object.
 * @param utilities - Utilities and Variants
 * @returns CSSObject
 */
export declare function bundle(utilities: Utilities[]): CSSMap;
export declare const prop: (strings: TemplateStringsArray, ...expr: string[]) => number | typeof Symbol.iterator | "filter" | "fill" | "clear" | "contain" | "bottom" | "left" | "right" | "top" | "color" | "clip" | "all" | "opacity" | "alignContent" | "alignItems" | "justifyItems" | "justifySelf" | "alignSelf" | "animation" | "animationDelay" | "animationDirection" | "animationDuration" | "animationFillMode" | "animationIterationCount" | "animationName" | "animationPlayState" | "animationTimingFunction" | "backfaceVisibility" | "background" | "backgroundAttachment" | "backgroundBlendMode" | "backgroundClip" | "backgroundColor" | "backgroundImage" | "backgroundOrigin" | "backgroundPosition" | "backgroundPositionX" | "backgroundPositionY" | "backgroundRepeat" | "backgroundSize" | "blockSize" | "border" | "borderBlockEnd" | "borderBlockStart" | "borderBlockEndColor" | "borderBlockStartColor" | "borderBlockEndStyle" | "borderBlockStartStyle" | "borderBlockEndWidth" | "borderBlockStartWidth" | "borderBottom" | "borderBottomColor" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderBottomStyle" | "borderBottomWidth" | "borderCollapse" | "borderColor" | "borderImage" | "borderImageOutset" | "borderImageRepeat" | "borderImageSlice" | "borderImageSource" | "borderImageWidth" | "borderInlineEnd" | "borderInlineStart" | "borderInlineEndColor" | "borderInlineStartColor" | "borderInlineEndStyle" | "borderInlineStartStyle" | "borderInlineEndWidth" | "borderInlineStartWidth" | "borderLeft" | "borderLeftColor" | "borderLeftStyle" | "borderLeftWidth" | "borderRadius" | "borderRight" | "borderRightColor" | "borderRightStyle" | "borderRightWidth" | "borderSpacing" | "borderStyle" | "borderTop" | "borderTopColor" | "borderTopLeftRadius" | "borderTopRightRadius" | "borderTopStyle" | "borderTopWidth" | "borderWidth" | "boxShadow" | "boxSizing" | "breakAfter" | "breakBefore" | "breakInside" | "captionSide" | "caretColor" | "clipPath" | "clipRule" | "colorInterpolationFilters" | "columnCount" | "columnFill" | "columnGap" | "columnRule" | "columnRuleColor" | "columnRuleStyle" | "columnRuleWidth" | "columns" | "columnSpan" | "columnWidth" | "content" | "counterIncrement" | "counterReset" | "cursor" | "direction" | "display" | "emptyCells" | "fillOpacity" | "fillRule" | "flex" | "flexBasis" | "flexDirection" | "flexFlow" | "flexGrow" | "flexShrink" | "flexWrap" | "float" | "floodColor" | "floodOpacity" | "font" | "fontFamily" | "fontFeatureSettings" | "fontKerning" | "fontSize" | "fontSizeAdjust" | "fontStretch" | "fontStyle" | "fontSynthesis" | "fontVariant" | "fontVariantAlternates" | "fontVariantCaps" | "fontVariantEastAsian" | "fontVariantLigatures" | "fontVariantNumeric" | "fontVariantPosition" | "fontWeight" | "gridArea" | "grid" | "gridAutoColumns" | "gridAutoFlow" | "gridAutoRows" | "gridColumn" | "gridColumnEnd" | "gridColumnGap" | "gridColumnStart" | "gridGap" | "gridRow" | "gridRowEnd" | "gridRowGap" | "gridRowStart" | "gridTemplate" | "gridTemplateAreas" | "gridTemplateColumns" | "gridTemplateRows" | "height" | "hyphens" | "imageOrientation" | "imageRendering" | "inlineSize" | "isolation" | "justifyContent" | "letterSpacing" | "lightingColor" | "lineBreak" | "lineHeight" | "listStyle" | "listStyleImage" | "listStylePosition" | "listStyleType" | "margin" | "marginBlockEnd" | "marginBlockStart" | "marginBottom" | "marginInlineEnd" | "marginInlineStart" | "marginLeft" | "marginRight" | "marginTop" | "marker" | "markerEnd" | "markerMid" | "markerStart" | "maskImage" | "maskMode" | "maskOrigin" | "maskPosition" | "maskRepeat" | "maskSize" | "maskType" | "maxBlockSize" | "maxHeight" | "maxInlineSize" | "maxWidth" | "minBlockSize" | "minHeight" | "minInlineSize" | "minWidth" | "mixBlendMode" | "objectFit" | "objectPosition" | "order" | "orphans" | "outline" | "outlineColor" | "outlineOffset" | "outlineStyle" | "outlineWidth" | "overflow" | "overflowWrap" | "overflowX" | "overflowY" | "padding" | "paddingBottom" | "paddingBlockEnd" | "paddingBlockStart" | "paddingInlineEnd" | "paddingInlineStart" | "paddingLeft" | "paddingRight" | "paddingTop" | "pageBreakAfter" | "pageBreakBefore" | "pageBreakInside" | "paintOrder" | "perspective" | "perspectiveOrigin" | "pointerEvents" | "position" | "quotes" | "resize" | "rubyPosition" | "scrollBehavior" | "scrollSnapType" | "shapeImageThreshold" | "shapeMargin" | "shapeOutside" | "shapeRendering" | "stopColor" | "stopOpacity" | "stroke" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "strokeMiterlimit" | "strokeOpacity" | "strokeWidth" | "tableLayout" | "tabSize" | "textAlign" | "textAlignLast" | "textAnchor" | "textDecoration" | "textDecorationColor" | "textDecorationLine" | "textDecorationStyle" | "textIndent" | "textOrientation" | "textOverflow" | "textRendering" | "textShadow" | "textTransform" | "textUnderlinePosition" | "touchAction" | "transform" | "transformOrigin" | "transformStyle" | "transition" | "transitionDelay" | "transitionDuration" | "transitionProperty" | "transitionTimingFunction" | "unicodeBidi" | "userSelect" | "verticalAlign" | "visibility" | "widows" | "width" | "willChange" | "wordBreak" | "wordSpacing" | "wordWrap" | "writingMode" | "zIndex" | "accentColor" | "appearance" | "aspectRatio" | "borderBlock" | "borderBlockColor" | "borderBlockStyle" | "borderBlockWidth" | "borderEndEndRadius" | "borderEndStartRadius" | "borderInline" | "borderInlineColor" | "borderInlineStyle" | "borderInlineWidth" | "borderStartEndRadius" | "borderStartStartRadius" | "printColorAdjust" | "colorScheme" | "contentVisibility" | "counterSet" | "fontOpticalSizing" | "fontVariationSettings" | "gap" | "inset" | "insetBlock" | "insetBlockEnd" | "insetBlockStart" | "insetInline" | "insetInlineEnd" | "insetInlineStart" | "marginBlock" | "marginInline" | "mask" | "maskClip" | "maskComposite" | "offset" | "offsetDistance" | "offsetPath" | "offsetRotate" | "overflowAnchor" | "overscrollBehavior" | "overscrollBehaviorBlock" | "overscrollBehaviorInline" | "overscrollBehaviorX" | "overscrollBehaviorY" | "paddingBlock" | "paddingInline" | "placeContent" | "placeItems" | "placeSelf" | "rotate" | "rowGap" | "scale" | "scrollbarGutter" | "scrollMargin" | "scrollMarginBlock" | "scrollMarginBlockStart" | "scrollMarginBlockEnd" | "scrollMarginBottom" | "scrollMarginInline" | "scrollMarginInlineStart" | "scrollMarginInlineEnd" | "scrollMarginLeft" | "scrollMarginRight" | "scrollMarginTop" | "scrollPadding" | "scrollPaddingBlock" | "scrollPaddingBlockStart" | "scrollPaddingBlockEnd" | "scrollPaddingBottom" | "scrollPaddingInline" | "scrollPaddingInlineStart" | "scrollPaddingInlineEnd" | "scrollPaddingLeft" | "scrollPaddingRight" | "scrollPaddingTop" | "scrollSnapAlign" | "scrollSnapStop" | "textCombineUpright" | "textDecorationSkipInk" | "textDecorationThickness" | "textEmphasis" | "textEmphasisColor" | "textEmphasisPosition" | "textEmphasisStyle" | "textUnderlineOffset" | "transformBox" | "translate" | "whiteSpace" | "alignmentBaseline" | "baselineShift" | "colorInterpolation" | "cssFloat" | "cssText" | "dominantBaseline" | "parentRule" | "webkitAlignContent" | "webkitAlignItems" | "webkitAlignSelf" | "webkitAnimation" | "webkitAnimationDelay" | "webkitAnimationDirection" | "webkitAnimationDuration" | "webkitAnimationFillMode" | "webkitAnimationIterationCount" | "webkitAnimationName" | "webkitAnimationPlayState" | "webkitAnimationTimingFunction" | "webkitAppearance" | "webkitBackfaceVisibility" | "webkitBackgroundClip" | "webkitBackgroundOrigin" | "webkitBackgroundSize" | "webkitBorderBottomLeftRadius" | "webkitBorderBottomRightRadius" | "webkitBorderRadius" | "webkitBorderTopLeftRadius" | "webkitBorderTopRightRadius" | "webkitBoxAlign" | "webkitBoxFlex" | "webkitBoxOrdinalGroup" | "webkitBoxOrient" | "webkitBoxPack" | "webkitBoxShadow" | "webkitBoxSizing" | "webkitFilter" | "webkitFlex" | "webkitFlexBasis" | "webkitFlexDirection" | "webkitFlexFlow" | "webkitFlexGrow" | "webkitFlexShrink" | "webkitFlexWrap" | "webkitJustifyContent" | "webkitLineClamp" | "webkitMask" | "webkitMaskBoxImage" | "webkitMaskBoxImageOutset" | "webkitMaskBoxImageRepeat" | "webkitMaskBoxImageSlice" | "webkitMaskBoxImageSource" | "webkitMaskBoxImageWidth" | "webkitMaskClip" | "webkitMaskComposite" | "webkitMaskImage" | "webkitMaskOrigin" | "webkitMaskPosition" | "webkitMaskRepeat" | "webkitMaskSize" | "webkitOrder" | "webkitPerspective" | "webkitPerspectiveOrigin" | "webkitTextFillColor" | "webkitTextStroke" | "webkitTextStrokeColor" | "webkitTextStrokeWidth" | "webkitTransform" | "webkitTransformOrigin" | "webkitTransformStyle" | "webkitTransition" | "webkitTransitionDelay" | "webkitTransitionDuration" | "webkitTransitionProperty" | "webkitTransitionTimingFunction" | "webkitUserSelect";
export declare const baseStyleTarget: TargetCreator;
export declare const baseStyleHandler: (target: StyleObject<{}>, prop: string | symbol, receiver: unknown) => any;
export declare function useStyleLoader(loader: StyleLoader): void;
export declare function css<D extends Record<string, unknown>>(css: CSSObject | CSSMap, data?: D, meta?: UtilityMeta): StyleObject<D>;
export declare function injectCSS(css: string): void;
/** Create a styleLoader */
export declare function createStyleLoader(inject: (className: string, style: StyleObject) => void): StyleLoader;
/** CSS-In-JS Loader */
export declare const cssInJsLoader: StyleLoader;
/** SSR Loader */
export declare const ssrLoader: StyleLoader;
/** Mount server side generated css */
export declare function mountCSS(): string;
export declare function apply(selector: string, ...utilities: Utilities[]): StyleObject;
export interface CSSDecls {
    /**
     * \@counter-style descriptor. Specifies the symbols used by the marker-construction algorithm specified by the system descriptor. Needs to be specified if the counter system is 'additive'.
     *
     * (Firefox 33)
     *
     * Syntax: [ \<integer> && \<symbol> ]#
     */
    additiveSymbols: StringEntry & IntegerEntry & ImageFunctions & WideEntry;
    /**
     * Aligns a flex container’s lines within the flex container when there is extra space in the cross-axis, similar to how 'justify-content' aligns individual items within the main-axis.
     *
     * Syntax: normal | \<baseline-position> | \<content-distribution> | \<overflow-position>? \<content-position>
     */
    alignContent: {
        /** Lines are packed toward the center of the flex container. */
        center: StyleObject;
        /** Lines are packed toward the end of the flex container. */
        "flex-end": StyleObject;
        /** Lines are packed toward the start of the flex container. */
        "flex-start": StyleObject;
        /** Lines are evenly distributed in the flex container, with half-size spaces on either end. */
        "space-around": StyleObject;
        /** Lines are evenly distributed in the flex container. */
        "space-between": StyleObject;
        /** Lines stretch to take up the remaining space. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * Aligns flex items along the cross axis of the current line of the flex container.
     *
     * Syntax: normal | stretch | \<baseline-position> | [ \<overflow-position>? \<self-position> ]
     */
    alignItems: {
        /** If the flex item’s inline axis is the same as the cross axis, this value is identical to 'flex-start'. Otherwise, it participates in baseline alignment. */
        baseline: StyleObject;
        /** The flex item’s margin box is centered in the cross axis within the line. */
        center: StyleObject;
        /** The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line. */
        "flex-end": StyleObject;
        /** The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line. */
        "flex-start": StyleObject;
        /** If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * Defines the default justify-self for all items of the box, giving them the default way of justifying each box along the appropriate axis
     *
     * Syntax: normal | stretch | \<baseline-position> | \<overflow-position>? [ \<self-position> | left | right ] | legacy | legacy && [ left | right | center ]
     */
    justifyItems: {
        auto: StyleObject;
        normal: StyleObject;
        end: StyleObject;
        start: StyleObject;
        /** "Flex items are packed toward the end of the line." */
        "flex-end": StyleObject;
        /** "Flex items are packed toward the start of the line." */
        "flex-start": StyleObject;
        /** The item is packed flush to the edge of the alignment container of the end side of the item, in the appropriate axis. */
        "self-end": StyleObject;
        /** The item is packed flush to the edge of the alignment container of the start side of the item, in the appropriate axis.. */
        "self-start": StyleObject;
        /** The items are packed flush to each other toward the center of the of the alignment container. */
        center: StyleObject;
        left: StyleObject;
        right: StyleObject;
        baseline: StyleObject;
        "first baseline": StyleObject;
        "last baseline": StyleObject;
        /** If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched. */
        stretch: StyleObject;
        save: StyleObject;
        unsave: StyleObject;
        legacy: StyleObject;
    } & WideEntry;
    /**
     * Defines the way of justifying a box inside its container along the appropriate axis.
     *
     * Syntax: auto | normal | stretch | \<baseline-position> | \<overflow-position>? [ \<self-position> | left | right ]
     */
    justifySelf: {
        auto: StyleObject;
        normal: StyleObject;
        end: StyleObject;
        start: StyleObject;
        /** "Flex items are packed toward the end of the line." */
        "flex-end": StyleObject;
        /** "Flex items are packed toward the start of the line." */
        "flex-start": StyleObject;
        /** The item is packed flush to the edge of the alignment container of the end side of the item, in the appropriate axis. */
        "self-end": StyleObject;
        /** The item is packed flush to the edge of the alignment container of the start side of the item, in the appropriate axis.. */
        "self-start": StyleObject;
        /** The items are packed flush to each other toward the center of the of the alignment container. */
        center: StyleObject;
        left: StyleObject;
        right: StyleObject;
        baseline: StyleObject;
        "first baseline": StyleObject;
        "last baseline": StyleObject;
        /** If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched. */
        stretch: StyleObject;
        save: StyleObject;
        unsave: StyleObject;
    } & WideEntry;
    /**
     * Allows the default alignment along the cross axis to be overridden for individual flex items.
     *
     * Syntax: auto | normal | stretch | \<baseline-position> | \<overflow-position>? \<self-position>
     */
    alignSelf: {
        /** Computes to the value of 'align-items' on the element’s parent, or 'stretch' if the element has no parent. On absolutely positioned elements, it computes to itself. */
        auto: StyleObject;
        /** If the flex item’s inline axis is the same as the cross axis, this value is identical to 'flex-start'. Otherwise, it participates in baseline alignment. */
        baseline: StyleObject;
        /** The flex item’s margin box is centered in the cross axis within the line. */
        center: StyleObject;
        /** The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line. */
        "flex-end": StyleObject;
        /** The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line. */
        "flex-start": StyleObject;
        /** If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * Shorthand that resets all properties except 'direction' and 'unicode-bidi'.
     *
     * (Edge 79, Firefox 27, Safari 9.1, Chrome 37, Opera 24)
     *
     * Syntax: initial | inherit | unset | revert
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/all)
     */
    all: WideEntry;
    /**
     * Provides alternative text for assistive technology to replace the generated content of a ::before or ::after element.
     *
     * (Safari 9)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/alt)
     */
    alt: StringEntry & WideEntry;
    /**
     * Shorthand property combines six of the animation properties into a single property.
     *
     * Syntax: \<single-animation>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation)
     */
    animation: {
        /** The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. */
        alternate: StyleObject;
        /** The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. */
        "alternate-reverse": StyleObject;
        /** The beginning property value (as defined in the first \@keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'. */
        backwards: StyleObject;
        /** Both forwards and backwards fill modes are applied. */
        both: StyleObject;
        /** The final property value (as defined in the last \@keyframes at-rule) is maintained after the animation completes. */
        forwards: StyleObject;
        /** Causes the animation to repeat forever. */
        infinite: StyleObject;
        /** No animation is performed */
        none: StyleObject;
        /** Normal playback. */
        normal: StyleObject;
        /** All iterations of the animation are played in the reverse direction from the way they were specified. */
        reverse: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & TimeEntry & TransitionTimingFunctions & WideEntry;
    /**
     * Defines when the animation will start.
     *
     * Syntax: \<time>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-delay)
     */
    animationDelay: TimeEntry & WideEntry;
    /**
     * Defines whether or not the animation should play in reverse on alternate cycles.
     *
     * Syntax: \<single-animation-direction>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-direction)
     */
    animationDirection: {
        /** The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. */
        alternate: StyleObject;
        /** The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. */
        "alternate-reverse": StyleObject;
        /** Normal playback. */
        normal: StyleObject;
        /** All iterations of the animation are played in the reverse direction from the way they were specified. */
        reverse: StyleObject;
    } & WideEntry;
    /**
     * Defines the length of time that an animation takes to complete one cycle.
     *
     * Syntax: \<time>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-duration)
     */
    animationDuration: TimeEntry & WideEntry;
    /**
     * Defines what values are applied by the animation outside the time it is executing.
     *
     * Syntax: \<single-animation-fill-mode>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode)
     */
    animationFillMode: {
        /** The beginning property value (as defined in the first \@keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'. */
        backwards: StyleObject;
        /** Both forwards and backwards fill modes are applied. */
        both: StyleObject;
        /** The final property value (as defined in the last \@keyframes at-rule) is maintained after the animation completes. */
        forwards: StyleObject;
        /** There is no change to the property value between the time the animation is applied and the time the animation begins playing or after the animation completes. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Defines the number of times an animation cycle is played. The default value is one, meaning the animation will play from beginning to end once.
     *
     * Syntax: \<single-animation-iteration-count>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-iteration-count)
     */
    animationIterationCount: {
        /** Causes the animation to repeat forever. */
        infinite: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Defines a list of animations that apply. Each name is used to select the keyframe at-rule that provides the property values for the animation.
     *
     * Syntax: [ none | \<keyframes-name> ]#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-name)
     */
    animationName: {
        /** No animation is performed */
        none: StyleObject;
    } & WideEntry;
    /**
     * Defines whether the animation is running or paused.
     *
     * Syntax: \<single-animation-play-state>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-play-state)
     */
    animationPlayState: {
        /** A running animation will be paused. */
        paused: StyleObject;
        /** Resume playback of a paused animation. */
        running: StyleObject;
    } & WideEntry;
    /**
     * Describes how the animation will progress over one cycle of its duration.
     *
     * Syntax: \<easing-function>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-timing-function)
     */
    animationTimingFunction: TransitionTimingFunctions & WideEntry;
    /**
     * Determines whether or not the 'back' side of a transformed element is visible when facing the viewer. With an identity transform, the front side of an element faces the viewer.
     *
     * Syntax: visible | hidden
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/backface-visibility)
     */
    backfaceVisibility: {
        /** Back side is hidden. */
        hidden: StyleObject;
        /** Back side is visible. */
        visible: StyleObject;
    } & WideEntry;
    /**
     * Shorthand property for setting most background properties at the same place in the style sheet.
     *
     * Syntax: [ \<bg-layer> , ]* \<final-bg-layer>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background)
     */
    background: {
        /** The background is fixed with regard to the viewport. In paged media where there is no viewport, a 'fixed' background is fixed with respect to the page box and therefore replicated on every page. */
        fixed: StyleObject;
        /** The background is fixed with regard to the element's contents: if the element has a scrolling mechanism, the background scrolls with the element's contents. */
        local: StyleObject;
        /** A value of 'none' counts as an image layer but draws nothing. */
        none: StyleObject;
        /** The background is fixed with regard to the element itself and does not scroll with its contents. (It is effectively attached to the element's border.) */
        scroll: StyleObject;
    } & ColorEntry & ColorFunctions & LengthEntry & PercentEntry & ImageFunctions & PositionEntry & RepeatStyleEntry & BoxEntry & WideEntry;
    /**
     * Specifies whether the background images are fixed with regard to the viewport ('fixed') or scroll along with the element ('scroll') or its contents ('local').
     *
     * Syntax: \<attachment>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-attachment)
     */
    backgroundAttachment: {
        /** The background is fixed with regard to the viewport. In paged media where there is no viewport, a 'fixed' background is fixed with respect to the page box and therefore replicated on every page. */
        fixed: StyleObject;
        /** The background is fixed with regard to the element’s contents: if the element has a scrolling mechanism, the background scrolls with the element’s contents. */
        local: StyleObject;
        /** The background is fixed with regard to the element itself and does not scroll with its contents. (It is effectively attached to the element’s border.) */
        scroll: StyleObject;
    } & WideEntry;
    /**
     * Defines the blending mode of each background layer.
     *
     * (Edge 79, Firefox 30, Safari 8, Chrome 35, Opera 22)
     *
     * Syntax: \<blend-mode>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-blend-mode)
     */
    backgroundBlendMode: {
        /** Default attribute which specifies no blending */
        normal: StyleObject;
        /** The source color is multiplied by the destination color and replaces the destination. */
        multiply: StyleObject;
        /** Multiplies the complements of the backdrop and source color values, then complements the result. */
        screen: StyleObject;
        /** Multiplies or screens the colors, depending on the backdrop color value. */
        overlay: StyleObject;
        /** Selects the darker of the backdrop and source colors. */
        darken: StyleObject;
        /** Selects the lighter of the backdrop and source colors. */
        lighten: StyleObject;
        /** Brightens the backdrop color to reflect the source color. */
        "color-dodge": StyleObject;
        /** Darkens the backdrop color to reflect the source color. */
        "color-burn": StyleObject;
        /** Multiplies or screens the colors, depending on the source color value. */
        "hard-light": StyleObject;
        /** Darkens or lightens the colors, depending on the source color value. */
        "soft-light": StyleObject;
        /** Subtracts the darker of the two constituent colors from the lighter color.. */
        difference: StyleObject;
        /** Produces an effect similar to that of the Difference mode but lower in contrast. */
        exclusion: StyleObject;
        /**
         * Creates a color with the hue of the source color and the saturation and luminosity of the backdrop color.
         *
         * (Edge 79, Firefox 30, Safari 8, Chrome 35, Opera 22)
         */
        hue: StyleObject;
        /**
         * Creates a color with the saturation of the source color and the hue and luminosity of the backdrop color.
         *
         * (Edge 79, Firefox 30, Safari 8, Chrome 35, Opera 22)
         */
        saturation: StyleObject;
        /**
         * Creates a color with the hue and saturation of the source color and the luminosity of the backdrop color.
         *
         * (Edge 79, Firefox 30, Safari 8, Chrome 35, Opera 22)
         */
        color: StyleObject;
        /**
         * Creates a color with the luminosity of the source color and the hue and saturation of the backdrop color.
         *
         * (Edge 79, Firefox 30, Safari 8, Chrome 35, Opera 22)
         */
        luminosity: StyleObject;
    } & WideEntry;
    /**
     * Determines the background painting area.
     *
     * Syntax: \<box>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-clip)
     */
    backgroundClip: BoxEntry & WideEntry;
    /**
     * Sets the background color of an element.
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-color)
     */
    backgroundColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Sets the background image(s) of an element.
     *
     * Syntax: \<bg-image>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-image)
     */
    backgroundImage: {
        /** Counts as an image layer but draws nothing. */
        none: StyleObject;
    } & ImageFunctions & WideEntry;
    /**
     * For elements rendered as a single box, specifies the background positioning area. For elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes on several pages) specifies which boxes 'box-decoration-break' operates on to determine the background positioning area(s).
     *
     * Syntax: \<box>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-origin)
     */
    backgroundOrigin: BoxEntry & WideEntry;
    /**
     * Specifies the initial position of the background image(s) (after any resizing) within their corresponding background positioning area.
     *
     * Syntax: \<bg-position>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-position)
     */
    backgroundPosition: LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * If background images have been specified, this property specifies their initial position (after any resizing) within their corresponding background positioning area.
     *
     * Syntax: [ center | [ [ left | right | x-start | x-end ]? \<length-percentage>? ]! ]#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-position-x)
     */
    backgroundPositionX: {
        /** Equivalent to '50%' ('left 50%') for the horizontal position if the horizontal position is not otherwise specified, or '50%' ('top 50%') for the vertical position if it is. */
        center: StyleObject;
        /** Equivalent to '0%' for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset. */
        left: StyleObject;
        /** Equivalent to '100%' for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset. */
        right: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * If background images have been specified, this property specifies their initial position (after any resizing) within their corresponding background positioning area.
     *
     * Syntax: [ center | [ [ top | bottom | y-start | y-end ]? \<length-percentage>? ]! ]#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-position-y)
     */
    backgroundPositionY: {
        /** Equivalent to '100%' for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset. */
        bottom: StyleObject;
        /** Equivalent to '50%' ('left 50%') for the horizontal position if the horizontal position is not otherwise specified, or '50%' ('top 50%') for the vertical position if it is. */
        center: StyleObject;
        /** Equivalent to '0%' for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset. */
        top: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies how background images are tiled after they have been sized and positioned.
     *
     * Syntax: \<repeat-style>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-repeat)
     */
    backgroundRepeat: RepeatStyleEntry & WideEntry;
    /**
     * Specifies the size of the background images.
     *
     * Syntax: \<bg-size>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-size)
     */
    backgroundSize: {
        /** Resolved by using the image’s intrinsic ratio and the size of the other dimension, or failing that, using the image’s intrinsic size, or failing that, treating it as 100%. */
        auto: StyleObject;
        /** Scale the image, while preserving its intrinsic aspect ratio (if any), to the largest size such that both its width and its height can fit inside the background positioning area. */
        contain: StyleObject;
        /** Scale the image, while preserving its intrinsic aspect ratio (if any), to the smallest size such that both its width and its height can completely cover the background positioning area. */
        cover: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * IE only. Used to extend behaviors of the browser.
     *
     * (IE 6)
     */
    behavior: URLEntry & WideEntry;
    /**
     * Size of an element in the direction opposite that of the direction specified by 'writing-mode'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: \<'width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/block-size)
     */
    blockSize: {
        /** Depends on the values of other properties. */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property for setting border width, style, and color.
     *
     * Syntax: \<line-width> || \<line-style> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border)
     */
    border: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Logical 'border-bottom'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-width'> || \<'border-top-style'> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-end)
     */
    borderBlockEnd: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Logical 'border-top'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-width'> || \<'border-top-style'> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-start)
     */
    borderBlockStart: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Logical 'border-bottom-color'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-color'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-end-color)
     */
    borderBlockEndColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Logical 'border-top-color'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-color'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-start-color)
     */
    borderBlockStartColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Logical 'border-bottom-style'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-style'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-end-style)
     */
    borderBlockEndStyle: LineStyleEntry & WideEntry;
    /**
     * Logical 'border-top-style'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-style'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-start-style)
     */
    borderBlockStartStyle: LineStyleEntry & WideEntry;
    /**
     * Logical 'border-bottom-width'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-end-width)
     */
    borderBlockEndWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * Logical 'border-top-width'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-start-width)
     */
    borderBlockStartWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * Shorthand property for setting border width, style and color.
     *
     * Syntax: \<line-width> || \<line-style> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-bottom)
     */
    borderBottom: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Sets the color of the bottom border.
     *
     * Syntax: \<'border-top-color'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-bottom-color)
     */
    borderBottomColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Defines the radii of the bottom left outer border edge.
     *
     * Syntax: \<length-percentage>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-bottom-left-radius)
     */
    borderBottomLeftRadius: LengthEntry & PercentEntry & WideEntry;
    /**
     * Defines the radii of the bottom right outer border edge.
     *
     * Syntax: \<length-percentage>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius)
     */
    borderBottomRightRadius: LengthEntry & PercentEntry & WideEntry;
    /**
     * Sets the style of the bottom border.
     *
     * Syntax: \<line-style>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-bottom-style)
     */
    borderBottomStyle: LineStyleEntry & WideEntry;
    /**
     * Sets the thickness of the bottom border.
     *
     * Syntax: \<line-width>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-bottom-width)
     */
    borderBottomWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * Selects a table's border model.
     *
     * Syntax: collapse | separate
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-collapse)
     */
    borderCollapse: {
        /** Selects the collapsing borders model. */
        collapse: StyleObject;
        /** Selects the separated borders border model. */
        separate: StyleObject;
    } & WideEntry;
    /**
     * The color of the border around all four edges of an element.
     *
     * Syntax: \<color>\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-color)
     */
    borderColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Shorthand property for setting 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset' and 'border-image-repeat'. Omitted values are set to their initial values.
     *
     * Syntax: \<'border-image-source'> || \<'border-image-slice'> [ / \<'border-image-width'> | / \<'border-image-width'>? / \<'border-image-outset'> ]? || \<'border-image-repeat'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-image)
     */
    borderImage: {
        /** If 'auto' is specified then the border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead. */
        auto: StyleObject;
        /** Causes the middle part of the border-image to be preserved. */
        fill: StyleObject;
        /** Use the border styles. */
        none: StyleObject;
        /** The image is tiled (repeated) to fill the area. */
        repeat: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does. */
        round: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles. */
        space: StyleObject;
        /** The image is stretched to fill the area. */
        stretch: StyleObject;
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * The values specify the amount by which the border image area extends beyond the border box on the top, right, bottom, and left sides respectively. If the fourth value is absent, it is the same as the second. If the third one is also absent, it is the same as the first. If the second one is also absent, it is the same as the first. Numbers represent multiples of the corresponding border-width.
     *
     * Syntax: [ \<length> | \<number> ]\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-image-outset)
     */
    borderImageOutset: LengthEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Specifies how the images for the sides and the middle part of the border image are scaled and tiled. If the second keyword is absent, it is assumed to be the same as the first.
     *
     * Syntax: [ stretch | repeat | round | space ]\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-image-repeat)
     */
    borderImageRepeat: {
        /** The image is tiled (repeated) to fill the area. */
        repeat: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does. */
        round: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles. */
        space: StyleObject;
        /** The image is stretched to fill the area. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * Specifies inward offsets from the top, right, bottom, and left edges of the image, dividing it into nine regions: four corners, four edges and a middle.
     *
     * Syntax: \<number-percentage>\{1,4\} && fill?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-image-slice)
     */
    borderImageSlice: {
        /** Causes the middle part of the border-image to be preserved. */
        fill: StyleObject;
    } & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Specifies an image to use instead of the border styles given by the 'border-style' properties and as an additional background layer for the element. If the value is 'none' or if the image cannot be displayed, the border styles will be used.
     *
     * Syntax: none | \<image>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-image-source)
     */
    borderImageSource: {
        /** Use the border styles. */
        none: StyleObject;
    } & ImageFunctions & WideEntry;
    /**
     * The four values of 'border-image-width' specify offsets that are used to divide the border image area into nine parts. They represent inward distances from the top, right, bottom, and left sides of the area, respectively.
     *
     * Syntax: [ \<length-percentage> | \<number> | auto ]\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-image-width)
     */
    borderImageWidth: {
        /** The border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead. */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Logical 'border-right'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-width'> || \<'border-top-style'> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-end)
     */
    borderInlineEnd: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Logical 'border-left'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-width'> || \<'border-top-style'> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-start)
     */
    borderInlineStart: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Logical 'border-right-color'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-color'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-end-color)
     */
    borderInlineEndColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Logical 'border-left-color'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-color'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-start-color)
     */
    borderInlineStartColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Logical 'border-right-style'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-style'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-end-style)
     */
    borderInlineEndStyle: LineStyleEntry & WideEntry;
    /**
     * Logical 'border-left-style'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-style'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-start-style)
     */
    borderInlineStartStyle: LineStyleEntry & WideEntry;
    /**
     * Logical 'border-right-width'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-end-width)
     */
    borderInlineEndWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * Logical 'border-left-width'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 69, Opera 56)
     *
     * Syntax: \<'border-top-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-start-width)
     */
    borderInlineStartWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * Shorthand property for setting border width, style and color
     *
     * Syntax: \<line-width> || \<line-style> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-left)
     */
    borderLeft: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Sets the color of the left border.
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-left-color)
     */
    borderLeftColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Sets the style of the left border.
     *
     * Syntax: \<line-style>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-left-style)
     */
    borderLeftStyle: LineStyleEntry & WideEntry;
    /**
     * Sets the thickness of the left border.
     *
     * Syntax: \<line-width>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-left-width)
     */
    borderLeftWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * Defines the radii of the outer border edge.
     *
     * Syntax: \<length-percentage>\{1,4\} [ / \<length-percentage>\{1,4\} ]?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-radius)
     */
    borderRadius: LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property for setting border width, style and color
     *
     * Syntax: \<line-width> || \<line-style> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-right)
     */
    borderRight: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Sets the color of the right border.
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-right-color)
     */
    borderRightColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Sets the style of the right border.
     *
     * Syntax: \<line-style>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-right-style)
     */
    borderRightStyle: LineStyleEntry & WideEntry;
    /**
     * Sets the thickness of the right border.
     *
     * Syntax: \<line-width>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-right-width)
     */
    borderRightWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * The lengths specify the distance that separates adjoining cell borders. If one length is specified, it gives both the horizontal and vertical spacing. If two are specified, the first gives the horizontal spacing and the second the vertical spacing. Lengths may not be negative.
     *
     * Syntax: \<length> \<length>?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-spacing)
     */
    borderSpacing: LengthEntry & WideEntry;
    /**
     * The style of the border around edges of an element.
     *
     * Syntax: \<line-style>\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-style)
     */
    borderStyle: LineStyleEntry & WideEntry;
    /**
     * Shorthand property for setting border width, style and color
     *
     * Syntax: \<line-width> || \<line-style> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-top)
     */
    borderTop: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Sets the color of the top border.
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-top-color)
     */
    borderTopColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Defines the radii of the top left outer border edge.
     *
     * Syntax: \<length-percentage>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-top-left-radius)
     */
    borderTopLeftRadius: LengthEntry & PercentEntry & WideEntry;
    /**
     * Defines the radii of the top right outer border edge.
     *
     * Syntax: \<length-percentage>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius)
     */
    borderTopRightRadius: LengthEntry & PercentEntry & WideEntry;
    /**
     * Sets the style of the top border.
     *
     * Syntax: \<line-style>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-top-style)
     */
    borderTopStyle: LineStyleEntry & WideEntry;
    /**
     * Sets the thickness of the top border.
     *
     * Syntax: \<line-width>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-top-width)
     */
    borderTopWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * Shorthand that sets the four 'border-*-width' properties. If it has four values, they set top, right, bottom and left in that order. If left is missing, it is the same as right; if bottom is missing, it is the same as top; if right is missing, it is the same as top.
     *
     * Syntax: \<line-width>\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-width)
     */
    borderWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * Specifies how far an absolutely positioned box's bottom margin edge is offset above the bottom edge of the box's 'containing block'.
     *
     * Syntax: \<length> | \<percentage> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/bottom)
     */
    bottom: {
        /** For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies whether individual boxes are treated as broken pieces of one continuous box, or whether each box is individually wrapped with the border and padding.
     *
     * (Edge 79, Firefox 32, Safari 7, Chrome 22, Opera 15)
     *
     * Syntax: slice | clone
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-decoration-break)
     */
    boxDecorationBreak: {
        /** Each box is independently wrapped with the border and padding. */
        clone: StyleObject;
        /** The effect is as though the element were rendered with no breaks present, and then sliced by the breaks afterward. */
        slice: StyleObject;
    } & WideEntry;
    /**
     * Attaches one or more drop-shadows to the box. The property is a comma-separated list of shadows, each specified by 2-4 length values, an optional color, and an optional 'inset' keyword. Omitted lengths are 0; omitted colors are a user agent chosen color.
     *
     * Syntax: none | \<shadow>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-shadow)
     */
    boxShadow: {
        /** Changes the drop shadow from an outer shadow (one that shadows the box onto the canvas, as if it were lifted above the canvas) to an inner shadow (one that shadows the canvas onto the box, as if the box were cut out of the canvas and shifted behind it). */
        inset: StyleObject;
        /** No shadow. */
        none: StyleObject;
    } & ColorEntry & ColorFunctions & LengthEntry & WideEntry;
    /**
     * Specifies the behavior of the 'width' and 'height' properties.
     *
     * Syntax: content-box | border-box
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-sizing)
     */
    boxSizing: {
        /** The specified width and height (and respective min/max properties) on this element determine the border box of the element. */
        "border-box": StyleObject;
        /** Behavior of width and height as specified by CSS2.1. The specified width and height (and respective min/max properties) apply to the width and height respectively of the content box of the element. */
        "content-box": StyleObject;
    } & WideEntry;
    /**
     * Describes the page/column/region break behavior after the generated box.
     *
     * Syntax: auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region
     */
    breakAfter: {
        /** Always force a page break before/after the generated box. */
        always: StyleObject;
        /** Neither force nor forbid a page/column break before/after the principal box. */
        auto: StyleObject;
        /** Avoid a break before/after the principal box. */
        avoid: StyleObject;
        /** Avoid a column break before/after the principal box. */
        "avoid-column": StyleObject;
        /** Avoid a page break before/after the principal box. */
        "avoid-page": StyleObject;
        /** Always force a column break before/after the principal box. */
        column: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a left page. */
        left: StyleObject;
        /** Always force a page break before/after the principal box. */
        page: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a right page. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Describes the page/column/region break behavior before the generated box.
     *
     * Syntax: auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region
     */
    breakBefore: {
        /** Always force a page break before/after the generated box. */
        always: StyleObject;
        /** Neither force nor forbid a page/column break before/after the principal box. */
        auto: StyleObject;
        /** Avoid a break before/after the principal box. */
        avoid: StyleObject;
        /** Avoid a column break before/after the principal box. */
        "avoid-column": StyleObject;
        /** Avoid a page break before/after the principal box. */
        "avoid-page": StyleObject;
        /** Always force a column break before/after the principal box. */
        column: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a left page. */
        left: StyleObject;
        /** Always force a page break before/after the principal box. */
        page: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a right page. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Describes the page/column/region break behavior inside the principal box.
     *
     * Syntax: auto | avoid | avoid-page | avoid-column | avoid-region
     */
    breakInside: {
        /** Impose no additional breaking constraints within the box. */
        auto: StyleObject;
        /** Avoid breaks within the box. */
        avoid: StyleObject;
        /** Avoid a column break within the box. */
        "avoid-column": StyleObject;
        /** Avoid a page break within the box. */
        "avoid-page": StyleObject;
    } & WideEntry;
    /**
     * Specifies the position of the caption box with respect to the table box.
     *
     * Syntax: top | bottom | block-start | block-end | inline-start | inline-end
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/caption-side)
     */
    captionSide: {
        /** Positions the caption box below the table box. */
        bottom: StyleObject;
        /** Positions the caption box above the table box. */
        top: StyleObject;
    } & WideEntry;
    /**
     * Controls the color of the text insertion indicator.
     *
     * (Edge 79, Firefox 53, Safari 11.1, Chrome 57, Opera 44)
     *
     * Syntax: auto | \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/caret-color)
     */
    caretColor: {
        /** The user agent selects an appropriate color for the caret. This is generally currentcolor, but the user agent may choose a different color to ensure good visibility and contrast with the surrounding content, taking into account the value of currentcolor, the background, shadows, and other factors. */
        auto: StyleObject;
    } & ColorEntry & ColorFunctions & WideEntry;
    /**
     * Indicates which sides of an element's box(es) may not be adjacent to an earlier floating box. The 'clear' property does not consider floats inside the element itself or in other block formatting contexts.
     *
     * Syntax: none | left | right | both | inline-start | inline-end
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/clear)
     */
    clear: {
        /** The clearance of the generated box is set to the amount necessary to place the top border edge below the bottom outer edge of any right-floating and left-floating boxes that resulted from elements earlier in the source document. */
        both: StyleObject;
        /** The clearance of the generated box is set to the amount necessary to place the top border edge below the bottom outer edge of any left-floating boxes that resulted from elements earlier in the source document. */
        left: StyleObject;
        /** No constraint on the box's position with respect to floats. */
        none: StyleObject;
        /** The clearance of the generated box is set to the amount necessary to place the top border edge below the bottom outer edge of any right-floating boxes that resulted from elements earlier in the source document. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Deprecated. Use the 'clip-path' property when support allows. Defines the visible portion of an element’s box.
     *
     * Syntax: \<shape> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/clip)
     */
    clip: {
        /** The element does not clip. */
        auto: StyleObject;
        /** Specifies offsets from the edges of the border box. */
        "rect()": StyleObject;
    } & BasicShapeFunctions & WideEntry;
    /**
     * Specifies a clipping path where everything inside the path is visible and everything outside is clipped out.
     *
     * Syntax: \<clip-source> | [ \<basic-shape> || \<geometry-box> ] | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/clip-path)
     */
    clipPath: {
        /** No clipping path gets created. */
        none: StyleObject;
        /** References a \<clipPath> element to create a clipping path. */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & BasicShapeFunctions & GeometryBoxEntry & WideEntry;
    /**
     * Indicates the algorithm which is to be used to determine what parts of the canvas are included inside the shape.
     *
     * (Edge, Chrome 5, Firefox 3, IE 10, Opera 9, Safari 6)
     */
    clipRule: {
        /** Determines the ‘insideness’ of a point on the canvas by drawing a ray from that point to infinity in any direction and counting the number of path segments from the given shape that the ray crosses. */
        evenodd: StyleObject;
        /** Determines the ‘insideness’ of a point on the canvas by drawing a ray from that point to infinity in any direction and then examining the places where a segment of the shape crosses the ray. */
        nonzero: StyleObject;
    } & WideEntry;
    /**
     * Sets the color of an element's text
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/color)
     */
    color: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Specifies the color space for imaging operations performed via filter effects.
     *
     * (Edge, Chrome 5, Firefox 3, IE 10, Opera 9, Safari 6)
     */
    colorInterpolationFilters: {
        /** Color operations are not required to occur in a particular color space. */
        auto: StyleObject;
        /** Color operations should occur in the linearized RGB color space. */
        linearRGB: StyleObject;
        /** Color operations should occur in the sRGB color space. */
        sRGB: StyleObject;
    } & WideEntry;
    /**
     * Describes the optimal number of columns into which the content of the element will be flowed.
     *
     * Syntax: \<integer> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/column-count)
     */
    columnCount: {
        /** Determines the number of columns by the 'column-width' property and the element width. */
        auto: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * In continuous media, this property will only be consulted if the length of columns has been constrained. Otherwise, columns will automatically be balanced.
     *
     * Syntax: auto | balance | balance-all
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/column-fill)
     */
    columnFill: {
        /** Fills columns sequentially. */
        auto: StyleObject;
        /** Balance content equally between columns, if possible. */
        balance: StyleObject;
    } & WideEntry;
    /**
     * Sets the gap between columns. If there is a column rule between columns, it will appear in the middle of the gap.
     *
     * Syntax: normal | \<length-percentage>
     */
    columnGap: {
        /** User agent specific and typically equivalent to 1em. */
        normal: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Shorthand for setting 'column-rule-width', 'column-rule-style', and 'column-rule-color' at the same place in the style sheet. Omitted values are set to their initial values.
     *
     * Syntax: \<'column-rule-width'> || \<'column-rule-style'> || \<'column-rule-color'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/column-rule)
     */
    columnRule: ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Sets the color of the column rule
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/column-rule-color)
     */
    columnRuleColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Sets the style of the rule between columns of an element.
     *
     * Syntax: \<'border-style'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/column-rule-style)
     */
    columnRuleStyle: LineStyleEntry & WideEntry;
    /**
     * Sets the width of the rule between columns. Negative values are not allowed.
     *
     * Syntax: \<'border-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/column-rule-width)
     */
    columnRuleWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * A shorthand property which sets both 'column-width' and 'column-count'.
     *
     * Syntax: \<'column-width'> || \<'column-count'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/columns)
     */
    columns: {
        /** The width depends on the values of other properties. */
        auto: StyleObject;
    } & LengthEntry & IntegerEntry & WideEntry;
    /**
     * Describes the page/column break behavior after the generated box.
     *
     * Syntax: none | all
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/column-span)
     */
    columnSpan: {
        /** The element spans across all columns. Content in the normal flow that appears before the element is automatically balanced across all columns before the element appear. */
        all: StyleObject;
        /** The element does not span multiple columns. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Describes the width of columns in multicol elements.
     *
     * Syntax: \<length> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/column-width)
     */
    columnWidth: {
        /** The width depends on the values of other properties. */
        auto: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Indicates that an element and its contents are, as much as possible, independent of the rest of the document tree.
     *
     * (Edge 79, Firefox 69, Safari 15.4, Chrome 52, Opera 40)
     *
     * Syntax: none | strict | content | [ size || layout || style || paint ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/contain)
     */
    contain: {
        /** Indicates that the property has no effect. */
        none: StyleObject;
        /** Turns on all forms of containment for the element. */
        strict: StyleObject;
        /** All containment rules except size are applied to the element. */
        content: StyleObject;
        /** For properties that can have effects on more than just an element and its descendants, those effects don't escape the containing element. */
        size: StyleObject;
        /** Turns on layout containment for the element. */
        layout: StyleObject;
        /** Turns on style containment for the element. */
        style: StyleObject;
        /** Turns on paint containment for the element. */
        paint: StyleObject;
    } & WideEntry;
    /**
     * Determines which page-based occurrence of a given element is applied to a counter or string value.
     *
     * Syntax: normal | none | [ \<content-replacement> | \<content-list> ] [/ [ \<string> | \<counter> ]+ ]?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/content)
     */
    content: {
        /** The attr(n) function returns as a string the value of attribute n for the subject of the selector. */
        attr: (...params: Parameters<typeof attr>) => StyleObject;
        /** Counters are denoted by identifiers (see the 'counter-increment' and 'counter-reset' properties). */
        counter: (...params: Parameters<typeof counter>) => StyleObject;
        /** The (pseudo-)element is replaced in its entirety by the resource referenced by its 'icon' property, and treated as a replaced element. */
        icon: StyleObject;
        /** On elements, this inhibits the children of the element from being rendered as children of this element, as if the element was empty. On pseudo-elements it causes the pseudo-element to have no content. */
        none: StyleObject;
        /** See http://www.w3.org/TR/css3-content/#content for computation rules. */
        normal: StyleObject;
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & StringEntry & URLEntry & WideEntry;
    /**
     * Manipulate the value of existing counters.
     *
     * Syntax: [ \<counter-name> \<integer>? ]+ | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/counter-increment)
     */
    counterIncrement: {
        /** This element does not alter the value of any counters. */
        none: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Property accepts one or more names of counters (identifiers), each one optionally followed by an integer. The integer gives the value that the counter is set to on each occurrence of the element.
     *
     * Syntax: [ \<counter-name> \<integer>? | \<reversed-counter-name> \<integer>? ]+ | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/counter-reset)
     */
    counterReset: {
        /** The counter is not modified. */
        none: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Allows control over cursor appearance in an element
     *
     * Syntax: [ [ \<url> [ \<x> \<y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing ] ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/cursor)
     */
    cursor: {
        /** Indicates an alias of/shortcut to something is to be created. Often rendered as an arrow with a small curved arrow next to it. */
        alias: StyleObject;
        /** Indicates that the something can be scrolled in any direction. Often rendered as arrows pointing up, down, left, and right with a dot in the middle. */
        "all-scroll": StyleObject;
        /** The UA determines the cursor to display based on the current context. */
        auto: StyleObject;
        /** Indicates that a cell or set of cells may be selected. Often rendered as a thick plus-sign with a dot in the middle. */
        cell: StyleObject;
        /** Indicates that the item/column can be resized horizontally. Often rendered as arrows pointing left and right with a vertical bar separating them. */
        "col-resize": StyleObject;
        /** A context menu is available for the object under the cursor. Often rendered as an arrow with a small menu-like graphic next to it. */
        "context-menu": StyleObject;
        /** Indicates something is to be copied. Often rendered as an arrow with a small plus sign next to it. */
        copy: StyleObject;
        /** A simple crosshair (e.g., short line segments resembling a '+' sign). Often used to indicate a two dimensional bitmap selection mode. */
        crosshair: StyleObject;
        /** The platform-dependent default cursor. Often rendered as an arrow. */
        default: StyleObject;
        /** Indicates that east edge is to be moved. */
        "e-resize": StyleObject;
        /** Indicates a bidirectional east-west resize cursor. */
        "ew-resize": StyleObject;
        /** Indicates that something can be grabbed. */
        grab: StyleObject;
        /** Indicates that something is being grabbed. */
        grabbing: StyleObject;
        /** Help is available for the object under the cursor. Often rendered as a question mark or a balloon. */
        help: StyleObject;
        /** Indicates something is to be moved. */
        move: StyleObject;
        /** Indicates that something can be grabbed. */
        "-moz-grab": StyleObject;
        /** Indicates that something is being grabbed. */
        "-moz-grabbing": StyleObject;
        /** Indicates that something can be zoomed (magnified) in. */
        "-moz-zoom-in": StyleObject;
        /** Indicates that something can be zoomed (magnified) out. */
        "-moz-zoom-out": StyleObject;
        /** Indicates that movement starts from north-east corner. */
        "ne-resize": StyleObject;
        /** Indicates a bidirectional north-east/south-west cursor. */
        "nesw-resize": StyleObject;
        /** Indicates that the dragged item cannot be dropped at the current cursor location. Often rendered as a hand or pointer with a small circle with a line through it. */
        "no-drop": StyleObject;
        /** No cursor is rendered for the element. */
        none: StyleObject;
        /** Indicates that the requested action will not be carried out. Often rendered as a circle with a line through it. */
        "not-allowed": StyleObject;
        /** Indicates that north edge is to be moved. */
        "n-resize": StyleObject;
        /** Indicates a bidirectional north-south cursor. */
        "ns-resize": StyleObject;
        /** Indicates that movement starts from north-west corner. */
        "nw-resize": StyleObject;
        /** Indicates a bidirectional north-west/south-east cursor. */
        "nwse-resize": StyleObject;
        /** The cursor is a pointer that indicates a link. */
        pointer: StyleObject;
        /** A progress indicator. The program is performing some processing, but is different from 'wait' in that the user may still interact with the program. Often rendered as a spinning beach ball, or an arrow with a watch or hourglass. */
        progress: StyleObject;
        /** Indicates that the item/row can be resized vertically. Often rendered as arrows pointing up and down with a horizontal bar separating them. */
        "row-resize": StyleObject;
        /** Indicates that movement starts from south-east corner. */
        "se-resize": StyleObject;
        /** Indicates that south edge is to be moved. */
        "s-resize": StyleObject;
        /** Indicates that movement starts from south-west corner. */
        "sw-resize": StyleObject;
        /** Indicates text that may be selected. Often rendered as a vertical I-beam. */
        text: StyleObject;
        /** Indicates vertical-text that may be selected. Often rendered as a horizontal I-beam. */
        "vertical-text": StyleObject;
        /** Indicates that the program is busy and the user should wait. Often rendered as a watch or hourglass. */
        wait: StyleObject;
        /** Indicates that something can be grabbed. */
        "-webkit-grab": StyleObject;
        /** Indicates that something is being grabbed. */
        "-webkit-grabbing": StyleObject;
        /** Indicates that something can be zoomed (magnified) in. */
        "-webkit-zoom-in": StyleObject;
        /** Indicates that something can be zoomed (magnified) out. */
        "-webkit-zoom-out": StyleObject;
        /** Indicates that west edge is to be moved. */
        "w-resize": StyleObject;
        /** Indicates that something can be zoomed (magnified) in. */
        "zoom-in": StyleObject;
        /** Indicates that something can be zoomed (magnified) out. */
        "zoom-out": StyleObject;
    } & URLEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Specifies the inline base direction or directionality of any bidi paragraph, embedding, isolate, or override established by the box. Note: for HTML content use the 'dir' attribute and 'bdo' element rather than this property.
     *
     * Syntax: ltr | rtl
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/direction)
     */
    direction: {
        /** Left-to-right direction. */
        ltr: StyleObject;
        /** Right-to-left direction. */
        rtl: StyleObject;
    } & WideEntry;
    /**
     * In combination with 'float' and 'position', determines the type of box or boxes that are generated for an element.
     *
     * Syntax: [ \<display-outside> || \<display-inside> ] | \<display-listitem> | \<display-internal> | \<display-box> | \<display-legacy>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/display)
     */
    display: {
        /** The element generates a block-level box */
        block: StyleObject;
        /** The element itself does not generate any boxes, but its children and pseudo-elements still generate boxes as normal. */
        contents: StyleObject;
        /** The element generates a principal flex container box and establishes a flex formatting context. */
        flex: StyleObject;
        /** The element lays out its contents using flow layout (block-and-inline layout). Standardized as 'flex'. */
        flexbox: StyleObject;
        /** The element generates a block container box, and lays out its contents using flow layout. */
        "flow-root": StyleObject;
        /** The element generates a principal grid container box, and establishes a grid formatting context. */
        grid: StyleObject;
        /** The element generates an inline-level box. */
        inline: StyleObject;
        /** A block box, which itself is flowed as a single inline box, similar to a replaced element. The inside of an inline-block is formatted as a block box, and the box itself is formatted as an inline box. */
        "inline-block": StyleObject;
        /** Inline-level flex container. */
        "inline-flex": StyleObject;
        /** Inline-level flex container. Standardized as 'inline-flex' */
        "inline-flexbox": StyleObject;
        /** Inline-level table wrapper box containing table box. */
        "inline-table": StyleObject;
        /** One or more block boxes and one marker box. */
        "list-item": StyleObject;
        /** The element lays out its contents using flow layout (block-and-inline layout). Standardized as 'flex'. */
        "-moz-box": StyleObject;
        "-moz-deck": StyleObject;
        "-moz-grid": StyleObject;
        "-moz-grid-group": StyleObject;
        "-moz-grid-line": StyleObject;
        "-moz-groupbox": StyleObject;
        /** Inline-level flex container. Standardized as 'inline-flex' */
        "-moz-inline-box": StyleObject;
        "-moz-inline-grid": StyleObject;
        "-moz-inline-stack": StyleObject;
        "-moz-marker": StyleObject;
        "-moz-popup": StyleObject;
        "-moz-stack": StyleObject;
        /** The element lays out its contents using flow layout (block-and-inline layout). Standardized as 'flex'. */
        "-ms-flexbox": StyleObject;
        /** The element generates a principal grid container box, and establishes a grid formatting context. */
        "-ms-grid": StyleObject;
        /** Inline-level flex container. Standardized as 'inline-flex' */
        "-ms-inline-flexbox": StyleObject;
        /** Inline-level grid container. */
        "-ms-inline-grid": StyleObject;
        /** The element and its descendants generates no boxes. */
        none: StyleObject;
        /** The element generates a principal ruby container box, and establishes a ruby formatting context. */
        ruby: StyleObject;
        "ruby-base": StyleObject;
        "ruby-base-container": StyleObject;
        "ruby-text": StyleObject;
        "ruby-text-container": StyleObject;
        /** The element generates a run-in box. Run-in elements act like inlines or blocks, depending on the surrounding elements. */
        "run-in": StyleObject;
        /** The element generates a principal table wrapper box containing an additionally-generated table box, and establishes a table formatting context. */
        table: StyleObject;
        "table-caption": StyleObject;
        "table-cell": StyleObject;
        "table-column": StyleObject;
        "table-column-group": StyleObject;
        "table-footer-group": StyleObject;
        "table-header-group": StyleObject;
        "table-row": StyleObject;
        "table-row-group": StyleObject;
        /** The element lays out its contents using flow layout (block-and-inline layout). Standardized as 'flex'. */
        "-webkit-box": StyleObject;
        /** The element lays out its contents using flow layout (block-and-inline layout). */
        "-webkit-flex": StyleObject;
        /** Inline-level flex container. Standardized as 'inline-flex' */
        "-webkit-inline-box": StyleObject;
        /** Inline-level flex container. */
        "-webkit-inline-flex": StyleObject;
    } & WideEntry;
    /**
     * In the separated borders model, this property controls the rendering of borders and backgrounds around cells that have no visible content.
     *
     * Syntax: show | hide
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/empty-cells)
     */
    emptyCells: {
        /** No borders or backgrounds are drawn around/behind empty cells. */
        hide: StyleObject;
        "-moz-show-background": StyleObject;
        /** Borders and backgrounds are drawn around/behind empty cells (like normal cells). */
        show: StyleObject;
    } & WideEntry;
    /** Deprecated. Use 'isolation' property instead when support allows. Specifies how the accumulation of the background image is managed. */
    enableBackground: {
        /** If the ancestor container element has a property of new, then all graphics elements within the current container are rendered both on the parent's background image and onto the target. */
        accumulate: StyleObject;
        /** Create a new background image canvas. All children of the current container element can access the background, and they will be rendered onto both the parent's background image canvas in addition to the target device. */
        new: StyleObject;
    } & LengthEntry & PercentEntry & IntegerEntry & WideEntry;
    /**
     * \@counter-style descriptor. Specifies a fallback counter style to be used when the current counter style can’t create a representation for a given counter value.
     *
     * (Firefox 33)
     *
     * Syntax: \<counter-style-name>
     */
    fallback: WideEntry;
    /** Paints the interior of the given graphical element. */
    fill: {
        /** A URL reference to a paint server element, which is an element that defines a paint server: ‘hatch’, ‘linearGradient’, ‘mesh’, ‘pattern’, ‘radialGradient’ and ‘solidcolor’. */
        url: (...params: Parameters<typeof url>) => StyleObject;
        /** No paint is applied in this layer. */
        none: StyleObject;
    } & ColorEntry & ColorFunctions & URLEntry & WideEntry;
    /** Specifies the opacity of the painting operation used to paint the interior the current object. */
    fillOpacity: AlphaEntry & WideEntry;
    /** Indicates the algorithm (or winding rule) which is to be used to determine what parts of the canvas are included inside the shape. */
    fillRule: {
        /** Determines the ‘insideness’ of a point on the canvas by drawing a ray from that point to infinity in any direction and counting the number of path segments from the given shape that the ray crosses. */
        evenodd: StyleObject;
        /** Determines the ‘insideness’ of a point on the canvas by drawing a ray from that point to infinity in any direction and then examining the places where a segment of the shape crosses the ray. */
        nonzero: StyleObject;
    } & WideEntry;
    /**
     * Processes an element’s rendering before it is displayed in the document, by applying one or more filter effects.
     *
     * (Edge 12, Firefox 35, Safari 9.1, Chrome 53, Opera 40)
     *
     * Syntax: none | \<filter-function-list>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/filter)
     */
    filter: {
        /** No filter effects are applied. */
        none: StyleObject;
        /** Applies a Gaussian blur to the input image. */
        blur: (...params: Parameters<typeof blur>) => StyleObject;
        /** Applies a linear multiplier to input image, making it appear more or less bright. */
        brightness: (...params: Parameters<typeof brightness>) => StyleObject;
        /** Adjusts the contrast of the input. */
        contrast: (...params: Parameters<typeof contrast>) => StyleObject;
        /** Applies a drop shadow effect to the input image. */
        dropShadow: (...params: Parameters<typeof dropShadow>) => StyleObject;
        /** Converts the input image to grayscale. */
        grayscale: (...params: Parameters<typeof grayscale>) => StyleObject;
        /** Applies a hue rotation on the input image.  */
        hueRotate: (...params: Parameters<typeof hueRotate>) => StyleObject;
        /** Inverts the samples in the input image. */
        invert: (...params: Parameters<typeof invert>) => StyleObject;
        /** Applies transparency to the samples in the input image. */
        opacity: (...params: Parameters<typeof opacity>) => StyleObject;
        /** Saturates the input image. */
        saturate: (...params: Parameters<typeof saturate>) => StyleObject;
        /** Converts the input image to sepia. */
        sepia: (...params: Parameters<typeof sepia>) => StyleObject;
        /**
         * A filter reference to a \<filter> element.
         *
         * (Edge 12, Firefox 35, Safari 9.1, Chrome 53, Opera 40)
         */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & WideEntry;
    /**
     * Specifies the components of a flexible length: the flex grow factor and flex shrink factor, and the flex basis.
     *
     * Syntax: none | [ \<'flex-grow'> \<'flex-shrink'>? || \<'flex-basis'> ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex)
     */
    flex: {
        /** Retrieves the value of the main size property as the used 'flex-basis'. */
        auto: StyleObject;
        /** Indicates automatic sizing, based on the flex item’s content. */
        content: StyleObject;
        /** Expands to '0 0 auto'. */
        none: StyleObject;
    } & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Sets the flex basis.
     *
     * Syntax: content | \<'width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-basis)
     */
    flexBasis: {
        /** Retrieves the value of the main size property as the used 'flex-basis'. */
        auto: StyleObject;
        /** Indicates automatic sizing, based on the flex item’s content. */
        content: StyleObject;
    } & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Specifies how flex items are placed in the flex container, by setting the direction of the flex container’s main axis.
     *
     * Syntax: row | row-reverse | column | column-reverse
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-direction)
     */
    flexDirection: {
        /** The flex container’s main axis has the same orientation as the block axis of the current writing mode. */
        column: StyleObject;
        /** Same as 'column', except the main-start and main-end directions are swapped. */
        "column-reverse": StyleObject;
        /** The flex container’s main axis has the same orientation as the inline axis of the current writing mode. */
        row: StyleObject;
        /** Same as 'row', except the main-start and main-end directions are swapped. */
        "row-reverse": StyleObject;
    } & WideEntry;
    /**
     * Specifies how flexbox items are placed in the flexbox.
     *
     * Syntax: \<'flex-direction'> || \<'flex-wrap'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-flow)
     */
    flexFlow: {
        /** The flex container’s main axis has the same orientation as the block axis of the current writing mode. */
        column: StyleObject;
        /** Same as 'column', except the main-start and main-end directions are swapped. */
        "column-reverse": StyleObject;
        /** The flex container is single-line. */
        nowrap: StyleObject;
        /** The flex container’s main axis has the same orientation as the inline axis of the current writing mode. */
        row: StyleObject;
        /** Same as 'row', except the main-start and main-end directions are swapped. */
        "row-reverse": StyleObject;
        /** The flexbox is multi-line. */
        wrap: StyleObject;
        /** Same as 'wrap', except the cross-start and cross-end directions are swapped. */
        "wrap-reverse": StyleObject;
    } & WideEntry;
    /**
     * Sets the flex grow factor. Negative numbers are invalid.
     *
     * Syntax: \<number>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-grow)
     */
    flexGrow: {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Sets the flex shrink factor. Negative numbers are invalid.
     *
     * Syntax: \<number>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-shrink)
     */
    flexShrink: {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Controls whether the flex container is single-line or multi-line, and the direction of the cross-axis, which determines the direction new lines are stacked in.
     *
     * Syntax: nowrap | wrap | wrap-reverse
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-wrap)
     */
    flexWrap: {
        /** The flex container is single-line. */
        nowrap: StyleObject;
        /** The flexbox is multi-line. */
        wrap: StyleObject;
        /** Same as 'wrap', except the cross-start and cross-end directions are swapped. */
        "wrap-reverse": StyleObject;
    } & WideEntry;
    /**
     * Specifies how a box should be floated. It may be set for any element, but only applies to elements that generate boxes that are not absolutely positioned.
     *
     * Syntax: left | right | none | inline-start | inline-end
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/float)
     */
    float: {
        /** A keyword indicating that the element must float on the end side of its containing block. That is the right side with ltr scripts, and the left side with rtl scripts. */
        "inline-end": StyleObject;
        /** A keyword indicating that the element must float on the start side of its containing block. That is the left side with ltr scripts, and the right side with rtl scripts. */
        "inline-start": StyleObject;
        /** The element generates a block box that is floated to the left. Content flows on the right side of the box, starting at the top (subject to the 'clear' property). */
        left: StyleObject;
        /** The box is not floated. */
        none: StyleObject;
        /** Similar to 'left', except the box is floated to the right, and content flows on the left side of the box, starting at the top. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Indicates what color to use to flood the current filter primitive subregion.
     *
     * (Edge, Chrome 5, Firefox 3, IE 10, Opera 9, Safari 6)
     */
    floodColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Indicates what opacity to use to flood the current filter primitive subregion.
     *
     * (Edge, Chrome 5, Firefox 3, IE 10, Opera 9, Safari 6)
     */
    floodOpacity: PercentEntry & AlphaEntry & WideEntry;
    /**
     * Shorthand property for setting 'font-style', 'font-variant', 'font-weight', 'font-size', 'line-height', and 'font-family', at the same place in the style sheet. The syntax of this property is based on a traditional typographical shorthand notation to set multiple properties related to fonts.
     *
     * Syntax: [ [ \<'font-style'> || \<font-variant-css21> || \<'font-weight'> || \<'font-stretch'> ]? \<'font-size'> [ / \<'line-height'> ]? \<'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font)
     */
    font: {
        /** Thin */
        "100": StyleObject;
        /** Extra Light (Ultra Light) */
        "200": StyleObject;
        /** Light */
        "300": StyleObject;
        /** Normal */
        "400": StyleObject;
        /** Medium */
        "500": StyleObject;
        /** Semi Bold (Demi Bold) */
        "600": StyleObject;
        /** Bold */
        "700": StyleObject;
        /** Extra Bold (Ultra Bold) */
        "800": StyleObject;
        /** Black (Heavy) */
        "900": StyleObject;
        /** Same as 700 */
        bold: StyleObject;
        /** Specifies the weight of the face bolder than the inherited value. */
        bolder: StyleObject;
        /** The font used for captioned controls (e.g., buttons, drop-downs, etc.). */
        caption: StyleObject;
        /** The font used to label icons. */
        icon: StyleObject;
        /** Selects a font that is labeled 'italic', or, if that is not available, one labeled 'oblique'. */
        italic: StyleObject;
        large: StyleObject;
        larger: StyleObject;
        /** Specifies the weight of the face lighter than the inherited value. */
        lighter: StyleObject;
        medium: StyleObject;
        /** The font used in menus (e.g., dropdown menus and menu lists). */
        menu: StyleObject;
        /** The font used in dialog boxes. */
        "message-box": StyleObject;
        /** Specifies a face that is not labeled as a small-caps font. */
        normal: StyleObject;
        /** Selects a font that is labeled 'oblique'. */
        oblique: StyleObject;
        small: StyleObject;
        /** Specifies a font that is labeled as a small-caps font. If a genuine small-caps font is not available, user agents should simulate a small-caps font. */
        "small-caps": StyleObject;
        /** The font used for labeling small controls. */
        "small-caption": StyleObject;
        smaller: StyleObject;
        /** The font used in window status bars. */
        "status-bar": StyleObject;
        "x-large": StyleObject;
        "x-small": StyleObject;
        "xx-large": StyleObject;
        "xx-small": StyleObject;
    } & WideEntry;
    /**
     * Specifies a prioritized list of font family names or generic family names. A user agent iterates through the list of family names until it matches an available font that contains a glyph for the character to be rendered.
     *
     * Syntax: \<family-name>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-family)
     */
    fontFamily: {
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif": StyleObject;
        "Arial, Helvetica, sans-serif": StyleObject;
        "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif": StyleObject;
        "'Courier New', Courier, monospace": StyleObject;
        cursive: StyleObject;
        fantasy: StyleObject;
        "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif": StyleObject;
        "Georgia, 'Times New Roman', Times, serif": StyleObject;
        "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif": StyleObject;
        "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif": StyleObject;
        "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif": StyleObject;
        monospace: StyleObject;
        "sans-serif": StyleObject;
        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif": StyleObject;
        serif: StyleObject;
        "'Times New Roman', Times, serif": StyleObject;
        "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif": StyleObject;
        "Verdana, Geneva, Tahoma, sans-serif": StyleObject;
    } & WideEntry;
    /**
     * Provides low-level control over OpenType font features. It is intended as a way of providing access to font features that are not widely used but are needed for a particular use case.
     *
     * Syntax: normal | \<feature-tag-value>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-feature-settings)
     */
    fontFeatureSettings: {
        /** Access All Alternates. */
        '"aalt"': StyleObject;
        /** Above-base Forms. Required in Khmer script. */
        '"abvf"': StyleObject;
        /** Above-base Mark Positioning. Required in Indic scripts. */
        '"abvm"': StyleObject;
        /** Above-base Substitutions. Required in Indic scripts. */
        '"abvs"': StyleObject;
        /** Alternative Fractions. */
        '"afrc"': StyleObject;
        /** Akhand. Required in most Indic scripts. */
        '"akhn"': StyleObject;
        /** Below-base Form. Required in a number of Indic scripts. */
        '"blwf"': StyleObject;
        /** Below-base Mark Positioning. Required in Indic scripts. */
        '"blwm"': StyleObject;
        /** Below-base Substitutions. Required in Indic scripts. */
        '"blws"': StyleObject;
        /** Contextual Alternates. */
        '"calt"': StyleObject;
        /** Case-Sensitive Forms. Applies only to European scripts; particularly prominent in Spanish-language setting. */
        '"case"': StyleObject;
        /** Glyph Composition/Decomposition. */
        '"ccmp"': StyleObject;
        /** Conjunct Form After Ro. Required in Khmer scripts. */
        '"cfar"': StyleObject;
        /** Conjunct Forms. Required in Indic scripts that show similarity to Devanagari. */
        '"cjct"': StyleObject;
        /** Contextual Ligatures. */
        '"clig"': StyleObject;
        /** Centered CJK Punctuation. Used primarily in Chinese fonts. */
        '"cpct"': StyleObject;
        /** Capital Spacing. Should not be used in connecting scripts (e.g. most Arabic). */
        '"cpsp"': StyleObject;
        /** Contextual Swash. */
        '"cswh"': StyleObject;
        /** Cursive Positioning. Can be used in any cursive script. */
        '"curs"': StyleObject;
        /** Petite Capitals From Capitals. Applies only to bicameral scripts. */
        '"c2pc"': StyleObject;
        /** Small Capitals From Capitals. Applies only to bicameral scripts. */
        '"c2sc"': StyleObject;
        /** Distances. Required in Indic scripts. */
        '"dist"': StyleObject;
        /** Discretionary ligatures. */
        '"dlig"': StyleObject;
        /** Denominators. */
        '"dnom"': StyleObject;
        /** Dotless Forms. Applied to math formula layout. */
        '"dtls"': StyleObject;
        /** Expert Forms. Applies only to Japanese. */
        '"expt"': StyleObject;
        /** Final Glyph on Line Alternates. Can be used in any cursive script. */
        '"falt"': StyleObject;
        /** Terminal Form #2. Used only with the Syriac script. */
        '"fin2"': StyleObject;
        /** Terminal Form #3. Used only with the Syriac script. */
        '"fin3"': StyleObject;
        /** Terminal Forms. Can be used in any alphabetic script. */
        '"fina"': StyleObject;
        /** Flattened ascent forms. Applied to math formula layout. */
        '"flac"': StyleObject;
        /** Fractions. */
        '"frac"': StyleObject;
        /** Full Widths. Applies to any script which can use monospaced forms. */
        '"fwid"': StyleObject;
        /** Half Forms. Required in Indic scripts that show similarity to Devanagari. */
        '"half"': StyleObject;
        /** Halant Forms. Required in Indic scripts. */
        '"haln"': StyleObject;
        /** Alternate Half Widths. Used only in CJKV fonts. */
        '"halt"': StyleObject;
        /** Historical Forms. */
        '"hist"': StyleObject;
        /** Horizontal Kana Alternates. Applies only to fonts that support kana (hiragana and katakana). */
        '"hkna"': StyleObject;
        /** Historical Ligatures. */
        '"hlig"': StyleObject;
        /** Hangul. Korean only. */
        '"hngl"': StyleObject;
        /** Hojo Kanji Forms (JIS X 0212-1990 Kanji Forms). Used only with Kanji script. */
        '"hojo"': StyleObject;
        /** Half Widths. Generally used only in CJKV fonts. */
        '"hwid"': StyleObject;
        /** Initial Forms. Can be used in any alphabetic script. */
        '"init"': StyleObject;
        /** Isolated Forms. Can be used in any cursive script. */
        '"isol"': StyleObject;
        /** Italics. Applies mostly to Latin; note that many non-Latin fonts contain Latin as well. */
        '"ital"': StyleObject;
        /** Justification Alternates. Can be used in any cursive script. */
        '"jalt"': StyleObject;
        /** JIS78 Forms. Applies only to Japanese. */
        '"jp78"': StyleObject;
        /** JIS83 Forms. Applies only to Japanese. */
        '"jp83"': StyleObject;
        /** JIS90 Forms. Applies only to Japanese. */
        '"jp90"': StyleObject;
        /** JIS2004 Forms. Applies only to Japanese. */
        '"jp04"': StyleObject;
        /** Kerning. */
        '"kern"': StyleObject;
        /** Left Bounds. */
        '"lfbd"': StyleObject;
        /** Standard Ligatures. */
        '"liga"': StyleObject;
        /** Leading Jamo Forms. Required for Hangul script when Ancient Hangul writing system is supported. */
        '"ljmo"': StyleObject;
        /** Lining Figures. */
        '"lnum"': StyleObject;
        /** Localized Forms. */
        '"locl"': StyleObject;
        /** Left-to-right glyph alternates. */
        '"ltra"': StyleObject;
        /** Left-to-right mirrored forms. */
        '"ltrm"': StyleObject;
        /** Mark Positioning. */
        '"mark"': StyleObject;
        /** Medial Form #2. Used only with the Syriac script. */
        '"med2"': StyleObject;
        /** Medial Forms. */
        '"medi"': StyleObject;
        /** Mathematical Greek. */
        '"mgrk"': StyleObject;
        /** Mark to Mark Positioning. */
        '"mkmk"': StyleObject;
        /** Alternate Annotation Forms. */
        '"nalt"': StyleObject;
        /** NLC Kanji Forms. Used only with Kanji script. */
        '"nlck"': StyleObject;
        /** Nukta Forms. Required in Indic scripts.. */
        '"nukt"': StyleObject;
        /** Numerators. */
        '"numr"': StyleObject;
        /** Oldstyle Figures. */
        '"onum"': StyleObject;
        /** Optical Bounds. */
        '"opbd"': StyleObject;
        /** Ordinals. Applies mostly to Latin script. */
        '"ordn"': StyleObject;
        /** Ornaments. */
        '"ornm"': StyleObject;
        /** Proportional Alternate Widths. Used mostly in CJKV fonts. */
        '"palt"': StyleObject;
        /** Petite Capitals. */
        '"pcap"': StyleObject;
        /** Proportional Kana. Generally used only in Japanese fonts. */
        '"pkna"': StyleObject;
        /** Proportional Figures. */
        '"pnum"': StyleObject;
        /** Pre-base Forms. Required in Khmer and Myanmar (Burmese) scripts and southern Indic scripts that may display a pre-base form of Ra. */
        '"pref"': StyleObject;
        /** Pre-base Substitutions. Required in Indic scripts. */
        '"pres"': StyleObject;
        /** Post-base Forms. Required in scripts of south and southeast Asia that have post-base forms for consonants eg: Gurmukhi, Malayalam, Khmer. */
        '"pstf"': StyleObject;
        /** Post-base Substitutions. */
        '"psts"': StyleObject;
        /** Proportional Widths. */
        '"pwid"': StyleObject;
        /** Quarter Widths. Generally used only in CJKV fonts. */
        '"qwid"': StyleObject;
        /** Randomize. */
        '"rand"': StyleObject;
        /** Required Contextual Alternates. May apply to any script, but is especially important for many styles of Arabic. */
        '"rclt"': StyleObject;
        /** Required Ligatures. Applies to Arabic and Syriac. May apply to some other scripts. */
        '"rlig"': StyleObject;
        /** Rakar Forms. Required in Devanagari and Gujarati scripts. */
        '"rkrf"': StyleObject;
        /** Reph Form. Required in Indic scripts. E.g. Devanagari, Kannada. */
        '"rphf"': StyleObject;
        /** Right Bounds. */
        '"rtbd"': StyleObject;
        /** Right-to-left alternates. */
        '"rtla"': StyleObject;
        /** Right-to-left mirrored forms. */
        '"rtlm"': StyleObject;
        /** Ruby Notation Forms. Applies only to Japanese. */
        '"ruby"': StyleObject;
        /** Stylistic Alternates. */
        '"salt"': StyleObject;
        /** Scientific Inferiors. */
        '"sinf"': StyleObject;
        /** Optical size. */
        '"size"': StyleObject;
        /** Small Capitals. Applies only to bicameral scripts. */
        '"smcp"': StyleObject;
        /** Simplified Forms. Applies only to Chinese and Japanese. */
        '"smpl"': StyleObject;
        /** Math script style alternates. */
        '"ssty"': StyleObject;
        /** Stretching Glyph Decomposition. */
        '"stch"': StyleObject;
        /** Subscript. */
        '"subs"': StyleObject;
        /** Superscript. */
        '"sups"': StyleObject;
        /** Swash. Does not apply to ideographic scripts. */
        '"swsh"': StyleObject;
        /** Titling. */
        '"titl"': StyleObject;
        /** Trailing Jamo Forms. Required for Hangul script when Ancient Hangul writing system is supported. */
        '"tjmo"': StyleObject;
        /** Traditional Name Forms. Applies only to Japanese. */
        '"tnam"': StyleObject;
        /** Tabular Figures. */
        '"tnum"': StyleObject;
        /** Traditional Forms. Applies only to Chinese and Japanese. */
        '"trad"': StyleObject;
        /** Third Widths. Generally used only in CJKV fonts. */
        '"twid"': StyleObject;
        /** Unicase. */
        '"unic"': StyleObject;
        /** Alternate Vertical Metrics. Applies only to scripts with vertical writing modes. */
        '"valt"': StyleObject;
        /** Vattu Variants. Used for Indic scripts. E.g. Devanagari. */
        '"vatu"': StyleObject;
        /** Vertical Alternates. Applies only to scripts with vertical writing modes. */
        '"vert"': StyleObject;
        /** Alternate Vertical Half Metrics. Used only in CJKV fonts. */
        '"vhal"': StyleObject;
        /** Vowel Jamo Forms. Required for Hangul script when Ancient Hangul writing system is supported. */
        '"vjmo"': StyleObject;
        /** Vertical Kana Alternates. Applies only to fonts that support kana (hiragana and katakana). */
        '"vkna"': StyleObject;
        /** Vertical Kerning. */
        '"vkrn"': StyleObject;
        /** Proportional Alternate Vertical Metrics. Used mostly in CJKV fonts. */
        '"vpal"': StyleObject;
        /** Vertical Alternates and Rotation. Applies only to scripts with vertical writing modes. */
        '"vrt2"': StyleObject;
        /** Slashed Zero. */
        '"zero"': StyleObject;
        /** No change in glyph substitution or positioning occurs. */
        normal: StyleObject;
        /** Disable feature. */
        off: StyleObject;
        /** Enable feature. */
        on: StyleObject;
    } & StringEntry & IntegerEntry & WideEntry;
    /**
     * Kerning is the contextual adjustment of inter-glyph spacing. This property controls metric kerning, kerning that utilizes adjustment data contained in the font.
     *
     * (Edge 79, Firefox 32, Safari 9, Chrome 33, Opera 20)
     *
     * Syntax: auto | normal | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-kerning)
     */
    fontKerning: {
        /** Specifies that kerning is applied at the discretion of the user agent. */
        auto: StyleObject;
        /** Specifies that kerning is not applied. */
        none: StyleObject;
        /** Specifies that kerning is applied. */
        normal: StyleObject;
    } & WideEntry;
    /**
     * The value of 'normal' implies that when rendering with OpenType fonts the language of the document is used to infer the OpenType language system, used to select language specific features when rendering.
     *
     * (Firefox 34)
     *
     * Syntax: normal | \<string>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-language-override)
     */
    fontLanguageOverride: {
        /** Implies that when rendering with OpenType fonts the language of the document is used to infer the OpenType language system, used to select language specific features when rendering. */
        normal: StyleObject;
    } & StringEntry & WideEntry;
    /**
     * Indicates the desired height of glyphs from the font. For scalable fonts, the font-size is a scale factor applied to the EM unit of the font. (Note that certain glyphs may bleed outside their EM box.) For non-scalable fonts, the font-size is converted into absolute units and matched against the declared font-size of the font, using the same absolute coordinate space for both of the matched values.
     *
     * Syntax: \<absolute-size> | \<relative-size> | \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-size)
     */
    fontSize: {
        large: StyleObject;
        larger: StyleObject;
        medium: StyleObject;
        small: StyleObject;
        smaller: StyleObject;
        "x-large": StyleObject;
        "x-small": StyleObject;
        "xx-large": StyleObject;
        "xx-small": StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Preserves the readability of text when font fallback occurs by adjusting the font-size so that the x-height is the same regardless of the font used.
     *
     * (Edge 79, Firefox 40, Chrome 43, Opera 30)
     *
     * Syntax: none | [ ex-height | cap-height | ch-width | ic-width | ic-height ]? [ from-font | \<number> ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-size-adjust)
     */
    fontSizeAdjust: {
        /** Do not preserve the font’s x-height. */
        none: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Selects a normal, condensed, or expanded face from a font family.
     *
     * Syntax: \<font-stretch-absolute>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-stretch)
     */
    fontStretch: {
        condensed: StyleObject;
        expanded: StyleObject;
        "extra-condensed": StyleObject;
        "extra-expanded": StyleObject;
        /** Indicates a narrower value relative to the width of the parent element. */
        narrower: StyleObject;
        normal: StyleObject;
        "semi-condensed": StyleObject;
        "semi-expanded": StyleObject;
        "ultra-condensed": StyleObject;
        "ultra-expanded": StyleObject;
        /** Indicates a wider value relative to the width of the parent element. */
        wider: StyleObject;
    } & WideEntry;
    /**
     * Allows italic or oblique faces to be selected. Italic forms are generally cursive in nature while oblique faces are typically sloped versions of the regular face.
     *
     * Syntax: normal | italic | oblique \<angle>\{0,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-style)
     */
    fontStyle: {
        /** Selects a font that is labeled as an 'italic' face, or an 'oblique' face if one is not */
        italic: StyleObject;
        /** Selects a face that is classified as 'normal'. */
        normal: StyleObject;
        /** Selects a font that is labeled as an 'oblique' face, or an 'italic' face if one is not. */
        oblique: StyleObject;
    } & AngleEntry & WideEntry;
    /**
     * Controls whether user agents are allowed to synthesize bold or oblique font faces when a font family lacks bold or italic faces.
     *
     * (Edge 97, Firefox 34, Safari 9, Chrome 97, Opera 83)
     *
     * Syntax: none | [ weight || style || small-caps ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-synthesis)
     */
    fontSynthesis: {
        /** Disallow all synthetic faces. */
        none: StyleObject;
        /** Allow synthetic italic faces. */
        style: StyleObject;
        /** Allow synthetic bold faces. */
        weight: StyleObject;
    } & WideEntry;
    /**
     * Specifies variant representations of the font
     *
     * Syntax: normal | none | [ \<common-lig-values> || \<discretionary-lig-values> || \<historical-lig-values> || \<contextual-alt-values> || stylistic(\<feature-value-name>) || historical-forms || styleset(\<feature-value-name>#) || character-variant(\<feature-value-name>#) || swash(\<feature-value-name>) || ornaments(\<feature-value-name>) || annotation(\<feature-value-name>) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || \<numeric-figure-values> || \<numeric-spacing-values> || \<numeric-fraction-values> || ordinal || slashed-zero || \<east-asian-variant-values> || \<east-asian-width-values> || ruby ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-variant)
     */
    fontVariant: {
        /** Specifies a face that is not labeled as a small-caps font. */
        normal: StyleObject;
        /** Specifies a font that is labeled as a small-caps font. If a genuine small-caps font is not available, user agents should simulate a small-caps font. */
        "small-caps": StyleObject;
    } & WideEntry;
    /**
     * For any given character, fonts can provide a variety of alternate glyphs in addition to the default glyph for that character. This property provides control over the selection of these alternate glyphs.
     *
     * (Firefox 34, Safari 9.1)
     *
     * Syntax: normal | [ stylistic( \<feature-value-name> ) || historical-forms || styleset( \<feature-value-name># ) || character-variant( \<feature-value-name># ) || swash( \<feature-value-name> ) || ornaments( \<feature-value-name> ) || annotation( \<feature-value-name> ) ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates)
     */
    fontVariantAlternates: {
        /** Enables display of alternate annotation forms. */
        "annotation()": StyleObject;
        /** Enables display of specific character variants. */
        "character-variant()": StyleObject;
        /** Enables display of historical forms. */
        "historical-forms": StyleObject;
        /** None of the features are enabled. */
        normal: StyleObject;
        /** Enables replacement of default glyphs with ornaments, if provided in the font. */
        "ornaments()": StyleObject;
        /** Enables display with stylistic sets. */
        "styleset()": StyleObject;
        /** Enables display of stylistic alternates. */
        "stylistic()": StyleObject;
        /** Enables display of swash glyphs. */
        "swash()": StyleObject;
    } & WideEntry;
    /**
     * Specifies control over capitalized forms.
     *
     * (Edge 79, Firefox 34, Safari 9.1, Chrome 52, Opera 39)
     *
     * Syntax: normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-variant-caps)
     */
    fontVariantCaps: {
        /** Enables display of petite capitals for both upper and lowercase letters. */
        "all-petite-caps": StyleObject;
        /** Enables display of small capitals for both upper and lowercase letters. */
        "all-small-caps": StyleObject;
        /** None of the features are enabled. */
        normal: StyleObject;
        /** Enables display of petite capitals. */
        "petite-caps": StyleObject;
        /** Enables display of small capitals. Small-caps glyphs typically use the form of uppercase letters but are reduced to the size of lowercase letters. */
        "small-caps": StyleObject;
        /** Enables display of titling capitals. */
        "titling-caps": StyleObject;
        /** Enables display of mixture of small capitals for uppercase letters with normal lowercase letters. */
        unicase: StyleObject;
    } & WideEntry;
    /**
     * Allows control of glyph substitute and positioning in East Asian text.
     *
     * (Edge 79, Firefox 34, Safari 9.1, Chrome 63, Opera 50)
     *
     * Syntax: normal | [ \<east-asian-variant-values> || \<east-asian-width-values> || ruby ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-variant-east-asian)
     */
    fontVariantEastAsian: {
        /** Enables rendering of full-width variants. */
        "full-width": StyleObject;
        /** Enables rendering of JIS04 forms. */
        jis04: StyleObject;
        /** Enables rendering of JIS78 forms. */
        jis78: StyleObject;
        /** Enables rendering of JIS83 forms. */
        jis83: StyleObject;
        /** Enables rendering of JIS90 forms. */
        jis90: StyleObject;
        /** None of the features are enabled. */
        normal: StyleObject;
        /** Enables rendering of proportionally-spaced variants. */
        "proportional-width": StyleObject;
        /** Enables display of ruby variant glyphs. */
        ruby: StyleObject;
        /** Enables rendering of simplified forms. */
        simplified: StyleObject;
        /** Enables rendering of traditional forms. */
        traditional: StyleObject;
    } & WideEntry;
    /**
     * Specifies control over which ligatures are enabled or disabled. A value of ‘normal’ implies that the defaults set by the font are used.
     *
     * (Edge 79, Firefox 34, Safari 9.1, Chrome 34, Opera 21)
     *
     * Syntax: normal | none | [ \<common-lig-values> || \<discretionary-lig-values> || \<historical-lig-values> || \<contextual-alt-values> ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-variant-ligatures)
     */
    fontVariantLigatures: {
        /** Enables display of additional ligatures. */
        "additional-ligatures": StyleObject;
        /** Enables display of common ligatures. */
        "common-ligatures": StyleObject;
        /**
         * Enables display of contextual alternates.
         *
         * (Edge 79, Firefox 34, Safari 9.1, Chrome 34, Opera 21)
         */
        contextual: StyleObject;
        /** Enables display of discretionary ligatures. */
        "discretionary-ligatures": StyleObject;
        /** Enables display of historical ligatures. */
        "historical-ligatures": StyleObject;
        /** Disables display of additional ligatures. */
        "no-additional-ligatures": StyleObject;
        /** Disables display of common ligatures. */
        "no-common-ligatures": StyleObject;
        /**
         * Disables display of contextual alternates.
         *
         * (Edge 79, Firefox 34, Safari 9.1, Chrome 34, Opera 21)
         */
        "no-contextual": StyleObject;
        /** Disables display of discretionary ligatures. */
        "no-discretionary-ligatures": StyleObject;
        /** Disables display of historical ligatures. */
        "no-historical-ligatures": StyleObject;
        /**
         * Disables all ligatures.
         *
         * (Edge 79, Firefox 34, Safari 9.1, Chrome 34, Opera 21)
         */
        none: StyleObject;
        /** Implies that the defaults set by the font are used. */
        normal: StyleObject;
    } & WideEntry;
    /**
     * Specifies control over numerical forms.
     *
     * (Edge 79, Firefox 34, Safari 9.1, Chrome 52, Opera 39)
     *
     * Syntax: normal | [ \<numeric-figure-values> || \<numeric-spacing-values> || \<numeric-fraction-values> || ordinal || slashed-zero ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-variant-numeric)
     */
    fontVariantNumeric: {
        /** Enables display of lining diagonal fractions. */
        "diagonal-fractions": StyleObject;
        /** Enables display of lining numerals. */
        "lining-nums": StyleObject;
        /** None of the features are enabled. */
        normal: StyleObject;
        /** Enables display of old-style numerals. */
        "oldstyle-nums": StyleObject;
        /** Enables display of letter forms used with ordinal numbers. */
        ordinal: StyleObject;
        /** Enables display of proportional numerals. */
        "proportional-nums": StyleObject;
        /** Enables display of slashed zeros. */
        "slashed-zero": StyleObject;
        /** Enables display of lining stacked fractions. */
        "stacked-fractions": StyleObject;
        /** Enables display of tabular numerals. */
        "tabular-nums": StyleObject;
    } & WideEntry;
    /**
     * Specifies the vertical position
     *
     * (Firefox 34, Safari 9.1)
     *
     * Syntax: normal | sub | super
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-variant-position)
     */
    fontVariantPosition: {
        /** None of the features are enabled. */
        normal: StyleObject;
        /** Enables display of subscript variants (OpenType feature: subs). */
        sub: StyleObject;
        /** Enables display of superscript variants (OpenType feature: sups). */
        super: StyleObject;
    } & WideEntry;
    /**
     * Specifies weight of glyphs in the font, their degree of blackness or stroke thickness.
     *
     * Syntax: \<font-weight-absolute>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-weight)
     */
    fontWeight: {
        /** Thin */
        "100": StyleObject;
        /** Extra Light (Ultra Light) */
        "200": StyleObject;
        /** Light */
        "300": StyleObject;
        /** Normal */
        "400": StyleObject;
        /** Medium */
        "500": StyleObject;
        /** Semi Bold (Demi Bold) */
        "600": StyleObject;
        /** Bold */
        "700": StyleObject;
        /** Extra Bold (Ultra Bold) */
        "800": StyleObject;
        /** Black (Heavy) */
        "900": StyleObject;
        /** Same as 700 */
        bold: StyleObject;
        /** Specifies the weight of the face bolder than the inherited value. */
        bolder: StyleObject;
        /** Specifies the weight of the face lighter than the inherited value. */
        lighter: StyleObject;
        /** Same as 400 */
        normal: StyleObject;
    } & WideEntry;
    /** Controls glyph orientation when the inline-progression-direction is horizontal. */
    glyphOrientationHorizontal: AngleEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /** Controls glyph orientation when the inline-progression-direction is vertical. */
    glyphOrientationVertical: {
        /** Sets the orientation based on the fullwidth or non-fullwidth characters and the most common orientation. */
        auto: StyleObject;
    } & AngleEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement. Shorthand for 'grid-row-start', 'grid-column-start', 'grid-row-end', and 'grid-column-end'.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: \<grid-line> [ / \<grid-line> ]\{0,3\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-area)
     */
    gridArea: {
        /** The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one. */
        auto: StyleObject;
        /** Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge. */
        span: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * The grid CSS property is a shorthand property that sets all of the explicit grid properties ('grid-template-rows', 'grid-template-columns', and 'grid-template-areas'), and all the implicit grid properties ('grid-auto-rows', 'grid-auto-columns', and 'grid-auto-flow'), in a single declaration.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: \<'grid-template'> | \<'grid-template-rows'> / [ auto-flow && dense? ] \<'grid-auto-columns'>? | [ auto-flow && dense? ] \<'grid-auto-rows'>? / \<'grid-template-columns'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid)
     */
    grid: StringEntry & LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies the size of implicitly created columns.
     *
     * Syntax: \<track-size>+
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-auto-columns)
     */
    gridAutoColumns: {
        /** Represents the largest min-content contribution of the grid items occupying the grid track. */
        "min-content": StyleObject;
        /** Represents the largest max-content contribution of the grid items occupying the grid track. */
        "max-content": StyleObject;
        /** As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track. */
        auto: StyleObject;
        /** Defines a size range greater than or equal to min and less than or equal to max. */
        minmax: (...params: Parameters<typeof minmax>) => StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: [ row | column ] || dense
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-auto-flow)
     */
    gridAutoFlow: {
        /** The auto-placement algorithm places items by filling each row in turn, adding new rows as necessary. */
        row: StyleObject;
        /** The auto-placement algorithm places items by filling each column in turn, adding new columns as necessary. */
        column: StyleObject;
        /** If specified, the auto-placement algorithm uses a “dense” packing algorithm, which attempts to fill in holes earlier in the grid if smaller items come up later. */
        dense: StyleObject;
    } & WideEntry;
    /**
     * Specifies the size of implicitly created rows.
     *
     * Syntax: \<track-size>+
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-auto-rows)
     */
    gridAutoRows: {
        /** Represents the largest min-content contribution of the grid items occupying the grid track. */
        "min-content": StyleObject;
        /** Represents the largest max-content contribution of the grid items occupying the grid track. */
        "max-content": StyleObject;
        /** As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track. */
        auto: StyleObject;
        /** Defines a size range greater than or equal to min and less than or equal to max. */
        minmax: (...params: Parameters<typeof minmax>) => StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand for 'grid-column-start' and 'grid-column-end'.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: \<grid-line> [ / \<grid-line> ]?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-column)
     */
    gridColumn: {
        /** The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one. */
        auto: StyleObject;
        /** Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge. */
        span: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: \<grid-line>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-column-end)
     */
    gridColumnEnd: {
        /** The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one. */
        auto: StyleObject;
        /** Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge. */
        span: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * Specifies the gutters between grid columns. Replaced by 'column-gap' property.
     *
     * (Firefox 52, Chrome 57, Safari 10.1, Opera 44)
     *
     * Syntax: \<length-percentage>
     */
    gridColumnGap: LengthEntry & WideEntry;
    /**
     * Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: \<grid-line>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-column-start)
     */
    gridColumnStart: {
        /** The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one. */
        auto: StyleObject;
        /** Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge. */
        span: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * Shorthand that specifies the gutters between grid columns and grid rows in one declaration. Replaced by 'gap' property.
     *
     * (Firefox 52, Chrome 57, Safari 10.1, Opera 44)
     *
     * Syntax: \<'grid-row-gap'> \<'grid-column-gap'>?
     */
    gridGap: LengthEntry & WideEntry;
    /**
     * Shorthand for 'grid-row-start' and 'grid-row-end'.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: \<grid-line> [ / \<grid-line> ]?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-row)
     */
    gridRow: {
        /** The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one. */
        auto: StyleObject;
        /** Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge. */
        span: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: \<grid-line>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-row-end)
     */
    gridRowEnd: {
        /** The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one. */
        auto: StyleObject;
        /** Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge. */
        span: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * Specifies the gutters between grid rows. Replaced by 'row-gap' property.
     *
     * (Firefox 52, Chrome 57, Safari 10.1, Opera 44)
     *
     * Syntax: \<length-percentage>
     */
    gridRowGap: LengthEntry & WideEntry;
    /**
     * Determine a grid item’s size and location within the grid by contributing a line, a span, or nothing (automatic) to its grid placement.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: \<grid-line>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-row-start)
     */
    gridRowStart: {
        /** The property contributes nothing to the grid item’s placement, indicating auto-placement, an automatic span, or a default span of one. */
        auto: StyleObject;
        /** Contributes a grid span to the grid item’s placement such that the corresponding edge of the grid item’s grid area is N lines from its opposite edge. */
        span: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Shorthand for setting grid-template-columns, grid-template-rows, and grid-template-areas in a single declaration.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: none | [ \<'grid-template-rows'> / \<'grid-template-columns'> ] | [ \<line-names>? \<string> \<track-size>? \<line-names>? ]+ [ / \<explicit-track-list> ]?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-template)
     */
    gridTemplate: {
        /** Sets all three properties to their initial values. */
        none: StyleObject;
        /** Represents the largest min-content contribution of the grid items occupying the grid track. */
        "min-content": StyleObject;
        /** Represents the largest max-content contribution of the grid items occupying the grid track. */
        "max-content": StyleObject;
        /** As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track. */
        auto: StyleObject;
        /** Sets 'grid-template-rows' and 'grid-template-columns' to 'subgrid', and 'grid-template-areas' to its initial value. */
        subgrid: StyleObject;
        /** Defines a size range greater than or equal to min and less than or equal to max. */
        minmax: (...params: Parameters<typeof minmax>) => StyleObject;
        /** Represents a repeated fragment of the track list, allowing a large number of columns or rows that exhibit a recurring pattern to be written in a more compact form. */
        repeat: (...params: Parameters<typeof repeat>) => StyleObject;
    } & StringEntry & LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies named grid areas, which are not associated with any particular grid item, but can be referenced from the grid-placement properties.
     *
     * (Edge 16, Firefox 52, Safari 10.1, Chrome 57, Opera 44)
     *
     * Syntax: none | \<string>+
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-template-areas)
     */
    gridTemplateAreas: {
        /** The grid container doesn’t define any named grid areas. */
        none: StyleObject;
    } & StringEntry & WideEntry;
    /**
     * specifies, as a space-separated track list, the line names and track sizing functions of the grid.
     *
     * Syntax: none | \<track-list> | \<auto-track-list> | subgrid \<line-name-list>?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-template-columns)
     */
    gridTemplateColumns: {
        /** There is no explicit grid; any rows/columns will be implicitly generated. */
        none: StyleObject;
        /** Represents the largest min-content contribution of the grid items occupying the grid track. */
        "min-content": StyleObject;
        /** Represents the largest max-content contribution of the grid items occupying the grid track. */
        "max-content": StyleObject;
        /** As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track. */
        auto: StyleObject;
        /** Indicates that the grid will align to its parent grid in that axis. */
        subgrid: StyleObject;
        /** Defines a size range greater than or equal to min and less than or equal to max. */
        minmax: (...params: Parameters<typeof minmax>) => StyleObject;
        /** Represents a repeated fragment of the track list, allowing a large number of columns or rows that exhibit a recurring pattern to be written in a more compact form. */
        repeat: (...params: Parameters<typeof repeat>) => StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * specifies, as a space-separated track list, the line names and track sizing functions of the grid.
     *
     * Syntax: none | \<track-list> | \<auto-track-list> | subgrid \<line-name-list>?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/grid-template-rows)
     */
    gridTemplateRows: {
        /** There is no explicit grid; any rows/columns will be implicitly generated. */
        none: StyleObject;
        /** Represents the largest min-content contribution of the grid items occupying the grid track. */
        "min-content": StyleObject;
        /** Represents the largest max-content contribution of the grid items occupying the grid track. */
        "max-content": StyleObject;
        /** As a maximum, identical to 'max-content'. As a minimum, represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track. */
        auto: StyleObject;
        /** Indicates that the grid will align to its parent grid in that axis. */
        subgrid: StyleObject;
        /** Defines a size range greater than or equal to min and less than or equal to max. */
        minmax: (...params: Parameters<typeof minmax>) => StyleObject;
        /** Represents a repeated fragment of the track list, allowing a large number of columns or rows that exhibit a recurring pattern to be written in a more compact form. */
        repeat: (...params: Parameters<typeof repeat>) => StyleObject;
    } & StringEntry & LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies the height of the content area, padding area or border area (depending on 'box-sizing') of certain boxes.
     *
     * Syntax: \<viewport-length>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/height)
     */
    height: {
        /** The height depends on the values of other properties. */
        auto: StyleObject;
        /** Use the fit-content inline size or fit-content block size, as appropriate to the writing mode. */
        "fit-content": StyleObject;
        /** Use the max-content inline size or max-content block size, as appropriate to the writing mode. */
        "max-content": StyleObject;
        /** Use the min-content inline size or min-content block size, as appropriate to the writing mode. */
        "min-content": StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Controls whether hyphenation is allowed to create more break opportunities within a line of text.
     *
     * Syntax: none | manual | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/hyphens)
     */
    hyphens: {
        /** Conditional hyphenation characters inside a word, if present, take priority over automatic resources when determining hyphenation points within the word. */
        auto: StyleObject;
        /** Words are only broken at line breaks where there are characters inside the word that suggest line break opportunities */
        manual: StyleObject;
        /** Words are not broken at line breaks, even if characters inside the word suggest line break points. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Specifies an orthogonal rotation to be applied to an image before it is laid out.
     *
     * (Edge 81, Firefox 26, Safari 13.1, Chrome 81, Opera 67)
     *
     * Syntax: from-image | \<angle> | [ \<angle>? flip ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/image-orientation)
     */
    imageOrientation: {
        /** After rotating by the precededing angle, the image is flipped horizontally. Defaults to 0deg if the angle is ommitted. */
        flip: StyleObject;
        /** If the image has an orientation specified in its metadata, such as EXIF, this value computes to the angle that the metadata specifies is necessary to correctly orient the image. */
        "from-image": StyleObject;
    } & AngleEntry & WideEntry;
    /**
     * Provides a hint to the user-agent about what aspects of an image are most important to preserve when the image is scaled, to aid the user-agent in the choice of an appropriate scaling algorithm.
     *
     * (Edge 79, Firefox 3.6, Safari 6, Chrome 13, Opera 15)
     *
     * Syntax: auto | crisp-edges | pixelated
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/image-rendering)
     */
    imageRendering: {
        /** The image should be scaled with an algorithm that maximizes the appearance of the image. */
        auto: StyleObject;
        /** The image must be scaled with an algorithm that preserves contrast and edges in the image, and which does not smooth colors or introduce blur to the image in the process. */
        "crisp-edges": StyleObject;
        /** (Edge 79, Firefox 3.6, Safari 6, Chrome 13, Opera 15) */
        "-moz-crisp-edges": StyleObject;
        /** Deprecated. */
        optimizeQuality: StyleObject;
        /** Deprecated. */
        optimizeSpeed: StyleObject;
        /** When scaling the image up, the 'nearest neighbor' or similar algorithm must be used, so that the image appears to be simply composed of very large pixels. */
        pixelated: StyleObject;
    } & WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * Controls the state of the input method editor for text fields.
     *
     * (Edge 12, Firefox 3, IE 5)
     *
     * Syntax: auto | normal | active | inactive | disabled
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/ime-mode)
     */
    imeMode: {
        /** The input method editor is initially active; text entry is performed using it unless the user specifically dismisses it. */
        active: StyleObject;
        /** No change is made to the current input method editor state. This is the default. */
        auto: StyleObject;
        /** The input method editor is disabled and may not be activated by the user. */
        disabled: StyleObject;
        /** The input method editor is initially inactive, but the user may activate it if they wish. */
        inactive: StyleObject;
        /** The IME state should be normal; this value can be used in a user style sheet to override the page setting. */
        normal: StyleObject;
    } & WideEntry;
    /**
     * Size of an element in the direction specified by 'writing-mode'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: \<'width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/inline-size)
     */
    inlineSize: {
        /** Depends on the values of other properties. */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * In CSS setting to 'isolate' will turn the element into a stacking context. In SVG, it defines whether an element is isolated or not.
     *
     * (Edge 79, Firefox 36, Safari 8, Chrome 41, Opera 30)
     *
     * Syntax: auto | isolate
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/isolation)
     */
    isolation: {
        /** Elements are not isolated unless an operation is applied that causes the creation of a stacking context. */
        auto: StyleObject;
        /** In CSS will turn the element into a stacking context. */
        isolate: StyleObject;
    } & WideEntry;
    /**
     * Aligns flex items along the main axis of the current line of the flex container.
     *
     * Syntax: normal | \<content-distribution> | \<overflow-position>? [ \<content-position> | left | right ]
     */
    justifyContent: {
        /** Flex items are packed toward the center of the line. */
        center: StyleObject;
        /** The items are packed flush to each other toward the start edge of the alignment container in the main axis. */
        start: StyleObject;
        /** The items are packed flush to each other toward the end edge of the alignment container in the main axis. */
        end: StyleObject;
        /** The items are packed flush to each other toward the left edge of the alignment container in the main axis. */
        left: StyleObject;
        /** The items are packed flush to each other toward the right edge of the alignment container in the main axis. */
        right: StyleObject;
        /** If the size of the item overflows the alignment container, the item is instead aligned as if the alignment mode were start. */
        safe: StyleObject;
        /** Regardless of the relative sizes of the item and alignment container, the given alignment value is honored. */
        unsafe: StyleObject;
        /** If the combined size of the alignment subjects is less than the size of the alignment container, any auto-sized alignment subjects have their size increased equally (not proportionally), while still respecting the constraints imposed by max-height/max-width (or equivalent functionality), so that the combined size exactly fills the alignment container. */
        stretch: StyleObject;
        /** The items are evenly distributed within the alignment container along the main axis. */
        "space-evenly": StyleObject;
        /** Flex items are packed toward the end of the line. */
        "flex-end": StyleObject;
        /** Flex items are packed toward the start of the line. */
        "flex-start": StyleObject;
        /** Flex items are evenly distributed in the line, with half-size spaces on either end. */
        "space-around": StyleObject;
        /** Flex items are evenly distributed in the line. */
        "space-between": StyleObject;
        /** Specifies participation in first-baseline alignment. */
        baseline: StyleObject;
        /** Specifies participation in first-baseline alignment. */
        "first baseline": StyleObject;
        /** Specifies participation in last-baseline alignment. */
        "last baseline": StyleObject;
    } & WideEntry;
    /** Indicates whether the user agent should adjust inter-glyph spacing based on kerning tables that are included in the relevant font or instead disable auto-kerning and set inter-character spacing to a specific length. */
    kerning: {
        /** Indicates that the user agent should adjust inter-glyph spacing based on kerning tables that are included in the font that will be used. */
        auto: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Specifies how far an absolutely positioned box's left margin edge is offset to the right of the left edge of the box's 'containing block'.
     *
     * Syntax: \<length> | \<percentage> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/left)
     */
    left: {
        /** For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies the minimum, maximum, and optimal spacing between grapheme clusters.
     *
     * Syntax: normal | \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/letter-spacing)
     */
    letterSpacing: {
        /** The spacing is the normal spacing for the current font. It is typically zero-length. */
        normal: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Defines the color of the light source for filter primitives 'feDiffuseLighting' and 'feSpecularLighting'.
     *
     * (Edge, Chrome 5, Firefox 3, IE 10, Opera 9, Safari 6)
     */
    lightingColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Specifies what set of line breaking restrictions are in effect within the element.
     *
     * Syntax: auto | loose | normal | strict | anywhere
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/line-break)
     */
    lineBreak: {
        /** The UA determines the set of line-breaking restrictions to use for CJK scripts, and it may vary the restrictions based on the length of the line; e.g., use a less restrictive set of line-break rules for short lines. */
        auto: StyleObject;
        /** Breaks text using the least restrictive set of line-breaking rules. Typically used for short lines, such as in newspapers. */
        loose: StyleObject;
        /** Breaks text using the most common set of line-breaking rules. */
        normal: StyleObject;
        /** Breaks CJK scripts using a more restrictive set of line-breaking rules than 'normal'. */
        strict: StyleObject;
        /** There is a soft wrap opportunity around every typographic character unit, including around any punctuation character or preserved white spaces, or in the middle of words, disregarding any prohibition against line breaks, even those introduced by characters with the GL, WJ, or ZWJ line breaking classes or mandated by the word-break property. */
        anywhere: StyleObject;
    } & WideEntry;
    /**
     * Determines the block-progression dimension of the text content area of an inline box.
     *
     * Syntax: normal | \<number> | \<length> | \<percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/line-height)
     */
    lineHeight: {
        /** Tells user agents to set the computed value to a 'reasonable' value based on the font size of the element. */
        normal: StyleObject;
    } & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Shorthand for setting 'list-style-type', 'list-style-position' and 'list-style-image'
     *
     * Syntax: \<'list-style-type'> || \<'list-style-position'> || \<'list-style-image'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/list-style)
     */
    listStyle: {
        armenian: StyleObject;
        /** A hollow circle. */
        circle: StyleObject;
        decimal: StyleObject;
        "decimal-leading-zero": StyleObject;
        /** A filled circle. */
        disc: StyleObject;
        georgian: StyleObject;
        /** The marker box is outside the principal block box, as described in the section on the ::marker pseudo-element below. */
        inside: StyleObject;
        "lower-alpha": StyleObject;
        "lower-greek": StyleObject;
        "lower-latin": StyleObject;
        "lower-roman": StyleObject;
        none: StyleObject;
        /** The ::marker pseudo-element is an inline element placed immediately before all ::before pseudo-elements in the principal block box, after which the element's content flows. */
        outside: StyleObject;
        /** A filled square. */
        square: StyleObject;
        /** Allows a counter style to be defined inline. */
        "symbols()": StyleObject;
        "upper-alpha": StyleObject;
        "upper-latin": StyleObject;
        "upper-roman": StyleObject;
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & ImageFunctions & WideEntry;
    /**
     * Sets the image that will be used as the list item marker. When the image is available, it will replace the marker set with the 'list-style-type' marker.
     *
     * Syntax: \<image> | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/list-style-image)
     */
    listStyleImage: {
        /** The default contents of the of the list item’s marker are given by 'list-style-type' instead. */
        none: StyleObject;
    } & ImageFunctions & WideEntry;
    /**
     * Specifies the position of the '::marker' pseudo-element's box in the list item.
     *
     * Syntax: inside | outside
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/list-style-position)
     */
    listStylePosition: {
        /** The marker box is outside the principal block box, as described in the section on the ::marker pseudo-element below. */
        inside: StyleObject;
        /** The ::marker pseudo-element is an inline element placed immediately before all ::before pseudo-elements in the principal block box, after which the element's content flows. */
        outside: StyleObject;
    } & WideEntry;
    /**
     * Used to construct the default contents of a list item’s marker
     *
     * Syntax: \<counter-style> | \<string> | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/list-style-type)
     */
    listStyleType: {
        /** Traditional uppercase Armenian numbering. */
        armenian: StyleObject;
        /** A hollow circle. */
        circle: StyleObject;
        /** Western decimal numbers. */
        decimal: StyleObject;
        /** Decimal numbers padded by initial zeros. */
        "decimal-leading-zero": StyleObject;
        /** A filled circle. */
        disc: StyleObject;
        /** Traditional Georgian numbering. */
        georgian: StyleObject;
        /** Lowercase ASCII letters. */
        "lower-alpha": StyleObject;
        /** Lowercase classical Greek. */
        "lower-greek": StyleObject;
        /** Lowercase ASCII letters. */
        "lower-latin": StyleObject;
        /** Lowercase ASCII Roman numerals. */
        "lower-roman": StyleObject;
        /** No marker */
        none: StyleObject;
        /** A filled square. */
        square: StyleObject;
        /** Allows a counter style to be defined inline. */
        "symbols()": StyleObject;
        /** Uppercase ASCII letters. */
        "upper-alpha": StyleObject;
        /** Uppercase ASCII letters. */
        "upper-latin": StyleObject;
        /** Uppercase ASCII Roman numerals. */
        "upper-roman": StyleObject;
    } & StringEntry & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits.
     *
     * Syntax: [ \<length> | \<percentage> | auto ]\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin)
     */
    margin: {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'margin-bottom'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 87, Firefox 41, Safari 12.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'margin-left'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-block-end)
     */
    marginBlockEnd: {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'margin-top'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 87, Firefox 41, Safari 12.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'margin-left'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-block-start)
     */
    marginBlockStart: {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..
     *
     * Syntax: \<length> | \<percentage> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-bottom)
     */
    marginBottom: {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'margin-right'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 87, Firefox 41, Safari 12.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'margin-left'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-inline-end)
     */
    marginInlineEnd: {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'margin-left'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 87, Firefox 41, Safari 12.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'margin-left'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-inline-start)
     */
    marginInlineStart: {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..
     *
     * Syntax: \<length> | \<percentage> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-left)
     */
    marginLeft: {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..
     *
     * Syntax: \<length> | \<percentage> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-right)
     */
    marginRight: {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..
     *
     * Syntax: \<length> | \<percentage> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-top)
     */
    marginTop: {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /** Specifies the marker symbol that shall be used for all points on the sets the value for all vertices on the given ‘path’ element or basic shape. */
    marker: {
        /** Indicates that no marker symbol will be drawn at the given vertex or vertices. */
        none: StyleObject;
        /** Indicates that the \<marker> element referenced will be used. */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & WideEntry;
    /** Specifies the marker that will be drawn at the last vertices of the given markable element. */
    markerEnd: {
        /** Indicates that no marker symbol will be drawn at the given vertex or vertices. */
        none: StyleObject;
        /** Indicates that the \<marker> element referenced will be used. */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & WideEntry;
    /** Specifies the marker that will be drawn at all vertices except the first and last. */
    markerMid: {
        /** Indicates that no marker symbol will be drawn at the given vertex or vertices. */
        none: StyleObject;
        /** Indicates that the \<marker> element referenced will be used. */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & WideEntry;
    /** Specifies the marker that will be drawn at the first vertices of the given markable element. */
    markerStart: {
        /** Indicates that no marker symbol will be drawn at the given vertex or vertices. */
        none: StyleObject;
        /** Indicates that the \<marker> element referenced will be used. */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & WideEntry;
    /**
     * Sets the mask layer image of an element.
     *
     * (Edge 79, Firefox 53, Safari 15.4, Chrome 1, Opera 15)
     *
     * Syntax: \<mask-reference>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-image)
     */
    maskImage: {
        /** Counts as a transparent black image layer. */
        none: StyleObject;
        /** Reference to a \<mask element or to a CSS image. */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & ImageFunctions & WideEntry;
    /**
     * Indicates whether the mask layer image is treated as luminance mask or alpha mask.
     *
     * (Firefox 53, Safari 15.4)
     *
     * Syntax: \<masking-mode>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-mode)
     */
    maskMode: {
        /** Alpha values of the mask layer image should be used as the mask values. */
        alpha: StyleObject;
        /** Use alpha values if 'mask-image' is an image, luminance if a \<mask> element or a CSS image. */
        auto: StyleObject;
        /** Luminance values of the mask layer image should be used as the mask values. */
        luminance: StyleObject;
    } & URLEntry & ImageFunctions & WideEntry;
    /**
     * Specifies the mask positioning area.
     *
     * (Edge 79, Firefox 53, Safari 15.4, Chrome 1, Opera 15)
     *
     * Syntax: \<geometry-box>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-origin)
     */
    maskOrigin: GeometryBoxEntry & WideEntry;
    /**
     * Specifies how mask layer images are positioned.
     *
     * (Edge 79, Firefox 53, Safari 15.4, Chrome 1, Opera 15)
     *
     * Syntax: \<position>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-position)
     */
    maskPosition: LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Specifies how mask layer images are tiled after they have been sized and positioned.
     *
     * (Edge 79, Firefox 53, Safari 15.4, Chrome 1, Opera 15)
     *
     * Syntax: \<repeat-style>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-repeat)
     */
    maskRepeat: RepeatStyleEntry & WideEntry;
    /**
     * Specifies the size of the mask layer images.
     *
     * (Edge 79, Firefox 53, Safari 15.4, Chrome 4, Opera 15)
     *
     * Syntax: \<bg-size>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-size)
     */
    maskSize: {
        /** Resolved by using the image’s intrinsic ratio and the size of the other dimension, or failing that, using the image’s intrinsic size, or failing that, treating it as 100%. */
        auto: StyleObject;
        /** Scale the image, while preserving its intrinsic aspect ratio (if any), to the largest size such that both its width and its height can fit inside the background positioning area. */
        contain: StyleObject;
        /** Scale the image, while preserving its intrinsic aspect ratio (if any), to the smallest size such that both its width and its height can completely cover the background positioning area. */
        cover: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Defines whether the content of the \<mask> element is treated as as luminance mask or alpha mask.
     *
     * (Edge 79, Firefox 35, Safari 7, Chrome 24, Opera 15)
     *
     * Syntax: luminance | alpha
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-type)
     */
    maskType: {
        /** Indicates that the alpha values of the mask should be used. */
        alpha: StyleObject;
        /** Indicates that the luminance values of the mask should be used. */
        luminance: StyleObject;
    } & WideEntry;
    /**
     * Maximum size of an element in the direction opposite that of the direction specified by 'writing-mode'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: \<'max-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/max-block-size)
     */
    maxBlockSize: {
        /** No limit on the width of the box. */
        none: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Allows authors to constrain content height to a certain range.
     *
     * Syntax: \<viewport-length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/max-height)
     */
    maxHeight: {
        /** No limit on the height of the box. */
        none: StyleObject;
        /** Use the fit-content inline size or fit-content block size, as appropriate to the writing mode. */
        "fit-content": StyleObject;
        /** Use the max-content inline size or max-content block size, as appropriate to the writing mode. */
        "max-content": StyleObject;
        /** Use the min-content inline size or min-content block size, as appropriate to the writing mode. */
        "min-content": StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Maximum size of an element in the direction specified by 'writing-mode'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: \<'max-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/max-inline-size)
     */
    maxInlineSize: {
        /** No limit on the height of the box. */
        none: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Allows authors to constrain content width to a certain range.
     *
     * Syntax: \<viewport-length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/max-width)
     */
    maxWidth: {
        /** No limit on the width of the box. */
        none: StyleObject;
        /** Use the fit-content inline size or fit-content block size, as appropriate to the writing mode. */
        "fit-content": StyleObject;
        /** Use the max-content inline size or max-content block size, as appropriate to the writing mode. */
        "max-content": StyleObject;
        /** Use the min-content inline size or min-content block size, as appropriate to the writing mode. */
        "min-content": StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Minimal size of an element in the direction opposite that of the direction specified by 'writing-mode'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: \<'min-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/min-block-size)
     */
    minBlockSize: LengthEntry & PercentEntry & WideEntry;
    /**
     * Allows authors to constrain content height to a certain range.
     *
     * Syntax: \<viewport-length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/min-height)
     */
    minHeight: {
        auto: StyleObject;
        /** Use the fit-content inline size or fit-content block size, as appropriate to the writing mode. */
        "fit-content": StyleObject;
        /** Use the max-content inline size or max-content block size, as appropriate to the writing mode. */
        "max-content": StyleObject;
        /** Use the min-content inline size or min-content block size, as appropriate to the writing mode. */
        "min-content": StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Minimal size of an element in the direction specified by 'writing-mode'.
     *
     * (Edge 79, Firefox 41, Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: \<'min-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/min-inline-size)
     */
    minInlineSize: LengthEntry & PercentEntry & WideEntry;
    /**
     * Allows authors to constrain content width to a certain range.
     *
     * Syntax: \<viewport-length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/min-width)
     */
    minWidth: {
        auto: StyleObject;
        /** Use the fit-content inline size or fit-content block size, as appropriate to the writing mode. */
        "fit-content": StyleObject;
        /** Use the max-content inline size or max-content block size, as appropriate to the writing mode. */
        "max-content": StyleObject;
        /** Use the min-content inline size or min-content block size, as appropriate to the writing mode. */
        "min-content": StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Defines the formula that must be used to mix the colors with the backdrop.
     *
     * (Edge 79, Firefox 32, Safari 8, Chrome 41, Opera 28)
     *
     * Syntax: \<blend-mode>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode)
     */
    mixBlendMode: {
        /** Default attribute which specifies no blending */
        normal: StyleObject;
        /** The source color is multiplied by the destination color and replaces the destination. */
        multiply: StyleObject;
        /** Multiplies the complements of the backdrop and source color values, then complements the result. */
        screen: StyleObject;
        /** Multiplies or screens the colors, depending on the backdrop color value. */
        overlay: StyleObject;
        /** Selects the darker of the backdrop and source colors. */
        darken: StyleObject;
        /** Selects the lighter of the backdrop and source colors. */
        lighten: StyleObject;
        /** Brightens the backdrop color to reflect the source color. */
        "color-dodge": StyleObject;
        /** Darkens the backdrop color to reflect the source color. */
        "color-burn": StyleObject;
        /** Multiplies or screens the colors, depending on the source color value. */
        "hard-light": StyleObject;
        /** Darkens or lightens the colors, depending on the source color value. */
        "soft-light": StyleObject;
        /** Subtracts the darker of the two constituent colors from the lighter color.. */
        difference: StyleObject;
        /** Produces an effect similar to that of the Difference mode but lower in contrast. */
        exclusion: StyleObject;
        /**
         * Creates a color with the hue of the source color and the saturation and luminosity of the backdrop color.
         *
         * (Edge 79, Firefox 32, Safari 8, Chrome 41, Opera 28)
         */
        hue: StyleObject;
        /**
         * Creates a color with the saturation of the source color and the hue and luminosity of the backdrop color.
         *
         * (Edge 79, Firefox 32, Safari 8, Chrome 41, Opera 28)
         */
        saturation: StyleObject;
        /**
         * Creates a color with the hue and saturation of the source color and the luminosity of the backdrop color.
         *
         * (Edge 79, Firefox 32, Safari 8, Chrome 41, Opera 28)
         */
        color: StyleObject;
        /**
         * Creates a color with the luminosity of the source color and the hue and saturation of the backdrop color.
         *
         * (Edge 79, Firefox 32, Safari 8, Chrome 41, Opera 28)
         */
        luminosity: StyleObject;
    } & WideEntry;
    /**
     * Shorthand property for setting 'motion-path', 'motion-offset' and 'motion-rotation'.
     *
     * (Chrome 46, Opera 33)
     */
    motion: {
        /** No motion path gets created. */
        none: StyleObject;
        /** Defines an SVG path as a string, with optional 'fill-rule' as the first argument. */
        path: (...params: Parameters<typeof path>) => StyleObject;
        /** Indicates that the object is rotated by the angle of the direction of the motion path. */
        auto: StyleObject;
        /** Indicates that the object is rotated by the angle of the direction of the motion path plus 180 degrees. */
        reverse: StyleObject;
    } & URLEntry & LengthEntry & PercentEntry & AngleEntry & BasicShapeFunctions & GeometryBoxEntry & WideEntry;
    /**
     * A distance that describes the position along the specified motion path.
     *
     * (Chrome 46, Opera 33)
     */
    motionOffset: LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies the motion path the element gets positioned at.
     *
     * (Chrome 46, Opera 33)
     */
    motionPath: {
        /** No motion path gets created. */
        none: StyleObject;
        /** Defines an SVG path as a string, with optional 'fill-rule' as the first argument. */
        path: (...params: Parameters<typeof path>) => StyleObject;
    } & URLEntry & BasicShapeFunctions & GeometryBoxEntry & WideEntry;
    /**
     * Defines the direction of the element while positioning along the motion path.
     *
     * (Chrome 46, Opera 33)
     */
    motionRotation: {
        /** Indicates that the object is rotated by the angle of the direction of the motion path. */
        auto: StyleObject;
        /** Indicates that the object is rotated by the angle of the direction of the motion path plus 180 degrees. */
        reverse: StyleObject;
    } & AngleEntry & WideEntry;
    /**
     * Shorthand property combines six of the animation properties into a single property.
     *
     * (Firefox 9)
     */
    "-moz-animation": {
        /** The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. */
        alternate: StyleObject;
        /** The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. */
        "alternate-reverse": StyleObject;
        /** The beginning property value (as defined in the first \@keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'. */
        backwards: StyleObject;
        /** Both forwards and backwards fill modes are applied. */
        both: StyleObject;
        /** The final property value (as defined in the last \@keyframes at-rule) is maintained after the animation completes. */
        forwards: StyleObject;
        /** Causes the animation to repeat forever. */
        infinite: StyleObject;
        /** No animation is performed */
        none: StyleObject;
        /** Normal playback. */
        normal: StyleObject;
        /** All iterations of the animation are played in the reverse direction from the way they were specified. */
        reverse: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & TimeEntry & TransitionTimingFunctions & WideEntry;
    /**
     * Defines when the animation will start.
     *
     * (Firefox 9)
     */
    "-moz-animation-delay": TimeEntry & WideEntry;
    /**
     * Defines whether or not the animation should play in reverse on alternate cycles.
     *
     * (Firefox 9)
     */
    "-moz-animation-direction": {
        /** The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. */
        alternate: StyleObject;
        /** The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. */
        "alternate-reverse": StyleObject;
        /** Normal playback. */
        normal: StyleObject;
        /** All iterations of the animation are played in the reverse direction from the way they were specified. */
        reverse: StyleObject;
    } & WideEntry;
    /**
     * Defines the length of time that an animation takes to complete one cycle.
     *
     * (Firefox 9)
     */
    "-moz-animation-duration": TimeEntry & WideEntry;
    /**
     * Defines the number of times an animation cycle is played. The default value is one, meaning the animation will play from beginning to end once.
     *
     * (Firefox 9)
     */
    "-moz-animation-iteration-count": {
        /** Causes the animation to repeat forever. */
        infinite: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Defines a list of animations that apply. Each name is used to select the keyframe at-rule that provides the property values for the animation.
     *
     * (Firefox 9)
     */
    "-moz-animation-name": {
        /** No animation is performed */
        none: StyleObject;
    } & WideEntry;
    /**
     * Defines whether the animation is running or paused.
     *
     * (Firefox 9)
     */
    "-moz-animation-play-state": {
        /** A running animation will be paused. */
        paused: StyleObject;
        /** Resume playback of a paused animation. */
        running: StyleObject;
    } & WideEntry;
    /**
     * Describes how the animation will progress over one cycle of its duration. See the 'transition-timing-function'.
     *
     * (Firefox 9)
     */
    "-moz-animation-timing-function": TransitionTimingFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Used in Gecko (Firefox) to display an element using a platform-native styling based on the operating system's theme.
     *
     * (Firefox 1)
     *
     * Syntax: none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized
     */
    "-moz-appearance": {
        button: StyleObject;
        "button-arrow-down": StyleObject;
        "button-arrow-next": StyleObject;
        "button-arrow-previous": StyleObject;
        "button-arrow-up": StyleObject;
        "button-bevel": StyleObject;
        checkbox: StyleObject;
        "checkbox-container": StyleObject;
        "checkbox-label": StyleObject;
        dialog: StyleObject;
        groupbox: StyleObject;
        listbox: StyleObject;
        menuarrow: StyleObject;
        menuimage: StyleObject;
        menuitem: StyleObject;
        menuitemtext: StyleObject;
        menulist: StyleObject;
        "menulist-button": StyleObject;
        "menulist-text": StyleObject;
        "menulist-textfield": StyleObject;
        menupopup: StyleObject;
        menuradio: StyleObject;
        menuseparator: StyleObject;
        "-moz-mac-unified-toolbar": StyleObject;
        "-moz-win-borderless-glass": StyleObject;
        "-moz-win-browsertabbar-toolbox": StyleObject;
        "-moz-win-communications-toolbox": StyleObject;
        "-moz-win-glass": StyleObject;
        "-moz-win-media-toolbox": StyleObject;
        none: StyleObject;
        progressbar: StyleObject;
        progresschunk: StyleObject;
        radio: StyleObject;
        "radio-container": StyleObject;
        "radio-label": StyleObject;
        radiomenuitem: StyleObject;
        resizer: StyleObject;
        resizerpanel: StyleObject;
        "scrollbarbutton-down": StyleObject;
        "scrollbarbutton-left": StyleObject;
        "scrollbarbutton-right": StyleObject;
        "scrollbarbutton-up": StyleObject;
        "scrollbar-small": StyleObject;
        "scrollbartrack-horizontal": StyleObject;
        "scrollbartrack-vertical": StyleObject;
        separator: StyleObject;
        spinner: StyleObject;
        "spinner-downbutton": StyleObject;
        "spinner-textfield": StyleObject;
        "spinner-upbutton": StyleObject;
        statusbar: StyleObject;
        statusbarpanel: StyleObject;
        tab: StyleObject;
        tabpanels: StyleObject;
        "tab-scroll-arrow-back": StyleObject;
        "tab-scroll-arrow-forward": StyleObject;
        textfield: StyleObject;
        "textfield-multiline": StyleObject;
        toolbar: StyleObject;
        toolbox: StyleObject;
        tooltip: StyleObject;
        treeheadercell: StyleObject;
        treeheadersortarrow: StyleObject;
        treeitem: StyleObject;
        treetwistyopen: StyleObject;
        treeview: StyleObject;
        treewisty: StyleObject;
        window: StyleObject;
    } & WideEntry;
    /**
     * Determines whether or not the 'back' side of a transformed element is visible when facing the viewer. With an identity transform, the front side of an element faces the viewer.
     *
     * (Firefox 10)
     */
    "-moz-backface-visibility": {
        hidden: StyleObject;
        visible: StyleObject;
    } & WideEntry;
    /**
     * Determines the background painting area.
     *
     * (Firefox 1-3.6)
     */
    "-moz-background-clip": {
        padding: StyleObject;
    } & BoxEntry & WideEntry;
    /**
     * In Gecko-based applications like Firefox, the -moz-background-inline-policy CSS property specifies how the background image of an inline element is determined when the content of the inline element wraps onto multiple lines. The choice of position has significant effects on repetition.
     *
     * (Firefox 1)
     */
    "-moz-background-inline-policy": {
        "bounding-box": StyleObject;
        continuous: StyleObject;
        "each-box": StyleObject;
    } & WideEntry;
    /**
     * For elements rendered as a single box, specifies the background positioning area. For elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes on several pages) specifies which boxes 'box-decoration-break' operates on to determine the background positioning area(s).
     *
     * (Firefox 1)
     */
    "-moz-background-origin": BoxEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Sets a list of colors for the bottom border.
     *
     * (Firefox 1)
     *
     * Syntax: \<color>+ | none
     */
    "-moz-border-bottom-colors": ColorEntry & ColorFunctions & WideEntry;
    /**
     * Shorthand property for setting 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset' and 'border-image-repeat'. Omitted values are set to their initial values.
     *
     * (Firefox 3.6)
     */
    "-moz-border-image": {
        /** If 'auto' is specified then the border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead. */
        auto: StyleObject;
        /** Causes the middle part of the border-image to be preserved. */
        fill: StyleObject;
        none: StyleObject;
        /** The image is tiled (repeated) to fill the area. */
        repeat: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does. */
        round: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles. */
        space: StyleObject;
        /** The image is stretched to fill the area. */
        stretch: StyleObject;
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Sets a list of colors for the bottom border.
     *
     * (Firefox 1)
     *
     * Syntax: \<color>+ | none
     */
    "-moz-border-left-colors": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Sets a list of colors for the bottom border.
     *
     * (Firefox 1)
     *
     * Syntax: \<color>+ | none
     */
    "-moz-border-right-colors": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Ske Firefox, -moz-border-bottom-colors sets a list of colors for the bottom border.
     *
     * (Firefox 1)
     *
     * Syntax: \<color>+ | none
     */
    "-moz-border-top-colors": ColorEntry & ColorFunctions & WideEntry;
    /**
     * Specifies how a XUL box aligns its contents across (perpendicular to) the direction of its layout. The effect of this is only visible if there is extra space in the box.
     *
     * (Firefox 1)
     */
    "-moz-box-align": {
        /** If this box orientation is inline-axis or horizontal, all children are placed with their baselines aligned, and extra space placed before or after as necessary. For block flows, the baseline of the first non-empty line box located within the element is used. For tables, the baseline of the first cell is used. */
        baseline: StyleObject;
        /** Any extra space is divided evenly, with half placed above the child and the other half placed after the child. */
        center: StyleObject;
        /** For normal direction boxes, the bottom edge of each child is placed along the bottom of the box. Extra space is placed above the element. For reverse direction boxes, the top edge of each child is placed along the top of the box. Extra space is placed below the element. */
        end: StyleObject;
        /** For normal direction boxes, the top edge of each child is placed along the top of the box. Extra space is placed below the element. For reverse direction boxes, the bottom edge of each child is placed along the bottom of the box. Extra space is placed above the element. */
        start: StyleObject;
        /** The height of each child is adjusted to that of the containing block. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * Specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
     *
     * (Firefox 1)
     */
    "-moz-box-direction": {
        /** A box with a computed value of horizontal for box-orient displays its children from left to right. A box with a computed value of vertical displays its children from top to bottom. */
        normal: StyleObject;
        /** A box with a computed value of horizontal for box-orient displays its children from right to left. A box with a computed value of vertical displays its children from bottom to top. */
        reverse: StyleObject;
    } & WideEntry;
    /**
     * Specifies how a box grows to fill the box that contains it, in the direction of the containing box's layout.
     *
     * (Firefox 1)
     */
    "-moz-box-flex": {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Flexible elements can be assigned to flex groups using the 'box-flex-group' property.
     *
     * (Firefox 1)
     */
    "-moz-box-flexgroup": IntegerEntry & WideEntry;
    /**
     * Indicates the ordinal group the element belongs to. Elements with a lower ordinal group are displayed before those with a higher ordinal group.
     *
     * (Firefox 1)
     */
    "-moz-box-ordinal-group": IntegerEntry & WideEntry;
    /**
     * In Mozilla applications, -moz-box-orient specifies whether a box lays out its contents horizontally or vertically.
     *
     * (Firefox 1)
     */
    "-moz-box-orient": {
        /** Elements are oriented along the box's axis. */
        "block-axis": StyleObject;
        /** The box displays its children from left to right in a horizontal line. */
        horizontal: StyleObject;
        /** Elements are oriented vertically. */
        "inline-axis": StyleObject;
        /** The box displays its children from stacked from top to bottom vertically. */
        vertical: StyleObject;
    } & WideEntry;
    /**
     * Specifies how a box packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
     *
     * (Firefox 1)
     */
    "-moz-box-pack": {
        /** The extra space is divided evenly, with half placed before the first child and the other half placed after the last child. */
        center: StyleObject;
        /** For normal direction boxes, the right edge of the last child is placed at the right side, with all extra space placed before the first child. For reverse direction boxes, the left edge of the first child is placed at the left side, with all extra space placed after the last child. */
        end: StyleObject;
        /** The space is divided evenly in-between each child, with none of the extra space placed before the first child or after the last child. If there is only one child, treat the pack value as if it were start. */
        justify: StyleObject;
        /** For normal direction boxes, the left edge of the first child is placed at the left side, with all extra space placed after the last child. For reverse direction boxes, the right edge of the last child is placed at the right side, with all extra space placed before the first child. */
        start: StyleObject;
    } & WideEntry;
    /**
     * Box Model addition in CSS3.
     *
     * (Firefox 1)
     */
    "-moz-box-sizing": {
        /** The specified width and height (and respective min/max properties) on this element determine the border box of the element. */
        "border-box": StyleObject;
        /** Behavior of width and height as specified by CSS2.1. The specified width and height (and respective min/max properties) apply to the width and height respectively of the content box of the element. */
        "content-box": StyleObject;
        /** The specified width and height (and respective min/max properties) on this element determine the padding box of the element. */
        "padding-box": StyleObject;
    } & WideEntry;
    /**
     * Describes the optimal number of columns into which the content of the element will be flowed.
     *
     * (Firefox 3.5)
     */
    "-moz-column-count": {
        /** Determines the number of columns by the 'column-width' property and the element width. */
        auto: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Sets the gap between columns. If there is a column rule between columns, it will appear in the middle of the gap.
     *
     * (Firefox 3.5)
     */
    "-moz-column-gap": {
        /** User agent specific and typically equivalent to 1em. */
        normal: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Shorthand for setting 'column-rule-width', 'column-rule-style', and 'column-rule-color' at the same place in the style sheet. Omitted values are set to their initial values.
     *
     * (Firefox 3.5)
     */
    "-moz-column-rule": ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Sets the color of the column rule
     *
     * (Firefox 3.5)
     */
    "-moz-column-rule-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * Sets the style of the rule between columns of an element.
     *
     * (Firefox 3.5)
     */
    "-moz-column-rule-style": LineStyleEntry & WideEntry;
    /**
     * Sets the width of the rule between columns. Negative values are not allowed.
     *
     * (Firefox 3.5)
     */
    "-moz-column-rule-width": LengthEntry & LineWidthEntry & WideEntry;
    /**
     * A shorthand property which sets both 'column-width' and 'column-count'.
     *
     * (Firefox 9)
     */
    "-moz-columns": {
        /** The width depends on the values of other properties. */
        auto: StyleObject;
    } & LengthEntry & IntegerEntry & WideEntry;
    /**
     * This property describes the width of columns in multicol elements.
     *
     * (Firefox 3.5)
     */
    "-moz-column-width": {
        /** The width depends on the values of other properties. */
        auto: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Provides low-level control over OpenType font features. It is intended as a way of providing access to font features that are not widely used but are needed for a particular use case.
     *
     * (Firefox 4)
     */
    "-moz-font-feature-settings": {
        '"c2cs"': StyleObject;
        '"dlig"': StyleObject;
        '"kern"': StyleObject;
        '"liga"': StyleObject;
        '"lnum"': StyleObject;
        '"onum"': StyleObject;
        '"smcp"': StyleObject;
        '"swsh"': StyleObject;
        '"tnum"': StyleObject;
        /** No change in glyph substitution or positioning occurs. */
        normal: StyleObject;
        /** (Firefox 4) */
        off: StyleObject;
        /** (Firefox 4) */
        on: StyleObject;
    } & StringEntry & IntegerEntry & WideEntry;
    /**
     * Controls whether hyphenation is allowed to create more break opportunities within a line of text.
     *
     * (Firefox 9)
     */
    "-moz-hyphens": {
        /** Conditional hyphenation characters inside a word, if present, take priority over automatic resources when determining hyphenation points within the word. */
        auto: StyleObject;
        /** Words are only broken at line breaks where there are characters inside the word that suggest line break opportunities */
        manual: StyleObject;
        /** Words are not broken at line breaks, even if characters inside the word suggest line break points. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Applies the same transform as the perspective(\<number>) transform function, except that it applies only to the positioned or transformed children of the element, not to the transform on the element itself.
     *
     * (Firefox 10)
     */
    "-moz-perspective": {
        /** No perspective transform is applied. */
        none: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Establishes the origin for the perspective property. It effectively sets the X and Y position at which the viewer appears to be looking at the children of the element.
     *
     * (Firefox 10)
     */
    "-moz-perspective-origin": LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Describes how the last line of a block or a line right before a forced line break is aligned when 'text-align' is set to 'justify'.
     *
     * (Firefox 12)
     */
    "-moz-text-align-last": {
        auto: StyleObject;
        /** The inline contents are centered within the line box. */
        center: StyleObject;
        /** The text is justified according to the method specified by the 'text-justify' property. */
        justify: StyleObject;
        /** The inline contents are aligned to the left edge of the line box. In vertical text, 'left' aligns to the edge of the line box that would be the start edge for left-to-right text. */
        left: StyleObject;
        /** The inline contents are aligned to the right edge of the line box. In vertical text, 'right' aligns to the edge of the line box that would be the end edge for left-to-right text. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Specifies the color of text decoration (underlines overlines, and line-throughs) set on the element with text-decoration-line.
     *
     * (Firefox 6)
     */
    "-moz-text-decoration-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * Specifies what line decorations, if any, are added to the element.
     *
     * (Firefox 6)
     */
    "-moz-text-decoration-line": {
        /** Each line of text has a line through the middle. */
        "line-through": StyleObject;
        /** Neither produces nor inhibits text decoration. */
        none: StyleObject;
        /** Each line of text has a line above it. */
        overline: StyleObject;
        /** Each line of text is underlined. */
        underline: StyleObject;
    } & WideEntry;
    /**
     * Specifies the line style for underline, line-through and overline text decoration.
     *
     * (Firefox 6)
     */
    "-moz-text-decoration-style": {
        /** Produces a dashed line style. */
        dashed: StyleObject;
        /** Produces a dotted line. */
        dotted: StyleObject;
        /** Produces a double line. */
        double: StyleObject;
        /** Produces no line. */
        none: StyleObject;
        /** Produces a solid line. */
        solid: StyleObject;
        /** Produces a wavy line. */
        wavy: StyleObject;
    } & WideEntry;
    /**
     * Specifies a size adjustment for displaying text content in mobile browsers.
     *
     * (Firefox)
     */
    "-moz-text-size-adjust": {
        /** Renderers must use the default size adjustment when displaying on a small device. */
        auto: StyleObject;
        /** Renderers must not do size adjustment when displaying on a small device. */
        none: StyleObject;
    } & PercentEntry & WideEntry;
    /**
     * A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.
     *
     * (Firefox 3.5)
     */
    "-moz-transform": {
        /** Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f] */
        matrix: (...params: Parameters<typeof matrix>) => StyleObject;
        /** Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order. */
        matrix3d: (...params: Parameters<typeof matrix3d>) => StyleObject;
        none: StyleObject;
        /** Specifies a perspective projection matrix. */
        perspective: StyleObject;
        /** Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property. */
        rotate: (...params: Parameters<typeof rotate>) => StyleObject;
        /** Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters. */
        rotate3d: (...params: Parameters<typeof rotate3d>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the X axis. */
        rotateX: (...params: Parameters<typeof rotateX>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Y axis. */
        rotateY: (...params: Parameters<typeof rotateY>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Z axis. */
        rotateZ: (...params: Parameters<typeof rotateZ>) => StyleObject;
        /** Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first. */
        scale: (...params: Parameters<typeof scale>) => StyleObject;
        /** Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters. */
        scale3d: (...params: Parameters<typeof scale3d>) => StyleObject;
        /** Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter. */
        scaleX: (...params: Parameters<typeof scaleX>) => StyleObject;
        /** Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter. */
        scaleY: (...params: Parameters<typeof scaleY>) => StyleObject;
        /** Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter. */
        scaleZ: (...params: Parameters<typeof scaleZ>) => StyleObject;
        /** Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis). */
        skew: (...params: Parameters<typeof skew>) => StyleObject;
        /** Specifies a skew transformation along the X axis by the given angle. */
        skewX: (...params: Parameters<typeof skewX>) => StyleObject;
        /** Specifies a skew transformation along the Y axis by the given angle. */
        skewY: (...params: Parameters<typeof skewY>) => StyleObject;
        /** Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter. */
        translate: (...params: Parameters<typeof translate>) => StyleObject;
        /** Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively. */
        translate3d: (...params: Parameters<typeof translate3d>) => StyleObject;
        /** Specifies a translation by the given amount in the X direction. */
        translateX: (...params: Parameters<typeof translateX>) => StyleObject;
        /** Specifies a translation by the given amount in the Y direction. */
        translateY: (...params: Parameters<typeof translateY>) => StyleObject;
        /** Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0. */
        translateZ: (...params: Parameters<typeof translateZ>) => StyleObject;
    } & WideEntry;
    /**
     * Establishes the origin of transformation for an element.
     *
     * (Firefox 3.5)
     */
    "-moz-transform-origin": LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Shorthand property combines four of the transition properties into a single property.
     *
     * (Firefox 4)
     */
    "-moz-transition": {
        /** Every property that is able to undergo a transition will do so. */
        all: StyleObject;
        /** No property will transition. */
        none: StyleObject;
    } & TimeEntry & TransitionTimingFunctions & WideEntry;
    /**
     * Defines when the transition will start. It allows a transition to begin execution some period of time from when it is applied.
     *
     * (Firefox 4)
     */
    "-moz-transition-delay": TimeEntry & WideEntry;
    /**
     * Specifies how long the transition from the old value to the new value should take.
     *
     * (Firefox 4)
     */
    "-moz-transition-duration": TimeEntry & WideEntry;
    /**
     * Specifies the name of the CSS property to which the transition is applied.
     *
     * (Firefox 4)
     */
    "-moz-transition-property": {
        /** Every property that is able to undergo a transition will do so. */
        all: StyleObject;
        /** No property will transition. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Describes how the intermediate values used during a transition will be calculated.
     *
     * (Firefox 4)
     */
    "-moz-transition-timing-function": TransitionTimingFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Used to indicate whether the element can have focus.
     *
     * (Firefox 1)
     *
     * Syntax: ignore | normal | select-after | select-before | select-menu | select-same | select-all | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-user-focus)
     */
    "-moz-user-focus": {
        ignore: StyleObject;
        normal: StyleObject;
    } & WideEntry;
    /**
     * Controls the appearance of selection.
     *
     * (Firefox 1.5)
     */
    "-moz-user-select": {
        all: StyleObject;
        element: StyleObject;
        elements: StyleObject;
        "-moz-all": StyleObject;
        "-moz-none": StyleObject;
        none: StyleObject;
        text: StyleObject;
        toggle: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * IE only. Has the ability to turn off its system underlines for accelerator keys until the ALT key is pressed
     *
     * (Edge, IE 10)
     *
     * Syntax: false | true
     */
    "-ms-accelerator": {
        /** The element does not contain an accelerator key sequence. */
        false: StyleObject;
        /** The element contains an accelerator key sequence. */
        true: StyleObject;
    } & WideEntry;
    /**
     * IE only. Used to extend behaviors of the browser
     *
     * (IE 8)
     */
    "-ms-behavior": URLEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Sets the block-progression value and the flow orientation
     *
     * (IE 8)
     *
     * Syntax: tb | rl | bt | lr
     */
    "-ms-block-progression": {
        /** Bottom-to-top block flow. Layout is horizontal. */
        bt: StyleObject;
        /** Left-to-right direction. The flow orientation is vertical. */
        lr: StyleObject;
        /** Right-to-left direction. The flow orientation is vertical. */
        rl: StyleObject;
        /** Top-to-bottom direction. The flow orientation is horizontal. */
        tb: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies the zoom behavior that occurs when a user hits the zoom limit during a manipulation.
     *
     * (Edge, IE 10)
     *
     * Syntax: none | chained
     */
    "-ms-content-zoom-chaining": {
        /** The nearest zoomable parent element begins zooming when the user hits a zoom limit during a manipulation. No bounce effect is shown. */
        chained: StyleObject;
        /** A bounce effect is shown when the user hits a zoom limit during a manipulation. */
        none: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies whether zooming is enabled.
     *
     * (Edge, IE 10)
     *
     * Syntax: none | zoom
     */
    "-ms-content-zooming": {
        /** The element is not zoomable. */
        none: StyleObject;
        /** The element is zoomable. */
        zoom: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Shorthand property for the -ms-content-zoom-limit-min and -ms-content-zoom-limit-max properties.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<'-ms-content-zoom-limit-min'> \<'-ms-content-zoom-limit-max'>
     */
    "-ms-content-zoom-limit": PercentEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies the maximum zoom factor.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<percentage>
     */
    "-ms-content-zoom-limit-max": PercentEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies the minimum zoom factor.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<percentage>
     */
    "-ms-content-zoom-limit-min": PercentEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Shorthand property for the -ms-content-zoom-snap-type and -ms-content-zoom-snap-points properties.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<'-ms-content-zoom-snap-type'> || \<'-ms-content-zoom-snap-points'>
     */
    "-ms-content-zoom-snap": {
        /** Indicates that the motion of the content after the contact is picked up is always adjusted so that it lands on a snap-point. */
        mandatory: StyleObject;
        /** Indicates that zooming is unaffected by any defined snap-points. */
        none: StyleObject;
        /** Indicates that the motion of the content after the contact is picked up may be adjusted if the content would normally stop "close enough" to a snap-point. */
        proximity: StyleObject;
        /** Specifies where the snap-points will be placed. */
        "snapInterval(100%, 100%)": StyleObject;
        /** Specifies the position of individual snap-points as a comma-separated list of zoom factors. */
        "snapList()": StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Defines where zoom snap-points are located.
     *
     * (Edge, IE 10)
     *
     * Syntax: snapInterval( \<percentage>, \<percentage> ) | snapList( \<percentage># )
     */
    "-ms-content-zoom-snap-points": {
        /** Specifies where the snap-points will be placed. */
        "snapInterval(100%, 100%)": StyleObject;
        /** Specifies the position of individual snap-points as a comma-separated list of zoom factors. */
        "snapList()": StyleObject;
    } & PercentEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies how zooming is affected by defined snap-points.
     *
     * (Edge, IE 10)
     *
     * Syntax: none | proximity | mandatory
     */
    "-ms-content-zoom-snap-type": {
        /** Indicates that the motion of the content after the contact is picked up is always adjusted so that it lands on a snap-point. */
        mandatory: StyleObject;
        /** Indicates that zooming is unaffected by any defined snap-points. */
        none: StyleObject;
        /** Indicates that the motion of the content after the contact is picked up may be adjusted if the content would normally stop "close enough" to a snap-point. */
        proximity: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * IE only. Used to produce visual effects.
     *
     * (IE 8-9)
     *
     * Syntax: \<string>
     */
    "-ms-filter": StringEntry & WideEntry;
    /**
     * specifies the parameters of a flexible length: the positive and negative flexibility, and the preferred size.
     *
     * (IE 10)
     */
    "-ms-flex": {
        /** Retrieves the value of the main size property as the used 'flex-basis'. */
        auto: StyleObject;
        /** Expands to '0 0 auto'. */
        none: StyleObject;
    } & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Aligns flex items along the cross axis of the current line of the flex container.
     *
     * (IE 10)
     */
    "-ms-flex-align": {
        /** If the flex item’s inline axis is the same as the cross axis, this value is identical to 'flex-start'. Otherwise, it participates in baseline alignment. */
        baseline: StyleObject;
        /** The flex item’s margin box is centered in the cross axis within the line. */
        center: StyleObject;
        /** The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line. */
        end: StyleObject;
        /** The cross-start margin edge of the flexbox item is placed flush with the cross-start edge of the line. */
        start: StyleObject;
        /** If the cross size property of the flexbox item is anything other than 'auto', this value is identical to 'start'. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * Specifies how flex items are placed in the flex container, by setting the direction of the flex container’s main axis.
     *
     * (IE 10)
     */
    "-ms-flex-direction": {
        /** The flex container’s main axis has the same orientation as the block axis of the current writing mode. */
        column: StyleObject;
        /** Same as 'column', except the main-start and main-end directions are swapped. */
        "column-reverse": StyleObject;
        /** The flex container’s main axis has the same orientation as the inline axis of the current writing mode. */
        row: StyleObject;
        /** Same as 'row', except the main-start and main-end directions are swapped. */
        "row-reverse": StyleObject;
    } & WideEntry;
    /**
     * Specifies how flexbox items are placed in the flexbox.
     *
     * (IE 10)
     */
    "-ms-flex-flow": {
        /** The flex container’s main axis has the same orientation as the block axis of the current writing mode. */
        column: StyleObject;
        /** Same as 'column', except the main-start and main-end directions are swapped. */
        "column-reverse": StyleObject;
        /** The flex container is single-line. */
        nowrap: StyleObject;
        /** The flex container’s main axis has the same orientation as the inline axis of the current writing mode. */
        row: StyleObject;
        /** The flexbox is multi-line. */
        wrap: StyleObject;
        /** Same as 'wrap', except the cross-start and cross-end directions are swapped. */
        "wrap-reverse": StyleObject;
    } & WideEntry;
    /**
     * Allows the default alignment along the cross axis to be overridden for individual flex items.
     *
     * (IE 10)
     */
    "-ms-flex-item-align": {
        /** Computes to the value of 'align-items' on the element’s parent, or 'stretch' if the element has no parent. On absolutely positioned elements, it computes to itself. */
        auto: StyleObject;
        /** If the flex item’s inline axis is the same as the cross axis, this value is identical to 'flex-start'. Otherwise, it participates in baseline alignment. */
        baseline: StyleObject;
        /** The flex item’s margin box is centered in the cross axis within the line. */
        center: StyleObject;
        /** The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line. */
        end: StyleObject;
        /** The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line. */
        start: StyleObject;
        /** If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * Aligns a flex container’s lines within the flex container when there is extra space in the cross-axis, similar to how 'justify-content' aligns individual items within the main-axis.
     *
     * (IE 10)
     */
    "-ms-flex-line-pack": {
        /** Lines are packed toward the center of the flex container. */
        center: StyleObject;
        /** Lines are evenly distributed in the flex container, with half-size spaces on either end. */
        distribute: StyleObject;
        /** Lines are packed toward the end of the flex container. */
        end: StyleObject;
        /** Lines are evenly distributed in the flex container. */
        justify: StyleObject;
        /** Lines are packed toward the start of the flex container. */
        start: StyleObject;
        /** Lines stretch to take up the remaining space. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * Controls the order in which children of a flex container appear within the flex container, by assigning them to ordinal groups.
     *
     * (IE 10)
     */
    "-ms-flex-order": IntegerEntry & WideEntry;
    /**
     * Aligns flex items along the main axis of the current line of the flex container.
     *
     * (IE 10)
     */
    "-ms-flex-pack": {
        /** Flex items are packed toward the center of the line. */
        center: StyleObject;
        /** Flex items are evenly distributed in the line, with half-size spaces on either end. */
        distribute: StyleObject;
        /** Flex items are packed toward the end of the line. */
        end: StyleObject;
        /** Flex items are evenly distributed in the line. */
        justify: StyleObject;
        /** Flex items are packed toward the start of the line. */
        start: StyleObject;
    } & WideEntry;
    /**
     * Controls whether the flex container is single-line or multi-line, and the direction of the cross-axis, which determines the direction new lines are stacked in.
     *
     * (IE 10)
     */
    "-ms-flex-wrap": {
        /** The flex container is single-line. */
        nowrap: StyleObject;
        /** The flexbox is multi-line. */
        wrap: StyleObject;
        /** Same as 'wrap', except the cross-start and cross-end directions are swapped. */
        "wrap-reverse": StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Makes a block container a region and associates it with a named flow.
     *
     * (Edge, IE 10)
     *
     * Syntax: [ none | \<custom-ident> ]#
     */
    "-ms-flow-from": {
        /** The block container is not a CSS Region. */
        none: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Places an element or its contents into a named flow.
     *
     * (Edge, IE 10)
     *
     * Syntax: [ none | \<custom-ident> ]#
     */
    "-ms-flow-into": {
        /** The element is not moved to a named flow and normal CSS processing takes place. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Used to place grid items and explicitly defined grid cells in the Grid.
     *
     * (Edge 12, IE 10)
     */
    "-ms-grid-column": {
        auto: StyleObject;
        end: StyleObject;
        start: StyleObject;
    } & StringEntry & IntegerEntry & WideEntry;
    /**
     * Aligns the columns in a grid.
     *
     * (Edge 12, IE 10)
     */
    "-ms-grid-column-align": {
        /** Places the center of the Grid Item's margin box at the center of the Grid Item's column. */
        center: StyleObject;
        /** Aligns the end edge of the Grid Item's margin box to the end edge of the Grid Item's column. */
        end: StyleObject;
        /** Aligns the starting edge of the Grid Item's margin box to the starting edge of the Grid Item's column. */
        start: StyleObject;
        /** Ensures that the Grid Item's margin box is equal to the size of the Grid Item's column. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Lays out the columns of the grid.
     *
     * (Edge, IE 10)
     *
     * Syntax: none | \<track-list> | \<auto-track-list>
     */
    "-ms-grid-columns": WideEntry;
    /**
     * Specifies the number of columns to span.
     *
     * (Edge 12, IE 10)
     */
    "-ms-grid-column-span": IntegerEntry & WideEntry;
    /**
     * Grid-layer is similar in concept to z-index, but avoids overloading the meaning of the z-index property, which is applicable only to positioned elements.
     *
     * (Edge, IE 10)
     */
    "-ms-grid-layer": IntegerEntry & WideEntry;
    /**
     * grid-row is used to place grid items and explicitly defined grid cells in the Grid.
     *
     * (Edge 12, IE 10)
     */
    "-ms-grid-row": {
        auto: StyleObject;
        end: StyleObject;
        start: StyleObject;
    } & StringEntry & IntegerEntry & WideEntry;
    /**
     * Aligns the rows in a grid.
     *
     * (Edge 12, IE 10)
     */
    "-ms-grid-row-align": {
        /** Places the center of the Grid Item's margin box at the center of the Grid Item's row. */
        center: StyleObject;
        /** Aligns the end edge of the Grid Item's margin box to the end edge of the Grid Item's row. */
        end: StyleObject;
        /** Aligns the starting edge of the Grid Item's margin box to the starting edge of the Grid Item's row. */
        start: StyleObject;
        /** Ensures that the Grid Item's margin box is equal to the size of the Grid Item's row. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Lays out the columns of the grid.
     *
     * (Edge, IE 10)
     *
     * Syntax: none | \<track-list> | \<auto-track-list>
     */
    "-ms-grid-rows": WideEntry;
    /**
     * Specifies the number of rows to span.
     *
     * (Edge 12, IE 10)
     */
    "-ms-grid-row-span": IntegerEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies if properties should be adjusted in high contrast mode.
     *
     * (Edge, IE 10)
     *
     * Syntax: auto | none
     */
    "-ms-high-contrast-adjust": {
        /** Properties will be adjusted as applicable. */
        auto: StyleObject;
        /** No adjustments will be applied. */
        none: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies the minimum number of characters in a hyphenated word.
     *
     * (Edge, IE 10)
     *
     * Syntax: auto | \<integer>\{1,3\}
     */
    "-ms-hyphenate-limit-chars": {
        /** The user agent chooses a value that adapts to the current layout. */
        auto: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Indicates the maximum number of successive hyphenated lines in an element.
     *
     * (Edge, IE 10)
     *
     * Syntax: no-limit | \<integer>
     */
    "-ms-hyphenate-limit-lines": {
        /** There is no limit. */
        "no-limit": StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies the maximum amount of unfilled space (before justification) that may be left in the line box before hyphenation is triggered to pull part of a word from the next line back up into the current line.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<percentage> | \<length>
     */
    "-ms-hyphenate-limit-zone": LengthEntry & PercentEntry & WideEntry;
    /**
     * Controls whether hyphenation is allowed to create more break opportunities within a line of text.
     *
     * (Edge, IE 10)
     */
    "-ms-hyphens": {
        /** Conditional hyphenation characters inside a word, if present, take priority over automatic resources when determining hyphenation points within the word. */
        auto: StyleObject;
        /** Words are only broken at line breaks where there are characters inside the word that suggest line break opportunities */
        manual: StyleObject;
        /** Words are not broken at line breaks, even if characters inside the word suggest line break points. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Controls the state of the input method editor for text fields.
     *
     * (IE 10)
     */
    "-ms-ime-mode": {
        /** The input method editor is initially active; text entry is performed using it unless the user specifically dismisses it. */
        active: StyleObject;
        /** No change is made to the current input method editor state. This is the default. */
        auto: StyleObject;
        /** The input method editor is disabled and may not be activated by the user. */
        disabled: StyleObject;
        /** The input method editor is initially inactive, but the user may activate it if they wish. */
        inactive: StyleObject;
        /** The IME state should be normal; this value can be used in a user style sheet to override the page setting. */
        normal: StyleObject;
    } & WideEntry;
    /**
     * Gets or sets the interpolation (resampling) method used to stretch images.
     *
     * (IE 7)
     */
    "-ms-interpolation-mode": {
        bicubic: StyleObject;
        "nearest-neighbor": StyleObject;
    } & WideEntry;
    /**
     * Sets or retrieves the composite document grid properties that specify the layout of text characters.
     *
     * (Edge, IE 10)
     */
    "-ms-layout-grid": {
        /** Any of the range of character values available to the -ms-layout-grid-char property. */
        char: StyleObject;
        /** Any of the range of line values available to the -ms-layout-grid-line property. */
        line: StyleObject;
        /** Any of the range of mode values available to the -ms-layout-grid-mode property. */
        mode: StyleObject;
        /** Any of the range of type values available to the -ms-layout-grid-type property. */
        type: StyleObject;
    } & WideEntry;
    /**
     * Sets or retrieves the size of the character grid used for rendering the text content of an element.
     *
     * (Edge, IE 10)
     */
    "-ms-layout-grid-char": {
        /** Largest character in the font of the element is used to set the character grid. */
        auto: StyleObject;
        /** Default. No character grid is set. */
        none: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Sets or retrieves the gridline value used for rendering the text content of an element.
     *
     * (Edge, IE 10)
     */
    "-ms-layout-grid-line": {
        /** Largest character in the font of the element is used to set the character grid. */
        auto: StyleObject;
        /** Default. No grid line is set. */
        none: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Gets or sets whether the text layout grid uses two dimensions.
     *
     * (Edge, IE 10)
     */
    "-ms-layout-grid-mode": {
        /** Default. Both the char and line grid modes are enabled. This setting is necessary to fully enable the layout grid on an element. */
        both: StyleObject;
        /** Only a character grid is used. This is recommended for use with block-level elements, such as a blockquote, where the line grid is intended to be disabled. */
        char: StyleObject;
        /** Only a line grid is used. This is recommended for use with inline elements, such as a span, to disable the horizontal grid on runs of text that act as a single entity in the grid layout. */
        line: StyleObject;
        /** No grid is used. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Sets or retrieves the type of grid used for rendering the text content of an element.
     *
     * (Edge, IE 10)
     */
    "-ms-layout-grid-type": {
        /** Grid used for monospaced layout. All noncursive characters are treated as equal; every character is centered within a single grid space by default. */
        fixed: StyleObject;
        /** Default. Grid used for Japanese and Korean characters. */
        loose: StyleObject;
        /** Grid used for Chinese, as well as Japanese (Genko) and Korean characters. Only the ideographs, kanas, and wide characters are snapped to the grid. */
        strict: StyleObject;
    } & WideEntry;
    /**
     * Specifies what set of line breaking restrictions are in effect within the element.
     *
     * (Edge, IE 10)
     */
    "-ms-line-break": {
        /** The UA determines the set of line-breaking restrictions to use for CJK scripts, and it may vary the restrictions based on the length of the line; e.g., use a less restrictive set of line-break rules for short lines. */
        auto: StyleObject;
        /** Sequences of CJK characters can no longer break on implied break points. This option should only be used where the presence of word separator characters still creates line-breaking opportunities, as in Korean. */
        "keep-all": StyleObject;
        /** Breaks CJK scripts using the least restrictive set of line-breaking rules. Typically used for short lines, such as in newspapers. */
        newspaper: StyleObject;
        /** Breaks CJK scripts using a normal set of line-breaking rules. */
        normal: StyleObject;
        /** Breaks CJK scripts using a more restrictive set of line-breaking rules than 'normal'. */
        strict: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specify whether content is clipped when it overflows the element's content area.
     *
     * (Edge, IE 10)
     *
     * Syntax: auto | none | scrollbar | -ms-autohiding-scrollbar
     */
    "-ms-overflow-style": {
        /** No preference, UA should use the first scrolling method in the list that it supports. */
        auto: StyleObject;
        /** Indicates the element displays auto-hiding scrollbars during mouse interactions and panning indicators during touch and keyboard interactions. */
        "-ms-autohiding-scrollbar": StyleObject;
        /** Indicates the element does not display scrollbars or panning indicators, even when its content overflows. */
        none: StyleObject;
        /** Scrollbars are typically narrow strips inserted on one or two edges of an element and which often have arrows to click on and a "thumb" to drag up and down (or left and right) to move the contents of the element. */
        scrollbar: StyleObject;
    } & WideEntry;
    /**
     * Applies the same transform as the perspective(\<number>) transform function, except that it applies only to the positioned or transformed children of the element, not to the transform on the element itself.
     *
     * (IE 10)
     */
    "-ms-perspective": {
        /** No perspective transform is applied. */
        none: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Establishes the origin for the perspective property. It effectively sets the X and Y position at which the viewer appears to be looking at the children of the element.
     *
     * (IE 10)
     */
    "-ms-perspective-origin": LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Establishes the origin for the perspective property. It effectively sets the X  position at which the viewer appears to be looking at the children of the element.
     *
     * (IE 10)
     */
    "-ms-perspective-origin-x": LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Establishes the origin for the perspective property. It effectively sets the Y position at which the viewer appears to be looking at the children of the element.
     *
     * (IE 10)
     */
    "-ms-perspective-origin-y": LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Gets or sets a value that specifies whether a progress control displays as a bar or a ring.
     *
     * (IE 10)
     */
    "-ms-progress-appearance": {
        bar: StyleObject;
        ring: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines the color of the top and left edges of the scroll box and scroll arrows of a scroll bar.
     *
     * (IE 8)
     *
     * Syntax: \<color>
     */
    "-ms-scrollbar-3dlight-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines the color of the arrow elements of a scroll arrow.
     *
     * (IE 8)
     *
     * Syntax: \<color>
     */
    "-ms-scrollbar-arrow-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines the color of the main elements of a scroll bar, which include the scroll box, track, and scroll arrows.
     *
     * (IE 8)
     *
     * Syntax: \<color>
     */
    "-ms-scrollbar-base-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines the color of the gutter of a scroll bar.
     *
     * (IE 8)
     *
     * Syntax: \<color>
     */
    "-ms-scrollbar-darkshadow-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines the color of the scroll box and scroll arrows of a scroll bar.
     *
     * (IE 8)
     *
     * Syntax: \<color>
     */
    "-ms-scrollbar-face-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines the color of the top and left edges of the scroll box and scroll arrows of a scroll bar.
     *
     * (IE 8)
     *
     * Syntax: \<color>
     */
    "-ms-scrollbar-highlight-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines the color of the bottom and right edges of the scroll box and scroll arrows of a scroll bar.
     *
     * (IE 8)
     *
     * Syntax: \<color>
     */
    "-ms-scrollbar-shadow-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines the color of the track element of a scroll bar.
     *
     * (IE 5)
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-track-color)
     */
    "-ms-scrollbar-track-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that indicates the scrolling behavior that occurs when a user hits the content boundary during a manipulation.
     *
     * (Edge, IE 10)
     *
     * Syntax: chained | none
     */
    "-ms-scroll-chaining": {
        chained: StyleObject;
        none: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a shorthand value that sets values for the -ms-scroll-limit-x-min, -ms-scroll-limit-y-min, -ms-scroll-limit-x-max, and -ms-scroll-limit-y-max properties.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<'-ms-scroll-limit-x-min'> \<'-ms-scroll-limit-y-min'> \<'-ms-scroll-limit-x-max'> \<'-ms-scroll-limit-y-max'>
     */
    "-ms-scroll-limit": {
        auto: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that specifies the maximum value for the scrollLeft property.
     *
     * (Edge, IE 10)
     *
     * Syntax: auto | \<length>
     */
    "-ms-scroll-limit-x-max": {
        auto: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that specifies the minimum value for the scrollLeft property.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<length>
     */
    "-ms-scroll-limit-x-min": LengthEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that specifies the maximum value for the scrollTop property.
     *
     * (Edge, IE 10)
     *
     * Syntax: auto | \<length>
     */
    "-ms-scroll-limit-y-max": {
        auto: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that specifies the minimum value for the scrollTop property.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<length>
     */
    "-ms-scroll-limit-y-min": LengthEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that indicates whether or not small motions perpendicular to the primary axis of motion will result in either changes to both the scrollTop and scrollLeft properties or a change to the primary axis (for instance, either the scrollTop or scrollLeft properties will change, but not both).
     *
     * (Edge, IE 10)
     *
     * Syntax: none | railed
     */
    "-ms-scroll-rails": {
        none: StyleObject;
        railed: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that defines where snap-points will be located along the x-axis.
     *
     * (Edge, IE 10)
     *
     * Syntax: snapInterval( \<length-percentage>, \<length-percentage> ) | snapList( \<length-percentage># )
     */
    "-ms-scroll-snap-points-x": {
        "snapInterval(100%, 100%)": StyleObject;
        "snapList()": StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that defines where snap-points will be located along the y-axis.
     *
     * (Edge, IE 10)
     *
     * Syntax: snapInterval( \<length-percentage>, \<length-percentage> ) | snapList( \<length-percentage># )
     */
    "-ms-scroll-snap-points-y": {
        "snapInterval(100%, 100%)": StyleObject;
        "snapList()": StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that defines what type of snap-point should be used for the current element. There are two type of snap-points, with the primary difference being whether or not the user is guaranteed to always stop on a snap-point.
     *
     * (Edge, IE 10)
     *
     * Syntax: none | proximity | mandatory
     */
    "-ms-scroll-snap-type": {
        /** The visual viewport of this scroll container must ignore snap points, if any, when scrolled. */
        none: StyleObject;
        /** The visual viewport of this scroll container is guaranteed to rest on a snap point when there are no active scrolling operations. */
        mandatory: StyleObject;
        /** The visual viewport of this scroll container may come to rest on a snap point at the termination of a scroll at the discretion of the UA given the parameters of the scroll. */
        proximity: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a shorthand value that sets values for the -ms-scroll-snap-type and -ms-scroll-snap-points-x properties.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<'-ms-scroll-snap-type'> \<'-ms-scroll-snap-points-x'>
     */
    "-ms-scroll-snap-x": {
        mandatory: StyleObject;
        none: StyleObject;
        proximity: StyleObject;
        "snapInterval(100%, 100%)": StyleObject;
        "snapList()": StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a shorthand value that sets values for the -ms-scroll-snap-type and -ms-scroll-snap-points-y properties.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<'-ms-scroll-snap-type'> \<'-ms-scroll-snap-points-y'>
     */
    "-ms-scroll-snap-y": {
        mandatory: StyleObject;
        none: StyleObject;
        proximity: StyleObject;
        "snapInterval(100%, 100%)": StyleObject;
        "snapList()": StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that specifies whether vertical-to-horizontal scroll wheel translation occurs on the specified element.
     *
     * (Edge, IE 10)
     *
     * Syntax: none | vertical-to-horizontal
     */
    "-ms-scroll-translation": {
        none: StyleObject;
        "vertical-to-horizontal": StyleObject;
    } & WideEntry;
    /**
     * Describes how the last line of a block or a line right before a forced line break is aligned when 'text-align' is set to 'justify'.
     *
     * (Edge, IE 8)
     */
    "-ms-text-align-last": {
        auto: StyleObject;
        /** The inline contents are centered within the line box. */
        center: StyleObject;
        /** The text is justified according to the method specified by the 'text-justify' property. */
        justify: StyleObject;
        /** The inline contents are aligned to the left edge of the line box. In vertical text, 'left' aligns to the edge of the line box that would be the start edge for left-to-right text. */
        left: StyleObject;
        /** The inline contents are aligned to the right edge of the line box. In vertical text, 'right' aligns to the edge of the line box that would be the end edge for left-to-right text. */
        right: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines whether or not a full-width punctuation mark character should be trimmed if it appears at the beginning of a line, so that its 'ink' lines up with the first glyph in the line above and below.
     *
     * (Edge, IE 8)
     *
     * Syntax: none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space
     */
    "-ms-text-autospace": {
        /** Creates 1/4em extra spacing between runs of ideographic letters and non-ideographic letters, such as Latin-based, Cyrillic, Greek, Arabic or Hebrew. */
        "ideograph-alpha": StyleObject;
        /** Creates 1/4em extra spacing between runs of ideographic letters and numeric glyphs. */
        "ideograph-numeric": StyleObject;
        /** Creates extra spacing between normal (non wide) parenthesis and ideographs. */
        "ideograph-parenthesis": StyleObject;
        /** Extends the width of the space character while surrounded by ideographs. */
        "ideograph-space": StyleObject;
        /** No extra space is created. */
        none: StyleObject;
        /** Creates extra non-breaking spacing around punctuation as required by language-specific typographic conventions. */
        punctuation: StyleObject;
    } & WideEntry;
    /**
     * This property specifies the combination of multiple characters into the space of a single character.
     *
     * (Edge, IE 11)
     */
    "-ms-text-combine-horizontal": {
        /** Attempt to typeset horizontally all consecutive characters within the box such that they take up the space of a single character within the vertical line box. */
        all: StyleObject;
        /** Attempt to typeset horizontally each maximal sequence of consecutive ASCII digits (U+0030–U+0039) that has as many or fewer characters than the specified integer such that it takes up the space of a single character within the vertical line box. */
        digits: StyleObject;
        /** No special processing. */
        none: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Selects the justification algorithm used when 'text-align' is set to 'justify'. The property applies to block containers, but the UA may (but is not required to) also support it on inline elements.
     *
     * (Edge, IE 8)
     */
    "-ms-text-justify": {
        /** The UA determines the justification algorithm to follow, based on a balance between performance and adequate presentation quality. */
        auto: StyleObject;
        /** Justification primarily changes spacing both at word separators and at grapheme cluster boundaries in all scripts except those in the connected and cursive groups. This value is sometimes used in e.g. Japanese, often with the 'text-align-last' property. */
        distribute: StyleObject;
        /** Justification primarily changes spacing at word separators and at grapheme cluster boundaries in clustered scripts. This value is typically used for Southeast Asian scripts such as Thai. */
        "inter-cluster": StyleObject;
        /** Justification primarily changes spacing at word separators and at inter-graphemic boundaries in scripts that use no word spaces. This value is typically used for CJK languages. */
        "inter-ideograph": StyleObject;
        /** Justification primarily changes spacing at word separators. This value is typically used for languages that separate words using spaces, like English or (sometimes) Korean. */
        "inter-word": StyleObject;
        /** Justification primarily stretches Arabic and related scripts through the use of kashida or other calligraphic elongation. */
        kashida: StyleObject;
    } & WideEntry;
    /**
     * Sets or retrieves the ratio of kashida expansion to white space expansion when justifying lines of text in the object.
     *
     * (Edge, IE 10)
     */
    "-ms-text-kashida-space": PercentEntry & WideEntry;
    /**
     * Text can overflow for example when it is prevented from wrapping
     *
     * (IE 10)
     */
    "-ms-text-overflow": {
        /** Clip inline content that overflows. Characters may be only partially rendered. */
        clip: StyleObject;
        /** Render an ellipsis character (U+2026) to represent clipped inline content. */
        ellipsis: StyleObject;
    } & WideEntry;
    /**
     * Specifies a size adjustment for displaying text content in mobile browsers.
     *
     * (Edge, IE 10)
     */
    "-ms-text-size-adjust": {
        /** Renderers must use the default size adjustment when displaying on a small device. */
        auto: StyleObject;
        /** Renderers must not do size adjustment when displaying on a small device. */
        none: StyleObject;
    } & PercentEntry & WideEntry;
    /**
     * Sets the position of an underline specified on the same element: it does not affect underlines specified by ancestor elements.This property is typically used in vertical writing contexts such as in Japanese documents where it often desired to have the underline appear 'over' (to the right of) the affected run of text
     *
     * (Edge, IE 10)
     */
    "-ms-text-underline-position": {
        /** The underline is aligned with the alphabetic baseline. In this case the underline is likely to cross some descenders. */
        alphabetic: StyleObject;
        /** The user agent may use any algorithm to determine the underline's position. In horizontal line layout, the underline should be aligned as for alphabetic. In vertical line layout, if the language is set to Japanese or Korean, the underline should be aligned as for over. */
        auto: StyleObject;
        /** The underline is aligned with the 'top' (right in vertical writing) edge of the element's em-box. In this mode, an overline also switches sides. */
        over: StyleObject;
        /** The underline is aligned with the 'bottom' (left in vertical writing) edge of the element's em-box. In this case the underline usually does not cross the descenders. This is sometimes called 'accounting' underline. */
        under: StyleObject;
    } & WideEntry;
    /**
     * Gets or sets a value that indicates whether and how a given region can be manipulated by the user.
     *
     * (IE 10)
     */
    "-ms-touch-action": {
        /** The element is a passive element, with several exceptions. */
        auto: StyleObject;
        /** The element will zoom on double-tap. */
        "double-tap-zoom": StyleObject;
        /** The element is a manipulation-causing element. */
        manipulation: StyleObject;
        /** The element is a manipulation-blocking element. */
        none: StyleObject;
        /** The element permits touch-driven panning on the horizontal axis. The touch pan is performed on the nearest ancestor with horizontally scrollable content. */
        "pan-x": StyleObject;
        /** The element permits touch-driven panning on the vertical axis. The touch pan is performed on the nearest ancestor with vertically scrollable content. */
        "pan-y": StyleObject;
        /** The element permits pinch-zooming. The pinch-zoom is performed on the nearest ancestor with zoomable content. */
        "pinch-zoom": StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that toggles the 'gripper' visual elements that enable touch text selection.
     *
     * (Edge, IE 10)
     *
     * Syntax: grippers | none
     */
    "-ms-touch-select": {
        /** Grippers are always on. */
        grippers: StyleObject;
        /** Grippers are always off. */
        none: StyleObject;
    } & WideEntry;
    /**
     * A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.
     *
     * (IE 9-9)
     */
    "-ms-transform": {
        /** Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f] */
        matrix: (...params: Parameters<typeof matrix>) => StyleObject;
        /** Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order. */
        matrix3d: (...params: Parameters<typeof matrix3d>) => StyleObject;
        none: StyleObject;
        /** Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property. */
        rotate: (...params: Parameters<typeof rotate>) => StyleObject;
        /** Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters. */
        rotate3d: (...params: Parameters<typeof rotate3d>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the X axis. */
        rotateX: (...params: Parameters<typeof rotateX>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Y axis. */
        rotateY: (...params: Parameters<typeof rotateY>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Z axis. */
        rotateZ: (...params: Parameters<typeof rotateZ>) => StyleObject;
        /** Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first. */
        scale: (...params: Parameters<typeof scale>) => StyleObject;
        /** Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters. */
        scale3d: (...params: Parameters<typeof scale3d>) => StyleObject;
        /** Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter. */
        scaleX: (...params: Parameters<typeof scaleX>) => StyleObject;
        /** Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter. */
        scaleY: (...params: Parameters<typeof scaleY>) => StyleObject;
        /** Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter. */
        scaleZ: (...params: Parameters<typeof scaleZ>) => StyleObject;
        /** Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis). */
        skew: (...params: Parameters<typeof skew>) => StyleObject;
        /** Specifies a skew transformation along the X axis by the given angle. */
        skewX: (...params: Parameters<typeof skewX>) => StyleObject;
        /** Specifies a skew transformation along the Y axis by the given angle. */
        skewY: (...params: Parameters<typeof skewY>) => StyleObject;
        /** Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter. */
        translate: (...params: Parameters<typeof translate>) => StyleObject;
        /** Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively. */
        translate3d: (...params: Parameters<typeof translate3d>) => StyleObject;
        /** Specifies a translation by the given amount in the X direction. */
        translateX: (...params: Parameters<typeof translateX>) => StyleObject;
        /** Specifies a translation by the given amount in the Y direction. */
        translateY: (...params: Parameters<typeof translateY>) => StyleObject;
        /** Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0. */
        translateZ: (...params: Parameters<typeof translateZ>) => StyleObject;
    } & WideEntry;
    /**
     * Establishes the origin of transformation for an element.
     *
     * (IE 9-9)
     */
    "-ms-transform-origin": LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * The x coordinate of the origin for transforms applied to an element with respect to its border box.
     *
     * (IE 10)
     */
    "-ms-transform-origin-x": LengthEntry & PercentEntry & WideEntry;
    /**
     * The y coordinate of the origin for transforms applied to an element with respect to its border box.
     *
     * (IE 10)
     */
    "-ms-transform-origin-y": LengthEntry & PercentEntry & WideEntry;
    /**
     * The z coordinate of the origin for transforms applied to an element with respect to its border box.
     *
     * (IE 10)
     */
    "-ms-transform-origin-z": LengthEntry & PercentEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Controls the appearance of selection.
     *
     * (Edge, IE 10)
     *
     * Syntax: none | element | text
     */
    "-ms-user-select": {
        element: StyleObject;
        none: StyleObject;
        text: StyleObject;
    } & WideEntry;
    /**
     * Specifies line break opportunities for non-CJK scripts.
     *
     * (IE 8)
     */
    "-ms-word-break": {
        /** Lines may break between any two grapheme clusters for non-CJK scripts. */
        "break-all": StyleObject;
        /** Block characters can no longer create implied break points. */
        "keep-all": StyleObject;
        /** Breaks non-CJK scripts according to their own rules. */
        normal: StyleObject;
    } & WideEntry;
    /**
     * Specifies whether the UA may break within a word to prevent overflow when an otherwise-unbreakable string is too long to fit.
     *
     * (IE 8)
     */
    "-ms-word-wrap": {
        /** An unbreakable 'word' may be broken at an arbitrary point if there are no otherwise-acceptable break points in the line. */
        "break-word": StyleObject;
        /** Lines may break only at allowed break points. */
        normal: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * An element becomes an exclusion when its 'wrap-flow' property has a computed value other than 'auto'.
     *
     * (Edge, IE 10)
     *
     * Syntax: auto | both | start | end | maximum | clear
     */
    "-ms-wrap-flow": {
        /** For floats an exclusion is created, for all other elements an exclusion is not created. */
        auto: StyleObject;
        /** Inline flow content can flow on all sides of the exclusion. */
        both: StyleObject;
        /** Inline flow content can only wrap on top and bottom of the exclusion and must leave the areas to the start and end edges of the exclusion box empty. */
        clear: StyleObject;
        /** Inline flow content can wrap on the end side of the exclusion area but must leave the area to the start edge of the exclusion area empty. */
        end: StyleObject;
        /** Inline flow content can wrap on the side of the exclusion with the largest available space for the given line, and must leave the other side of the exclusion empty. */
        maximum: StyleObject;
        /** Inline flow content can flow around the edge of the exclusion with the smallest available space within the flow content’s containing block, and must leave the other edge of the exclusion empty. */
        minimum: StyleObject;
        /** Inline flow content can wrap on the start edge of the exclusion area but must leave the area to end edge of the exclusion area empty. */
        start: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Gets or sets a value that is used to offset the inner wrap shape from other shapes.
     *
     * (Edge, IE 10)
     *
     * Syntax: \<length>
     */
    "-ms-wrap-margin": LengthEntry & PercentEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies if an element inherits its parent wrapping context. In other words if it is subject to the exclusions defined outside the element.
     *
     * (Edge, IE 10)
     *
     * Syntax: wrap | none
     */
    "-ms-wrap-through": {
        /** The exclusion element does not inherit its parent node's wrapping context. Its descendants are only subject to exclusion shapes defined inside the element. */
        none: StyleObject;
        /** The exclusion element inherits its parent node's wrapping context. Its descendant inline content wraps around exclusions defined outside the element. */
        wrap: StyleObject;
    } & WideEntry;
    /**
     * Shorthand property for both 'direction' and 'block-progression'.
     *
     * (IE 8)
     */
    "-ms-writing-mode": {
        "bt-lr": StyleObject;
        "bt-rl": StyleObject;
        "lr-bt": StyleObject;
        "lr-tb": StyleObject;
        "rl-bt": StyleObject;
        "rl-tb": StyleObject;
        "tb-lr": StyleObject;
        "tb-rl": StyleObject;
    } & WideEntry;
    /**
     * Sets or retrieves the magnification scale of the object.
     *
     * (IE 8)
     */
    "-ms-zoom": {
        normal: StyleObject;
    } & PercentEntry & {
        [value: number]: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Gets or sets a value that indicates whether an animation is used when zooming.
     *
     * (IE 10)
     */
    "-ms-zoom-animation": {
        default: StyleObject;
        none: StyleObject;
    } & WideEntry;
    /**
     * Provides an way to control directional focus navigation.
     *
     * (Opera 9.5)
     */
    navDown: {
        /** The user agent automatically determines which element to navigate the focus to in response to directional navigational input. */
        auto: StyleObject;
        /** Indicates that the user agent should target the frame that the element is in. */
        current: StyleObject;
        /** Indicates that the user agent should target the full window. */
        root: StyleObject;
    } & StringEntry & WideEntry;
    /**
     * Provides an input-method-neutral way of specifying the sequential navigation order (also known as 'tabbing order').
     *
     * (Opera 9.5)
     */
    navIndex: {
        /** The element's sequential navigation order is assigned automatically by the user agent. */
        auto: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Provides an way to control directional focus navigation.
     *
     * (Opera 9.5)
     */
    navLeft: {
        /** The user agent automatically determines which element to navigate the focus to in response to directional navigational input. */
        auto: StyleObject;
        /** Indicates that the user agent should target the frame that the element is in. */
        current: StyleObject;
        /** Indicates that the user agent should target the full window. */
        root: StyleObject;
    } & StringEntry & WideEntry;
    /**
     * Provides an way to control directional focus navigation.
     *
     * (Opera 9.5)
     */
    navRight: {
        /** The user agent automatically determines which element to navigate the focus to in response to directional navigational input. */
        auto: StyleObject;
        /** Indicates that the user agent should target the frame that the element is in. */
        current: StyleObject;
        /** Indicates that the user agent should target the full window. */
        root: StyleObject;
    } & StringEntry & WideEntry;
    /**
     * Provides an way to control directional focus navigation.
     *
     * (Opera 9.5)
     */
    navUp: {
        /** The user agent automatically determines which element to navigate the focus to in response to directional navigational input. */
        auto: StyleObject;
        /** Indicates that the user agent should target the frame that the element is in. */
        current: StyleObject;
        /** Indicates that the user agent should target the full window. */
        root: StyleObject;
    } & StringEntry & WideEntry;
    /**
     * \@counter-style descriptor. Defines how to alter the representation when the counter value is negative.
     *
     * (Firefox 33)
     *
     * Syntax: \<symbol> \<symbol>?
     */
    negative: StringEntry & ImageFunctions & WideEntry;
    /**
     * Shorthand property combines six of the animation properties into a single property.
     *
     * (Opera 12)
     */
    "-o-animation": {
        /** The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. */
        alternate: StyleObject;
        /** The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. */
        "alternate-reverse": StyleObject;
        /** The beginning property value (as defined in the first \@keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'. */
        backwards: StyleObject;
        /** Both forwards and backwards fill modes are applied. */
        both: StyleObject;
        /** The final property value (as defined in the last \@keyframes at-rule) is maintained after the animation completes. */
        forwards: StyleObject;
        /** Causes the animation to repeat forever. */
        infinite: StyleObject;
        /** No animation is performed */
        none: StyleObject;
        /** Normal playback. */
        normal: StyleObject;
        /** All iterations of the animation are played in the reverse direction from the way they were specified. */
        reverse: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & TimeEntry & TransitionTimingFunctions & WideEntry;
    /**
     * Defines when the animation will start.
     *
     * (Opera 12)
     */
    "-o-animation-delay": TimeEntry & WideEntry;
    /**
     * Defines whether or not the animation should play in reverse on alternate cycles.
     *
     * (Opera 12)
     */
    "-o-animation-direction": {
        /** The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. */
        alternate: StyleObject;
        /** The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. */
        "alternate-reverse": StyleObject;
        /** Normal playback. */
        normal: StyleObject;
        /** All iterations of the animation are played in the reverse direction from the way they were specified. */
        reverse: StyleObject;
    } & WideEntry;
    /**
     * Defines the length of time that an animation takes to complete one cycle.
     *
     * (Opera 12)
     */
    "-o-animation-duration": TimeEntry & WideEntry;
    /**
     * Defines what values are applied by the animation outside the time it is executing.
     *
     * (Opera 12)
     */
    "-o-animation-fill-mode": {
        /** The beginning property value (as defined in the first \@keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'. */
        backwards: StyleObject;
        /** Both forwards and backwards fill modes are applied. */
        both: StyleObject;
        /** The final property value (as defined in the last \@keyframes at-rule) is maintained after the animation completes. */
        forwards: StyleObject;
        /** There is no change to the property value between the time the animation is applied and the time the animation begins playing or after the animation completes. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Defines the number of times an animation cycle is played. The default value is one, meaning the animation will play from beginning to end once.
     *
     * (Opera 12)
     */
    "-o-animation-iteration-count": {
        /** Causes the animation to repeat forever. */
        infinite: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Defines a list of animations that apply. Each name is used to select the keyframe at-rule that provides the property values for the animation.
     *
     * (Opera 12)
     */
    "-o-animation-name": {
        /** No animation is performed */
        none: StyleObject;
    } & WideEntry;
    /**
     * Defines whether the animation is running or paused.
     *
     * (Opera 12)
     */
    "-o-animation-play-state": {
        /** A running animation will be paused. */
        paused: StyleObject;
        /** Resume playback of a paused animation. */
        running: StyleObject;
    } & WideEntry;
    /**
     * Describes how the animation will progress over one cycle of its duration. See the 'transition-timing-function'.
     *
     * (Opera 12)
     */
    "-o-animation-timing-function": TransitionTimingFunctions & WideEntry;
    /**
     * Specifies how the contents of a replaced element should be scaled relative to the box established by its used height and width.
     *
     * (Edge 79, Firefox 36, Safari 10, Chrome 32, Opera 19)
     *
     * Syntax: fill | contain | cover | none | scale-down
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/object-fit)
     */
    objectFit: {
        /** The replaced content is sized to maintain its aspect ratio while fitting within the element’s content box: its concrete object size is resolved as a contain constraint against the element's used width and height. */
        contain: StyleObject;
        /** The replaced content is sized to maintain its aspect ratio while filling the element's entire content box: its concrete object size is resolved as a cover constraint against the element’s used width and height. */
        cover: StyleObject;
        /** The replaced content is sized to fill the element’s content box: the object's concrete object size is the element's used width and height. */
        fill: StyleObject;
        /** The replaced content is not resized to fit inside the element's content box */
        none: StyleObject;
        /** Size the content as if ‘none’ or ‘contain’ were specified, whichever would result in a smaller concrete object size. */
        "scale-down": StyleObject;
    } & WideEntry;
    /**
     * Determines the alignment of the replaced element inside its box.
     *
     * (Edge 79, Firefox 36, Safari 10, Chrome 32, Opera 19)
     *
     * Syntax: \<position>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/object-position)
     */
    objectPosition: LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Shorthand property for setting 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset' and 'border-image-repeat'. Omitted values are set to their initial values.
     *
     * (Opera 11.6)
     */
    "-o-border-image": {
        /** If 'auto' is specified then the border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead. */
        auto: StyleObject;
        /** Causes the middle part of the border-image to be preserved. */
        fill: StyleObject;
        none: StyleObject;
        /** The image is tiled (repeated) to fill the area. */
        repeat: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does. */
        round: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles. */
        space: StyleObject;
        /** The image is stretched to fill the area. */
        stretch: StyleObject;
    } & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & ImageFunctions & WideEntry;
    /**
     * Specifies how the contents of a replaced element should be scaled relative to the box established by its used height and width.
     *
     * (Opera 10.6)
     */
    "-o-object-fit": {
        /** The replaced content is sized to maintain its aspect ratio while fitting within the element’s content box: its concrete object size is resolved as a contain constraint against the element's used width and height. */
        contain: StyleObject;
        /** The replaced content is sized to maintain its aspect ratio while filling the element's entire content box: its concrete object size is resolved as a cover constraint against the element’s used width and height. */
        cover: StyleObject;
        /** The replaced content is sized to fill the element’s content box: the object's concrete object size is the element's used width and height. */
        fill: StyleObject;
        /** The replaced content is not resized to fit inside the element's content box */
        none: StyleObject;
        /** Size the content as if ‘none’ or ‘contain’ were specified, whichever would result in a smaller concrete object size. */
        "scale-down": StyleObject;
    } & WideEntry;
    /**
     * Determines the alignment of the replaced element inside its box.
     *
     * (Opera 10.6)
     */
    "-o-object-position": LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Opacity of an element's text, where 1 is opaque and 0 is entirely transparent.
     *
     * Syntax: \<alpha-value>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/opacity)
     */
    opacity: AlphaEntry & WideEntry;
    /**
     * Controls the order in which children of a flex container appear within the flex container, by assigning them to ordinal groups.
     *
     * Syntax: \<integer>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/order)
     */
    order: IntegerEntry & WideEntry;
    /**
     * Specifies the minimum number of line boxes in a block container that must be left in a fragment before a fragmentation break.
     *
     * (Edge 12, Safari 1.3, Chrome 25, IE 8, Opera 9.2)
     *
     * Syntax: \<integer>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/orphans)
     */
    orphans: IntegerEntry & WideEntry;
    /**
     * Determines which row of a inline-table should be used as baseline of inline-table.
     *
     * (Opera 9.6)
     */
    "-o-table-baseline": IntegerEntry & WideEntry;
    /**
     * This property determines the width of the tab character (U+0009), in space characters (U+0020), when rendered.
     *
     * (Opera 10.6)
     */
    "-o-tab-size": LengthEntry & IntegerEntry & WideEntry;
    /**
     * Text can overflow for example when it is prevented from wrapping
     *
     * (Opera 10)
     */
    "-o-text-overflow": {
        /** Clip inline content that overflows. Characters may be only partially rendered. */
        clip: StyleObject;
        /** Render an ellipsis character (U+2026) to represent clipped inline content. */
        ellipsis: StyleObject;
    } & WideEntry;
    /**
     * A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.
     *
     * (Opera 10.5)
     */
    "-o-transform": {
        /** Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f] */
        matrix: (...params: Parameters<typeof matrix>) => StyleObject;
        /** Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order. */
        matrix3d: (...params: Parameters<typeof matrix3d>) => StyleObject;
        none: StyleObject;
        /** Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property. */
        rotate: (...params: Parameters<typeof rotate>) => StyleObject;
        /** Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters. */
        rotate3d: (...params: Parameters<typeof rotate3d>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the X axis. */
        rotateX: (...params: Parameters<typeof rotateX>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Y axis. */
        rotateY: (...params: Parameters<typeof rotateY>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Z axis. */
        rotateZ: (...params: Parameters<typeof rotateZ>) => StyleObject;
        /** Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first. */
        scale: (...params: Parameters<typeof scale>) => StyleObject;
        /** Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters. */
        scale3d: (...params: Parameters<typeof scale3d>) => StyleObject;
        /** Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter. */
        scaleX: (...params: Parameters<typeof scaleX>) => StyleObject;
        /** Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter. */
        scaleY: (...params: Parameters<typeof scaleY>) => StyleObject;
        /** Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter. */
        scaleZ: (...params: Parameters<typeof scaleZ>) => StyleObject;
        /** Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis). */
        skew: (...params: Parameters<typeof skew>) => StyleObject;
        /** Specifies a skew transformation along the X axis by the given angle. */
        skewX: (...params: Parameters<typeof skewX>) => StyleObject;
        /** Specifies a skew transformation along the Y axis by the given angle. */
        skewY: (...params: Parameters<typeof skewY>) => StyleObject;
        /** Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter. */
        translate: (...params: Parameters<typeof translate>) => StyleObject;
        /** Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively. */
        translate3d: (...params: Parameters<typeof translate3d>) => StyleObject;
        /** Specifies a translation by the given amount in the X direction. */
        translateX: (...params: Parameters<typeof translateX>) => StyleObject;
        /** Specifies a translation by the given amount in the Y direction. */
        translateY: (...params: Parameters<typeof translateY>) => StyleObject;
        /** Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0. */
        translateZ: (...params: Parameters<typeof translateZ>) => StyleObject;
    } & WideEntry;
    /**
     * Establishes the origin of transformation for an element.
     *
     * (Opera 10.5)
     */
    "-o-transform-origin": LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property combines four of the transition properties into a single property.
     *
     * (Opera 11.5)
     */
    "-o-transition": {
        /** Every property that is able to undergo a transition will do so. */
        all: StyleObject;
        /** No property will transition. */
        none: StyleObject;
    } & TimeEntry & TransitionTimingFunctions & WideEntry;
    /**
     * Defines when the transition will start. It allows a transition to begin execution some period of time from when it is applied.
     *
     * (Opera 11.5)
     */
    "-o-transition-delay": TimeEntry & WideEntry;
    /**
     * Specifies how long the transition from the old value to the new value should take.
     *
     * (Opera 11.5)
     */
    "-o-transition-duration": TimeEntry & WideEntry;
    /**
     * Specifies the name of the CSS property to which the transition is applied.
     *
     * (Opera 11.5)
     */
    "-o-transition-property": {
        /** Every property that is able to undergo a transition will do so. */
        all: StyleObject;
        /** No property will transition. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Describes how the intermediate values used during a transition will be calculated.
     *
     * (Opera 11.5)
     */
    "-o-transition-timing-function": TransitionTimingFunctions & WideEntry;
    /**
     * Logical 'bottom'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Firefox 41)
     */
    offsetBlockEnd: {
        /** For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well. */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'top'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Firefox 41)
     */
    offsetBlockStart: {
        /** For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well. */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'right'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Firefox 41)
     */
    offsetInlineEnd: {
        /** For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well. */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'left'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Firefox 41)
     */
    offsetInlineStart: {
        /** For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well. */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property for 'outline-style', 'outline-width', and 'outline-color'.
     *
     * Syntax: [ \<'outline-color'> || \<'outline-style'> || \<'outline-width'> ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/outline)
     */
    outline: {
        /** Permits the user agent to render a custom outline style, typically the default platform style. */
        auto: StyleObject;
        /** Performs a color inversion on the pixels on the screen. */
        invert: StyleObject;
    } & ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * The color of the outline.
     *
     * Syntax: \<color> | invert
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/outline-color)
     */
    outlineColor: {
        /** Performs a color inversion on the pixels on the screen. */
        invert: StyleObject;
    } & ColorEntry & ColorFunctions & WideEntry;
    /**
     * Offset the outline and draw it beyond the border edge.
     *
     * (Edge 15, Firefox 1.5, Safari 1.2, Chrome 1, Opera 9.5)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/outline-offset)
     */
    outlineOffset: LengthEntry & WideEntry;
    /**
     * Style of the outline.
     *
     * Syntax: auto | \<'border-style'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/outline-style)
     */
    outlineStyle: {
        /** Permits the user agent to render a custom outline style, typically the default platform style. */
        auto: StyleObject;
    } & LineStyleEntry & WideEntry;
    /**
     * Width of the outline.
     *
     * Syntax: \<line-width>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/outline-width)
     */
    outlineWidth: LengthEntry & LineWidthEntry & WideEntry;
    /**
     * Shorthand for setting 'overflow-x' and 'overflow-y'.
     *
     * Syntax: [ visible | hidden | clip | scroll | auto ]\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overflow)
     */
    overflow: {
        /** The behavior of the 'auto' value is UA-dependent, but should cause a scrolling mechanism to be provided for overflowing boxes. */
        auto: StyleObject;
        /** Content is clipped and no scrolling mechanism should be provided to view the content outside the clipping region. */
        hidden: StyleObject;
        /** Same as the standardized 'clip', except doesn’t establish a block formatting context. */
        "-moz-hidden-unscrollable": StyleObject;
        /** Content is clipped and if the user agent uses a scrolling mechanism that is visible on the screen (such as a scroll bar or a panner), that mechanism should be displayed for a box whether or not any of its content is clipped. */
        scroll: StyleObject;
        /** Content is not clipped, i.e., it may be rendered outside the content box. */
        visible: StyleObject;
    } & WideEntry;
    /**
     * Specifies whether the UA may break within a word to prevent overflow when an otherwise-unbreakable string is too long to fit within the line box.
     *
     * Syntax: normal | break-word | anywhere
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overflow-wrap)
     */
    overflowWrap: {
        /** An otherwise unbreakable sequence of characters may be broken at an arbitrary point if there are no otherwise-acceptable break points in the line. */
        "break-word": StyleObject;
        /** Lines may break only at allowed break points. */
        normal: StyleObject;
    } & WideEntry;
    /**
     * Specifies the handling of overflow in the horizontal direction.
     *
     * Syntax: visible | hidden | clip | scroll | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overflow-x)
     */
    overflowX: {
        /** The behavior of the 'auto' value is UA-dependent, but should cause a scrolling mechanism to be provided for overflowing boxes. */
        auto: StyleObject;
        /** Content is clipped and no scrolling mechanism should be provided to view the content outside the clipping region. */
        hidden: StyleObject;
        /** Content is clipped and if the user agent uses a scrolling mechanism that is visible on the screen (such as a scroll bar or a panner), that mechanism should be displayed for a box whether or not any of its content is clipped. */
        scroll: StyleObject;
        /** Content is not clipped, i.e., it may be rendered outside the content box. */
        visible: StyleObject;
    } & WideEntry;
    /**
     * Specifies the handling of overflow in the vertical direction.
     *
     * Syntax: visible | hidden | clip | scroll | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overflow-y)
     */
    overflowY: {
        /** The behavior of the 'auto' value is UA-dependent, but should cause a scrolling mechanism to be provided for overflowing boxes. */
        auto: StyleObject;
        /** Content is clipped and no scrolling mechanism should be provided to view the content outside the clipping region. */
        hidden: StyleObject;
        /** Content is clipped and if the user agent uses a scrolling mechanism that is visible on the screen (such as a scroll bar or a panner), that mechanism should be displayed for a box whether or not any of its content is clipped. */
        scroll: StyleObject;
        /** Content is not clipped, i.e., it may be rendered outside the content box. */
        visible: StyleObject;
    } & WideEntry;
    /**
     * \@counter-style descriptor. Specifies a “fixed-width” counter style, where representations shorter than the pad value are padded with a particular \<symbol>
     *
     * (Firefox 33)
     *
     * Syntax: \<integer> && \<symbol>
     */
    pad: StringEntry & IntegerEntry & ImageFunctions & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.
     *
     * Syntax: [ \<length> | \<percentage> ]\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding)
     */
    padding: LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.
     *
     * Syntax: \<length> | \<percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-bottom)
     */
    paddingBottom: LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'padding-bottom'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 87, Firefox 41, Safari 12.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'padding-left'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-block-end)
     */
    paddingBlockEnd: LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'padding-top'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 87, Firefox 41, Safari 12.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'padding-left'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-block-start)
     */
    paddingBlockStart: LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'padding-right'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 87, Firefox 41, Safari 12.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'padding-left'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-inline-end)
     */
    paddingInlineEnd: LengthEntry & PercentEntry & WideEntry;
    /**
     * Logical 'padding-left'. Mapping depends on the parent element’s 'writing-mode', 'direction', and 'text-orientation'.
     *
     * (Edge 87, Firefox 41, Safari 12.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'padding-left'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-inline-start)
     */
    paddingInlineStart: LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.
     *
     * Syntax: \<length> | \<percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-left)
     */
    paddingLeft: LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.
     *
     * Syntax: \<length> | \<percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-right)
     */
    paddingRight: LengthEntry & PercentEntry & WideEntry;
    /**
     * Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.
     *
     * Syntax: \<length> | \<percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-top)
     */
    paddingTop: LengthEntry & PercentEntry & WideEntry;
    /**
     * Defines rules for page breaks after an element.
     *
     * Syntax: auto | always | avoid | left | right | recto | verso
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/page-break-after)
     */
    pageBreakAfter: {
        /** Always force a page break after the generated box. */
        always: StyleObject;
        /** Neither force nor forbid a page break after generated box. */
        auto: StyleObject;
        /** Avoid a page break after the generated box. */
        avoid: StyleObject;
        /** Force one or two page breaks after the generated box so that the next page is formatted as a left page. */
        left: StyleObject;
        /** Force one or two page breaks after the generated box so that the next page is formatted as a right page. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Defines rules for page breaks before an element.
     *
     * Syntax: auto | always | avoid | left | right | recto | verso
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/page-break-before)
     */
    pageBreakBefore: {
        /** Always force a page break before the generated box. */
        always: StyleObject;
        /** Neither force nor forbid a page break before the generated box. */
        auto: StyleObject;
        /** Avoid a page break before the generated box. */
        avoid: StyleObject;
        /** Force one or two page breaks before the generated box so that the next page is formatted as a left page. */
        left: StyleObject;
        /** Force one or two page breaks before the generated box so that the next page is formatted as a right page. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Defines rules for page breaks inside an element.
     *
     * Syntax: auto | avoid
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/page-break-inside)
     */
    pageBreakInside: {
        /** Neither force nor forbid a page break inside the generated box. */
        auto: StyleObject;
        /** Avoid a page break inside the generated box. */
        avoid: StyleObject;
    } & WideEntry;
    /**
     * Controls the order that the three paint operations that shapes and text are rendered with: their fill, their stroke and any markers they might have.
     *
     * (Edge 17, Firefox 60, Safari 8, Chrome 35, Opera 22)
     *
     * Syntax: normal | [ fill || stroke || markers ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/paint-order)
     */
    paintOrder: {
        fill: StyleObject;
        markers: StyleObject;
        /** The element is painted with the standard order of painting operations: the 'fill' is painted first, then its 'stroke' and finally its markers. */
        normal: StyleObject;
        stroke: StyleObject;
    } & WideEntry;
    /**
     * Applies the same transform as the perspective(\<number>) transform function, except that it applies only to the positioned or transformed children of the element, not to the transform on the element itself.
     *
     * Syntax: none | \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/perspective)
     */
    perspective: {
        /** No perspective transform is applied. */
        none: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Establishes the origin for the perspective property. It effectively sets the X and Y position at which the viewer appears to be looking at the children of the element.
     *
     * Syntax: \<position>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/perspective-origin)
     */
    perspectiveOrigin: LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Specifies under what circumstances a given element can be the target element for a pointer event.
     *
     * Syntax: auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/pointer-events)
     */
    pointerEvents: {
        /** The given element behaves as it would if the pointer-events property were not specified. In SVG content, this value and the value visiblePainted have the same effect. */
        auto: StyleObject;
        /** The given element can be the target element for pointer events whenever the pointer is over either the interior or the perimeter of the element. */
        all: StyleObject;
        /** The given element can be the target element for pointer events whenever the pointer is over the interior of the element. */
        fill: StyleObject;
        /** The given element does not receive pointer events. */
        none: StyleObject;
        /** The given element can be the target element for pointer events when the pointer is over a "painted" area.  */
        painted: StyleObject;
        /** The given element can be the target element for pointer events whenever the pointer is over the perimeter of the element. */
        stroke: StyleObject;
        /** The given element can be the target element for pointer events when the ‘visibility’ property is set to visible and the pointer is over either the interior or the perimeter of the element. */
        visible: StyleObject;
        /** The given element can be the target element for pointer events when the ‘visibility’ property is set to visible and when the pointer is over the interior of the element. */
        visibleFill: StyleObject;
        /** The given element can be the target element for pointer events when the ‘visibility’ property is set to visible and when the pointer is over a ‘painted’ area. */
        visiblePainted: StyleObject;
        /** The given element can be the target element for pointer events when the ‘visibility’ property is set to visible and when the pointer is over the perimeter of the element. */
        visibleStroke: StyleObject;
    } & WideEntry;
    /**
     * The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.
     *
     * Syntax: static | relative | absolute | sticky | fixed
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/position)
     */
    position: {
        /** The box's position (and possibly size) is specified with the 'top', 'right', 'bottom', and 'left' properties. These properties specify offsets with respect to the box's 'containing block'. */
        absolute: StyleObject;
        /** The box's position is calculated according to the 'absolute' model, but in addition, the box is fixed with respect to some reference. As with the 'absolute' model, the box's margins do not collapse with any other margins. */
        fixed: StyleObject;
        /** The box's position is calculated according to the 'absolute' model. */
        "-ms-page": StyleObject;
        /** The box's position is calculated according to the normal flow (this is called the position in normal flow). Then the box is offset relative to its normal position. */
        relative: StyleObject;
        /** The box is a normal box, laid out according to the normal flow. The 'top', 'right', 'bottom', and 'left' properties do not apply. */
        static: StyleObject;
        /** The box's position is calculated according to the normal flow. Then the box is offset relative to its flow root and containing block and in all cases, including table elements, does not affect the position of any following boxes. */
        sticky: StyleObject;
        /** The box's position is calculated according to the normal flow. Then the box is offset relative to its flow root and containing block and in all cases, including table elements, does not affect the position of any following boxes. */
        "-webkit-sticky": StyleObject;
    } & WideEntry;
    /**
     * \@counter-style descriptor. Specifies a \<symbol> that is prepended to the marker representation.
     *
     * (Firefox 33)
     *
     * Syntax: \<symbol>
     */
    prefix: StringEntry & ImageFunctions & WideEntry;
    /**
     * Specifies quotation marks for any number of embedded quotations.
     *
     * Syntax: none | auto | [ \<string> \<string> ]+
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/quotes)
     */
    quotes: {
        /** The 'open-quote' and 'close-quote' values of the 'content' property produce no quotations marks, as if they were 'no-open-quote' and 'no-close-quote' respectively. */
        none: StyleObject;
    } & StringEntry & WideEntry;
    /**
     * \@counter-style descriptor. Defines the ranges over which the counter style is defined.
     *
     * (Firefox 33)
     *
     * Syntax: [ [ \<integer> | infinite ]\{2\} ]# | auto
     */
    range: {
        /** The range depends on the counter system. */
        auto: StyleObject;
        /** If used as the first value in a range, it represents negative infinity; if used as the second value, it represents positive infinity. */
        infinite: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Specifies whether or not an element is resizable by the user, and if so, along which axis/axes.
     *
     * (Edge 79, Firefox 4, Safari 3, Chrome 1, Opera 12.1)
     *
     * Syntax: none | both | horizontal | vertical | block | inline
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/resize)
     */
    resize: {
        /** The UA presents a bidirectional resizing mechanism to allow the user to adjust both the height and the width of the element. */
        both: StyleObject;
        /** The UA presents a unidirectional horizontal resizing mechanism to allow the user to adjust only the width of the element. */
        horizontal: StyleObject;
        /** The UA does not present a resizing mechanism on the element, and the user is given no direct manipulation mechanism to resize the element. */
        none: StyleObject;
        /** The UA presents a unidirectional vertical resizing mechanism to allow the user to adjust only the height of the element. */
        vertical: StyleObject;
    } & WideEntry;
    /**
     * Specifies how far an absolutely positioned box's right margin edge is offset to the left of the right edge of the box's 'containing block'.
     *
     * Syntax: \<length> | \<percentage> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/right)
     */
    right: {
        /** For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Specifies how text is distributed within the various ruby boxes when their contents do not exactly fill their respective boxes.
     *
     * (Firefox 38)
     *
     * Syntax: start | center | space-between | space-around
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/ruby-align)
     */
    rubyAlign: {
        /**
         * The user agent determines how the ruby contents are aligned. This is the initial value.
         *
         * (Firefox 38)
         */
        auto: StyleObject;
        /** The ruby content is centered within its box. */
        center: StyleObject;
        /**
         * If the width of the ruby text is smaller than that of the base, then the ruby text contents are evenly distributed across the width of the base, with the first and last ruby text glyphs lining up with the corresponding first and last base glyphs. If the width of the ruby text is at least the width of the base, then the letters of the base are evenly distributed across the width of the ruby text.
         *
         * (Firefox 38)
         */
        "distribute-letter": StyleObject;
        /**
         * If the width of the ruby text is smaller than that of the base, then the ruby text contents are evenly distributed across the width of the base, with a certain amount of white space preceding the first and following the last character in the ruby text. That amount of white space is normally equal to half the amount of inter-character space of the ruby text.
         *
         * (Firefox 38)
         */
        "distribute-space": StyleObject;
        /** The ruby text content is aligned with the start edge of the base. */
        left: StyleObject;
        /**
         * If the ruby text is not adjacent to a line edge, it is aligned as in 'auto'. If it is adjacent to a line edge, then it is still aligned as in auto, but the side of the ruby text that touches the end of the line is lined up with the corresponding edge of the base.
         *
         * (Firefox 38)
         */
        "line-edge": StyleObject;
        /**
         * The ruby text content is aligned with the end edge of the base.
         *
         * (Firefox 38)
         */
        right: StyleObject;
        /**
         * The ruby text content is aligned with the start edge of the base.
         *
         * (Firefox 38)
         */
        start: StyleObject;
        /**
         * The ruby content expands as defined for normal text justification (as defined by 'text-justify'),
         *
         * (Firefox 38)
         */
        "space-between": StyleObject;
        /**
         * As for 'space-between' except that there exists an extra justification opportunities whose space is distributed half before and half after the ruby content.
         *
         * (Firefox 38)
         */
        "space-around": StyleObject;
    } & WideEntry;
    /**
     * Determines whether, and on which side, ruby text is allowed to partially overhang any adjacent text in addition to its own base, when the ruby text is wider than the ruby base.
     *
     * (Firefox 10, IE 5)
     */
    rubyOverhang: {
        /** The ruby text can overhang text adjacent to the base on either side. This is the initial value. */
        auto: StyleObject;
        /** The ruby text can overhang the text that follows it. */
        end: StyleObject;
        /** The ruby text cannot overhang any text adjacent to its base, only its own base. */
        none: StyleObject;
        /** The ruby text can overhang the text that precedes it. */
        start: StyleObject;
    } & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Used by the parent of elements with display: ruby-text to control the position of the ruby text with respect to its base.
     *
     * (Edge 84, Firefox 38, Safari 7, Chrome 84, Opera 70)
     *
     * Syntax: [ alternate || [ over | under ] ] | inter-character
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/ruby-position)
     */
    rubyPosition: {
        /** The ruby text appears after the base. This is a relatively rare setting used in ideographic East Asian writing systems, most easily found in educational text. */
        after: StyleObject;
        /** The ruby text appears before the base. This is the most common setting used in ideographic East Asian writing systems. */
        before: StyleObject;
        inline: StyleObject;
        /** The ruby text appears on the right of the base. Unlike 'before' and 'after', this value is not relative to the text flow direction. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Determines whether, and on which side, ruby text is allowed to partially overhang any adjacent text in addition to its own base, when the ruby text is wider than the ruby base.
     *
     * (Firefox 10)
     */
    rubySpan: {
        /** The value of attribute 'x' is a string value. The string value is evaluated as a \<number> to determine the number of ruby base elements to be spanned by the annotation element. */
        attr: (...params: Parameters<typeof attr>) => StyleObject;
        /** No spanning. The computed value is '1'. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Determines the color of the top and left edges of the scroll box and scroll arrows of a scroll bar.
     *
     * (IE 5)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-3dlight-color)
     */
    "scrollbar-3dlight-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * Determines the color of the arrow elements of a scroll arrow.
     *
     * (IE 5)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-arrow-color)
     */
    scrollbarArrowColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Determines the color of the main elements of a scroll bar, which include the scroll box, track, and scroll arrows.
     *
     * (IE 5)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-base-color)
     */
    scrollbarBaseColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Determines the color of the gutter of a scroll bar.
     *
     * (IE 5)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-darkshadow-color)
     */
    scrollbarDarkshadowColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Determines the color of the scroll box and scroll arrows of a scroll bar.
     *
     * (IE 5)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-face-color)
     */
    scrollbarFaceColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Determines the color of the top and left edges of the scroll box and scroll arrows of a scroll bar.
     *
     * (IE 5)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-highlight-color)
     */
    scrollbarHighlightColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Determines the color of the bottom and right edges of the scroll box and scroll arrows of a scroll bar.
     *
     * (IE 5)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-shadow-color)
     */
    scrollbarShadowColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Determines the color of the track element of a scroll bar.
     *
     * (IE 6)
     */
    scrollbarTrackColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Specifies the scrolling behavior for a scrolling box, when scrolling happens due to navigation or CSSOM scrolling APIs.
     *
     * (Edge 79, Firefox 36, Safari 15.4, Chrome 61, Opera 48)
     *
     * Syntax: auto | smooth
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-behavior)
     */
    scrollBehavior: {
        /** Scrolls in an instant fashion. */
        auto: StyleObject;
        /** Scrolls in a smooth fashion using a user-agent-defined timing function and time period. */
        smooth: StyleObject;
    } & WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * Defines the x and y coordinate within the element which will align with the nearest ancestor scroll container’s snap-destination for the respective axis.
     *
     * (Firefox 39)
     *
     * Syntax: none | \<position>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-snap-coordinate)
     */
    scrollSnapCoordinate: {
        /** Specifies that this element does not contribute a snap point. */
        none: StyleObject;
    } & LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * Define the x and y coordinate within the scroll container’s visual viewport which element snap points will align with.
     *
     * (Firefox 39)
     *
     * Syntax: \<position>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-snap-destination)
     */
    scrollSnapDestination: LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * Defines the positioning of snap points along the x axis of the scroll container it is applied to.
     *
     * (Firefox 39, Safari 9)
     *
     * Syntax: none | repeat( \<length-percentage> )
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-x)
     */
    scrollSnapPointsX: {
        /** No snap points are defined by this scroll container. */
        none: StyleObject;
        /** Defines an interval at which snap points are defined, starting from the container’s relevant start edge. */
        repeat: (...params: Parameters<typeof repeat>) => StyleObject;
    } & WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * Defines the positioning of snap points along the y axis of the scroll container it is applied to.
     *
     * (Firefox 39, Safari 9)
     *
     * Syntax: none | repeat( \<length-percentage> )
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-y)
     */
    scrollSnapPointsY: {
        /** No snap points are defined by this scroll container. */
        none: StyleObject;
        /** Defines an interval at which snap points are defined, starting from the container’s relevant start edge. */
        repeat: (...params: Parameters<typeof repeat>) => StyleObject;
    } & WideEntry;
    /**
     * Defines how strictly snap points are enforced on the scroll container.
     *
     * Syntax: none | [ x | y | block | inline | both ] [ mandatory | proximity ]?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type)
     */
    scrollSnapType: {
        /** The visual viewport of this scroll container must ignore snap points, if any, when scrolled. */
        none: StyleObject;
        /** The visual viewport of this scroll container is guaranteed to rest on a snap point when there are no active scrolling operations. */
        mandatory: StyleObject;
        /** The visual viewport of this scroll container may come to rest on a snap point at the termination of a scroll at the discretion of the UA given the parameters of the scroll. */
        proximity: StyleObject;
    } & WideEntry;
    /**
     * Defines the alpha channel threshold used to extract the shape using an image. A value of 0.5 means that the shape will enclose all the pixels that are more than 50% opaque.
     *
     * (Edge 79, Firefox 62, Safari 10.1, Chrome 37, Opera 24)
     *
     * Syntax: \<alpha-value>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/shape-image-threshold)
     */
    shapeImageThreshold: {
        [value: number]: StyleObject;
    } & AlphaEntry & WideEntry;
    /**
     * Adds a margin to a 'shape-outside'. This defines a new shape that is the smallest contour that includes all the points that are the 'shape-margin' distance outward in the perpendicular direction from a point on the underlying shape.
     *
     * (Edge 79, Firefox 62, Safari 10.1, Chrome 37, Opera 24)
     *
     * Syntax: \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/shape-margin)
     */
    shapeMargin: URLEntry & LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies an orthogonal rotation to be applied to an image before it is laid out.
     *
     * (Edge 79, Firefox 62, Safari 10.1, Chrome 37, Opera 24)
     *
     * Syntax: none | [ \<shape-box> || \<basic-shape> ] | \<image>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/shape-outside)
     */
    shapeOutside: {
        /** The background is painted within (clipped to) the margin box. */
        "margin-box": StyleObject;
        /** The float area is unaffected. */
        none: StyleObject;
    } & ImageFunctions & BasicShapeFunctions & BoxEntry & WideEntry;
    /** Provides hints about what tradeoffs to make as it renders vector graphics elements such as \<path> elements and basic shapes such as circles and rectangles. */
    shapeRendering: {
        /** Suppresses aural rendering. */
        auto: StyleObject;
        /** Emphasize the contrast between clean edges of artwork over rendering speed and geometric precision. */
        crispEdges: StyleObject;
        /** Emphasize geometric precision over speed and crisp edges. */
        geometricPrecision: StyleObject;
        /** Emphasize rendering speed over geometric precision and crisp edges. */
        optimizeSpeed: StyleObject;
    } & WideEntry;
    /**
     * The size CSS at-rule descriptor, used with the \@page at-rule, defines the size and orientation of the box which is used to represent a page. Most of the time, this size corresponds to the target size of the printed page if applicable.
     *
     * (Chrome, Opera 8)
     *
     * Syntax: \<length>\{1,2\} | auto | [ \<page-size> || [ portrait | landscape ] ]
     */
    size: LengthEntry & WideEntry;
    /**
     * \@font-face descriptor. Specifies the resource containing font data. It is required, whether the font is downloadable or locally installed.
     *
     * Syntax: [ \<url> [ format( \<string># ) ]? | local( \<family-name> ) ]#
     */
    src: {
        /** Reference font by URL */
        url: (...params: Parameters<typeof url>) => StyleObject;
        /** Optional hint describing the format of the font resource. */
        "format()": StyleObject;
        /** Format-specific string that identifies a locally available copy of a given font. */
        "local()": StyleObject;
    } & StringEntry & URLEntry & WideEntry;
    /** Indicates what color to use at that gradient stop. */
    stopColor: ColorEntry & ColorFunctions & WideEntry;
    /** Defines the opacity of a given gradient stop. */
    stopOpacity: AlphaEntry & WideEntry;
    /** Paints along the outline of the given graphical element. */
    stroke: {
        /** A URL reference to a paint server element, which is an element that defines a paint server: ‘hatch’, ‘linearGradient’, ‘mesh’, ‘pattern’, ‘radialGradient’ and ‘solidcolor’. */
        url: (...params: Parameters<typeof url>) => StyleObject;
        /** No paint is applied in this layer. */
        none: StyleObject;
    } & ColorEntry & ColorFunctions & URLEntry & WideEntry;
    /** Controls the pattern of dashes and gaps used to stroke paths. */
    strokeDasharray: {
        /** Indicates that no dashing is used. */
        none: StyleObject;
    } & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /** Specifies the distance into the dash pattern to start the dash. */
    strokeDashoffset: LengthEntry & PercentEntry & WideEntry;
    /** Specifies the shape to be used at the end of open subpaths when they are stroked. */
    strokeLinecap: {
        /** Indicates that the stroke for each subpath does not extend beyond its two endpoints. */
        butt: StyleObject;
        /** Indicates that at each end of each subpath, the shape representing the stroke will be extended by a half circle with a radius equal to the stroke width. */
        round: StyleObject;
        /** Indicates that at the end of each subpath, the shape representing the stroke will be extended by a rectangle with the same width as the stroke width and whose length is half of the stroke width. */
        square: StyleObject;
    } & WideEntry;
    /** Specifies the shape to be used at the corners of paths or basic shapes when they are stroked. */
    strokeLinejoin: {
        /** Indicates that a bevelled corner is to be used to join path segments. */
        bevel: StyleObject;
        /** Indicates that a sharp corner is to be used to join path segments. */
        miter: StyleObject;
        /** Indicates that a round corner is to be used to join path segments. */
        round: StyleObject;
    } & WideEntry;
    /** When two line segments meet at a sharp angle and miter joins have been specified for 'stroke-linejoin', it is possible for the miter to extend far beyond the thickness of the line stroking the path. */
    strokeMiterlimit: {
        [value: number]: StyleObject;
    } & WideEntry;
    /** Specifies the opacity of the painting operation used to stroke the current object. */
    strokeOpacity: AlphaEntry & WideEntry;
    /** Specifies the width of the stroke on the current object. */
    strokeWidth: LengthEntry & PercentEntry & WideEntry;
    /**
     * \@counter-style descriptor. Specifies a \<symbol> that is appended to the marker representation.
     *
     * (Firefox 33)
     *
     * Syntax: \<symbol>
     */
    suffix: StringEntry & ImageFunctions & WideEntry;
    /**
     * \@counter-style descriptor. Specifies which algorithm will be used to construct the counter’s representation based on the counter value.
     *
     * (Firefox 33)
     *
     * Syntax: cyclic | numeric | alphabetic | symbolic | additive | [ fixed \<integer>? ] | [ extends \<counter-style-name> ]
     */
    system: {
        /** Represents “sign-value” numbering systems, which, rather than using reusing digits in different positions to change their value, define additional digits with much larger values, so that the value of the number can be obtained by adding all the digits together. */
        additive: StyleObject;
        /** Interprets the list of counter symbols as digits to an alphabetic numbering system, similar to the default lower-alpha counter style, which wraps from "a", "b", "c", to "aa", "ab", "ac". */
        alphabetic: StyleObject;
        /** Cycles repeatedly through its provided symbols, looping back to the beginning when it reaches the end of the list. */
        cyclic: StyleObject;
        /** Use the algorithm of another counter style, but alter other aspects. */
        extends: StyleObject;
        /** Runs through its list of counter symbols once, then falls back. */
        fixed: StyleObject;
        /** interprets the list of counter symbols as digits to a "place-value" numbering system, similar to the default 'decimal' counter style. */
        numeric: StyleObject;
        /** Cycles repeatedly through its provided symbols, doubling, tripling, etc. the symbols on each successive pass through the list. */
        symbolic: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * \@counter-style descriptor. Specifies the symbols used by the marker-construction algorithm specified by the system descriptor.
     *
     * (Firefox 33)
     *
     * Syntax: \<symbol>+
     */
    symbols: StringEntry & ImageFunctions & WideEntry;
    /**
     * Controls the algorithm used to lay out the table cells, rows, and columns.
     *
     * Syntax: auto | fixed
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/table-layout)
     */
    tableLayout: {
        /** Use any automatic table layout algorithm. */
        auto: StyleObject;
        /** Use the fixed table layout algorithm. */
        fixed: StyleObject;
    } & WideEntry;
    /**
     * Determines the width of the tab character (U+0009), in space characters (U+0020), when rendered.
     *
     * (Edge 79, Firefox 91, Safari 7, Chrome 21, Opera 15)
     *
     * Syntax: \<integer> | \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/tab-size)
     */
    tabSize: LengthEntry & IntegerEntry & WideEntry;
    /**
     * Describes how inline contents of a block are horizontally aligned if the contents do not completely fill the line box.
     *
     * Syntax: start | end | left | right | center | justify | match-parent
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-align)
     */
    textAlign: {
        /** The inline contents are centered within the line box. */
        center: StyleObject;
        /** The inline contents are aligned to the end edge of the line box. */
        end: StyleObject;
        /** The text is justified according to the method specified by the 'text-justify' property. */
        justify: StyleObject;
        /** The inline contents are aligned to the left edge of the line box. In vertical text, 'left' aligns to the edge of the line box that would be the start edge for left-to-right text. */
        left: StyleObject;
        /** The inline contents are aligned to the right edge of the line box. In vertical text, 'right' aligns to the edge of the line box that would be the end edge for left-to-right text. */
        right: StyleObject;
        /** The inline contents are aligned to the start edge of the line box. */
        start: StyleObject;
    } & StringEntry & WideEntry;
    /**
     * Describes how the last line of a block or a line right before a forced line break is aligned when 'text-align' is set to 'justify'.
     *
     * (Edge 12, Firefox 49, Chrome 47, IE 5.5, Opera 34)
     *
     * Syntax: auto | start | end | left | right | center | justify
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-align-last)
     */
    textAlignLast: {
        /** Content on the affected line is aligned per 'text-align' unless 'text-align' is set to 'justify', in which case it is 'start-aligned'. */
        auto: StyleObject;
        /** The inline contents are centered within the line box. */
        center: StyleObject;
        /** The text is justified according to the method specified by the 'text-justify' property. */
        justify: StyleObject;
        /** The inline contents are aligned to the left edge of the line box. In vertical text, 'left' aligns to the edge of the line box that would be the start edge for left-to-right text. */
        left: StyleObject;
        /** The inline contents are aligned to the right edge of the line box. In vertical text, 'right' aligns to the edge of the line box that would be the end edge for left-to-right text. */
        right: StyleObject;
    } & WideEntry;
    /** Used to align (start-, middle- or end-alignment) a string of text relative to a given point. */
    textAnchor: {
        /** The rendered characters are aligned such that the end of the resulting rendered text is at the initial current text position. */
        end: StyleObject;
        /** The rendered characters are aligned such that the geometric middle of the resulting rendered text is at the initial current text position. */
        middle: StyleObject;
        /** The rendered characters are aligned such that the start of the resulting rendered text is at the initial current text position. */
        start: StyleObject;
    } & WideEntry;
    /**
     * Decorations applied to font used for an element's text.
     *
     * Syntax: \<'text-decoration-line'> || \<'text-decoration-style'> || \<'text-decoration-color'> || \<'text-decoration-thickness'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration)
     */
    textDecoration: {
        /** Produces a dashed line style. */
        dashed: StyleObject;
        /** Produces a dotted line. */
        dotted: StyleObject;
        /** Produces a double line. */
        double: StyleObject;
        /** Each line of text has a line through the middle. */
        "line-through": StyleObject;
        /** Produces no line. */
        none: StyleObject;
        /** Each line of text has a line above it. */
        overline: StyleObject;
        /** Produces a solid line. */
        solid: StyleObject;
        /** Each line of text is underlined. */
        underline: StyleObject;
        /** Produces a wavy line. */
        wavy: StyleObject;
    } & ColorEntry & ColorFunctions & WideEntry;
    /**
     * Specifies the color of text decoration (underlines overlines, and line-throughs) set on the element with text-decoration-line.
     *
     * (Edge 79, Firefox 36, Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-color)
     */
    textDecorationColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * Specifies what line decorations, if any, are added to the element.
     *
     * (Edge 79, Firefox 36, Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-line)
     */
    textDecorationLine: {
        /** Each line of text has a line through the middle. */
        "line-through": StyleObject;
        /** Neither produces nor inhibits text decoration. */
        none: StyleObject;
        /** Each line of text has a line above it. */
        overline: StyleObject;
        /** Each line of text is underlined. */
        underline: StyleObject;
    } & WideEntry;
    /**
     * Specifies the line style for underline, line-through and overline text decoration.
     *
     * (Edge 79, Firefox 36, Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: solid | double | dotted | dashed | wavy
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-style)
     */
    textDecorationStyle: {
        /** Produces a dashed line style. */
        dashed: StyleObject;
        /** Produces a dotted line. */
        dotted: StyleObject;
        /** Produces a double line. */
        double: StyleObject;
        /** Produces no line. */
        none: StyleObject;
        /** Produces a solid line. */
        solid: StyleObject;
        /** Produces a wavy line. */
        wavy: StyleObject;
    } & WideEntry;
    /**
     * Specifies the indentation applied to lines of inline content in a block. The indentation only affects the first line of inline content in the block unless the 'hanging' keyword is specified, in which case it affects all lines except the first.
     *
     * Syntax: \<length-percentage> && hanging? && each-line?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-indent)
     */
    textIndent: LengthEntry & PercentEntry & WideEntry;
    /**
     * Selects the justification algorithm used when 'text-align' is set to 'justify'. The property applies to block containers, but the UA may (but is not required to) also support it on inline elements.
     *
     * (Edge 12, Firefox 55, Chrome 32, IE 11, Opera 19)
     *
     * Syntax: auto | inter-character | inter-word | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-justify)
     */
    textJustify: {
        /** The UA determines the justification algorithm to follow, based on a balance between performance and adequate presentation quality. */
        auto: StyleObject;
        /** Justification primarily changes spacing both at word separators and at grapheme cluster boundaries in all scripts except those in the connected and cursive groups. This value is sometimes used in e.g. Japanese, often with the 'text-align-last' property. */
        distribute: StyleObject;
        "distribute-all-lines": StyleObject;
        /** Justification primarily changes spacing at word separators and at grapheme cluster boundaries in clustered scripts. This value is typically used for Southeast Asian scripts such as Thai. */
        "inter-cluster": StyleObject;
        /** Justification primarily changes spacing at word separators and at inter-graphemic boundaries in scripts that use no word spaces. This value is typically used for CJK languages. */
        "inter-ideograph": StyleObject;
        /** Justification primarily changes spacing at word separators. This value is typically used for languages that separate words using spaces, like English or (sometimes) Korean. */
        "inter-word": StyleObject;
        /** Justification primarily stretches Arabic and related scripts through the use of kashida or other calligraphic elongation. */
        kashida: StyleObject;
        newspaper: StyleObject;
    } & WideEntry;
    /**
     * Specifies the orientation of text within a line.
     *
     * (Edge 79, Firefox 41, Safari 14, Chrome 48, Opera 35)
     *
     * Syntax: mixed | upright | sideways
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-orientation)
     */
    textOrientation: {
        /**
         * This value is equivalent to 'sideways-right' in 'vertical-rl' writing mode and equivalent to 'sideways-left' in 'vertical-lr' writing mode.
         *
         * (Edge 79, Firefox 41, Safari 14, Chrome 48, Opera 35)
         */
        sideways: StyleObject;
        /**
         * In vertical writing modes, this causes text to be set as if in a horizontal layout, but rotated 90° clockwise.
         *
         * (Edge 79, Firefox 41, Safari 14, Chrome 48, Opera 35)
         */
        "sideways-right": StyleObject;
        /** In vertical writing modes, characters from horizontal-only scripts are rendered upright, i.e. in their standard horizontal orientation. */
        upright: StyleObject;
    } & WideEntry;
    /**
     * Text can overflow for example when it is prevented from wrapping.
     *
     * Syntax: [ clip | ellipsis | \<string> ]\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-overflow)
     */
    textOverflow: {
        /** Clip inline content that overflows. Characters may be only partially rendered. */
        clip: StyleObject;
        /** Render an ellipsis character (U+2026) to represent clipped inline content. */
        ellipsis: StyleObject;
    } & StringEntry & WideEntry;
    /**
     * The creator of SVG content might want to provide a hint to the implementation about what tradeoffs to make as it renders text. The ‘text-rendering’ property provides these hints.
     *
     * (Edge 79, Firefox 1, Safari 5, Chrome 4, Opera 15)
     *
     * Syntax: auto | optimizeSpeed | optimizeLegibility | geometricPrecision
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-rendering)
     */
    textRendering: {
        auto: StyleObject;
        /** Indicates that the user agent shall emphasize geometric precision over legibility and rendering speed. */
        geometricPrecision: StyleObject;
        /** Indicates that the user agent shall emphasize legibility over rendering speed and geometric precision. */
        optimizeLegibility: StyleObject;
        /** Indicates that the user agent shall emphasize rendering speed over legibility and geometric precision. */
        optimizeSpeed: StyleObject;
    } & WideEntry;
    /**
     * Enables shadow effects to be applied to the text of the element.
     *
     * Syntax: none | \<shadow-t>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-shadow)
     */
    textShadow: {
        /** No shadow. */
        none: StyleObject;
    } & ColorEntry & ColorFunctions & LengthEntry & WideEntry;
    /**
     * Controls capitalization effects of an element’s text.
     *
     * Syntax: none | capitalize | uppercase | lowercase | full-width | full-size-kana
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-transform)
     */
    textTransform: {
        /** Puts the first typographic letter unit of each word in titlecase. */
        capitalize: StyleObject;
        /** Puts all letters in lowercase. */
        lowercase: StyleObject;
        /** No effects. */
        none: StyleObject;
        /** Puts all letters in uppercase. */
        uppercase: StyleObject;
    } & WideEntry;
    /**
     * Sets the position of an underline specified on the same element: it does not affect underlines specified by ancestor elements. This property is typically used in vertical writing contexts such as in Japanese documents where it often desired to have the underline appear 'over' (to the right of) the affected run of text
     *
     * Syntax: auto | from-font | [ under || [ left | right ] ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-underline-position)
     */
    textUnderlinePosition: {
        above: StyleObject;
        /** The user agent may use any algorithm to determine the underline’s position. In horizontal line layout, the underline should be aligned as for alphabetic. In vertical line layout, if the language is set to Japanese or Korean, the underline should be aligned as for over. */
        auto: StyleObject;
        /** The underline is aligned with the under edge of the element’s content box. */
        below: StyleObject;
    } & WideEntry;
    /**
     * Specifies how far an absolutely positioned box's top margin edge is offset below the top edge of the box's 'containing block'.
     *
     * Syntax: \<length> | \<percentage> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/top)
     */
    top: {
        /** For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well */
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Determines whether touch input may trigger default behavior supplied by user agent.
     *
     * Syntax: auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/touch-action)
     */
    touchAction: {
        /** The user agent may determine any permitted touch behaviors for touches that begin on the element. */
        auto: StyleObject;
        "cross-slide-x": StyleObject;
        "cross-slide-y": StyleObject;
        "double-tap-zoom": StyleObject;
        /** The user agent may consider touches that begin on the element only for the purposes of scrolling and continuous zooming. */
        manipulation: StyleObject;
        /** Touches that begin on the element must not trigger default touch behaviors. */
        none: StyleObject;
        /** The user agent may consider touches that begin on the element only for the purposes of horizontally scrolling the element’s nearest ancestor with horizontally scrollable content. */
        "pan-x": StyleObject;
        /** The user agent may consider touches that begin on the element only for the purposes of vertically scrolling the element’s nearest ancestor with vertically scrollable content. */
        "pan-y": StyleObject;
        "pinch-zoom": StyleObject;
    } & WideEntry;
    /**
     * A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.
     *
     * Syntax: none | \<transform-list>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transform)
     */
    transform: {
        /** Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f] */
        matrix: (...params: Parameters<typeof matrix>) => StyleObject;
        /** Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order. */
        matrix3d: (...params: Parameters<typeof matrix3d>) => StyleObject;
        none: StyleObject;
        /** Specifies a perspective projection matrix. */
        perspective: (...params: Parameters<typeof perspective>) => StyleObject;
        /** Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property. */
        rotate: (...params: Parameters<typeof rotate>) => StyleObject;
        /** Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters. */
        rotate3d: (...params: Parameters<typeof rotate3d>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the X axis. */
        rotateX: (...params: Parameters<typeof rotateX>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Y axis. */
        rotateY: (...params: Parameters<typeof rotateY>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Z axis. */
        rotateZ: (...params: Parameters<typeof rotateZ>) => StyleObject;
        /** Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first. */
        scale: (...params: Parameters<typeof scale>) => StyleObject;
        /** Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters. */
        scale3d: (...params: Parameters<typeof scale3d>) => StyleObject;
        /** Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter. */
        scaleX: (...params: Parameters<typeof scaleX>) => StyleObject;
        /** Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter. */
        scaleY: (...params: Parameters<typeof scaleY>) => StyleObject;
        /** Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter. */
        scaleZ: (...params: Parameters<typeof scaleZ>) => StyleObject;
        /** Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis). */
        skew: (...params: Parameters<typeof skew>) => StyleObject;
        /** Specifies a skew transformation along the X axis by the given angle. */
        skewX: (...params: Parameters<typeof skewX>) => StyleObject;
        /** Specifies a skew transformation along the Y axis by the given angle. */
        skewY: (...params: Parameters<typeof skewY>) => StyleObject;
        /** Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter. */
        translate: (...params: Parameters<typeof translate>) => StyleObject;
        /** Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively. */
        translate3d: (...params: Parameters<typeof translate3d>) => StyleObject;
        /** Specifies a translation by the given amount in the X direction. */
        translateX: (...params: Parameters<typeof translateX>) => StyleObject;
        /** Specifies a translation by the given amount in the Y direction. */
        translateY: (...params: Parameters<typeof translateY>) => StyleObject;
        /** Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0. */
        translateZ: (...params: Parameters<typeof translateZ>) => StyleObject;
    } & WideEntry;
    /**
     * Establishes the origin of transformation for an element.
     *
     * Syntax: [ \<length-percentage> | left | center | right | top | bottom ] | [ [ \<length-percentage> | left | center | right ] && [ \<length-percentage> | top | center | bottom ] ] \<length>?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transform-origin)
     */
    transformOrigin: LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * Defines how nested elements are rendered in 3D space.
     *
     * (Edge 12, Firefox 16, Safari 9, Chrome 36, Opera 23)
     *
     * Syntax: flat | preserve-3d
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transform-style)
     */
    transformStyle: {
        /** All children of this element are rendered flattened into the 2D plane of the element. */
        flat: StyleObject;
        /**
         * Flattening is not performed, so children maintain their position in 3D space.
         *
         * (Edge 12, Firefox 16, Safari 9, Chrome 36, Opera 23)
         */
        "preserve-3d": StyleObject;
    } & WideEntry;
    /**
     * Shorthand property combines four of the transition properties into a single property.
     *
     * Syntax: \<single-transition>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transition)
     */
    transition: {
        /** Every property that is able to undergo a transition will do so. */
        all: StyleObject;
        /** No property will transition. */
        none: StyleObject;
    } & TimeEntry & TransitionTimingFunctions & WideEntry;
    /**
     * Defines when the transition will start. It allows a transition to begin execution some period of time from when it is applied.
     *
     * Syntax: \<time>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transition-delay)
     */
    transitionDelay: TimeEntry & WideEntry;
    /**
     * Specifies how long the transition from the old value to the new value should take.
     *
     * Syntax: \<time>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transition-duration)
     */
    transitionDuration: TimeEntry & WideEntry;
    /**
     * Specifies the name of the CSS property to which the transition is applied.
     *
     * Syntax: none | \<single-transition-property>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transition-property)
     */
    transitionProperty: {
        /** Every property that is able to undergo a transition will do so. */
        all: StyleObject;
        /** No property will transition. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Describes how the intermediate values used during a transition will be calculated.
     *
     * Syntax: \<easing-function>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transition-timing-function)
     */
    transitionTimingFunction: TransitionTimingFunctions & WideEntry;
    /**
     * The level of embedding with respect to the bidirectional algorithm.
     *
     * Syntax: normal | embed | isolate | bidi-override | isolate-override | plaintext
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/unicode-bidi)
     */
    unicodeBidi: {
        /** Inside the element, reordering is strictly in sequence according to the 'direction' property; the implicit part of the bidirectional algorithm is ignored. */
        "bidi-override": StyleObject;
        /** If the element is inline-level, this value opens an additional level of embedding with respect to the bidirectional algorithm. The direction of this embedding level is given by the 'direction' property. */
        embed: StyleObject;
        /** The contents of the element are considered to be inside a separate, independent paragraph. */
        isolate: StyleObject;
        /** This combines the isolation behavior of 'isolate' with the directional override behavior of 'bidi-override' */
        "isolate-override": StyleObject;
        /** The element does not open an additional level of embedding with respect to the bidirectional algorithm. For inline-level elements, implicit reordering works across element boundaries. */
        normal: StyleObject;
        /** For the purposes of the Unicode bidirectional algorithm, the base directionality of each bidi paragraph for which the element forms the containing block is determined not by the element's computed 'direction'. */
        plaintext: StyleObject;
    } & WideEntry;
    /**
     * \@font-face descriptor. Defines the set of Unicode codepoints that may be supported by the font face for which it is declared.
     *
     * Syntax: \<unicode-range>#
     */
    unicodeRange: {
        /** Ampersand. */
        "U+26": StyleObject;
        /** WGL4 character set (Pan-European). */
        "U+20-24F, U+2B0-2FF, U+370-4FF, U+1E00-1EFF, U+2000-20CF, U+2100-23FF, U+2500-26FF, U+E000-F8FF, U+FB00–FB4F": StyleObject;
        /** The Multilingual European Subset No. 1. Latin. Covers ~44 languages. */
        "U+20-17F, U+2B0-2FF, U+2000-206F, U+20A0-20CF, U+2100-21FF, U+2600-26FF": StyleObject;
        /** The Multilingual European Subset No. 2. Latin, Greek, and Cyrillic. Covers ~128 language. */
        "U+20-2FF, U+370-4FF, U+1E00-20CF, U+2100-23FF, U+2500-26FF, U+FB00-FB4F, U+FFF0-FFFD": StyleObject;
        /** The Multilingual European Subset No. 3. Covers all characters belonging to European scripts. */
        "U+20-4FF, U+530-58F, U+10D0-10FF, U+1E00-23FF, U+2440-245F, U+2500-26FF, U+FB00-FB4F, U+FE20-FE2F, U+FFF0-FFFD": StyleObject;
        /** Basic Latin (ASCII). */
        "U+00-7F": StyleObject;
        /** Latin-1 Supplement. Accented characters for Western European languages, common punctuation characters, multiplication and division signs. */
        "U+80-FF": StyleObject;
        /** Latin Extended-A. Accented characters for for Czech, Dutch, Polish, and Turkish. */
        "U+100-17F": StyleObject;
        /** Latin Extended-B. Croatian, Slovenian, Romanian, Non-European and historic latin, Khoisan, Pinyin, Livonian, Sinology. */
        "U+180-24F": StyleObject;
        /** Latin Extended Additional. Vietnamese, German captial sharp s, Medievalist, Latin general use. */
        "U+1E00-1EFF": StyleObject;
        /** International Phonetic Alphabet Extensions. */
        "U+250-2AF": StyleObject;
        /** Greek and Coptic. */
        "U+370-3FF": StyleObject;
        /** Greek Extended. Accented characters for polytonic Greek. */
        "U+1F00-1FFF": StyleObject;
        /** Cyrillic. */
        "U+400-4FF": StyleObject;
        /** Cyrillic Supplement. Extra letters for Komi, Khanty, Chukchi, Mordvin, Kurdish, Aleut, Chuvash, Abkhaz, Azerbaijani, and Orok. */
        "U+500-52F": StyleObject;
        /** Latin, Greek, Cyrillic, some punctuation and symbols. */
        "U+00-52F, U+1E00-1FFF, U+2200–22FF": StyleObject;
        /** Armenian. */
        "U+530–58F": StyleObject;
        /** Hebrew. */
        "U+590–5FF": StyleObject;
        /** Arabic. */
        "U+600–6FF": StyleObject;
        /** Arabic Supplement. Additional letters for African languages, Khowar, Torwali, Burushaski, and early Persian. */
        "U+750–77F": StyleObject;
        /** Arabic Extended-A. Additional letters for African languages, European and Central Asian languages, Rohingya, Tamazight, Arwi, and Koranic annotation signs. */
        "U+8A0–8FF": StyleObject;
        /** Syriac. */
        "U+700–74F": StyleObject;
        /** Devanagari. */
        "U+900–97F": StyleObject;
        /** Bengali. */
        "U+980–9FF": StyleObject;
        /** Gurmukhi. */
        "U+A00–A7F": StyleObject;
        /** Gujarati. */
        "U+A80–AFF": StyleObject;
        /** Oriya. */
        "U+B00–B7F": StyleObject;
        /** Tamil. */
        "U+B80–BFF": StyleObject;
        /** Telugu. */
        "U+C00–C7F": StyleObject;
        /** Kannada. */
        "U+C80–CFF": StyleObject;
        /** Malayalam. */
        "U+D00–D7F": StyleObject;
        /** Sinhala. */
        "U+D80–DFF": StyleObject;
        /** Warang Citi. */
        "U+118A0–118FF": StyleObject;
        /** Thai. */
        "U+E00–E7F": StyleObject;
        /** Tai Tham. */
        "U+1A20–1AAF": StyleObject;
        /** Tai Viet. */
        "U+AA80–AADF": StyleObject;
        /** Lao. */
        "U+E80–EFF": StyleObject;
        /** Tibetan. */
        "U+F00–FFF": StyleObject;
        /** Myanmar (Burmese). */
        "U+1000–109F": StyleObject;
        /** Georgian. */
        "U+10A0–10FF": StyleObject;
        /** Ethiopic. */
        "U+1200–137F": StyleObject;
        /** Ethiopic Supplement. Extra Syllables for Sebatbeit, and Tonal marks */
        "U+1380–139F": StyleObject;
        /** Ethiopic Extended. Extra Syllables for Me'en, Blin, and Sebatbeit. */
        "U+2D80–2DDF": StyleObject;
        /** Ethiopic Extended-A. Extra characters for Gamo-Gofa-Dawro, Basketo, and Gumuz. */
        "U+AB00–AB2F": StyleObject;
        /** Khmer. */
        "U+1780–17FF": StyleObject;
        /** Mongolian. */
        "U+1800–18AF": StyleObject;
        /** Sundanese. */
        "U+1B80–1BBF": StyleObject;
        /** Sundanese Supplement. Punctuation. */
        "U+1CC0–1CCF": StyleObject;
        /** CJK (Chinese, Japanese, Korean) Unified Ideographs. Most common ideographs for modern Chinese and Japanese. */
        "U+4E00–9FD5": StyleObject;
        /** CJK Unified Ideographs Extension A. Rare ideographs. */
        "U+3400–4DB5": StyleObject;
        /** Kangxi Radicals. */
        "U+2F00–2FDF": StyleObject;
        /** CJK Radicals Supplement. Alternative forms of Kangxi Radicals. */
        "U+2E80–2EFF": StyleObject;
        /** Hangul Jamo. */
        "U+1100–11FF": StyleObject;
        /** Hangul Syllables. */
        "U+AC00–D7AF": StyleObject;
        /** Hiragana. */
        "U+3040–309F": StyleObject;
        /** Katakana. */
        "U+30A0–30FF": StyleObject;
        /** Japanese Kanji, Hiragana and Katakana characters plus Yen/Yuan symbol. */
        "U+A5, U+4E00-9FFF, U+30??, U+FF00-FF9F": StyleObject;
        /** Lisu. */
        "U+A4D0–A4FF": StyleObject;
        /** Yi Syllables. */
        "U+A000–A48F": StyleObject;
        /** Yi Radicals. */
        "U+A490–A4CF": StyleObject;
        /** General Punctuation. */
        "U+2000-206F": StyleObject;
        /** CJK Symbols and Punctuation. */
        "U+3000–303F": StyleObject;
        /** Superscripts and Subscripts. */
        "U+2070–209F": StyleObject;
        /** Currency Symbols. */
        "U+20A0–20CF": StyleObject;
        /** Letterlike Symbols. */
        "U+2100–214F": StyleObject;
        /** Number Forms. */
        "U+2150–218F": StyleObject;
        /** Arrows. */
        "U+2190–21FF": StyleObject;
        /** Mathematical Operators. */
        "U+2200–22FF": StyleObject;
        /** Miscellaneous Technical. */
        "U+2300–23FF": StyleObject;
        /** Private Use Area. */
        "U+E000-F8FF": StyleObject;
        /** Alphabetic Presentation Forms. Ligatures for latin, Armenian, and Hebrew. */
        "U+FB00–FB4F": StyleObject;
        /** Arabic Presentation Forms-A. Contextual forms / ligatures for Persian, Urdu, Sindhi, Central Asian languages, etc, Arabic pedagogical symbols, word ligatures. */
        "U+FB50–FDFF": StyleObject;
        /** Emoji: Emoticons. */
        "U+1F600–1F64F": StyleObject;
        /** Emoji: Miscellaneous Symbols. */
        "U+2600–26FF": StyleObject;
        /** Emoji: Miscellaneous Symbols and Pictographs. */
        "U+1F300–1F5FF": StyleObject;
        /** Emoji: Supplemental Symbols and Pictographs. */
        "U+1F900–1F9FF": StyleObject;
        /** Emoji: Transport and Map Symbols. */
        "U+1F680–1F6FF": StyleObject;
    } & WideEntry;
    /**
     * Controls the appearance of selection.
     *
     * Syntax: auto | text | none | contain | all
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/user-select)
     */
    userSelect: {
        /** The content of the element must be selected atomically */
        all: StyleObject;
        auto: StyleObject;
        /** UAs must not allow a selection which is started in this element to be extended outside of this element. */
        contain: StyleObject;
        /** The UA must not allow selections to be started in this element. */
        none: StyleObject;
        /** The element imposes no constraint on the selection. */
        text: StyleObject;
    } & WideEntry;
    /**
     * Affects the vertical positioning of the inline boxes generated by an inline-level element inside a line box.
     *
     * Syntax: baseline | sub | super | text-top | text-bottom | middle | top | bottom | \<percentage> | \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/vertical-align)
     */
    verticalAlign: {
        /** Align the dominant baseline of the parent box with the equivalent, or heuristically reconstructed, baseline of the element inline box. */
        auto: StyleObject;
        /** Align the 'alphabetic' baseline of the element with the 'alphabetic' baseline of the parent element. */
        baseline: StyleObject;
        /** Align the after edge of the extended inline box with the after-edge of the line box. */
        bottom: StyleObject;
        /** Align the 'middle' baseline of the inline element with the middle baseline of the parent. */
        middle: StyleObject;
        /** Lower the baseline of the box to the proper position for subscripts of the parent's box. (This value has no effect on the font size of the element's text.) */
        sub: StyleObject;
        /** Raise the baseline of the box to the proper position for superscripts of the parent's box. (This value has no effect on the font size of the element's text.) */
        super: StyleObject;
        /** Align the bottom of the box with the after-edge of the parent element's font. */
        "text-bottom": StyleObject;
        /** Align the top of the box with the before-edge of the parent element's font. */
        "text-top": StyleObject;
        /** Align the before edge of the extended inline box with the before-edge of the line box. */
        top: StyleObject;
        "-webkit-baseline-middle": StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies whether the boxes generated by an element are rendered. Invisible boxes still affect layout (set the ‘display’ property to ‘none’ to suppress box generation altogether).
     *
     * Syntax: visible | hidden | collapse
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/visibility)
     */
    visibility: {
        /** Table-specific. If used on elements other than rows, row groups, columns, or column groups, 'collapse' has the same meaning as 'hidden'. */
        collapse: StyleObject;
        /** The generated box is invisible (fully transparent, nothing is drawn), but still affects layout. */
        hidden: StyleObject;
        /** The generated box is visible. */
        visible: StyleObject;
    } & WideEntry;
    /**
     * Shorthand property combines six of the animation properties into a single property.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-animation": {
        /** The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. */
        alternate: StyleObject;
        /** The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. */
        "alternate-reverse": StyleObject;
        /** The beginning property value (as defined in the first \@keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'. */
        backwards: StyleObject;
        /** Both forwards and backwards fill modes are applied. */
        both: StyleObject;
        /** The final property value (as defined in the last \@keyframes at-rule) is maintained after the animation completes. */
        forwards: StyleObject;
        /** Causes the animation to repeat forever. */
        infinite: StyleObject;
        /** No animation is performed */
        none: StyleObject;
        /** Normal playback. */
        normal: StyleObject;
        /** All iterations of the animation are played in the reverse direction from the way they were specified. */
        reverse: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & TimeEntry & TransitionTimingFunctions & WideEntry;
    /**
     * Defines when the animation will start.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-animation-delay": TimeEntry & WideEntry;
    /**
     * Defines whether or not the animation should play in reverse on alternate cycles.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-animation-direction": {
        /** The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. */
        alternate: StyleObject;
        /** The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. */
        "alternate-reverse": StyleObject;
        /** Normal playback. */
        normal: StyleObject;
        /** All iterations of the animation are played in the reverse direction from the way they were specified. */
        reverse: StyleObject;
    } & WideEntry;
    /**
     * Defines the length of time that an animation takes to complete one cycle.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-animation-duration": TimeEntry & WideEntry;
    /**
     * Defines what values are applied by the animation outside the time it is executing.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-animation-fill-mode": {
        /** The beginning property value (as defined in the first \@keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'. */
        backwards: StyleObject;
        /** Both forwards and backwards fill modes are applied. */
        both: StyleObject;
        /** The final property value (as defined in the last \@keyframes at-rule) is maintained after the animation completes. */
        forwards: StyleObject;
        /** There is no change to the property value between the time the animation is applied and the time the animation begins playing or after the animation completes. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Defines the number of times an animation cycle is played. The default value is one, meaning the animation will play from beginning to end once.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-animation-iteration-count": {
        /** Causes the animation to repeat forever. */
        infinite: StyleObject;
    } & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Defines a list of animations that apply. Each name is used to select the keyframe at-rule that provides the property values for the animation.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-animation-name": {
        /** No animation is performed */
        none: StyleObject;
    } & WideEntry;
    /**
     * Defines whether the animation is running or paused.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-animation-play-state": {
        /** A running animation will be paused. */
        paused: StyleObject;
        /** Resume playback of a paused animation. */
        running: StyleObject;
    } & WideEntry;
    /**
     * Describes how the animation will progress over one cycle of its duration. See the 'transition-timing-function'.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-animation-timing-function": TransitionTimingFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Changes the appearance of buttons and other controls to resemble native controls.
     *
     * (Chrome, Safari 3)
     *
     * Syntax: none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button
     */
    "-webkit-appearance": {
        button: StyleObject;
        "button-bevel": StyleObject;
        "caps-lock-indicator": StyleObject;
        caret: StyleObject;
        checkbox: StyleObject;
        "default-button": StyleObject;
        listbox: StyleObject;
        listitem: StyleObject;
        "media-fullscreen-button": StyleObject;
        "media-mute-button": StyleObject;
        "media-play-button": StyleObject;
        "media-seek-back-button": StyleObject;
        "media-seek-forward-button": StyleObject;
        "media-slider": StyleObject;
        "media-sliderthumb": StyleObject;
        menulist: StyleObject;
        "menulist-button": StyleObject;
        "menulist-text": StyleObject;
        "menulist-textfield": StyleObject;
        none: StyleObject;
        "push-button": StyleObject;
        radio: StyleObject;
        "scrollbarbutton-down": StyleObject;
        "scrollbarbutton-left": StyleObject;
        "scrollbarbutton-right": StyleObject;
        "scrollbarbutton-up": StyleObject;
        "scrollbargripper-horizontal": StyleObject;
        "scrollbargripper-vertical": StyleObject;
        "scrollbarthumb-horizontal": StyleObject;
        "scrollbarthumb-vertical": StyleObject;
        "scrollbartrack-horizontal": StyleObject;
        "scrollbartrack-vertical": StyleObject;
        searchfield: StyleObject;
        "searchfield-cancel-button": StyleObject;
        "searchfield-decoration": StyleObject;
        "searchfield-results-button": StyleObject;
        "searchfield-results-decoration": StyleObject;
        "slider-horizontal": StyleObject;
        "sliderthumb-horizontal": StyleObject;
        "sliderthumb-vertical": StyleObject;
        "slider-vertical": StyleObject;
        "square-button": StyleObject;
        textarea: StyleObject;
        textfield: StyleObject;
    } & WideEntry;
    /**
     * Applies a filter effect where the first filter in the list takes the element's background image as the input image.
     *
     * (Safari 9)
     */
    "-webkit-backdrop-filter": {
        /** No filter effects are applied. */
        none: StyleObject;
        /** Applies a Gaussian blur to the input image. */
        blur: (...params: Parameters<typeof blur>) => StyleObject;
        /** Applies a linear multiplier to input image, making it appear more or less bright. */
        brightness: (...params: Parameters<typeof brightness>) => StyleObject;
        /** Adjusts the contrast of the input. */
        contrast: (...params: Parameters<typeof contrast>) => StyleObject;
        /** Applies a drop shadow effect to the input image. */
        dropShadow: (...params: Parameters<typeof dropShadow>) => StyleObject;
        /** Converts the input image to grayscale. */
        grayscale: (...params: Parameters<typeof grayscale>) => StyleObject;
        /** Applies a hue rotation on the input image.  */
        hueRotate: (...params: Parameters<typeof hueRotate>) => StyleObject;
        /** Inverts the samples in the input image. */
        invert: (...params: Parameters<typeof invert>) => StyleObject;
        /** Applies transparency to the samples in the input image. */
        opacity: (...params: Parameters<typeof opacity>) => StyleObject;
        /** Saturates the input image. */
        saturate: (...params: Parameters<typeof saturate>) => StyleObject;
        /** Converts the input image to sepia. */
        sepia: (...params: Parameters<typeof sepia>) => StyleObject;
        /** A filter reference to a \<filter> element. */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & WideEntry;
    /**
     * Determines whether or not the 'back' side of a transformed element is visible when facing the viewer. With an identity transform, the front side of an element faces the viewer.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-backface-visibility": {
        hidden: StyleObject;
        visible: StyleObject;
    } & WideEntry;
    /**
     * Determines the background painting area.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-background-clip": BoxEntry & WideEntry;
    /** (Chrome, Safari 3) */
    "-webkit-background-composite": {
        border: StyleObject;
        padding: StyleObject;
    } & WideEntry;
    /**
     * For elements rendered as a single box, specifies the background positioning area. For elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes on several pages) specifies which boxes 'box-decoration-break' operates on to determine the background positioning area(s).
     *
     * (Chrome, Safari 3)
     */
    "-webkit-background-origin": BoxEntry & WideEntry;
    /**
     * Shorthand property for setting 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset' and 'border-image-repeat'. Omitted values are set to their initial values.
     *
     * (Chrome, Safari 5)
     */
    "-webkit-border-image": {
        /** If 'auto' is specified then the border image width is the intrinsic width or height (whichever is applicable) of the corresponding image slice. If the image does not have the required intrinsic dimension then the corresponding border-width is used instead. */
        auto: StyleObject;
        /** Causes the middle part of the border-image to be preserved. */
        fill: StyleObject;
        none: StyleObject;
        /** The image is tiled (repeated) to fill the area. */
        repeat: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the image is rescaled so that it does. */
        round: StyleObject;
        /** The image is tiled (repeated) to fill the area. If it does not fill the area with a whole number of tiles, the extra space is distributed around the tiles. */
        space: StyleObject;
        /** The image is stretched to fill the area. */
        stretch: StyleObject;
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & LengthEntry & PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Specifies the alignment of nested elements within an outer flexible box element.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-box-align": {
        /** If this box orientation is inline-axis or horizontal, all children are placed with their baselines aligned, and extra space placed before or after as necessary. For block flows, the baseline of the first non-empty line box located within the element is used. For tables, the baseline of the first cell is used. */
        baseline: StyleObject;
        /** Any extra space is divided evenly, with half placed above the child and the other half placed after the child. */
        center: StyleObject;
        /** For normal direction boxes, the bottom edge of each child is placed along the bottom of the box. Extra space is placed above the element. For reverse direction boxes, the top edge of each child is placed along the top of the box. Extra space is placed below the element. */
        end: StyleObject;
        /** For normal direction boxes, the top edge of each child is placed along the top of the box. Extra space is placed below the element. For reverse direction boxes, the bottom edge of each child is placed along the bottom of the box. Extra space is placed above the element. */
        start: StyleObject;
        /** The height of each child is adjusted to that of the containing block. */
        stretch: StyleObject;
    } & WideEntry;
    /**
     * In webkit applications, -webkit-box-direction specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
     *
     * (Chrome, Safari 3)
     */
    "-webkit-box-direction": {
        /** A box with a computed value of horizontal for box-orient displays its children from left to right. A box with a computed value of vertical displays its children from top to bottom. */
        normal: StyleObject;
        /** A box with a computed value of horizontal for box-orient displays its children from right to left. A box with a computed value of vertical displays its children from bottom to top. */
        reverse: StyleObject;
    } & WideEntry;
    /**
     * Specifies an element's flexibility.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-box-flex": {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * Flexible elements can be assigned to flex groups using the 'box-flex-group' property.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-box-flex-group": IntegerEntry & WideEntry;
    /**
     * Indicates the ordinal group the element belongs to. Elements with a lower ordinal group are displayed before those with a higher ordinal group.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-box-ordinal-group": IntegerEntry & WideEntry;
    /**
     * In webkit applications, -webkit-box-orient specifies whether a box lays out its contents horizontally or vertically.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-box-orient": {
        /** Elements are oriented along the box's axis. */
        "block-axis": StyleObject;
        /** The box displays its children from left to right in a horizontal line. */
        horizontal: StyleObject;
        /** Elements are oriented vertically. */
        "inline-axis": StyleObject;
        /** The box displays its children from stacked from top to bottom vertically. */
        vertical: StyleObject;
    } & WideEntry;
    /**
     * Specifies alignment of child elements within the current element in the direction of orientation.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-box-pack": {
        /** The extra space is divided evenly, with half placed before the first child and the other half placed after the last child. */
        center: StyleObject;
        /** For normal direction boxes, the right edge of the last child is placed at the right side, with all extra space placed before the first child. For reverse direction boxes, the left edge of the first child is placed at the left side, with all extra space placed after the last child. */
        end: StyleObject;
        /** The space is divided evenly in-between each child, with none of the extra space placed before the first child or after the last child. If there is only one child, treat the pack value as if it were start. */
        justify: StyleObject;
        /** For normal direction boxes, the left edge of the first child is placed at the left side, with all extra space placed after the last child. For reverse direction boxes, the right edge of the last child is placed at the right side, with all extra space placed before the first child. */
        start: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Defines a reflection of a border box.
     *
     * (Edge 79, Safari 4, Chrome 4, Opera 15)
     *
     * Syntax: [ above | below | right | left ]? \<length>? \<image>?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-box-reflect)
     */
    "-webkit-box-reflect": {
        /** The reflection appears above the border box. */
        above: StyleObject;
        /** The reflection appears below the border box. */
        below: StyleObject;
        /** The reflection appears to the left of the border box. */
        left: StyleObject;
        /** The reflection appears to the right of the border box. */
        right: StyleObject;
    } & LengthEntry & ImageFunctions & WideEntry;
    /**
     * Box Model addition in CSS3.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-box-sizing": {
        /** The specified width and height (and respective min/max properties) on this element determine the border box of the element. */
        "border-box": StyleObject;
        /** Behavior of width and height as specified by CSS2.1. The specified width and height (and respective min/max properties) apply to the width and height respectively of the content box of the element. */
        "content-box": StyleObject;
    } & WideEntry;
    /**
     * Describes the page/column break behavior before the generated box.
     *
     * (Safari 7)
     */
    "-webkit-break-after": {
        /** Always force a page break before/after the generated box. */
        always: StyleObject;
        /** Neither force nor forbid a page/column break before/after the generated box. */
        auto: StyleObject;
        /** Avoid a page/column break before/after the generated box. */
        avoid: StyleObject;
        /** Avoid a column break before/after the generated box. */
        "avoid-column": StyleObject;
        /** Avoid a page break before/after the generated box. */
        "avoid-page": StyleObject;
        "avoid-region": StyleObject;
        /** Always force a column break before/after the generated box. */
        column: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a left page. */
        left: StyleObject;
        /** Always force a page break before/after the generated box. */
        page: StyleObject;
        region: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a right page. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Describes the page/column break behavior before the generated box.
     *
     * (Safari 7)
     */
    "-webkit-break-before": {
        /** Always force a page break before/after the generated box. */
        always: StyleObject;
        /** Neither force nor forbid a page/column break before/after the generated box. */
        auto: StyleObject;
        /** Avoid a page/column break before/after the generated box. */
        avoid: StyleObject;
        /** Avoid a column break before/after the generated box. */
        "avoid-column": StyleObject;
        /** Avoid a page break before/after the generated box. */
        "avoid-page": StyleObject;
        "avoid-region": StyleObject;
        /** Always force a column break before/after the generated box. */
        column: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a left page. */
        left: StyleObject;
        /** Always force a page break before/after the generated box. */
        page: StyleObject;
        region: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a right page. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Describes the page/column break behavior inside the generated box.
     *
     * (Safari 7)
     */
    "-webkit-break-inside": {
        /** Neither force nor forbid a page/column break inside the generated box. */
        auto: StyleObject;
        /** Avoid a page/column break inside the generated box. */
        avoid: StyleObject;
        /** Avoid a column break inside the generated box. */
        "avoid-column": StyleObject;
        /** Avoid a page break inside the generated box. */
        "avoid-page": StyleObject;
        "avoid-region": StyleObject;
    } & WideEntry;
    /**
     * Describes the page/column break behavior before the generated box.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-break-after": {
        /** Always force a page break before/after the generated box. */
        always: StyleObject;
        /** Neither force nor forbid a page/column break before/after the generated box. */
        auto: StyleObject;
        /** Avoid a page/column break before/after the generated box. */
        avoid: StyleObject;
        /** Avoid a column break before/after the generated box. */
        "avoid-column": StyleObject;
        /** Avoid a page break before/after the generated box. */
        "avoid-page": StyleObject;
        "avoid-region": StyleObject;
        /** Always force a column break before/after the generated box. */
        column: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a left page. */
        left: StyleObject;
        /** Always force a page break before/after the generated box. */
        page: StyleObject;
        region: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a right page. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Describes the page/column break behavior before the generated box.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-break-before": {
        /** Always force a page break before/after the generated box. */
        always: StyleObject;
        /** Neither force nor forbid a page/column break before/after the generated box. */
        auto: StyleObject;
        /** Avoid a page/column break before/after the generated box. */
        avoid: StyleObject;
        /** Avoid a column break before/after the generated box. */
        "avoid-column": StyleObject;
        /** Avoid a page break before/after the generated box. */
        "avoid-page": StyleObject;
        "avoid-region": StyleObject;
        /** Always force a column break before/after the generated box. */
        column: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a left page. */
        left: StyleObject;
        /** Always force a page break before/after the generated box. */
        page: StyleObject;
        region: StyleObject;
        /** Force one or two page breaks before/after the generated box so that the next page is formatted as a right page. */
        right: StyleObject;
    } & WideEntry;
    /**
     * Describes the page/column break behavior inside the generated box.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-break-inside": {
        /** Neither force nor forbid a page/column break inside the generated box. */
        auto: StyleObject;
        /** Avoid a page/column break inside the generated box. */
        avoid: StyleObject;
        /** Avoid a column break inside the generated box. */
        "avoid-column": StyleObject;
        /** Avoid a page break inside the generated box. */
        "avoid-page": StyleObject;
        "avoid-region": StyleObject;
    } & WideEntry;
    /**
     * Describes the optimal number of columns into which the content of the element will be flowed.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-count": {
        /** Determines the number of columns by the 'column-width' property and the element width. */
        auto: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Sets the gap between columns. If there is a column rule between columns, it will appear in the middle of the gap.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-gap": {
        /** User agent specific and typically equivalent to 1em. */
        normal: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * This property is a shorthand for setting 'column-rule-width', 'column-rule-style', and 'column-rule-color' at the same place in the style sheet. Omitted values are set to their initial values.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-rule": ColorEntry & ColorFunctions & LengthEntry & LineWidthEntry & LineStyleEntry & WideEntry;
    /**
     * Sets the color of the column rule
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-rule-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * Sets the style of the rule between columns of an element.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-rule-style": LineStyleEntry & WideEntry;
    /**
     * Sets the width of the rule between columns. Negative values are not allowed.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-rule-width": LengthEntry & LineWidthEntry & WideEntry;
    /**
     * A shorthand property which sets both 'column-width' and 'column-count'.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-columns": {
        /** The width depends on the values of other properties. */
        auto: StyleObject;
    } & LengthEntry & IntegerEntry & WideEntry;
    /**
     * Describes the page/column break behavior after the generated box.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-span": {
        /** The element spans across all columns. Content in the normal flow that appears before the element is automatically balanced across all columns before the element appear. */
        all: StyleObject;
        /** The element does not span multiple columns. */
        none: StyleObject;
    } & WideEntry;
    /**
     * This property describes the width of columns in multicol elements.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-column-width": {
        /** The width depends on the values of other properties. */
        auto: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Processes an element’s rendering before it is displayed in the document, by applying one or more filter effects.
     *
     * (Chrome 18, Opera 15, Safari 6)
     */
    "-webkit-filter": {
        /** No filter effects are applied. */
        none: StyleObject;
        /** Applies a Gaussian blur to the input image. */
        blur: (...params: Parameters<typeof blur>) => StyleObject;
        /** Applies a linear multiplier to input image, making it appear more or less bright. */
        brightness: (...params: Parameters<typeof brightness>) => StyleObject;
        /** Adjusts the contrast of the input. */
        contrast: (...params: Parameters<typeof contrast>) => StyleObject;
        /** Applies a drop shadow effect to the input image. */
        dropShadow: (...params: Parameters<typeof dropShadow>) => StyleObject;
        /** Converts the input image to grayscale. */
        grayscale: (...params: Parameters<typeof grayscale>) => StyleObject;
        /** Applies a hue rotation on the input image.  */
        hueRotate: (...params: Parameters<typeof hueRotate>) => StyleObject;
        /** Inverts the samples in the input image. */
        invert: (...params: Parameters<typeof invert>) => StyleObject;
        /** Applies transparency to the samples in the input image. */
        opacity: (...params: Parameters<typeof opacity>) => StyleObject;
        /** Saturates the input image. */
        saturate: (...params: Parameters<typeof saturate>) => StyleObject;
        /** Converts the input image to sepia. */
        sepia: (...params: Parameters<typeof sepia>) => StyleObject;
        /** A filter reference to a \<filter> element. */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & WideEntry;
    /**
     * Makes a block container a region and associates it with a named flow.
     *
     * (Safari 6.1)
     */
    "-webkit-flow-from": {
        /** The block container is not a CSS Region. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Places an element or its contents into a named flow.
     *
     * (Safari 6.1)
     */
    "-webkit-flow-into": {
        /** The element is not moved to a named flow and normal CSS processing takes place. */
        none: StyleObject;
    } & WideEntry;
    /**
     * This property provides low-level control over OpenType font features. It is intended as a way of providing access to font features that are not widely used but are needed for a particular use case.
     *
     * (Chrome 16)
     */
    "-webkit-font-feature-settings": {
        '"c2cs"': StyleObject;
        '"dlig"': StyleObject;
        '"kern"': StyleObject;
        '"liga"': StyleObject;
        '"lnum"': StyleObject;
        '"onum"': StyleObject;
        '"smcp"': StyleObject;
        '"swsh"': StyleObject;
        '"tnum"': StyleObject;
        /** No change in glyph substitution or positioning occurs. */
        normal: StyleObject;
        off: StyleObject;
        on: StyleObject;
    } & StringEntry & IntegerEntry & WideEntry;
    /**
     * Controls whether hyphenation is allowed to create more break opportunities within a line of text.
     *
     * (Safari 5.1)
     */
    "-webkit-hyphens": {
        /** Conditional hyphenation characters inside a word, if present, take priority over automatic resources when determining hyphenation points within the word. */
        auto: StyleObject;
        /** Words are only broken at line breaks where there are characters inside the word that suggest line break opportunities */
        manual: StyleObject;
        /** Words are not broken at line breaks, even if characters inside the word suggest line break points. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Specifies line-breaking rules for CJK (Chinese, Japanese, and Korean) text.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-line-break": {
        "after-white-space": StyleObject;
        normal: StyleObject;
    } & WideEntry;
    /** (Chrome, Safari 3) */
    "-webkit-margin-bottom-collapse": {
        collapse: StyleObject;
        discard: StyleObject;
        separate: StyleObject;
    } & WideEntry;
    /** (Chrome, Safari 3) */
    "-webkit-margin-collapse": {
        collapse: StyleObject;
        discard: StyleObject;
        separate: StyleObject;
    } & WideEntry;
    /** (Chrome, Safari 3) */
    "-webkit-margin-start": {
        auto: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /** (Chrome, Safari 3) */
    "-webkit-margin-top-collapse": {
        collapse: StyleObject;
        discard: StyleObject;
        separate: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines the mask painting area, which determines the area that is affected by the mask.
     *
     * (Chrome, Opera 15, Safari 4)
     *
     * Syntax: [ \<box> | border | padding | content | text ]#
     */
    "-webkit-mask-clip": BoxEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Sets the mask layer image of an element.
     *
     * (Chrome, Opera 15, Safari 4)
     *
     * Syntax: \<mask-reference>#
     */
    "-webkit-mask-image": {
        /** Counts as a transparent black image layer. */
        none: StyleObject;
        /** Reference to a \<mask element or to a CSS image. */
        url: (...params: Parameters<typeof url>) => StyleObject;
    } & URLEntry & ImageFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies the mask positioning area.
     *
     * (Chrome, Opera 15, Safari 4)
     *
     * Syntax: [ \<box> | border | padding | content ]#
     */
    "-webkit-mask-origin": BoxEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies how mask layer images are tiled after they have been sized and positioned.
     *
     * (Chrome, Opera 15, Safari 4)
     *
     * Syntax: \<repeat-style>#
     */
    "-webkit-mask-repeat": RepeatStyleEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies the size of the mask layer images.
     *
     * (Chrome, Opera 15, Safari 4)
     *
     * Syntax: \<bg-size>#
     */
    "-webkit-mask-size": {
        /** Resolved by using the image’s intrinsic ratio and the size of the other dimension, or failing that, using the image’s intrinsic size, or failing that, treating it as 100%. */
        auto: StyleObject;
        /** Scale the image, while preserving its intrinsic aspect ratio (if any), to the largest size such that both its width and its height can fit inside the background positioning area. */
        contain: StyleObject;
        /** Scale the image, while preserving its intrinsic aspect ratio (if any), to the smallest size such that both its width and its height can completely cover the background positioning area. */
        cover: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Defines the behavior of nonbreaking spaces within text.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-nbsp-mode": {
        normal: StyleObject;
        space: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Specifies whether to use native-style scrolling in an overflow:scroll element.
     *
     * (Chrome, Safari 5)
     *
     * Syntax: auto | touch
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-overflow-scrolling)
     */
    "-webkit-overflow-scrolling": {
        auto: StyleObject;
        touch: StyleObject;
    } & WideEntry;
    /** (Chrome, Safari 3) */
    "-webkit-padding-start": LengthEntry & PercentEntry & WideEntry;
    /**
     * Applies the same transform as the perspective(\<number>) transform function, except that it applies only to the positioned or transformed children of the element, not to the transform on the element itself.
     *
     * (Chrome, Safari 4)
     */
    "-webkit-perspective": {
        /** No perspective transform is applied. */
        none: StyleObject;
    } & LengthEntry & WideEntry;
    /**
     * Establishes the origin for the perspective property. It effectively sets the X and Y position at which the viewer appears to be looking at the children of the element.
     *
     * (Chrome, Safari 4)
     */
    "-webkit-perspective-origin": LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * The 'region-fragment' property controls the behavior of the last region associated with a named flow.
     *
     * (Safari 7)
     */
    "-webkit-region-fragment": {
        /** Content flows as it would in a regular content box. */
        auto: StyleObject;
        /** If the content fits within the CSS Region, then this property has no effect. */
        break: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * (Edge 12, Chrome 16, Opera 15)
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-tap-highlight-color)
     */
    "-webkit-tap-highlight-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * (Edge 12, Firefox 49, Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-text-fill-color)
     */
    "-webkit-text-fill-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * Specifies a size adjustment for displaying text content in mobile browsers.
     *
     * (Edge, Chrome, Safari 3)
     */
    "-webkit-text-size-adjust": {
        /** Renderers must use the default size adjustment when displaying on a small device. */
        auto: StyleObject;
        /** Renderers must not do size adjustment when displaying on a small device. */
        none: StyleObject;
    } & PercentEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * (Edge 15, Firefox 49, Safari 3, Chrome 4, Opera 15)
     *
     * Syntax: \<length> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke)
     */
    "-webkit-text-stroke": ColorEntry & ColorFunctions & LengthEntry & PercentEntry & LineWidthEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * (Edge 15, Firefox 49, Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-color)
     */
    "-webkit-text-stroke-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * (Edge 15, Firefox 49, Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-width)
     */
    "-webkit-text-stroke-width": LengthEntry & PercentEntry & LineWidthEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * (Safari 3)
     *
     * Syntax: default | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-touch-callout)
     */
    "-webkit-touch-callout": {
        none: StyleObject;
    } & WideEntry;
    /**
     * A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.
     *
     * (Chrome, Opera 12, Safari 3.1)
     */
    "-webkit-transform": {
        /** Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f] */
        matrix: (...params: Parameters<typeof matrix>) => StyleObject;
        /** Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order. */
        matrix3d: (...params: Parameters<typeof matrix3d>) => StyleObject;
        none: StyleObject;
        /** Specifies a perspective projection matrix. */
        perspective: (...params: Parameters<typeof perspective>) => StyleObject;
        /** Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property. */
        rotate: (...params: Parameters<typeof rotate>) => StyleObject;
        /** Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters. */
        rotate3d: (...params: Parameters<typeof rotate3d>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the X axis. */
        rotateX: (...params: Parameters<typeof rotateX>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Y axis. */
        rotateY: (...params: Parameters<typeof rotateY>) => StyleObject;
        /** Specifies a clockwise rotation by the given angle about the Z axis. */
        rotateZ: (...params: Parameters<typeof rotateZ>) => StyleObject;
        /** Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first. */
        scale: (...params: Parameters<typeof scale>) => StyleObject;
        /** Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters. */
        scale3d: (...params: Parameters<typeof scale3d>) => StyleObject;
        /** Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter. */
        scaleX: (...params: Parameters<typeof scaleX>) => StyleObject;
        /** Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter. */
        scaleY: (...params: Parameters<typeof scaleY>) => StyleObject;
        /** Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter. */
        scaleZ: (...params: Parameters<typeof scaleZ>) => StyleObject;
        /** Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis). */
        skew: (...params: Parameters<typeof skew>) => StyleObject;
        /** Specifies a skew transformation along the X axis by the given angle. */
        skewX: (...params: Parameters<typeof skewX>) => StyleObject;
        /** Specifies a skew transformation along the Y axis by the given angle. */
        skewY: (...params: Parameters<typeof skewY>) => StyleObject;
        /** Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter. */
        translate: (...params: Parameters<typeof translate>) => StyleObject;
        /** Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively. */
        translate3d: (...params: Parameters<typeof translate3d>) => StyleObject;
        /** Specifies a translation by the given amount in the X direction. */
        translateX: (...params: Parameters<typeof translateX>) => StyleObject;
        /** Specifies a translation by the given amount in the Y direction. */
        translateY: (...params: Parameters<typeof translateY>) => StyleObject;
        /** Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0. */
        translateZ: (...params: Parameters<typeof translateZ>) => StyleObject;
    } & WideEntry;
    /**
     * Establishes the origin of transformation for an element.
     *
     * (Chrome, Opera 15, Safari 3.1)
     */
    "-webkit-transform-origin": LengthEntry & PercentEntry & PositionEntry & WideEntry;
    /**
     * The x coordinate of the origin for transforms applied to an element with respect to its border box.
     *
     * (Chrome, Safari 3.1)
     */
    "-webkit-transform-origin-x": LengthEntry & PercentEntry & WideEntry;
    /**
     * The y coordinate of the origin for transforms applied to an element with respect to its border box.
     *
     * (Chrome, Safari 3.1)
     */
    "-webkit-transform-origin-y": LengthEntry & PercentEntry & WideEntry;
    /**
     * The z coordinate of the origin for transforms applied to an element with respect to its border box.
     *
     * (Chrome, Safari 4)
     */
    "-webkit-transform-origin-z": LengthEntry & PercentEntry & WideEntry;
    /**
     * Defines how nested elements are rendered in 3D space.
     *
     * (Chrome, Safari 4)
     */
    "-webkit-transform-style": {
        /** All children of this element are rendered flattened into the 2D plane of the element. */
        flat: StyleObject;
    } & WideEntry;
    /**
     * Shorthand property combines four of the transition properties into a single property.
     *
     * (Chrome, Opera 12, Safari 5)
     */
    "-webkit-transition": {
        /** Every property that is able to undergo a transition will do so. */
        all: StyleObject;
        /** No property will transition. */
        none: StyleObject;
    } & TimeEntry & TransitionTimingFunctions & WideEntry;
    /**
     * Defines when the transition will start. It allows a transition to begin execution some period of time from when it is applied.
     *
     * (Chrome, Opera 12, Safari 5)
     */
    "-webkit-transition-delay": TimeEntry & WideEntry;
    /**
     * Specifies how long the transition from the old value to the new value should take.
     *
     * (Chrome, Opera 12, Safari 5)
     */
    "-webkit-transition-duration": TimeEntry & WideEntry;
    /**
     * Specifies the name of the CSS property to which the transition is applied.
     *
     * (Chrome, Opera 12, Safari 5)
     */
    "-webkit-transition-property": {
        /** Every property that is able to undergo a transition will do so. */
        all: StyleObject;
        /** No property will transition. */
        none: StyleObject;
    } & WideEntry;
    /**
     * Describes how the intermediate values used during a transition will be calculated.
     *
     * (Chrome, Opera 12, Safari 5)
     */
    "-webkit-transition-timing-function": TransitionTimingFunctions & WideEntry;
    /** (Safari 3) */
    "-webkit-user-drag": {
        auto: StyleObject;
        element: StyleObject;
        none: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Determines whether a user can edit the content of an element.
     *
     * (Chrome, Safari 3)
     *
     * Syntax: read-only | read-write | read-write-plaintext-only
     */
    "-webkit-user-modify": {
        "read-only": StyleObject;
        "read-write": StyleObject;
        "read-write-plaintext-only": StyleObject;
    } & WideEntry;
    /**
     * Controls the appearance of selection.
     *
     * (Chrome, Safari 3)
     */
    "-webkit-user-select": {
        auto: StyleObject;
        none: StyleObject;
        text: StyleObject;
    } & WideEntry;
    /**
     * Specifies the minimum number of line boxes of a block container that must be left in a fragment after a break.
     *
     * (Edge 12, Safari 1.3, Chrome 25, IE 8, Opera 9.2)
     *
     * Syntax: \<integer>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/widows)
     */
    widows: IntegerEntry & WideEntry;
    /**
     * Specifies the width of the content area, padding area or border area (depending on 'box-sizing') of certain boxes.
     *
     * Syntax: \<viewport-length>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/width)
     */
    width: {
        /** The width depends on the values of other properties. */
        auto: StyleObject;
        /** Use the fit-content inline size or fit-content block size, as appropriate to the writing mode. */
        "fit-content": StyleObject;
        /** Use the max-content inline size or max-content block size, as appropriate to the writing mode. */
        "max-content": StyleObject;
        /** Use the min-content inline size or min-content block size, as appropriate to the writing mode. */
        "min-content": StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Provides a rendering hint to the user agent, stating what kinds of changes the author expects to perform on the element.
     *
     * (Edge 79, Firefox 36, Safari 9.1, Chrome 36, Opera 24)
     *
     * Syntax: auto | \<animateable-feature>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/will-change)
     */
    willChange: {
        /** Expresses no particular intent. */
        auto: StyleObject;
        /** Indicates that the author expects to animate or change something about the element’s contents in the near future. */
        contents: StyleObject;
        /** Indicates that the author expects to animate or change the scroll position of the element in the near future. */
        "scroll-position": StyleObject;
    } & WideEntry;
    /**
     * Specifies line break opportunities for non-CJK scripts.
     *
     * Syntax: normal | break-all | keep-all | break-word
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/word-break)
     */
    wordBreak: {
        /** Lines may break between any two grapheme clusters for non-CJK scripts. */
        "break-all": StyleObject;
        /** Block characters can no longer create implied break points. */
        "keep-all": StyleObject;
        /** Breaks non-CJK scripts according to their own rules. */
        normal: StyleObject;
    } & WideEntry;
    /**
     * Specifies additional spacing between “words”.
     *
     * Syntax: normal | \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/word-spacing)
     */
    wordSpacing: {
        /** No additional spacing is applied. Computes to zero. */
        normal: StyleObject;
    } & LengthEntry & PercentEntry & WideEntry;
    /**
     * Specifies whether the UA may break within a word to prevent overflow when an otherwise-unbreakable string is too long to fit.
     *
     * Syntax: normal | break-word
     */
    wordWrap: {
        /** An otherwise unbreakable sequence of characters may be broken at an arbitrary point if there are no otherwise-acceptable break points in the line. */
        "break-word": StyleObject;
        /** Lines may break only at allowed break points. */
        normal: StyleObject;
    } & WideEntry;
    /**
     * This is a shorthand property for both 'direction' and 'block-progression'.
     *
     * Syntax: horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/writing-mode)
     */
    writingMode: {
        /** Top-to-bottom block flow direction. The writing mode is horizontal. */
        "horizontal-tb": StyleObject;
        /** Left-to-right block flow direction. The writing mode is vertical, while the typographic mode is horizontal. */
        "sideways-lr": StyleObject;
        /** Right-to-left block flow direction. The writing mode is vertical, while the typographic mode is horizontal. */
        "sideways-rl": StyleObject;
        /** Left-to-right block flow direction. The writing mode is vertical. */
        "vertical-lr": StyleObject;
        /** Right-to-left block flow direction. The writing mode is vertical. */
        "vertical-rl": StyleObject;
    } & WideEntry;
    /**
     * For a positioned box, the 'z-index' property specifies the stack level of the box in the current stacking context and whether the box establishes a local stacking context.
     *
     * Syntax: auto | \<integer>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/z-index)
     */
    zIndex: {
        /** The stack level of the generated box in the current stacking context is 0. The box does not establish a new stacking context unless it is the root element. */
        auto: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * Non-standard. Specifies the magnification scale of the object. See 'transform: scale()' for a standards-based alternative.
     *
     * (Edge 12, Safari 3.1, Chrome 1, IE 5.5, Opera 15)
     *
     * Syntax: auto | \<number> | \<percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/zoom)
     */
    zoom: {
        normal: StyleObject;
    } & PercentEntry & {
        [value: number]: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * Aligns the Input Method Editor (IME) candidate window box relative to the element on which the IME composition is active.
     *
     * Syntax: auto | after
     */
    "-ms-ime-align": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -moz-binding CSS property is used by Mozilla-based applications to attach an XBL binding to a DOM element.
     *
     * (Firefox 1)
     *
     * Syntax: \<url> | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-binding)
     */
    "-moz-binding": URLEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * If you reference an SVG image in a webpage (such as with the \<img> element or as a background image), the SVG image can coordinate with the embedding element (its context) to have the image adopt property values set on the embedding element. To do this the embedding element needs to list the properties that are to be made available to the image by listing them as values of the -moz-context-properties property, and the image needs to opt in to using those properties by using values such as the context-fill value.
     *
     * This feature is available since Firefox 55, but is only currently supported with SVG images loaded via chrome:// or resource:// URLs. To experiment with the feature in SVG on the Web it is necessary to set the svg.context-properties.content.enabled pref to true.
     *
     * Syntax: none | [ fill | fill-opacity | stroke | stroke-opacity ]#
     */
    "-moz-context-properties": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The non-standard -moz-float-edge CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness.
     *
     * (Firefox 1)
     *
     * Syntax: border-box | content-box | margin-box | padding-box
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-float-edge)
     */
    "-moz-float-edge": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -moz-force-broken-image-icon extended CSS property can be used to force the broken image icon to be shown even when a broken image has an alt attribute.
     *
     * (Firefox 1)
     *
     * Syntax: 0 | 1
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-force-broken-image-icon)
     */
    "-moz-force-broken-image-icon": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * For certain XUL elements and pseudo-elements that use an image from the list-style-image property, this property specifies a region of the image that is used in place of the whole image. This allows elements to use different pieces of the same image to improve performance.
     *
     * (Firefox 1)
     *
     * Syntax: \<shape> | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-image-region)
     */
    "-moz-image-region": BasicShapeFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -moz-orient CSS property specifies the orientation of the element to which it's applied.
     *
     * (Firefox 6)
     *
     * Syntax: inline | block | horizontal | vertical
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-orient)
     */
    "-moz-orient": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * In Mozilla applications like Firefox, the -moz-outline-radius CSS property can be used to give an element's outline rounded corners.
     *
     * (Firefox 1)
     *
     * Syntax: \<outline-radius>\{1,4\} [ / \<outline-radius>\{1,4\} ]?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius)
     */
    "-moz-outline-radius": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * In Mozilla applications, the -moz-outline-radius-bottomleft CSS property can be used to round the bottom-left corner of an element's outline.
     *
     * (Firefox 1)
     *
     * Syntax: \<outline-radius>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomleft)
     */
    "-moz-outline-radius-bottomleft": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * In Mozilla applications, the -moz-outline-radius-bottomright CSS property can be used to round the bottom-right corner of an element's outline.
     *
     * (Firefox 1)
     *
     * Syntax: \<outline-radius>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomright)
     */
    "-moz-outline-radius-bottomright": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * In Mozilla applications, the -moz-outline-radius-topleft CSS property can be used to round the top-left corner of an element's outline.
     *
     * (Firefox 1)
     *
     * Syntax: \<outline-radius>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topleft)
     */
    "-moz-outline-radius-topleft": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * In Mozilla applications, the -moz-outline-radius-topright CSS property can be used to round the top-right corner of an element's outline.
     *
     * (Firefox 1)
     *
     * Syntax: \<outline-radius>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topright)
     */
    "-moz-outline-radius-topright": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * -moz-stack-sizing is an extended CSS property. Normally, a stack will change its size so that all of its child elements are completely visible. For example, moving a child of the stack far to the right will widen the stack so the child remains visible.
     *
     * Syntax: ignore | stretch-to-fit
     */
    "-moz-stack-sizing": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -moz-text-blink non-standard Mozilla CSS extension specifies the blink mode.
     *
     * Syntax: none | blink
     */
    "-moz-text-blink": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * In Mozilla applications, -moz-user-input determines if an element will accept user input.
     *
     * (Firefox 1)
     *
     * Syntax: auto | none | enabled | disabled
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-moz-user-input)
     */
    "-moz-user-input": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -moz-user-modify property has no effect. It was originally planned to determine whether or not the content of an element can be edited by a user.
     *
     * Syntax: read-only | read-write | write-only
     */
    "-moz-user-modify": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -moz-window-dragging CSS property specifies whether a window is draggable or not. It only works in Chrome code, and only on Mac OS X.
     *
     * Syntax: drag | no-drag
     */
    "-moz-window-dragging": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -moz-window-shadow CSS property specifies whether a window will have a shadow. It only works on Mac OS X.
     *
     * Syntax: default | menu | tooltip | sheet | none
     */
    "-moz-window-shadow": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -webkit-border-before CSS property is a shorthand property for setting the individual logical block start border property values in a single place in the style sheet.
     *
     * (Edge 79, Safari 5.1, Chrome 8, Opera 15)
     *
     * Syntax: \<'border-width'> || \<'border-style'> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before)
     */
    "-webkit-border-before": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -webkit-border-before-color CSS property sets the color of the individual logical block start border in a single place in the style sheet.
     *
     * Syntax: \<color>
     */
    "-webkit-border-before-color": ColorEntry & ColorFunctions & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -webkit-border-before-style CSS property sets the style of the individual logical block start border in a single place in the style sheet.
     *
     * Syntax: \<'border-style'>
     */
    "-webkit-border-before-style": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -webkit-border-before-width CSS property sets the width of the individual logical block start border in a single place in the style sheet.
     *
     * Syntax: \<'border-width'>
     */
    "-webkit-border-before-width": WideEntry;
    /**
     * The -webkit-line-clamp CSS property allows limiting of the contents of a block container to the specified number of lines.
     *
     * (Edge 17, Firefox 68, Safari 5, Chrome 6, Opera 15)
     *
     * Syntax: none | \<integer>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-line-clamp)
     */
    "-webkit-line-clamp": IntegerEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The mask CSS property alters the visibility of an element by either partially or fully hiding it. This is accomplished by either masking or clipping the image at specific points.
     *
     * Syntax: [ \<mask-reference> || \<position> [ / \<bg-size> ]? || \<repeat-style> || [ \<box> | border | padding | content | text ] || [ \<box> | border | padding | content ] ]#
     */
    "-webkit-mask": PositionEntry & BoxEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * If a -webkit-mask-image is specified, -webkit-mask-attachment determines whether the mask image's position is fixed within the viewport, or scrolls along with its containing block.
     *
     * (Safari 4, Chrome 1)
     *
     * Syntax: \<attachment>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment)
     */
    "-webkit-mask-attachment": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -webkit-mask-composite property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the -webkit-mask-image property.
     *
     * (Edge 18, Firefox 53, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: \<composite-style>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-composite)
     */
    "-webkit-mask-composite": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The mask-position CSS property sets the initial position, relative to the mask position layer defined by mask-origin, for each defined mask image.
     *
     * Syntax: \<position>#
     */
    "-webkit-mask-position": PositionEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -webkit-mask-position-x CSS property sets the initial horizontal position of a mask image.
     *
     * (Edge 18, Firefox 49, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: [ \<length-percentage> | left | center | right ]#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-x)
     */
    "-webkit-mask-position-x": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -webkit-mask-position-y CSS property sets the initial vertical position of a mask image.
     *
     * (Edge 18, Firefox 49, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: [ \<length-percentage> | top | center | bottom ]#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-y)
     */
    "-webkit-mask-position-y": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -webkit-mask-repeat-x property specifies whether and how a mask image is repeated (tiled) horizontally.
     *
     * (Edge 18, Safari 5, Chrome 3, Opera 15)
     *
     * Syntax: repeat | no-repeat | space | round
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-x)
     */
    "-webkit-mask-repeat-x": WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -webkit-mask-repeat-y property specifies whether and how a mask image is repeated (tiled) vertically.
     *
     * (Edge 18, Safari 5, Chrome 3, Opera 15)
     *
     * Syntax: repeat | no-repeat | space | round
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-y)
     */
    "-webkit-mask-repeat-y": WideEntry;
    /**
     * Sets the color of the elements accent
     *
     * (Edge 93, Firefox 92, Safari 15.4, Chrome 93, Opera 79)
     *
     * Syntax: auto | \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/accent-color)
     */
    accentColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The align-tracks CSS property sets the alignment in the masonry axis for grid containers that have masonry in their block axis.
     *
     * (Firefox 77)
     *
     * Syntax: [ normal | \<baseline-position> | \<content-distribution> | \<overflow-position>? \<content-position> ]#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/align-tracks)
     */
    alignTracks: WideEntry;
    /**
     * Specifies the names of one or more \@scroll-timeline at-rules to describe the element's scroll animations.
     *
     * (Firefox 97)
     *
     * Syntax: \<single-animation-timeline>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation-timeline)
     */
    animationTimeline: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Changes the appearance of buttons and other controls to resemble native controls.
     *
     * (Edge 84, Firefox 80, Safari 15.4, Chrome 84, Opera 70)
     *
     * Syntax: none | auto | textfield | menulist-button | \<compat-auto>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/appearance)
     */
    appearance: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The aspect-ratio   CSS property sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions.
     *
     * (Edge 88, Firefox 89, Safari 15, Chrome 88, Opera 74)
     *
     * Syntax: auto | \<ratio>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/aspect-ratio)
     */
    aspectRatio: WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * In combination with elevation, the azimuth CSS property enables different audio sources to be positioned spatially for aural presentation. This is important in that it provides a natural way to tell several voices apart, as each can be positioned to originate at a different location on the sound stage. Stereo output produce a lateral sound stage, while binaural headphones and multi-speaker setups allow for a fully three-dimensional stage.
     *
     * Syntax: \<angle> | [ [ left-side | far-left | left | center-left | center | center-right | right | far-right | right-side ] || behind ] | leftwards | rightwards
     */
    azimuth: AngleEntry & WideEntry;
    /**
     * The backdrop-filter CSS property lets you apply graphical effects such as blurring or color shifting to the area behind an element. Because it applies to everything behind the element, to see the effect you must make the element or its background at least partially transparent.
     *
     * (Edge 17, Firefox 70, Safari 9, Chrome 76, Opera 63)
     *
     * Syntax: none | \<filter-function-list>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/backdrop-filter)
     */
    backdropFilter: WideEntry;
    /**
     * The border-block CSS property is a shorthand property for setting the individual logical block border property values in a single place in the style sheet.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'border-top-width'> || \<'border-top-style'> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block)
     */
    borderBlock: ColorEntry & ColorFunctions & WideEntry;
    /**
     * The border-block-color CSS property defines the color of the logical block borders of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color and border-bottom-color, or border-right-color and border-left-color property depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'border-top-color'>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-color)
     */
    borderBlockColor: WideEntry;
    /**
     * The border-block-style CSS property defines the style of the logical block borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-style and border-bottom-style, or border-left-style and border-right-style properties depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'border-top-style'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-style)
     */
    borderBlockStyle: WideEntry;
    /**
     * The border-block-width CSS property defines the width of the logical block borders of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-width and border-bottom-width, or border-left-width, and border-right-width property depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'border-top-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-block-width)
     */
    borderBlockWidth: WideEntry;
    /**
     * The border-end-end-radius CSS property defines a logical border radius on an element, which maps to a physical border radius that depends on on the element's writing-mode, direction, and text-orientation.
     *
     * (Edge 89, Firefox 66, Safari 15, Chrome 89, Opera 75)
     *
     * Syntax: \<length-percentage>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-end-end-radius)
     */
    borderEndEndRadius: WideEntry;
    /**
     * The border-end-start-radius CSS property defines a logical border radius on an element, which maps to a physical border radius depending on the element's writing-mode, direction, and text-orientation.
     *
     * (Edge 89, Firefox 66, Safari 15, Chrome 89, Opera 75)
     *
     * Syntax: \<length-percentage>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-end-start-radius)
     */
    borderEndStartRadius: WideEntry;
    /**
     * The border-inline CSS property is a shorthand property for setting the individual logical inline border property values in a single place in the style sheet.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'border-top-width'> || \<'border-top-style'> || \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline)
     */
    borderInline: ColorEntry & ColorFunctions & WideEntry;
    /**
     * The border-inline-color CSS property defines the color of the logical inline borders of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color and border-bottom-color, or border-right-color and border-left-color property depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'border-top-color'>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-color)
     */
    borderInlineColor: WideEntry;
    /**
     * The border-inline-style CSS property defines the style of the logical inline borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-style and border-bottom-style, or border-left-style and border-right-style properties depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'border-top-style'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-style)
     */
    borderInlineStyle: WideEntry;
    /**
     * The border-inline-width CSS property defines the width of the logical inline borders of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-width and border-bottom-width, or border-left-width, and border-right-width property depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'border-top-width'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-inline-width)
     */
    borderInlineWidth: WideEntry;
    /**
     * The border-start-end-radius CSS property defines a logical border radius on an element, which maps to a physical border radius depending on the element's writing-mode, direction, and text-orientation.
     *
     * (Edge 89, Firefox 66, Safari 15, Chrome 89, Opera 75)
     *
     * Syntax: \<length-percentage>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-start-end-radius)
     */
    borderStartEndRadius: WideEntry;
    /**
     * The border-start-start-radius CSS property defines a logical border radius on an element, which maps to a physical border radius that depends on the element's writing-mode, direction, and text-orientation.
     *
     * (Edge 89, Firefox 66, Safari 15, Chrome 89, Opera 75)
     *
     * Syntax: \<length-percentage>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-start-start-radius)
     */
    borderStartStartRadius: WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The box-align CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.
     *
     * (Edge 12, Firefox 1, Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: start | center | end | baseline | stretch
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-align)
     */
    boxAlign: WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The box-direction CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).
     *
     * (Edge 12, Firefox 1, Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: normal | reverse | inherit
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-direction)
     */
    boxDirection: WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -moz-box-flex and -webkit-box-flex CSS properties specify how a -moz-box or -webkit-box grows to fill the box that contains it, in the direction of the containing box's layout.
     *
     * (Edge 12, Firefox 1, Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: \<number>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-flex)
     */
    boxFlex: {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The box-flex-group CSS property assigns the flexbox's child elements to a flex group.
     *
     * (Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: \<integer>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-flex-group)
     */
    boxFlexGroup: IntegerEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The box-lines CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).
     *
     * (Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: single | multiple
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-lines)
     */
    boxLines: WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The box-ordinal-group CSS property assigns the flexbox's child elements to an ordinal group.
     *
     * (Edge 12, Firefox 1, Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: \<integer>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-ordinal-group)
     */
    boxOrdinalGroup: IntegerEntry & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The box-orient CSS property specifies whether an element lays out its contents horizontally or vertically.
     *
     * (Edge 12, Firefox 1, Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: horizontal | vertical | inline-axis | block-axis | inherit
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-orient)
     */
    boxOrient: WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The -moz-box-pack and -webkit-box-pack CSS properties specify how a -moz-box or -webkit-box packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.
     *
     * (Edge 12, Firefox 1, Safari 3, Chrome 1, Opera 15)
     *
     * Syntax: start | center | end | justify
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-pack)
     */
    boxPack: WideEntry;
    /**
     * Defines what optimization the user agent is allowed to do when adjusting the appearance for an output device.
     *
     * (Edge 79, Firefox 97, Safari 15.4, Chrome 17, Opera 15)
     *
     * Syntax: economy | exact
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/print-color-adjust)
     */
    printColorAdjust: WideEntry;
    /**
     * The color-scheme CSS property allows an element to indicate which color schemes it can comfortably be rendered in.
     *
     * (Edge 81, Firefox 96, Safari 13, Chrome 81, Opera 68)
     *
     * Syntax: normal | [ light | dark | \<custom-ident> ]+ && only?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/color-scheme)
     */
    colorScheme: WideEntry;
    /**
     * Controls whether or not an element renders its contents at all, along with forcing a strong set of containments, allowing user agents to potentially omit large swathes of layout and rendering work until it becomes needed.
     *
     * (Edge 85, Chrome 85, Opera 71)
     *
     * Syntax: visible | auto | hidden
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/content-visibility)
     */
    contentVisibility: WideEntry;
    /**
     * The counter-set CSS property sets a CSS counter to a given value. It manipulates the value of existing counters, and will only create new counters if there isn't already a counter of the given name on the element.
     *
     * (Edge 85, Firefox 68, Chrome 85, Opera 71)
     *
     * Syntax: [ \<counter-name> \<integer>? ]+ | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/counter-set)
     */
    counterSet: IntegerEntry & WideEntry;
    /**
     * The font-optical-sizing CSS property allows developers to control whether browsers render text with slightly differing visual representations to optimize viewing at different sizes, or not. This only works for fonts that have an optical size variation axis.
     *
     * (Edge 17, Firefox 62, Safari 11, Chrome 79, Opera 66)
     *
     * Syntax: auto | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-optical-sizing)
     */
    fontOpticalSizing: WideEntry;
    /**
     * The font-variation-settings CSS property provides low-level control over OpenType or TrueType font variations, by specifying the four letter axis names of the features you want to vary, along with their variation values.
     *
     * (Edge 17, Firefox 62, Safari 11, Chrome 62, Opera 49)
     *
     * Syntax: normal | [ \<string> \<number> ]#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-variation-settings)
     */
    fontVariationSettings: StringEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The font-smooth CSS property controls the application of anti-aliasing when fonts are rendered.
     *
     * (Edge 79, Firefox 25, Safari 4, Chrome 5, Opera 15)
     *
     * Syntax: auto | never | always | \<absolute-size> | \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-smooth)
     */
    fontSmooth: LengthEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Allows authors to opt certain elements out of forced colors mode. This then restores the control of those values to CSS
     *
     * (Edge 79, Chrome 89, IE 10)
     *
     * Syntax: auto | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/forced-color-adjust)
     */
    forcedColorAdjust: WideEntry;
    /**
     * The gap CSS property is a shorthand property for row-gap and column-gap specifying the gutters between grid rows and columns.
     *
     * (Edge 84, Firefox 63, Safari 14.1, Chrome 84, Opera 70)
     *
     * Syntax: \<'row-gap'> \<'column-gap'>?
     */
    gap: WideEntry;
    /**
     * The hanging-punctuation CSS property specifies whether a punctuation mark should hang at the start or end of a line of text. Hanging punctuation may be placed outside the line box.
     *
     * (Safari 10)
     *
     * Syntax: none | [ first || [ force-end | allow-end ] || last ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/hanging-punctuation)
     */
    hangingPunctuation: WideEntry;
    /**
     * A hyphenate character used at the end of a line.
     *
     * (Edge 79, Firefox 98, Safari 5.1, Chrome 6, Opera 15)
     *
     * Syntax: auto | \<string>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/hyphenate-character)
     */
    hyphenateCharacter: StringEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The image-resolution property specifies the intrinsic resolution of all raster images used in or on the element. It affects both content images (e.g. replaced elements and generated content) and decorative images (such as background-image). The intrinsic resolution of an image is used to determine the image’s intrinsic dimensions.
     *
     * Syntax: [ from-image || \<resolution> ] && snap?
     */
    imageResolution: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The initial-letter CSS property specifies styling for dropped, raised, and sunken initial letters.
     *
     * (Safari 9)
     *
     * Syntax: normal | [ \<number> \<integer>? ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/initial-letter)
     */
    initialLetter: {
        [value: number]: StyleObject;
    } & IntegerEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The initial-letter-align CSS property specifies the alignment of initial letters within a paragraph.
     *
     * Syntax: [ auto | alphabetic | hanging | ideographic ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/initial-letter-align)
     */
    initialLetterAlign: WideEntry;
    /**
     * Enables or disables the obscuring a sensitive test input.
     *
     * Syntax: auto | none
     */
    inputSecurity: WideEntry;
    /**
     * The inset CSS property defines the logical block and inline start and end offsets of an element, which map to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the top and bottom, or right and left properties depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'top'>\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/inset)
     */
    inset: LengthEntry & PercentEntry & WideEntry;
    /**
     * The inset-block CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the top and bottom, or right and left properties depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 63, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'top'>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/inset-block)
     */
    insetBlock: WideEntry;
    /**
     * The inset-block-end CSS property defines the logical block end offset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 63, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'top'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/inset-block-end)
     */
    insetBlockEnd: WideEntry;
    /**
     * The inset-block-start CSS property defines the logical block start offset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 63, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'top'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/inset-block-start)
     */
    insetBlockStart: WideEntry;
    /**
     * The inset-inline CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the top and bottom, or right and left properties depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 63, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'top'>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/inset-inline)
     */
    insetInline: WideEntry;
    /**
     * The inset-inline-end CSS property defines the logical inline end inset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 63, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'top'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/inset-inline-end)
     */
    insetInlineEnd: WideEntry;
    /**
     * The inset-inline-start CSS property defines the logical inline start inset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * (Edge 87, Firefox 63, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'top'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/inset-inline-start)
     */
    insetInlineStart: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The justify-tracks CSS property sets the alignment in the masonry axis for grid containers that have masonry in their inline axis
     *
     * (Firefox 77)
     *
     * Syntax: [ normal | \<content-distribution> | \<overflow-position>? [ \<content-position> | left | right ] ]#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/justify-tracks)
     */
    justifyTracks: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The line-clamp property allows limiting the contents of a block container to the specified number of lines; remaining content is fragmented away and neither rendered nor measured. Optionally, it also allows inserting content into the last line box to indicate the continuity of truncated/interrupted content.
     *
     * Syntax: none | \<integer>
     */
    lineClamp: IntegerEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The line-height-step CSS property defines the step units for line box heights. When the step unit is positive, line box heights are rounded up to the closest multiple of the unit. Negative values are invalid.
     *
     * (Edge 79, Chrome 60, Opera 47)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/line-height-step)
     */
    lineHeightStep: LengthEntry & WideEntry;
    /**
     * The margin-block CSS property defines the logical block start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'margin-left'>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-block)
     */
    marginBlock: WideEntry;
    /**
     * The margin-inline CSS property defines the logical inline start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'margin-left'>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-inline)
     */
    marginInline: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The margin-trim property allows the container to trim the margins of its children where they adjoin the container’s edges.
     *
     * Syntax: none | in-flow | all
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-trim)
     */
    marginTrim: WideEntry;
    /**
     * The mask CSS property alters the visibility of an element by either partially or fully hiding it. This is accomplished by either masking or clipping the image at specific points.
     *
     * (Edge 79, Firefox 2, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: \<mask-layer>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask)
     */
    mask: WideEntry;
    /**
     * The mask-border CSS property lets you create a mask along the edge of an element's border.
     *
     * This property is a shorthand for mask-border-source, mask-border-slice, mask-border-width, mask-border-outset, mask-border-repeat, and mask-border-mode. As with all shorthand properties, any omitted sub-values will be set to their initial value.
     *
     * (Edge 79, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: \<'mask-border-source'> || \<'mask-border-slice'> [ / \<'mask-border-width'>? [ / \<'mask-border-outset'> ]? ]? || \<'mask-border-repeat'> || \<'mask-border-mode'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-border)
     */
    maskBorder: WideEntry;
    /**
     * The mask-border-mode CSS property specifies the blending mode used in a mask border.
     *
     * Syntax: luminance | alpha
     */
    maskBorderMode: WideEntry;
    /**
     * The mask-border-outset CSS property specifies the distance by which an element's mask border is set out from its border box.
     *
     * (Edge 79, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: [ \<length> | \<number> ]\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-border-outset)
     */
    maskBorderOutset: LengthEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * The mask-border-repeat CSS property defines how the edge regions of a source image are adjusted to fit the dimensions of an element's mask border.
     *
     * (Edge 79, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: [ stretch | repeat | round | space ]\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-border-repeat)
     */
    maskBorderRepeat: WideEntry;
    /**
     * The mask-border-slice CSS property divides the image specified by mask-border-source into regions. These regions are used to form the components of an element's mask border.
     *
     * (Edge 79, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: \<number-percentage>\{1,4\} fill?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-border-slice)
     */
    maskBorderSlice: WideEntry;
    /**
     * The mask-border-source CSS property specifies the source image used to create an element's mask border.
     *
     * The mask-border-slice property is used to divide the source image into regions, which are then dynamically applied to the final mask border.
     *
     * (Edge 79, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: none | \<image>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-border-source)
     */
    maskBorderSource: ImageFunctions & WideEntry;
    /**
     * The mask-border-width CSS property specifies the width of an element's mask border.
     *
     * (Edge 79, Safari 3.1, Chrome 1, Opera 15)
     *
     * Syntax: [ \<length-percentage> | \<number> | auto ]\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-border-width)
     */
    maskBorderWidth: {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * The mask-clip CSS property determines the area, which is affected by a mask. The painted content of an element must be restricted to this area.
     *
     * (Edge 79, Firefox 53, Safari 15.4, Chrome 1, Opera 15)
     *
     * Syntax: [ \<geometry-box> | no-clip ]#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-clip)
     */
    maskClip: GeometryBoxEntry & WideEntry;
    /**
     * The mask-composite CSS property represents a compositing operation used on the current mask layer with the mask layers below it.
     *
     * (Edge 18, Firefox 53, Safari 15.4)
     *
     * Syntax: \<compositing-operator>#
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/mask-composite)
     */
    maskComposite: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The masonry-auto-flow CSS property modifies how items are placed when using masonry in CSS Grid Layout.
     *
     * Syntax: [ pack | next ] || [ definite-first | ordered ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/masonry-auto-flow)
     */
    masonryAutoFlow: WideEntry;
    /**
     * The math-style property indicates whether MathML equations should render with normal or compact height.
     *
     * (Firefox 83, Safari 14.1, Chrome 83)
     *
     * Syntax: normal | compact
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/math-style)
     */
    mathStyle: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The max-lines property forces a break after a set number of lines
     *
     * Syntax: none | \<integer>
     */
    maxLines: IntegerEntry & WideEntry;
    /**
     * The offset CSS property is a shorthand property for animating an element along a defined path.
     *
     * (Edge 79, Firefox 72, Chrome 55, Opera 42)
     *
     * Syntax: [ \<'offset-position'>? [ \<'offset-path'> [ \<'offset-distance'> || \<'offset-rotate'> ]? ]? ]! [ / \<'offset-anchor'> ]?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/offset)
     */
    offset: WideEntry;
    /**
     * Defines an anchor point of the box positioned along the path. The anchor point specifies the point of the box which is to be considered as the point that is moved along the path.
     *
     * (Firefox 72)
     *
     * Syntax: auto | \<position>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/offset-anchor)
     */
    offsetAnchor: PositionEntry & WideEntry;
    /**
     * The offset-distance CSS property specifies a position along an offset-path.
     *
     * (Edge 79, Firefox 72, Chrome 55, Opera 42)
     *
     * Syntax: \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/offset-distance)
     */
    offsetDistance: WideEntry;
    /**
     * The offset-path CSS property specifies the offset path where the element gets positioned. The exact element’s position on the offset path is determined by the offset-distance property. An offset path is either a specified path with one or multiple sub-paths or the geometry of a not-styled basic shape. Each shape or path must define an initial position for the computed value of "0" for offset-distance and an initial direction which specifies the rotation of the object to the initial position.
     *
     * In this specification, a direction (or rotation) of 0 degrees is equivalent to the direction of the positive x-axis in the object’s local coordinate system. In other words, a rotation of 0 degree points to the right side of the UA if the object and its ancestors have no transformation applied.
     *
     * (Edge 79, Firefox 72, Chrome 55, Opera 45)
     *
     * Syntax: none | ray( [ \<angle> && \<size> && contain? ] ) | \<path()> | \<url> | [ \<basic-shape> || \<geometry-box> ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/offset-path)
     */
    offsetPath: URLEntry & AngleEntry & GeometryBoxEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Specifies the initial position of the offset path. If position is specified with static, offset-position would be ignored.
     *
     * Syntax: auto | \<position>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/offset-position)
     */
    offsetPosition: PositionEntry & WideEntry;
    /**
     * The offset-rotate CSS property defines the direction of the element while positioning along the offset path.
     *
     * (Edge 79, Firefox 72, Chrome 56, Opera 43)
     *
     * Syntax: [ auto | reverse ] || \<angle>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/offset-rotate)
     */
    offsetRotate: AngleEntry & WideEntry;
    /**
     * The overflow-anchor CSS property provides a way to opt out browser scroll anchoring behavior which adjusts scroll position to minimize content shifts.
     *
     * (Edge 79, Firefox 66, Chrome 56, Opera 43)
     *
     * Syntax: auto | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overflow-anchor)
     */
    overflowAnchor: WideEntry;
    /**
     * The overflow-block CSS media feature can be used to test how the output device handles content that overflows the initial containing block along the block axis.
     *
     * (Firefox 69)
     *
     * Syntax: visible | hidden | clip | scroll | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overflow-block)
     */
    overflowBlock: WideEntry;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The overflow-clip-box CSS property specifies relative to which box the clipping happens when there is an overflow. It is short hand for the overflow-clip-box-inline and overflow-clip-box-block properties.
     *
     * (Firefox 29)
     *
     * Syntax: padding-box | content-box
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Mozilla/Gecko/Chrome/CSS/overflow-clip-box)
     */
    overflowClipBox: WideEntry;
    /**
     * The overflow-clip-margin CSS property determines how far outside its bounds an element with overflow: clip may be painted before being clipped.
     *
     * (Edge 90, Chrome 90, Opera 76)
     *
     * Syntax: \<visual-box> || \<length [0,∞]>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overflow-clip-margin)
     */
    overflowClipMargin: WideEntry;
    /**
     * The overflow-inline CSS media feature can be used to test how the output device handles content that overflows the initial containing block along the inline axis.
     *
     * (Firefox 69)
     *
     * Syntax: visible | hidden | clip | scroll | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overflow-inline)
     */
    overflowInline: WideEntry;
    /**
     * The overscroll-behavior CSS property is shorthand for the overscroll-behavior-x and overscroll-behavior-y properties, which allow you to control the browser's scroll overflow behavior — what happens when the boundary of a scrolling area is reached.
     *
     * (Edge 18, Firefox 59, Chrome 63, Opera 50)
     *
     * Syntax: [ contain | none | auto ]\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior)
     */
    overscrollBehavior: WideEntry;
    /**
     * The overscroll-behavior-block CSS property sets the browser's behavior when the block direction boundary of a scrolling area is reached.
     *
     * (Edge 79, Firefox 73, Chrome 77, Opera 64)
     *
     * Syntax: contain | none | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-block)
     */
    overscrollBehaviorBlock: WideEntry;
    /**
     * The overscroll-behavior-inline CSS property sets the browser's behavior when the inline direction boundary of a scrolling area is reached.
     *
     * (Edge 79, Firefox 73, Chrome 77, Opera 64)
     *
     * Syntax: contain | none | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-inline)
     */
    overscrollBehaviorInline: WideEntry;
    /**
     * The overscroll-behavior-x CSS property is allows you to control the browser's scroll overflow behavior — what happens when the boundary of a scrolling area is reached — in the x axis direction.
     *
     * (Edge 18, Firefox 59, Chrome 63, Opera 50)
     *
     * Syntax: contain | none | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-x)
     */
    overscrollBehaviorX: WideEntry;
    /**
     * The overscroll-behavior-y CSS property is allows you to control the browser's scroll overflow behavior — what happens when the boundary of a scrolling area is reached — in the y axis direction.
     *
     * (Edge 18, Firefox 59, Chrome 63, Opera 50)
     *
     * Syntax: contain | none | auto
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-y)
     */
    overscrollBehaviorY: WideEntry;
    /**
     * The padding-block CSS property defines the logical block start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'padding-left'>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-block)
     */
    paddingBlock: WideEntry;
    /**
     * The padding-inline CSS property defines the logical inline start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.
     *
     * (Edge 87, Firefox 66, Safari 14.1, Chrome 87, Opera 73)
     *
     * Syntax: \<'padding-left'>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-inline)
     */
    paddingInline: WideEntry;
    /**
     * The place-content CSS shorthand property sets both the align-content and justify-content properties.
     *
     * (Edge 79, Firefox 45, Safari 9, Chrome 59, Opera 46)
     *
     * Syntax: \<'align-content'> \<'justify-content'>?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/place-content)
     */
    placeContent: WideEntry;
    /**
     * The CSS place-items shorthand property sets both the align-items and justify-items properties. The first value is the align-items property value, the second the justify-items one. If the second value is not present, the first value is also used for it.
     *
     * (Edge 79, Firefox 45, Safari 11, Chrome 59, Opera 46)
     *
     * Syntax: \<'align-items'> \<'justify-items'>?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/place-items)
     */
    placeItems: WideEntry;
    /**
     * The place-self CSS property is a shorthand property sets both the align-self and justify-self properties. The first value is the align-self property value, the second the justify-self one. If the second value is not present, the first value is also used for it.
     *
     * (Edge 79, Firefox 45, Safari 11, Chrome 59, Opera 46)
     *
     * Syntax: \<'align-self'> \<'justify-self'>?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/place-self)
     */
    placeSelf: WideEntry;
    /**
     * The rotate CSS property allows you to specify rotation transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value.
     *
     * (Firefox 72, Safari 14.1)
     *
     * Syntax: none | \<angle> | [ x | y | z | \<number>\{3\} ] && \<angle>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/rotate)
     */
    rotate: AngleEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * The row-gap CSS property specifies the gutter between grid rows.
     *
     * (Edge 84, Firefox 63, Safari 14.1, Chrome 84, Opera 70)
     *
     * Syntax: normal | \<length-percentage>
     */
    rowGap: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * This property controls how ruby annotation boxes should be rendered when there are more than one in a ruby container box: whether each pair should be kept separate, the annotations should be collapsed and rendered as a group, or the separation should be determined based on the space available.
     *
     * Syntax: separate | collapse | auto
     */
    rubyMerge: WideEntry;
    /**
     * The scale CSS property allows you to specify scale transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value.
     *
     * (Firefox 72, Safari 14.1)
     *
     * Syntax: none | \<number>\{1,3\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scale)
     */
    scale: {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * The scrollbar-color CSS property sets the color of the scrollbar track and thumb.
     *
     * (Firefox 64)
     *
     * Syntax: auto | \<color>\{2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-color)
     */
    scrollbarColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * The scrollbar-gutter CSS property allows authors to reserve space for the scrollbar, preventing unwanted layout changes as the content grows while also avoiding unnecessary visuals when scrolling isn't needed.
     *
     * (Edge 94, Firefox 97, Chrome 94, Opera 80)
     *
     * Syntax: auto | stable && both-edges?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-gutter)
     */
    scrollbarGutter: WideEntry;
    /**
     * The scrollbar-width property allows the author to set the maximum thickness of an element’s scrollbars when they are shown.
     *
     * (Firefox 64)
     *
     * Syntax: auto | thin | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scrollbar-width)
     */
    scrollbarWidth: WideEntry;
    /**
     * The scroll-margin property is a shorthand property which sets all of the scroll-margin longhands, assigning values much like the margin property does for the margin-* longhands.
     *
     * (Edge 79, Firefox 90, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin)
     */
    scrollMargin: LengthEntry & WideEntry;
    /**
     * The scroll-margin-block property is a shorthand property which sets the scroll-margin longhands in the block dimension.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block)
     */
    scrollMarginBlock: LengthEntry & WideEntry;
    /**
     * The scroll-margin-block-start property defines the margin of the scroll snap area at the start of the block dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-start)
     */
    scrollMarginBlockStart: LengthEntry & WideEntry;
    /**
     * The scroll-margin-block-end property defines the margin of the scroll snap area at the end of the block dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-end)
     */
    scrollMarginBlockEnd: LengthEntry & WideEntry;
    /**
     * The scroll-margin-bottom property defines the bottom margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-bottom)
     */
    scrollMarginBottom: LengthEntry & WideEntry;
    /**
     * The scroll-margin-inline property is a shorthand property which sets the scroll-margin longhands in the inline dimension.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline)
     */
    scrollMarginInline: LengthEntry & WideEntry;
    /**
     * The scroll-margin-inline-start property defines the margin of the scroll snap area at the start of the inline dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-start)
     */
    scrollMarginInlineStart: LengthEntry & WideEntry;
    /**
     * The scroll-margin-inline-end property defines the margin of the scroll snap area at the end of the inline dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-end)
     */
    scrollMarginInlineEnd: LengthEntry & WideEntry;
    /**
     * The scroll-margin-left property defines the left margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-left)
     */
    scrollMarginLeft: LengthEntry & WideEntry;
    /**
     * The scroll-margin-right property defines the right margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-right)
     */
    scrollMarginRight: LengthEntry & WideEntry;
    /**
     * The scroll-margin-top property defines the top margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: \<length>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-margin-top)
     */
    scrollMarginTop: LengthEntry & WideEntry;
    /**
     * The scroll-padding property is a shorthand property which sets all of the scroll-padding longhands, assigning values much like the padding property does for the padding-* longhands.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: [ auto | \<length-percentage> ]\{1,4\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding)
     */
    scrollPadding: WideEntry;
    /**
     * The scroll-padding-block property is a shorthand property which sets the scroll-padding longhands for the block dimension.
     *
     * (Edge 79, Firefox 68, Safari 15, Chrome 69, Opera 56)
     *
     * Syntax: [ auto | \<length-percentage> ]\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block)
     */
    scrollPaddingBlock: WideEntry;
    /**
     * The scroll-padding-block-start property defines offsets for the start edge in the block dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.
     *
     * (Edge 79, Firefox 68, Safari 15, Chrome 69, Opera 56)
     *
     * Syntax: auto | \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-start)
     */
    scrollPaddingBlockStart: WideEntry;
    /**
     * The scroll-padding-block-end property defines offsets for the end edge in the block dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.
     *
     * (Edge 79, Firefox 68, Safari 15, Chrome 69, Opera 56)
     *
     * Syntax: auto | \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-end)
     */
    scrollPaddingBlockEnd: WideEntry;
    /**
     * The scroll-padding-bottom property defines offsets for the bottom of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: auto | \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-bottom)
     */
    scrollPaddingBottom: WideEntry;
    /**
     * The scroll-padding-inline property is a shorthand property which sets the scroll-padding longhands for the inline dimension.
     *
     * (Edge 79, Firefox 68, Safari 15, Chrome 69, Opera 56)
     *
     * Syntax: [ auto | \<length-percentage> ]\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline)
     */
    scrollPaddingInline: WideEntry;
    /**
     * The scroll-padding-inline-start property defines offsets for the start edge in the inline dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.
     *
     * (Edge 79, Firefox 68, Safari 15, Chrome 69, Opera 56)
     *
     * Syntax: auto | \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-start)
     */
    scrollPaddingInlineStart: WideEntry;
    /**
     * The scroll-padding-inline-end property defines offsets for the end edge in the inline dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.
     *
     * (Edge 79, Firefox 68, Safari 15, Chrome 69, Opera 56)
     *
     * Syntax: auto | \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-end)
     */
    scrollPaddingInlineEnd: WideEntry;
    /**
     * The scroll-padding-left property defines offsets for the left of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: auto | \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-left)
     */
    scrollPaddingLeft: WideEntry;
    /**
     * The scroll-padding-right property defines offsets for the right of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: auto | \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-right)
     */
    scrollPaddingRight: WideEntry;
    /**
     * The scroll-padding-top property defines offsets for the top of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.
     *
     * (Edge 79, Firefox 68, Safari 14.1, Chrome 69, Opera 56)
     *
     * Syntax: auto | \<length-percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-padding-top)
     */
    scrollPaddingTop: WideEntry;
    /**
     * The scroll-snap-align property specifies the box’s snap position as an alignment of its snap area (as the alignment subject) within its snap container’s snapport (as the alignment container). The two values specify the snapping alignment in the block axis and inline axis, respectively. If only one value is specified, the second value defaults to the same value.
     *
     * (Edge 79, Firefox 68, Safari 11, Chrome 69, Opera 56)
     *
     * Syntax: [ none | start | end | center ]\{1,2\}
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-snap-align)
     */
    scrollSnapAlign: WideEntry;
    /**
     * The scroll-snap-stop CSS property defines whether the scroll container is allowed to "pass over" possible snap positions.
     *
     * (Edge 79, Safari 15, Chrome 75, Opera 62)
     *
     * Syntax: normal | always
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-snap-stop)
     */
    scrollSnapStop: WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * The scroll-snap-type-x CSS property defines how strictly snap points are enforced on the horizontal axis of the scroll container in case there is one.
     *
     * Specifying any precise animations or physics used to enforce those snap points is not covered by this property but instead left up to the user agent.
     *
     * (Firefox 39, Safari 9)
     *
     * Syntax: none | mandatory | proximity
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-x)
     */
    scrollSnapTypeX: WideEntry;
    /**
     * 🚨️️️ Property is obsolete. Avoid using it.
     *
     * The scroll-snap-type-y CSS property defines how strictly snap points are enforced on the vertical axis of the scroll container in case there is one.
     *
     * Specifying any precise animations or physics used to enforce those snap points is not covered by this property but instead left up to the user agent.
     *
     * (Firefox 39)
     *
     * Syntax: none | mandatory | proximity
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-y)
     */
    scrollSnapTypeY: WideEntry;
    /**
     * The text-combine-upright CSS property specifies the combination of multiple characters into the space of a single character. If the combined text is wider than 1em, the user agent must fit the contents within 1em. The resulting composition is treated as a single upright glyph for layout and decoration. This property only has an effect in vertical writing modes.
     *
     * This is used to produce an effect that is known as tate-chū-yoko (縦中横) in Japanese, or as 直書橫向 in Chinese.
     *
     * Syntax: none | all | [ digits \<integer>? ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-combine-upright)
     */
    textCombineUpright: IntegerEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The text-decoration-skip CSS property specifies what parts of the element’s content any text decoration affecting the element must skip over. It controls all text decoration lines drawn by the element and also any text decoration lines drawn by its ancestors.
     *
     * (Safari 12.1, Chrome 57, Opera 44)
     *
     * Syntax: none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip)
     */
    textDecorationSkip: WideEntry;
    /**
     * The text-decoration-skip-ink CSS property specifies how overlines and underlines are drawn when they pass over glyph ascenders and descenders.
     *
     * (Edge 79, Firefox 70, Safari 15.4, Chrome 64, Opera 50)
     *
     * Syntax: auto | all | none
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip-ink)
     */
    textDecorationSkipInk: WideEntry;
    /**
     * The text-decoration-thickness CSS property sets the thickness, or width, of the decoration line that is used on text in an element, such as a line-through, underline, or overline.
     *
     * (Edge 89, Firefox 70, Safari 12.1, Chrome 89, Opera 75)
     *
     * Syntax: auto | from-font | \<length> | \<percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-thickness)
     */
    textDecorationThickness: LengthEntry & PercentEntry & WideEntry;
    /**
     * The text-emphasis CSS property is a shorthand property for setting text-emphasis-style and text-emphasis-color in one declaration. This property will apply the specified emphasis mark to each character of the element's text, except separator characters, like spaces,  and control characters.
     *
     * (Edge 99, Firefox 46, Safari 7, Chrome 99, Opera 15)
     *
     * Syntax: \<'text-emphasis-style'> || \<'text-emphasis-color'>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-emphasis)
     */
    textEmphasis: WideEntry;
    /**
     * The text-emphasis-color CSS property defines the color used to draw emphasis marks on text being rendered in the HTML document. This value can also be set and reset using the text-emphasis shorthand.
     *
     * (Edge 99, Firefox 46, Safari 7, Chrome 99, Opera 15)
     *
     * Syntax: \<color>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-emphasis-color)
     */
    textEmphasisColor: ColorEntry & ColorFunctions & WideEntry;
    /**
     * The text-emphasis-position CSS property describes where emphasis marks are drawn at. The effect of emphasis marks on the line height is the same as for ruby text: if there isn't enough place, the line height is increased.
     *
     * (Edge 99, Firefox 46, Safari 7, Chrome 99, Opera 15)
     *
     * Syntax: [ over | under ] && [ right | left ]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-emphasis-position)
     */
    textEmphasisPosition: WideEntry;
    /**
     * The text-emphasis-style CSS property defines the type of emphasis used. It can also be set, and reset, using the text-emphasis shorthand.
     *
     * (Edge 99, Firefox 46, Safari 7, Chrome 99, Opera 15)
     *
     * Syntax: none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | \<string>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-emphasis-style)
     */
    textEmphasisStyle: StringEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The text-size-adjust CSS property controls the text inflation algorithm used on some smartphones and tablets. Other browsers will ignore this property.
     *
     * (Edge 79, Chrome 54, Opera 41)
     *
     * Syntax: none | auto | \<percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-size-adjust)
     */
    textSizeAdjust: PercentEntry & WideEntry;
    /**
     * The text-underline-offset CSS property sets the offset distance of an underline text decoration line (applied using text-decoration) from its original position.
     *
     * (Edge 87, Firefox 70, Safari 12.1, Chrome 87, Opera 73)
     *
     * Syntax: auto | \<length> | \<percentage>
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-underline-offset)
     */
    textUnderlineOffset: LengthEntry & PercentEntry & WideEntry;
    /**
     * The transform-box CSS property defines the layout box to which the transform and transform-origin properties relate.
     *
     * (Edge 79, Firefox 55, Safari 11, Chrome 64, Opera 51)
     *
     * Syntax: content-box | border-box | fill-box | stroke-box | view-box
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transform-box)
     */
    transformBox: WideEntry;
    /**
     * The translate CSS property allows you to specify translation transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value.
     *
     * (Firefox 72, Safari 14.1)
     *
     * Syntax: none | \<length-percentage> [ \<length-percentage> \<length>? ]?
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/translate)
     */
    translate: LengthEntry & WideEntry;
    /**
     * Specifies how whitespace is handled in an element.
     *
     * Syntax: normal | pre | nowrap | pre-wrap | pre-line | break-spaces
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/white-space)
     */
    whiteSpace: WideEntry;
    /**
     * The speak-as descriptor specifies how a counter symbol constructed with a given \@counter-style will be represented in the spoken form. For example, an author can specify a counter symbol to be either spoken as its numerical value or just represented with an audio cue.
     *
     * Syntax: auto | bullets | numbers | words | spell-out | \<counter-style-name>
     */
    speakAs: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Describes the ascent metric of a font.
     *
     * Syntax: normal | \<percentage>
     */
    ascentOverride: PercentEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Describes the descent metric of a font.
     *
     * Syntax: normal | \<percentage>
     */
    descentOverride: PercentEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use.
     *
     * Syntax: [ auto | block | swap | fallback | optional ]
     */
    fontDisplay: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Describes the line-gap metric of a font.
     *
     * Syntax: normal | \<percentage>
     */
    lineGapOverride: PercentEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * A multiplier for glyph outlines and metrics of a font.
     *
     * Syntax: \<percentage>
     */
    sizeAdjust: PercentEntry & WideEntry;
    /**
     * The bleed CSS at-rule descriptor, used with the \@page at-rule, specifies the extent of the page bleed area outside the page box. This property only has effect if crop marks are enabled using the marks property.
     *
     * Syntax: auto | \<length>
     */
    bleed: LengthEntry & WideEntry;
    /**
     * The marks CSS at-rule descriptor, used with the \@page at-rule, adds crop and/or cross marks to the presentation of the document. Crop marks indicate where the page should be cut. Cross marks are used to align sheets.
     *
     * Syntax: none | [ crop || cross ]
     */
    marks: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Specifies the syntax of the custom property registration represented by the \@property rule, controlling how the property’s value is parsed at computed value time.
     *
     * Syntax: \<string>
     */
    syntax: StringEntry & WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Specifies the inherit flag of the custom property registration represented by the \@property rule, controlling whether or not the property inherits by default.
     *
     * Syntax: true | false
     */
    inherits: WideEntry;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * Specifies the initial value of the custom property registration represented by the \@property rule, controlling the property’s initial value.
     *
     * Syntax: \<string>
     */
    initialValue: StringEntry & WideEntry;
    /**
     * The max-zoom CSS descriptor sets the maximum zoom factor of a document defined by the \@viewport at-rule. The browser will not zoom in any further than this, whether automatically or at the user's request.
     *
     * A zoom factor of 1.0 or 100% corresponds to no zooming. Larger values are zoomed in. Smaller values are zoomed out.
     *
     * Syntax: auto | \<number> | \<percentage>
     */
    maxZoom: PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * The min-zoom CSS descriptor sets the minimum zoom factor of a document defined by the \@viewport at-rule. The browser will not zoom out any further than this, whether automatically or at the user's request.
     *
     * A zoom factor of 1.0 or 100% corresponds to no zooming. Larger values are zoomed in. Smaller values are zoomed out.
     *
     * Syntax: auto | \<number> | \<percentage>
     */
    minZoom: PercentEntry & {
        [value: number]: StyleObject;
    } & WideEntry;
    /**
     * The orientation CSS \@media media feature can be used to apply styles based on the orientation of the viewport (or the page box, for paged media).
     *
     * Syntax: auto | portrait | landscape
     */
    orientation: WideEntry;
    /**
     * The user-zoom CSS descriptor controls whether or not the user can change the zoom factor of a document defined by \@viewport.
     *
     * Syntax: zoom | fixed
     */
    userZoom: WideEntry;
    /**
     * The border-block-style CSS property defines the style of the logical block borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation.
     *
     * Syntax: auto | contain | cover
     */
    viewportFit: WideEntry;
}
export interface CSSAtRules<T> {
    /**
     * Defines character set of the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@charset)
     */
    "@charset": T;
    /**
     * Defines a custom counter style.
     *
     * (Edge 91, Firefox 33, Chrome 91, Opera 77)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@counter-style)
     */
    "@counter-style": T;
    /**
     * Allows for linking to fonts that are automatically activated when needed. This permits authors to work around the limitation of 'web-safe' fonts, allowing for consistent rendering independent of the fonts available in a given user's environment.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@font-face)
     */
    "@font-face": T;
    /**
     * Defines named values for the indices used to select alternate glyphs for a given font family.
     *
     * (Firefox 34, Safari 9.1)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@font-feature-values)
     */
    "@font-feature-values": T;
    /**
     * Includes content of another file.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@import)
     */
    "@import": T;
    /**
     * Defines set of animation key frames.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@keyframes)
     */
    "@keyframes": T;
    /**
     * Defines a stylesheet for a particular media type.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@media)
     */
    "@media": T;
    /**
     * Gecko-specific at-rule that restricts the style rules contained within it based on the URL of the document.
     *
     * (Firefox 1.8)
     */
    "@-moz-document": T;
    /**
     * Defines set of animation key frames.
     *
     * (Firefox 5)
     */
    "@-moz-keyframes": T;
    /**
     * Specifies the size, zoom factor, and orientation of the viewport.
     *
     * (Edge, IE 10)
     */
    "@-ms-viewport": T;
    /**
     * Declares a prefix and associates it with a namespace name.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@namespace)
     */
    "@namespace": T;
    /**
     * Defines set of animation key frames.
     *
     * (Opera 12)
     */
    "@-o-keyframes": T;
    /**
     * Specifies the size, zoom factor, and orientation of the viewport.
     *
     * (Opera 11)
     */
    "@-o-viewport": T;
    /**
     * Directive defines various page parameters.
     *
     * (Edge 12, Firefox 19, Chrome 2, IE 8, Opera 6)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@page)
     */
    "@page": T;
    /**
     * A conditional group rule whose condition tests whether the user agent supports CSS property:value pairs.
     *
     * (Edge 12, Firefox 22, Safari 9, Chrome 28, Opera 12.1)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@supports)
     */
    "@supports": T;
    /**
     * Defines set of animation key frames.
     *
     * (Chrome, Safari 4)
     */
    "@-webkit-keyframes": T;
}
export interface CSSClasses<T> {
    /**
     * Applies while an element is being activated by the user. For example, between the times the user presses the mouse button and releases it.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:active)
     */
    "&:active": T;
    /**
     * Represents an element that acts as the source anchor of a hyperlink. Applies to both visited and unvisited links.
     *
     * (Edge 79, Firefox 50, Safari 9, Chrome 65, Opera 52)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:any-link)
     */
    "&:any-link": T;
    /**
     * Radio and checkbox elements can be toggled by the user. Some menu items are 'checked' when the user selects them. When such elements are toggled 'on' the :checked pseudo-class applies.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:checked)
     */
    "&:checked": T;
    /**
     * Non-standard. Indicates whether or not a scrollbar corner is present.
     *
     * (Chrome, Safari 5)
     */
    "&:corner-present": T;
    /**
     * Non-standard. Applies to buttons and track pieces. Indicates whether or not the button or track piece will decrement the view’s position when used.
     *
     * (Chrome, Safari 5)
     */
    "&:decrement": T;
    /**
     * Applies to the one or more UI elements that are the default among a set of similar elements. Typically applies to context menu items, buttons, and select lists/menus.
     *
     * (Edge 79, Firefox 4, Safari 5, Chrome 10, Opera 10)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:default)
     */
    "&:default": T;
    /**
     * Represents user interface elements that are in a disabled state; such elements have a corresponding enabled state.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:disabled)
     */
    "&:disabled": T;
    /**
     * Non-standard. Applies to buttons and track pieces. Applies when both buttons are displayed together at the same end of the scrollbar.
     *
     * (Chrome, Safari 5)
     */
    "&:double-button": T;
    /**
     * Represents an element that has no children at all.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:empty)
     */
    "&:empty": T;
    /**
     * Represents user interface elements that are in an enabled state; such elements have a corresponding disabled state.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:enabled)
     */
    "&:enabled": T;
    /**
     * Non-standard. Applies to buttons and track pieces. Indicates whether the object is placed after the thumb.
     *
     * (Chrome, Safari 5)
     */
    "&:end": T;
    /**
     * When printing double-sided documents, the page boxes on left and right pages may be different. This can be expressed through CSS pseudo-classes defined in the  page context.
     *
     * (Edge 12, Safari 6, Chrome 18, IE 8, Opera 9.2)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:first)
     */
    "&:first": T;
    /**
     * Same as :nth-child(1). Represents an element that is the first child of some other element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:first-child)
     */
    "&:first-child": T;
    /**
     * Same as :nth-of-type(1). Represents an element that is the first sibling of its type in the list of children of its parent element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:first-of-type)
     */
    "&:first-of-type": T;
    /**
     * Applies while an element has the focus (accepts keyboard or mouse events, or other forms of input).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:focus)
     */
    "&:focus": T;
    /**
     * Matches any element that has its fullscreen flag set.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:fullscreen)
     */
    "&:fullscreen": T;
    /**
     * Represents any element that is defined to occur entirely after a :current element.
     *
     * (Safari 7)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:future)
     */
    "&:future": T;
    /**
     * Non-standard. Applies to any scrollbar pieces that have a horizontal orientation.
     *
     * (Chrome, Safari 5)
     */
    "&:horizontal": T;
    /**
     * When evaluated in the context of a shadow tree, matches the shadow tree’s host element.
     *
     * (Edge 79, Firefox 63, Safari 10, Chrome 54, Opera 41)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:host)
     */
    "&:host": T;
    /**
     * When evaluated in the context of a shadow tree, it matches the shadow tree’s host element if the host element, in its normal context, matches the selector argument.
     *
     * (Chrome 35, Opera 22)
     */
    "&:host()": T;
    /**
     * Tests whether there is an ancestor, outside the shadow tree, which matches a particular selector.
     *
     * (Chrome 35, Opera 22)
     */
    "&:host-context()": T;
    /**
     * Applies while the user designates an element with a pointing device, but does not necessarily activate it. For example, a visual user agent could apply this pseudo-class when the cursor (mouse pointer) hovers over a box generated by the element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:hover)
     */
    "&:hover": T;
    /**
     * Non-standard. Applies to buttons and track pieces. Indicates whether or not the button or track piece will increment the view’s position when used.
     *
     * (Chrome, Safari 5)
     */
    "&:increment": T;
    /**
     * Applies to UI elements whose value is in an indeterminate state.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:indeterminate)
     */
    "&:indeterminate": T;
    /**
     * Used in conjunction with the min and max attributes, whether on a range input, a number field, or any other types that accept those attributes.
     *
     * (Edge 13, Firefox 29, Safari 5.1, Chrome 10, Opera 11)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:in-range)
     */
    "&:in-range": T;
    /**
     * An element is :valid or :invalid when it is, respectively, valid or invalid with respect to data validity semantics defined by a different specification.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:invalid)
     */
    "&:invalid": T;
    /**
     * Represents an element that is in language specified.
     *
     * (Edge, Chrome, Firefox 1, IE 8, Opera 8, Safari 3)
     */
    "&:lang()": T;
    /**
     * Same as :nth-last-child(1). Represents an element that is the last child of some other element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:last-child)
     */
    "&:last-child": T;
    /**
     * Same as :nth-last-of-type(1). Represents an element that is the last sibling of its type in the list of children of its parent element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:last-of-type)
     */
    "&:last-of-type": T;
    /**
     * When printing double-sided documents, the page boxes on left and right pages may be different. This can be expressed through CSS pseudo-classes defined in the  page context.
     *
     * (Edge 12, Safari 5.1, Chrome 6, IE 8, Opera 9.2)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:left)
     */
    "&:left": T;
    /**
     * Applies to links that have not yet been visited.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:link)
     */
    "&:link": T;
    /**
     * Takes a selector list as its argument. It represents an element that is represented by its argument.
     *
     * (Safari 9)
     */
    "&:matches()": T;
    /**
     * Represents an element that is represented by the selector list passed as its argument. Standardized as :matches().
     *
     * (Firefox 4)
     */
    "&:-moz-any()": T;
    /**
     * Represents an element that acts as the source anchor of a hyperlink. Applies to both visited and unvisited links.
     *
     * (Firefox 1)
     */
    "&:-moz-any-link": T;
    /**
     * Non-standard. Matches elements representing broken images.
     *
     * (Firefox 3)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:-moz-broken)
     */
    "&:-moz-broken": T;
    /**
     * Non-standard. Matches elements when a drag-over event applies to it.
     *
     * (Firefox 1)
     */
    "&:-moz-drag-over": T;
    /**
     * Non-standard. Represents an element that is the first child node of some other element.
     *
     * (Firefox 1)
     */
    "&:-moz-first-node": T;
    /**
     * Non-standard. Matches an element that has focus and focus ring drawing is enabled in the browser.
     *
     * (Firefox 4)
     */
    "&:-moz-focusring": T;
    /**
     * Matches any element that has its fullscreen flag set. Standardized as :fullscreen.
     *
     * (Firefox 9)
     */
    "&:-moz-full-screen": T;
    /**
     * Non-standard. Represents an element that is the last child node of some other element.
     *
     * (Firefox 1)
     */
    "&:-moz-last-node": T;
    /**
     * Non-standard. Matches elements, such as images, that haven’t started loading yet.
     *
     * (Firefox 3)
     */
    "&:-moz-loading": T;
    /**
     * The same as :empty, except that it additionally matches elements that only contain code points affected by whitespace processing. Standardized as :blank.
     *
     * (Firefox 1)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:-moz-only-whitespace)
     */
    "&:-moz-only-whitespace": T;
    /**
     * Deprecated. Represents placeholder text in an input field. Use ::-moz-placeholder for Firefox 19+.
     *
     * (Firefox 4)
     */
    "&:-moz-placeholder": T;
    /**
     * Non-standard. Represents any submit button when the contents of the associated form are not valid.
     *
     * (Firefox 88)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:-moz-submit-invalid)
     */
    "&:-moz-submit-invalid": T;
    /**
     * Non-standard. Matches elements representing images that have been blocked from loading.
     *
     * (Firefox 3)
     */
    "&:-moz-suppressed": T;
    /**
     * Non-standard. Represents any validated form element whose value isn't valid
     *
     * (Firefox 4)
     */
    "&:-moz-ui-invalid": T;
    /**
     * Non-standard. Represents any validated form element whose value is valid
     *
     * (Firefox 4)
     */
    "&:-moz-ui-valid": T;
    /**
     * Non-standard. Matches elements representing images that have been disabled due to the user’s preferences.
     *
     * (Firefox 3)
     */
    "&:-moz-user-disabled": T;
    /**
     * Non-standard. Matches elements in an inactive window.
     *
     * (Firefox 4)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:-moz-window-inactive)
     */
    "&:-moz-window-inactive": T;
    /**
     * Matches any element that has its fullscreen flag set.
     *
     * (IE 11)
     */
    "&:-ms-fullscreen": T;
    /**
     * Represents placeholder text in an input field. Note: for Edge use the pseudo-element ::-ms-input-placeholder. Standardized as ::placeholder.
     *
     * (IE 10)
     */
    "&:-ms-input-placeholder": T;
    /**
     * Windows Store apps only. Applies one or more styles to an element when it has focus and the user presses the space bar.
     *
     * (IE 10)
     */
    "&:-ms-keyboard-active": T;
    /**
     * Represents an element that is in the language specified. Accepts a comma separated list of language tokens.
     *
     * (Edge, IE 10)
     */
    "&:-ms-lang()": T;
    /**
     * Non-standard. Applies to track pieces. Applies when there is no button at that end of the track.
     *
     * (Chrome, Safari 5)
     */
    "&:no-button": T;
    /**
     * The negation pseudo-class, :not(X), is a functional notation taking a simple selector (excluding the negation pseudo-class itself) as an argument. It represents an element that is not represented by its argument.
     *
     * (Edge, Chrome, Firefox 1, IE 9, Opera 9.5, Safari 2)
     */
    "&:not()": T;
    /**
     * Represents an element that has an+b-1 siblings before it in the document tree, for any positive integer or zero value of n, and has a parent element.
     *
     * (Edge, Chrome, Firefox 3.5, IE 9, Opera 9.5, Safari 3.1)
     */
    "&:nth-child()": T;
    /**
     * Represents an element that has an+b-1 siblings after it in the document tree, for any positive integer or zero value of n, and has a parent element.
     *
     * (Edge, Chrome, Firefox 3.5, IE 9, Opera 9.5, Safari 3.1)
     */
    "&:nth-last-child()": T;
    /**
     * Represents an element that has an+b-1 siblings with the same expanded element name after it in the document tree, for any zero or positive integer value of n, and has a parent element.
     *
     * (Edge, Chrome, Firefox 3.5, IE 9, Opera 9.5, Safari 3.1)
     */
    "&:nth-last-of-type()": T;
    /**
     * Represents an element that has an+b-1 siblings with the same expanded element name before it in the document tree, for any zero or positive integer value of n, and has a parent element.
     *
     * (Edge, Chrome, Firefox 3.5, IE 9, Opera 9.5, Safari 3.1)
     */
    "&:nth-of-type()": T;
    /**
     * Represents an element that has a parent element and whose parent element has no other element children. Same as :first-child:last-child or :nth-child(1):nth-last-child(1), but with a lower specificity.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:only-child)
     */
    "&:only-child": T;
    /**
     * Matches every element that is the only child of its type, of its parent. Same as :first-of-type:last-of-type or :nth-of-type(1):nth-last-of-type(1), but with a lower specificity.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:only-of-type)
     */
    "&:only-of-type": T;
    /**
     * A form element is :required or :optional if a value for it is, respectively, required or optional before the form it belongs to is submitted. Elements that are not form elements are neither required nor optional.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:optional)
     */
    "&:optional": T;
    /**
     * Used in conjunction with the min and max attributes, whether on a range input, a number field, or any other types that accept those attributes.
     *
     * (Edge 13, Firefox 29, Safari 5.1, Chrome 10, Opera 11)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:out-of-range)
     */
    "&:out-of-range": T;
    /**
     * Represents any element that is defined to occur entirely prior to a :current element.
     *
     * (Safari 7)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:past)
     */
    "&:past": T;
    /**
     * An element whose contents are not user-alterable is :read-only. However, elements whose contents are user-alterable (such as text input fields) are considered to be in a :read-write state. In typical documents, most elements are :read-only.
     *
     * (Edge 13, Firefox 78, Safari 4, Chrome 1, Opera 9)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:read-only)
     */
    "&:read-only": T;
    /**
     * An element whose contents are not user-alterable is :read-only. However, elements whose contents are user-alterable (such as text input fields) are considered to be in a :read-write state. In typical documents, most elements are :read-only.
     *
     * (Edge 13, Firefox 78, Safari 4, Chrome 1, Opera 9)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:read-write)
     */
    "&:read-write": T;
    /**
     * A form element is :required or :optional if a value for it is, respectively, required or optional before the form it belongs to is submitted. Elements that are not form elements are neither required nor optional.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:required)
     */
    "&:required": T;
    /**
     * When printing double-sided documents, the page boxes on left and right pages may be different. This can be expressed through CSS pseudo-classes defined in the  page context.
     *
     * (Edge 12, Safari 5.1, Chrome 6, IE 8, Opera 9.2)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:right)
     */
    "&:right": T;
    /**
     * Represents an element that is the root of the document. In HTML 4, this is always the HTML element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:root)
     */
    "&:root": T;
    /**
     * Represents any element that is in the contextual reference element set.
     *
     * (Edge 79, Firefox 32, Safari 7, Chrome 27, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:scope)
     */
    "&:scope": T;
    /**
     * Non-standard. Applies to buttons and track pieces. Applies when both buttons are displayed separately at either end of the scrollbar.
     *
     * (Chrome, Safari 5)
     */
    "&:single-button": T;
    /**
     * Non-standard. Applies to buttons and track pieces. Indicates whether the object is placed before the thumb.
     *
     * (Chrome, Safari 5)
     */
    "&:start": T;
    /**
     * Some URIs refer to a location within a resource. This kind of URI ends with a 'number sign' (#) followed by an anchor identifier (called the fragment identifier).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:target)
     */
    "&:target": T;
    /**
     * An element is :valid or :invalid when it is, respectively, valid or invalid with respect to data validity semantics defined by a different specification.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:valid)
     */
    "&:valid": T;
    /**
     * Non-standard. Applies to any scrollbar pieces that have a vertical orientation.
     *
     * (Chrome, Safari 5)
     */
    "&:vertical": T;
    /**
     * Applies once the link has been visited by the user.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:visited)
     */
    "&:visited": T;
    /**
     * Represents an element that is represented by the selector list passed as its argument. Standardized as :matches().
     *
     * (Chrome, Safari 5)
     */
    "&:-webkit-any()": T;
    /**
     * Matches any element that has its fullscreen flag set. Standardized as :fullscreen.
     *
     * (Chrome, Safari 6)
     */
    "&:-webkit-full-screen": T;
    /**
     * Non-standard. Applies to all scrollbar pieces. Indicates whether or not the window containing the scrollbar is currently active.
     *
     * (Chrome, Safari 3)
     */
    "&:window-inactive": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :current CSS pseudo-class selector is a time-dimensional pseudo-class that represents the element, or an ancestor of the element, that is currently being displayed
     */
    "&:current": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :blank CSS pseudo-class selects empty user input elements (eg. \<input> or \<textarea>).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:blank)
     */
    "&:blank": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :defined CSS pseudo-class represents any element that has been defined. This includes any standard element built in to the browser, and custom elements that have been successfully defined (i.e. with the CustomElementRegistry.define() method).
     *
     * (Edge 79, Firefox 63, Safari 10, Chrome 54, Opera 41)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:defined)
     */
    "&:defined": T;
    /**
     * The :dir() CSS pseudo-class matches elements based on the directionality of the text contained in them.
     *
     * (Firefox 49)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:dir)
     */
    "&:dir": T;
    /**
     * The :focus-visible pseudo-class applies while an element matches the :focus pseudo-class and the UA determines via heuristics that the focus should be made evident on the element.
     *
     * (Edge 86, Firefox 85, Safari 15.4, Chrome 86, Opera 72)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:focus-visible)
     */
    "&:focus-visible": T;
    /**
     * The :focus-within pseudo-class applies to any element for which the :focus pseudo class applies as well as to an element whose descendant in the flat tree (including non-element nodes, such as text nodes) matches the conditions for matching :focus.
     *
     * (Edge 79, Firefox 52, Safari 10.1, Chrome 60, Opera 47)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:focus-within)
     */
    "&:focus-within": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * :The :has() CSS pseudo-class represents an element if any of the selectors passed as parameters (relative to the :scope of the given element), match at least one element.
     *
     * (Safari 15.4)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:has)
     */
    "&:has": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :is() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list. This is useful for writing large selectors in a more compact form.
     *
     * (Edge 88, Firefox 78, Safari 14, Chrome 88, Opera 74)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:is)
     */
    "&:is": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :local-link CSS pseudo-class represents an link to the same document
     */
    "&:local-link": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :nth-col() CSS pseudo-class is designed for tables and grids. It accepts the An+B notation such as used with the :nth-child selector, using this to target every nth column.
     */
    "&:nth-col": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :nth-last-col() CSS pseudo-class is designed for tables and grids. It accepts the An+B notation such as used with the :nth-child selector, using this to target every nth column before it, therefore counting back from the end of the set of columns.
     */
    "&:nth-last-col": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :paused CSS pseudo-class selector is a resource state pseudo-class that will match an audio, video, or similar resource that is capable of being “played” or “paused”, when that element is “paused”.
     */
    "&:paused": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :placeholder-shown CSS pseudo-class represents any \<input> or \<textarea> element that is currently displaying placeholder text.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:placeholder-shown)
     */
    "&:placeholder-shown": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :playing CSS pseudo-class selector is a resource state pseudo-class that will match an audio, video, or similar resource that is capable of being “played” or “paused”, when that element is “playing”.
     */
    "&:playing": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :target-within CSS pseudo-class represents an element that is a target element or contains an element that is a target. A target element is a unique element with an id matching the URL's fragment.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:target-within)
     */
    "&:target-within": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :user-invalid CSS pseudo-class represents any validated form element whose value isn't valid based on their validation constraints, after the user has interacted with it.
     *
     * (Firefox 88)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:user-invalid)
     */
    "&:user-invalid": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :user-valid CSS pseudo-class represents any validated form element whose value validates correctly based on its validation constraints. However, unlike :valid it only matches once the user has interacted with it.
     *
     * (Firefox 88)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:user-valid)
     */
    "&:user-valid": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :where() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list.
     *
     * (Edge 88, Firefox 78, Safari 14, Chrome 88, Opera 74)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/:where)
     */
    "&:where": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The :picture-in-picture CSS pseudo-class matches the element which is currently in picture-in-picture mode.
     */
    "&:picture-in-picture": T;
}
export interface CSSElements<T> {
    /**
     * Represents a styleable child pseudo-element immediately after the originating element’s actual content.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::after)
     */
    "&::after": T;
    /**
     * Used to create a backdrop that hides the underlying document for an element in a top layer (such as an element that is displayed fullscreen).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::backdrop)
     */
    "&::backdrop": T;
    /**
     * Represents a styleable child pseudo-element immediately before the originating element’s actual content.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::before)
     */
    "&::before": T;
    /**
     * Deprecated. Matches the distribution list itself, on elements that have one. Use ::slotted for forward compatibility.
     *
     * (Chrome 35, Opera 22)
     */
    "&::content": T;
    /**
     * (Edge 79, Firefox 55, Safari 7, Chrome 26, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::cue)
     */
    "&::cue": T;
    /** (Chrome, Opera 16, Safari 6) */
    "&::cue()": T;
    /** (Chrome, Opera 16, Safari 6) */
    "&::cue-region": T;
    /** (Chrome, Opera 16, Safari 6) */
    "&::cue-region()": T;
    /**
     * Represents the first letter of an element, if it is not preceded by any other content (such as images or inline tables) on its line.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::first-letter)
     */
    "&::first-letter": T;
    /**
     * Describes the contents of the first formatted line of its originating element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::first-line)
     */
    "&::first-line": T;
    /** (Firefox 4) */
    "&::-moz-focus-inner": T;
    /** (Firefox 4) */
    "&::-moz-focus-outer": T;
    /**
     * Used to style the bullet of a list element. Similar to the standardized ::marker.
     *
     * (Firefox 1)
     */
    "&::-moz-list-bullet": T;
    /**
     * Used to style the numbers of a list element. Similar to the standardized ::marker.
     *
     * (Firefox 1)
     */
    "&::-moz-list-number": T;
    /**
     * Represents placeholder text in an input field
     *
     * (Firefox 19)
     */
    "&::-moz-placeholder": T;
    /**
     * Represents the bar portion of a progress bar.
     *
     * (Firefox 9)
     */
    "&::-moz-progress-bar": T;
    /**
     * Represents the portion of a document that has been highlighted by the user.
     *
     * (Firefox 1)
     */
    "&::-moz-selection": T;
    /**
     * Used to create a backdrop that hides the underlying document for an element in a top layer (such as an element that is displayed fullscreen).
     *
     * (IE 11)
     */
    "&::-ms-backdrop": T;
    /**
     * Represents the browse button of an input type=file control.
     *
     * (Edge, IE 10)
     */
    "&::-ms-browse": T;
    /**
     * Represents the check of a checkbox or radio button input control.
     *
     * (Edge, IE 10)
     */
    "&::-ms-check": T;
    /**
     * Represents the clear button of a text input control
     *
     * (Edge, IE 10)
     */
    "&::-ms-clear": T;
    /**
     * Represents the drop-down button of a select control.
     *
     * (Edge, IE 10)
     */
    "&::-ms-expand": T;
    /**
     * Represents the bar portion of a progress bar.
     *
     * (Edge, IE 10)
     */
    "&::-ms-fill": T;
    /**
     * Represents the portion of the slider track from its smallest value up to the value currently selected by the thumb. In a left-to-right layout, this is the portion of the slider track to the left of the thumb.
     *
     * (Edge, IE 10)
     */
    "&::-ms-fill-lower": T;
    /**
     * Represents the portion of the slider track from the value currently selected by the thumb up to the slider's largest value. In a left-to-right layout, this is the portion of the slider track to the right of the thumb.
     *
     * (Edge, IE 10)
     */
    "&::-ms-fill-upper": T;
    /**
     * Represents the password reveal button of an input type=password control.
     *
     * (Edge, IE 10)
     */
    "&::-ms-reveal": T;
    /**
     * Represents the portion of range input control (also known as a slider control) that the user drags.
     *
     * (Edge, IE 10)
     */
    "&::-ms-thumb": T;
    /**
     * Represents the tick marks of a slider that begin just after the thumb and continue up to the slider's largest value. In a left-to-right layout, these are the ticks to the right of the thumb.
     *
     * (Edge, IE 10)
     */
    "&::-ms-ticks-after": T;
    /**
     * Represents the tick marks of a slider that represent its smallest values up to the value currently selected by the thumb. In a left-to-right layout, these are the ticks to the left of the thumb.
     *
     * (Edge, IE 10)
     */
    "&::-ms-ticks-before": T;
    /**
     * Represents the tooltip of a slider (input type=range).
     *
     * (Edge, IE 10)
     */
    "&::-ms-tooltip": T;
    /**
     * Represents the track of a slider.
     *
     * (Edge, IE 10)
     */
    "&::-ms-track": T;
    /**
     * Represents the content of a text or password input control, or a select control.
     *
     * (Edge, IE 10)
     */
    "&::-ms-value": T;
    /**
     * Represents the portion of a document that has been highlighted by the user.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::selection)
     */
    "&::selection": T;
    /**
     * Matches the shadow root if an element has a shadow tree.
     *
     * (Chrome 35, Opera 22)
     */
    "&::shadow": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-file-upload-button": T;
    /**
     * (Edge 79, Safari 5, Chrome 6, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-inner-spin-button)
     */
    "&::-webkit-inner-spin-button": T;
    /** (Chrome, Safari 4) */
    "&::-webkit-input-placeholder": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-keygen-select": T;
    /**
     * (Edge 79, Safari 5.1, Chrome 12, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-bar)
     */
    "&::-webkit-meter-bar": T;
    /**
     * (Edge 79, Safari 5.1, Chrome 12, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-even-less-good-value)
     */
    "&::-webkit-meter-even-less-good-value": T;
    /**
     * (Edge 79, Safari 5.1, Chrome 12, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-optimum-value)
     */
    "&::-webkit-meter-optimum-value": T;
    /**
     * (Edge 79, Safari 5.1, Chrome 12, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-suboptimum-value)
     */
    "&::-webkit-meter-suboptimum-value": T;
    /**
     * (Safari 5, Chrome 6)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-outer-spin-button)
     */
    "&::-webkit-outer-spin-button": T;
    /**
     * (Edge 79, Safari 7, Chrome 25, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-progress-bar)
     */
    "&::-webkit-progress-bar": T;
    /**
     * (Edge 79, Safari 7, Chrome 23, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-progress-inner-element)
     */
    "&::-webkit-progress-inner-element": T;
    /**
     * (Edge 79, Safari 7, Chrome 25, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-progress-value)
     */
    "&::-webkit-progress-value": T;
    /**
     * (Edge 79, Safari 4, Chrome 2, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar)
     */
    "&::-webkit-resizer": T;
    /**
     * (Edge 79, Safari 4, Chrome 2, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar)
     */
    "&::-webkit-scrollbar": T;
    /**
     * (Edge 79, Safari 4, Chrome 2, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar)
     */
    "&::-webkit-scrollbar-button": T;
    /**
     * (Edge 79, Safari 4, Chrome 2, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar)
     */
    "&::-webkit-scrollbar-corner": T;
    /**
     * (Edge 79, Safari 4, Chrome 2, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar)
     */
    "&::-webkit-scrollbar-thumb": T;
    /**
     * (Edge 79, Safari 4, Chrome 2, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar)
     */
    "&::-webkit-scrollbar-track": T;
    /**
     * (Edge 79, Safari 4, Chrome 2, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-scrollbar)
     */
    "&::-webkit-scrollbar-track-piece": T;
    /**
     * (Edge 79, Safari 3, Chrome 1, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-search-cancel-button)
     */
    "&::-webkit-search-cancel-button": T;
    /** (Chrome, Safari 4) */
    "&::-webkit-search-decoration": T;
    /**
     * (Edge 79, Safari 3, Chrome 1, Opera 15)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-webkit-search-results-button)
     */
    "&::-webkit-search-results-button": T;
    /** (Chrome, Safari 4) */
    "&::-webkit-search-results-decoration": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-slider-runnable-track": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-slider-thumb": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-textfield-decoration-container": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-validation-bubble": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-validation-bubble-arrow": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-validation-bubble-arrow-clipper": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-validation-bubble-heading": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-validation-bubble-message": T;
    /** (Chrome, Opera, Safari 6) */
    "&::-webkit-validation-bubble-text-block": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The ::target-text CSS pseudo-element represents the text that has been scrolled to if the browser supports scroll-to-text fragments. It allows authors to choose how to highlight that section of text.
     *
     * (Edge 89, Chrome 89, Opera 75)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::target-text)
     */
    "&::target-text": T;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The ::-moz-range-progress CSS pseudo-element is a Mozilla extension that represents the lower portion of the track (i.e., groove) in which the indicator slides in an \<input> of type="range". This portion corresponds to values lower than the value currently selected by the thumb (i.e., virtual knob).
     *
     * (Firefox 22)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-moz-range-progress)
     */
    "&::-moz-range-progress": T;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The ::-moz-range-thumb CSS pseudo-element is a Mozilla extension that represents the thumb (i.e., virtual knob) of an \<input> of type="range". The user can move the thumb along the input's track to alter its numerical value.
     *
     * (Firefox 21)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-moz-range-thumb)
     */
    "&::-moz-range-thumb": T;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The ::-moz-range-track CSS pseudo-element is a Mozilla extension that represents the track (i.e., groove) in which the indicator slides in an \<input> of type="range".
     *
     * (Firefox 21)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::-moz-range-track)
     */
    "&::-moz-range-track": T;
    /**
     * 🚨️ Property is nonstandard. Avoid using it.
     *
     * The ::-webkit-progress-value CSS pseudo-element represents the filled-in portion of the bar of a \<progress> element. It is a child of the ::-webkit-progress-bar pseudo-element.
     *
     * In order to let ::-webkit-progress-value take effect, -webkit-appearance needs to be set to none on the \<progress> element.
     */
    "&::-webkit-progress-inner-value": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The ::grammar-error CSS pseudo-element represents a text segment which the user agent has flagged as grammatically incorrect.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::grammar-error)
     */
    "&::grammar-error": T;
    /**
     * The ::marker CSS pseudo-element selects the marker box of a list item, which typically contains a bullet or number. It works on any element or pseudo-element set to display: list-item, such as the \<li> and \<summary> elements.
     *
     * (Edge 86, Firefox 68, Safari 11.1, Chrome 86, Opera 72)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::marker)
     */
    "&::marker": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.
     *
     * (Edge 79, Firefox 72, Safari 13.1, Chrome 73, Opera 60)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::part)
     */
    "&::part": T;
    /**
     * The ::placeholder CSS pseudo-element represents the placeholder text of a form element.
     *
     * (Edge 79, Firefox 51, Safari 10.1, Chrome 57, Opera 44)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::placeholder)
     */
    "&::placeholder": T;
    /**
     * The :slotted() CSS pseudo-element represents any element that has been placed into a slot inside an HTML template.
     *
     * (Edge 79, Firefox 63, Safari 10, Chrome 50, Opera 37)
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::slotted)
     */
    "&::slotted": T;
    /**
     * ⚠️ Property is experimental. Be cautious when using it.️
     *
     * The ::spelling-error CSS pseudo-element represents a text segment which the user agent has flagged as incorrectly spelled.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/::spelling-error)
     */
    "&::spelling-error": T;
}
export interface HTMLTags<T> {
    /**
     * The html element represents the root of an HTML document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/html)
     */
    html: T;
    /**
     * The head element represents a collection of metadata for the Document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/head)
     */
    head: T;
    /**
     * The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/title)
     */
    title: T;
    /**
     * The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/base)
     */
    base: T;
    /**
     * The link element allows authors to link their document to other resources.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/link)
     */
    link: T;
    /**
     * The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
     */
    meta: T;
    /**
     * The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/style)
     */
    style: T;
    /**
     * The body element represents the content of the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/body)
     */
    body: T;
    /**
     * The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/article)
     */
    article: T;
    /**
     * The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/section)
     */
    section: T;
    /**
     * The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/nav)
     */
    nav: T;
    /**
     * The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/aside)
     */
    aside: T;
    /**
     * The h1 element represents a section heading.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements)
     */
    h1: T;
    /**
     * The h2 element represents a section heading.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements)
     */
    h2: T;
    /**
     * The h3 element represents a section heading.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements)
     */
    h3: T;
    /**
     * The h4 element represents a section heading.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements)
     */
    h4: T;
    /**
     * The h5 element represents a section heading.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements)
     */
    h5: T;
    /**
     * The h6 element represents a section heading.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements)
     */
    h6: T;
    /**
     * The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/header)
     */
    header: T;
    /**
     * The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/footer)
     */
    footer: T;
    /**
     * The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/address)
     */
    address: T;
    /**
     * The p element represents a paragraph.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/p)
     */
    p: T;
    /**
     * The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/hr)
     */
    hr: T;
    /**
     * The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/pre)
     */
    pre: T;
    /**
     * The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/blockquote)
     */
    blockquote: T;
    /**
     * The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ol)
     */
    ol: T;
    /**
     * The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ul)
     */
    ul: T;
    /**
     * The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/li)
     */
    li: T;
    /**
     * The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dl)
     */
    dl: T;
    /**
     * The dt element represents the term, or name, part of a term-description group in a description list (dl element).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dt)
     */
    dt: T;
    /**
     * The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dd)
     */
    dd: T;
    /**
     * The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/figure)
     */
    figure: T;
    /**
     * The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/figcaption)
     */
    figcaption: T;
    /**
     * The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/main)
     */
    main: T;
    /**
     * The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/div)
     */
    div: T;
    /**
     * If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/a)
     */
    a: T;
    /**
     * The em element represents stress emphasis of its contents.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/em)
     */
    em: T;
    /**
     * The strong element represents strong importance, seriousness, or urgency for its contents.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/strong)
     */
    strong: T;
    /**
     * The small element represents side comments such as small print.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/small)
     */
    small: T;
    /**
     * The s element represents contents that are no longer accurate or no longer relevant.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/s)
     */
    s: T;
    /**
     * The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/cite)
     */
    cite: T;
    /**
     * The q element represents some phrasing content quoted from another source.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/q)
     */
    q: T;
    /**
     * The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dfn)
     */
    dfn: T;
    /**
     * The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/abbr)
     */
    abbr: T;
    /**
     * The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ruby)
     */
    ruby: T;
    /**
     * The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/rb)
     */
    rb: T;
    /**
     * The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/rt)
     */
    rt: T;
    /**
     * The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/rp)
     */
    rp: T;
    /**
     * The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/time)
     */
    time: T;
    /**
     * The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/code)
     */
    code: T;
    /**
     * The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/var)
     */
    var: T;
    /**
     * The samp element represents sample or quoted output from another program or computing system.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/samp)
     */
    samp: T;
    /**
     * The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/kbd)
     */
    kbd: T;
    /**
     * The sub element represents a subscript.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/sub)
     */
    sub: T;
    /**
     * The sup element represents a superscript.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/sup)
     */
    sup: T;
    /**
     * The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/i)
     */
    i: T;
    /**
     * The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/b)
     */
    b: T;
    /**
     * The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/u)
     */
    u: T;
    /**
     * The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/mark)
     */
    mark: T;
    /**
     * The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/bdi)
     */
    bdi: T;
    /**
     * The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/bdo)
     */
    bdo: T;
    /**
     * The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/span)
     */
    span: T;
    /**
     * The br element represents a line break.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/br)
     */
    br: T;
    /**
     * The wbr element represents a line break opportunity.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/wbr)
     */
    wbr: T;
    /**
     * The ins element represents an addition to the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/ins)
     */
    ins: T;
    /**
     * The del element represents a removal from the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/del)
     */
    del: T;
    /**
     * The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/picture)
     */
    picture: T;
    /**
     * An img element represents an image.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/img)
     */
    img: T;
    /**
     * The iframe element represents a nested browsing context.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/iframe)
     */
    iframe: T;
    /**
     * The embed element provides an integration point for an external (typically non-HTML) application or interactive content.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/embed)
     */
    embed: T;
    /**
     * The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/object)
     */
    object: T;
    /**
     * The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/param)
     */
    param: T;
    /**
     * A video element is used for playing videos or movies, and audio files with captions.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/video)
     */
    video: T;
    /**
     * An audio element represents a sound or audio stream.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/audio)
     */
    audio: T;
    /**
     * The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/source)
     */
    source: T;
    /**
     * The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/track)
     */
    track: T;
    /**
     * The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/map)
     */
    map: T;
    /**
     * The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/area)
     */
    area: T;
    /**
     * The table element represents data with more than one dimension, in the form of a table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/table)
     */
    table: T;
    /**
     * The caption element represents the title of the table that is its parent, if it has a parent and that is a table element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/caption)
     */
    caption: T;
    /**
     * The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/colgroup)
     */
    colgroup: T;
    /**
     * If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/col)
     */
    col: T;
    /**
     * The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/tbody)
     */
    tbody: T;
    /**
     * The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/thead)
     */
    thead: T;
    /**
     * The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/tfoot)
     */
    tfoot: T;
    /**
     * The tr element represents a row of cells in a table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/tr)
     */
    tr: T;
    /**
     * The td element represents a data cell in a table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/td)
     */
    td: T;
    /**
     * The th element represents a header cell in a table.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/th)
     */
    th: T;
    /**
     * The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/form)
     */
    form: T;
    /**
     * The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/label)
     */
    label: T;
    /**
     * The input element represents a typed data field, usually with a form control to allow the user to edit the data.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/input)
     */
    input: T;
    /**
     * The button element represents a button labeled by its contents.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/button)
     */
    button: T;
    /**
     * The select element represents a control for selecting amongst a set of options.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/select)
     */
    select: T;
    /**
     * The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/datalist)
     */
    datalist: T;
    /**
     * The optgroup element represents a group of option elements with a common label.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/optgroup)
     */
    optgroup: T;
    /**
     * The option element represents an option in a select element or as part of a list of suggestions in a datalist element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/option)
     */
    option: T;
    /**
     * The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/textarea)
     */
    textarea: T;
    /**
     * The output element represents the result of a calculation performed by the application, or the result of a user action.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/output)
     */
    output: T;
    /**
     * The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/progress)
     */
    progress: T;
    /**
     * The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/meter)
     */
    meter: T;
    /**
     * The fieldset element represents a set of form controls optionally grouped under a common name.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/fieldset)
     */
    fieldset: T;
    /**
     * The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/legend)
     */
    legend: T;
    /**
     * The details element represents a disclosure widget from which the user can obtain additional information or controls.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/details)
     */
    details: T;
    /**
     * The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/summary)
     */
    summary: T;
    /**
     * The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/dialog)
     */
    dialog: T;
    /**
     * The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/script)
     */
    script: T;
    /**
     * The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/noscript)
     */
    noscript: T;
    /**
     * The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/template)
     */
    template: T;
    /**
     * The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/canvas)
     */
    canvas: T;
}
export interface HTMLAttrs<T> {
    /** Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) for details. */
    "html[manifest]": T;
    /** Specifies the version of the HTML [Document Type Definition](https://developer.mozilla.org/en-US/docs/Glossary/DTD "Document Type Definition: In HTML, the doctype is the required "\<!DOCTYPE html>" preamble found at the top of all documents. Its sole purpose is to prevent a browser from switching into so-called “quirks mode” when rendering a document; that is, the "\<!DOCTYPE html>" doctype ensures that the browser makes a best-effort attempt at following the relevant specifications, rather than using a different rendering mode that is incompatible with some specifications.") that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration. */
    "html[version]": T;
    /** Specifies the XML Namespace of the document. Default value is `"http://www.w3.org/1999/xhtml"`. This is required in documents parsed with XML parsers, and optional in text/html documents. */
    "html[xmlns]": T;
    /** The URIs of one or more metadata profiles, separated by white space. */
    "head[profile]": T;
    /** The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed. */
    "base[href]": T;
    /**
     * A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:
     *
     * *   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.
     * *   `_blank`: Load the result into a new unnamed browsing context.
     * *   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.
     * *   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.
     *
     * If this attribute is specified, this element must come before any other elements with attributes whose values are URLs.
     */
    "base[target]": T;
    /** This attribute specifies the [URL](https://developer.mozilla.org/en-US/docs/Glossary/URL "URL: Uniform Resource Locator (URL) is a text string specifying where a resource can be found on the Internet.") of the linked resource. A URL can be absolute or relative. */
    "link[href]": T;
    /**
     * This enumerated attribute indicates whether [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") must be used when fetching the resource. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`\<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML \<canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:
     *
     * `anonymous`
     *
     * A cross-origin request (i.e. with an [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin "The Origin request header indicates where a fetch originates from. It doesn't include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn't disclose the whole path.") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin "The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.") HTTP header) the image will be tainted and its usage restricted.
     *
     * `use-credentials`
     *
     * A cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials "The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request's credentials mode (Request.credentials) is "include".") HTTP header), the resource will be _tainted_ and its usage restricted.
     *
     * If the attribute is not present, the resource is fetched without a [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information.
     */
    "link[crossorigin]": T;
    /** This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). */
    "link[rel]": T;
    /**
     * This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.
     *
     * **Notes:**
     *
     * *   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](https://developer.mozilla.org/en-US/docs/Web/CSS/\@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.
     * *   Browsers not supporting [CSS3 Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4.
     */
    "link[media]": T;
    /** This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute is present. */
    "link[hreflang]": T;
    /** This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports. */
    "link[type]": T;
    /**
     * This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the [`rel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-rel) contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:
     *
     * *   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.
     * *   a white-space separated list of sizes, each in the format `_\<width in pixels>_x_\<height in pixels>_` or `_\<width in pixels>_X_\<height in pixels>_`. Each of these sizes must be contained in the resource.
     *
     * **Note:** Most icon formats are only able to store one single icon; therefore most of the time the [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-sizes) contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it.
     */
    "link[sizes]": T;
    /** This attribute is only used when `rel="preload"` or `rel="prefetch"` has been set on the `\<link>` element. It specifies the type of content being loaded by the `\<link>`, which is necessary for content prioritization, request matching, application of correct [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), and setting of correct [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept "The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand. Using content negotiation, the server then selects one of the proposals, uses it and informs the client of its choice with the Content-Type response header. Browsers set adequate values for this header depending on the context where the request is done: when fetching a CSS stylesheet a different value is set for the request than when fetching an image, video or a script.") request header. */
    "link[as]": T;
    /** Indicates the relative importance of the resource. Priority hints are delegated using the values: */
    "link[importance]": T;
    /** Contains inline metadata — a base64-encoded cryptographic hash of the resource (file) you’re telling the browser to fetch. The browser can use this to verify that the fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). */
    "link[integrity]": T;
    /**
     * A string indicating which referrer to use when fetching the resource:
     *
     * *   `no-referrer` means that the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.
     * *   `no-referrer-when-downgrade` means that no [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior, if no policy is otherwise specified.
     * *   `origin` means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.
     * *   `origin-when-cross-origin` means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer's path.
     * *   `unsafe-url` means that the referrer will include the origin and the path (but not the fragment, password, or username). This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.
     */
    "link[referrerpolicy]": T;
    /** The `title` attribute has special semantics on the `\<link>` element. When used on a `\<link rel="stylesheet">` it defines a [preferred or an alternate stylesheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets). Incorrectly using it may [cause the stylesheet to be ignored](https://developer.mozilla.org/en-US/docs/Correctly_Using_Titles_With_External_Stylesheets). */
    "link[title]": T;
    /**
     * This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes [`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-itemprop), [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) is also set.
     *
     * This metadata name is associated with the value contained by the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute. The possible values for the name attribute are:
     *
     * *   `application-name` which defines the name of the application running in the web page.
     *
     * **Note:**
     *
     * *   Browsers may use this to identify the application. It is different from the [`\<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title "The HTML Title element (\<title>) defines the document's title that is shown in a browser's title bar or a page's tab.") element, which usually contain the application name, but may also contain information like the document name or a status.
     * *   Simple web pages shouldn't define an application-name.
     *
     * *   `author` which defines the name of the document's author.
     * *   `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
     * *   `generator` which contains the identifier of the software that generated the page.
     * *   `keywords` which contains words relevant to the page's content separated by commas.
     * *   `referrer` which controls the [`Referer` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:
     *
     * Values for the `content` attribute of `\<meta name="referrer">`
     *
     * `no-referrer`
     *
     * Do not send a HTTP `Referrer` header.
     *
     * `origin`
     *
     * Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the document.
     *
     * `no-referrer-when-downgrade`
     *
     * Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.
     *
     * `origin-when-cross-origin`
     *
     * Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) for other cases.
     *
     * `same-origin`
     *
     * A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.
     *
     * `strict-origin`
     *
     * Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don't send it to a less secure destination (HTTPS->HTTP).
     *
     * `strict-origin-when-cross-origin`
     *
     * Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).
     *
     * `unsafe-URL`
     *
     * Send the full URL (stripped of parameters) for same-origin or cross-origin requests.
     *
     * **Notes:**
     *
     * *   Some browsers support the deprecated values of `always`, `default`, and `never` for referrer.
     * *   Dynamically inserting `\<meta name="referrer">` (with [`document.write`](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) or [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.
     * *   When several conflicting policies are defined, the no-referrer policy is applied.
     *
     *
     * This attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:
     *
     * *   `creator` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [`\<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML \<meta> element represents metadata that cannot be represented by other HTML meta-related elements, like \<base>, \<link>, \<script>, \<style> or \<title>.") elements should be used.
     * *   `googlebot`, a synonym of `robots`, is only followed by Googlebot (the indexing crawler for Google).
     * *   `publisher` which defines the name of the document's publisher.
     * *   `robots` which defines the behaviour that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list of the values below:
     *
     * Values for the content of `\<meta name="robots">`
     *
     * Value
     *
     * Description
     *
     * Used by
     *
     * `index`
     *
     * Allows the robot to index the page (default).
     *
     * All
     *
     * `noindex`
     *
     * Requests the robot to not index the page.
     *
     * All
     *
     * `follow`
     *
     * Allows the robot to follow the links on the page (default).
     *
     * All
     *
     * `nofollow`
     *
     * Requests the robot to not follow the links on the page.
     *
     * All
     *
     * `none`
     *
     * Equivalent to `noindex, nofollow`
     *
     * [Google](https://support.google.com/webmasters/answer/79812)
     *
     * `noodp`
     *
     * Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.
     *
     * [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
     *
     * `noarchive`
     *
     * Requests the search engine not to cache the page content.
     *
     * [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
     *
     * `nosnippet`
     *
     * Prevents displaying any description of the page in search engine results.
     *
     * [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
     *
     * `noimageindex`
     *
     * Requests this page not to appear as the referring page of an indexed image.
     *
     * [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)
     *
     * `nocache`
     *
     * Synonym of `noarchive`.
     *
     * [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
     *
     * **Notes:**
     *
     * *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.
     * *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](https://developer.mozilla.org/en-US/docs/Glossary/robots.txt "robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site.")_ file.
     * *   If you want to remove a page, `noindex` will work, but only after the robot visits the page again. Ensure that the `robots.txt` file is not preventing revisits.
     * *   Some values are mutually exclusive, like `index` and `noindex`, or `follow` and `nofollow`. In these cases the robot's behaviour is undefined and may vary between them.
     * *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header `X-Robots-Tag`; this allows non-HTML documents like images to use these rules.
     *
     * *   `slurp`, is a synonym of `robots`, but only for Slurp - the crawler for Yahoo Search.
     * *   `viewport`, which gives hints about the size of the initial size of the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/viewport "viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you're viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view."). Used by mobile devices only.
     *
     * Values for the content of `\<meta name="viewport">`
     *
     * Value
     *
     * Possible subvalues
     *
     * Description
     *
     * `width`
     *
     * A positive integer number, or the text `device-width`
     *
     * Defines the pixel width of the viewport that you want the web site to be rendered at.
     *
     * `height`
     *
     * A positive integer, or the text `device-height`
     *
     * Defines the height of the viewport. Not used by any browser.
     *
     * `initial-scale`
     *
     * A positive number between `0.0` and `10.0`
     *
     * Defines the ratio between the device width (`device-width` in portrait mode or `device-height` in landscape mode) and the viewport size.
     *
     * `maximum-scale`
     *
     * A positive number between `0.0` and `10.0`
     *
     * Defines the maximum amount to zoom in. It must be greater or equal to the `minimum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.
     *
     * `minimum-scale`
     *
     * A positive number between `0.0` and `10.0`
     *
     * Defines the minimum zoom level. It must be smaller or equal to the `maximum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.
     *
     * `user-scalable`
     *
     * `yes` or `no`
     *
     * If set to `no`, the user is not able to zoom in the webpage. The default is `yes`. Browser settings can ignore this rule, and iOS10+ ignores it by default.
     *
     * Specification
     *
     * Status
     *
     * Comment
     *
     * [CSS Device Adaptation
     * The definition of '\<meta name="viewport">' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)
     *
     * Working Draft
     *
     * Non-normatively describes the Viewport META element
     *
     * See also: [`\@viewport`](https://developer.mozilla.org/en-US/docs/Web/CSS/\@viewport "The \@viewport CSS at-rule lets you configure the viewport through which the document is viewed. It's primarily used for mobile devices, but is also used by desktop browsers that support features like "snap to edge" (such as Microsoft Edge).")
     *
     * **Notes:**
     *
     * *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.
     * *   The default values may vary between devices and browsers.
     * *   To learn about this declaration in Firefox for Mobile, see [this article](https://developer.mozilla.org/en-US/docs/Mobile/Viewport_meta_tag "Mobile/Viewport meta tag").
     */
    "meta[name]": T;
    /**
     * Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:
     *
     * *   `"content-language"`
     * Defines the default language of the page. It can be overridden by the [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.
     *
     * **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`\<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html "The HTML \<html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.") element.
     *
     * *   `"content-security-policy"`
     * Allows page authors to define a [content policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.
     * *   `"content-type"`
     * Defines the [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string '`text/html`' followed by a character set with the following syntax: '`; charset=_IANAcharset_`', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)
     *
     * **Warning:** Do not use this value, as it is obsolete. Use the [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute on the [`\<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML \<meta> element represents metadata that cannot be represented by other HTML meta-related elements, like \<base>, \<link>, \<script>, \<style> or \<title>.") element.
     *
     * **Note:** As [`\<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML \<meta> element represents metadata that cannot be represented by other HTML meta-related elements, like \<base>, \<link>, \<script>, \<style> or \<title>.") can't change documents' types in XHTML or HTML5's XHTML serialization, never set the MIME type to an XHTML MIME type with `\<meta>`.
     *
     * *   `"refresh"`
     * This instruction specifies:
     * *   The number of seconds until the page should be reloaded - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer.
     * *   The number of seconds until the page should redirect to another - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer followed by the string '`;url=`', and a valid URL.
     * *   `"set-cookie"`
     * Defines a [cookie](https://developer.mozilla.org/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).
     *
     * **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead.
     */
    "meta[http-equiv]": T;
    /** This attribute contains the value for the [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-name) attribute, depending on which is used. */
    "meta[content]": T;
    /**
     * This attribute declares the page's character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn't request a specific encoding, it suggests:
     *
     * *   Authors are encouraged to use [`UTF-8`](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8).
     * *   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.
     *
     * **Note:** ASCII-incompatible encodings are those that don't map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)
     *
     * *   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.
     * *   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.
     *
     * **Notes:**
     *
     * *   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.
     * *   The [`\<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML \<meta> element represents metadata that cannot be represented by other HTML meta-related elements, like \<base>, \<link>, \<script>, \<style> or \<title>.") element declaring the encoding must be inside the [`\<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head "The HTML \<head> element provides general information (metadata) about the document, including its title and links to its scripts and style sheets.") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.
     * *   This [`\<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML \<meta> element represents metadata that cannot be represented by other HTML meta-related elements, like \<base>, \<link>, \<script>, \<style> or \<title>.") element is only one part of the [algorithm to determine a page's character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm "Algorithm charset page"). The [`Content-Type` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](https://developer.mozilla.org/en-US/docs/Glossary/Byte-Order_Mark "The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!") override this element.
     * *   It is strongly recommended to define the character encoding. If a page's encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).
     * *   The [`\<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML \<meta> element represents metadata that cannot be represented by other HTML meta-related elements, like \<base>, \<link>, \<script>, \<style> or \<title>.") element with a `charset` attribute is a synonym for the pre-HTML5 `\<meta http-equiv="Content-Type" content="text/html; charset=_IANAcharset_">`, where _`IANAcharset`_ contains the value of the equivalent [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute. This syntax is still allowed, although no longer recommended.
     */
    "meta[charset]": T;
    /**
     * This attribute defines the scheme in which metadata is described. A scheme is a context leading to the correct interpretations of the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) value, like a format.
     *
     * **Warning:** Do not use this value, as it is obsolete. There is no replacement as there was no real usage for it.
     */
    "meta[scheme]": T;
    /** This attribute defines which media the style should be applied to. Its value is a [media query](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries), which defaults to `all` if the attribute is missing. */
    "style[media]": T;
    /** A cryptographic nonce (number used once) used to whitelist inline styles in a [style-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource’s policy is otherwise trivial. */
    "style[nonce]": T;
    /** This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to `text/css` if it is not specified — there is very little reason to include this in modern web documents. */
    "style[type]": T;
    "style[scoped]": T;
    /** This attribute specifies [alternative style sheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets) sets. */
    "style[title]": T;
    /** Function to call after the user has printed the document. */
    "body[onafterprint]": T;
    /** Function to call when the user requests printing of the document. */
    "body[onbeforeprint]": T;
    /** Function to call when the document is about to be unloaded. */
    "body[onbeforeunload]": T;
    /** Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed. */
    "body[onhashchange]": T;
    /** Function to call when the preferred languages changed. */
    "body[onlanguagechange]": T;
    /** Function to call when the document has received a message. */
    "body[onmessage]": T;
    /** Function to call when network communication has failed. */
    "body[onoffline]": T;
    /** Function to call when network communication has been restored. */
    "body[ononline]": T;
    "body[onpagehide]": T;
    "body[onpageshow]": T;
    /** Function to call when the user has navigated session history. */
    "body[onpopstate]": T;
    /** Function to call when the storage area has changed. */
    "body[onstorage]": T;
    /** Function to call when the document is going away. */
    "body[onunload]": T;
    /** Color of text for hyperlinks when selected. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active "The :active CSS pseudo-class represents an element (such as a button) that is being activated by the user.") pseudo-class instead._ */
    "body[alink]": T;
    /** URI of a image to use as a background. _This method is non-conforming, use CSS [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background "The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.") property on the element instead._ */
    "body[background]": T;
    /** Background color for the document. _This method is non-conforming, use CSS [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property on the element instead._ */
    "body[bgcolor]": T;
    /** The margin of the bottom of the body. _This method is non-conforming, use CSS [`margin-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom "The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._ */
    "body[bottommargin]": T;
    /** The margin of the left of the body. _This method is non-conforming, use CSS [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._ */
    "body[leftmargin]": T;
    /** Color of text for unvisited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:link`](https://developer.mozilla.org/en-US/docs/Web/CSS/:link "The :link CSS pseudo-class represents an element that has not yet been visited. It matches every unvisited \<a>, \<area>, or \<link> element that has an href attribute.") pseudo-class instead._ */
    "body[link]": T;
    /** Function to call when the document loses focus. */
    "body[onblur]": T;
    /** Function to call when the document fails to load properly. */
    "body[onerror]": T;
    /** Function to call when the document receives focus. */
    "body[onfocus]": T;
    /** Function to call when the document has finished loading. */
    "body[onload]": T;
    /** Function to call when the user has moved forward in undo transaction history. */
    "body[onredo]": T;
    /** Function to call when the document has been resized. */
    "body[onresize]": T;
    /** Function to call when the user has moved backward in undo transaction history. */
    "body[onundo]": T;
    /** The margin of the right of the body. _This method is non-conforming, use CSS [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._ */
    "body[rightmargin]": T;
    /** Foreground color of text. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property on the element instead._ */
    "body[text]": T;
    /** The margin of the top of the body. _This method is non-conforming, use CSS [`margin-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top "The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._ */
    "body[topmargin]": T;
    /** Color of text for visited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:visited`](https://developer.mozilla.org/en-US/docs/Web/CSS/:visited "The :visited CSS pseudo-class represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.") pseudo-class instead._ */
    "body[vlink]": T;
    /** Sets the alignment of the rule on the page. If no value is specified, the default value is `left`. */
    "hr[align]": T;
    /** Sets the color of the rule through color name or hexadecimal value. */
    "hr[color]": T;
    /** Sets the rule to have no shading. */
    "hr[noshade]": T;
    /** Sets the height, in pixels, of the rule. */
    "hr[size]": T;
    /** Sets the length of the rule on the page through a pixel or percentage value. */
    "hr[width]": T;
    /** Contains the _preferred_ count of characters that a line should have. It was a non-standard synonym of [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre#attr-width). To achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width "The width CSS property sets an element's width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.") instead. */
    "pre[cols]": T;
    /** Contains the _preferred_ count of characters that a line should have. Though technically still implemented, this attribute has no visual effect; to achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width "The width CSS property sets an element's width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.") instead. */
    "pre[width]": T;
    /** Is a _hint_ indicating how the overflow must happen. In modern browser this hint is ignored and no visual effect results in its present; to achieve such an effect, use CSS [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space "The white-space CSS property sets how white space inside an element is handled.") instead. */
    "pre[wrap]": T;
    /** A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote. */
    "blockquote[cite]": T;
    /** This Boolean attribute specifies that the items of the list are specified in reversed order. */
    "ol[reversed]": T;
    /**
     * This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use `\<ol start="3">`.
     *
     * **Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.
     */
    "ol[start]": T;
    /**
     * Indicates the numbering type:
     *
     * *   `'a'` indicates lowercase letters,
     * *   `'A'` indicates uppercase letters,
     * *   `'i'` indicates lowercase Roman numerals,
     * *   `'I'` indicates uppercase Roman numerals,
     * *   and `'1'` indicates numbers (default).
     *
     * The type set is used for the entire list unless a different [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li#attr-type) attribute is used within an enclosed [`\<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li "The HTML \<li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (\<ol>), an unordered list (\<ul>), or a menu (\<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.") element.
     *
     * **Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.
     *
     * Unless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type "The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.") property should be used instead.
     */
    "ol[type]": T;
    /**
     * This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn't work in all browsers.
     *
     * **Warning:** Do not use this attribute, as it has been deprecated: the [`\<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML \<ol> element represents an ordered list of items, typically rendered as a numbered list.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give an effect similar to the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height "The line-height CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.") can be used with a value of `80%`.
     */
    "ol[compact]": T;
    /**
     * This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn't work in all browsers.
     *
     * **Usage note: **Do not use this attribute, as it has been deprecated: the [`\<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML \<ul> element represents an unordered list of items, typically rendered as a bulleted list.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give a similar effect as the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [line-height](https://developer.mozilla.org/en-US/docs/CSS/line-height) can be used with a value of `80%`.
     */
    "ul[compact]": T;
    /**
     * This integer attribute indicates the current ordinal value of the list item as defined by the [`\<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML \<ol> element represents an ordered list of items, typically rendered as a numbered list.") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`\<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML \<ul> element represents an unordered list of items, typically rendered as a bulleted list.")) or for menus ([`\<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu "The HTML \<menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.")).
     *
     * **Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.
     *
     * **Note:** Prior to Gecko 9.0, negative values were incorrectly converted to 0. Starting in Gecko 9.0 all integer values are correctly parsed.
     */
    "li[value]": T;
    /**
     * This character attribute indicates the numbering type:
     *
     * *   `a`: lowercase letters
     * *   `A`: uppercase letters
     * *   `i`: lowercase Roman numerals
     * *   `I`: uppercase Roman numerals
     * *   `1`: numbers
     *
     * This type overrides the one used by its parent [`\<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML \<ol> element represents an ordered list of items, typically rendered as a numbered list.") element, if any.
     *
     * **Usage note:** This attribute has been deprecated: use the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type "The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.") property instead.
     */
    "li[type]": T;
    /** If the value of this attribute is set to `yes`, the definition text will not wrap. The default value is `no`. */
    "dd[nowrap]": T;
    /** Contains a URL or a URL fragment that the hyperlink points to. */
    "a[href]": T;
    /**
     * Specifies where to display the linked URL. It is a name of, or keyword for, a _browsing context_: a tab, window, or `\<iframe>`. The following keywords have special meanings:
     *
     * *   `_self`: Load the URL into the same browsing context as the current one. This is the default behavior.
     * *   `_blank`: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.
     * *   `_parent`: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as `_self`.
     * *   `_top`: Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as `_self`.
     *
     * **Note:** When using `target`, consider adding `rel="noreferrer"` to avoid exploitation of the `window.opener` API.
     *
     * **Note:** Linking to another page using `target="_blank"` will run the new page on the same process as your page. If the new page is executing expensive JS, your page's performance may suffer. To avoid this use `rel="noopener"`.
     */
    "a[target]": T;
    /**
     * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though `/` and `\` are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.
     *
     * **Notes:**
     *
     * *   This attribute only works for [same-origin URLs](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).
     * *   Although HTTP(s) URLs need to be in the same-origin, [`blob:` URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL) and [`data:` URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.
     * *   If the HTTP header [`Content-Disposition:`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) gives a different filename than this attribute, the HTTP header takes priority over this attribute.
     * *   If `Content-Disposition:` is set to `inline`, Firefox prioritizes `Content-Disposition`, like the filename case, while Chrome prioritizes the `download` attribute.
     */
    "a[download]": T;
    /** Contains a space-separated list of URLs to which, when the hyperlink is followed, [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST "The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.") requests with the body `PING` will be sent by the browser (in the background). Typically used for tracking. */
    "a[ping]": T;
    /** Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). */
    "a[rel]": T;
    /** This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt "Tags for Identifying Languages"). */
    "a[hreflang]": T;
    /** Specifies the media type in the form of a [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type "MIME type: A MIME type (now properly called "media type", but also sometimes "content type") is a string sent along with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled audio/ogg, or an image file image/png).") for the linked URL. It is purely advisory, with no built-in functionality. */
    "a[type]": T;
    /**
     * Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) to send when fetching the URL:
     *
     * *   `'no-referrer'` means the `Referer:` header will not be sent.
     * *   `'no-referrer-when-downgrade'` means no `Referer:` header will be sent when navigating to an origin without HTTPS. This is the default behavior.
     * *   `'origin'` means the referrer will be the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the page, not including information after the domain.
     * *   `'origin-when-cross-origin'` meaning that navigations to other origins will be limited to the scheme, the host and the port, while navigations on the same origin will include the referrer's path.
     * *   `'strict-origin-when-cross-origin'`
     * *   `'unsafe-url'` means the referrer will include the origin and path, but not the fragment, password, or username. This is unsafe because it can leak data from secure URLs to insecure ones.
     */
    "a[referrerpolicy]": T;
    /** The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote. */
    "q[cite]": T;
    /** This attribute indicates the time and/or date of the element and must be in one of the formats described below. */
    "time[datetime]": T;
    /**
     * The direction in which text should be rendered in this element's contents. Possible values are:
     *
     * *   `ltr`: Indicates that the text should go in a left-to-right direction.
     * *   `rtl`: Indicates that the text should go in a right-to-left direction.
     */
    "bdo[dir]": T;
    /** Indicates where to begin the next line after the break. */
    "br[clear]": T;
    /** This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system. */
    "ins[cite]": T;
    /** This attribute indicates the time and date of the change and must be a valid date with an optional time string. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). */
    "ins[datetime]": T;
    /** A URI for a resource that explains the change (for example, meeting minutes). */
    "del[cite]": T;
    /** This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). */
    "del[datetime]": T;
    /**
     * This attribute defines an alternative text description of the image.
     *
     * **Note:** Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an [unsupported type](#Supported_image_formats). In these cases, the browser may replace the image with the text defined in this element's `alt` attribute. You should, for these reasons and others, provide a useful value for `alt` whenever possible.
     *
     * **Note:** Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (`alt=""`) indicates that this image is _not_ a key part of the content (decorative), and that non-visual browsers may omit it from rendering.
     */
    "img[alt]": T;
    /** The image URL. This attribute is mandatory for the `\<img>` element. On browsers supporting `srcset`, `src` is treated like a candidate image with a pixel density descriptor `1x` unless an image with this pixel density descriptor is already defined in `srcset,` or unless `srcset` contains '`w`' descriptors. */
    "img[src]": T;
    /**
     * A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:
     *
     * 1.  a URL to an image,
     * 2.  optionally, whitespace followed by one of:
     * *   A width descriptor, or a positive integer directly followed by '`w`'. The width descriptor is divided by the source size given in the `sizes` attribute to calculate the effective pixel density.
     * *   A pixel density descriptor, which is a positive floating point number directly followed by '`x`'.
     *
     * If no descriptor is specified, the source is assigned the default descriptor: `1x`.
     *
     * It is incorrect to mix width descriptors and pixel density descriptors in the same `srcset` attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are both described with '`2x`') are also invalid.
     *
     * The user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) tutorial for an example.
     */
    "img[srcset]": T;
    /** This enumerated attribute indicates if the fetching of the related image must be done using CORS or not. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`\<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML \<canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being "[tainted](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_tainted_canvas)." The allowed values are: */
    "img[crossorigin]": T;
    /**
     * The partial URL (starting with '#') of an [image map](https://developer.mozilla.org/en-US/docs/HTML/Element/map) associated with the element.
     *
     * **Note:** You cannot use this attribute if the `\<img>` element is a descendant of an [`\<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML \<a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") or [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") element.
     */
    "img[usemap]": T;
    /**
     * This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.
     *
     * **Note:** This attribute is allowed only if the `\<img>` element is a descendant of an [`\<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML \<a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") element with a valid [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute.
     */
    "img[ismap]": T;
    /** The intrinsic width of the image in pixels. */
    "img[width]": T;
    /** The intrinsic height of the image in pixels. */
    "img[height]": T;
    /** Provides an image decoding hint to the browser. The allowed values are: */
    "img[decoding]": T;
    /** Indicates the relative importance of the resource. Priority hints are delegated using the values: */
    "img[importance]": T;
    /** This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute. Specifically, the image would raster at these dimensions and `naturalWidth`/`naturalHeight` on images would return the values specified in this attribute. [Explainer](https://github.com/ojanvafai/intrinsicsize-attribute), [examples](https://googlechrome.github.io/samples/intrinsic-size/index.html) */
    "img[intrinsicsize]": T;
    /**
     * A string indicating which referrer to use when fetching the resource:
     *
     * *   `no-referrer:` The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.
     * *   `no-referrer-when-downgrade:` No `Referer` header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior if no policy is otherwise specified.
     * *   `origin:` The `Referer` header will include the page of origin's scheme, the host, and the port.
     * *   `origin-when-cross-origin:` Navigating to other origins will limit the included referral data to the scheme, the host and the port, while navigating from the same origin will include the referrer's full path.
     * *   `unsafe-url:` The `Referer` header will include the origin and the path, but not the fragment, password, or username. This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.
     */
    "img[referrerpolicy]": T;
    /**
     * A list of one or more strings separated by commas indicating a set of source sizes. Each source size consists of:
     *
     * 1.  a media condition. This must be omitted for the last item.
     * 2.  a source size value.
     *
     * Source size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the `srcset` attribute, when those sources are described using width ('`w`') descriptors. The selected source size affects the intrinsic size of the image (the image’s display size if no CSS styling is applied). If the `srcset` attribute is absent, or contains no values with a width (`w`) descriptor, then the `sizes` attribute has no effect.
     */
    "img[sizes]": T;
    /** The URL of the page to embed. Use a value of `about:blank` to embed an empty page that conforms to the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Inherited_origins). Also note that programatically removing an `\<iframe>`'s src attribute (e.g. via [`Element.removeAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute "The Element method removeAttribute() removes the attribute with the specified name from the element.")) causes `about:blank` to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS. */
    "iframe[src]": T;
    /** Inline HTML to embed, overriding the `src` attribute. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute. */
    "iframe[srcdoc]": T;
    /** A targetable name for the embedded browsing context. This can be used in the `target` attribute of the [`\<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML \<a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL."), [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server."), or [`\<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base "The HTML \<base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one \<base> element in a document.") elements; the `formtarget` attribute of the [`\<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") or [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") elements; or the `windowName` parameter in the [`window.open()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open "The Window interface's open() method loads the specified resource into the browsing context (window, \<iframe> or tab) with the specified name. If the name doesn't exist, then a new window is opened and the specified resource is loaded into its browsing context.") method. */
    "iframe[name]": T;
    /**
     * Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:
     *
     * *   `allow-forms`: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.
     * *   `allow-modals`: Lets the resource [open modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag).
     * *   `allow-orientation-lock`: Lets the resource [lock the screen orientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation).
     * *   `allow-pointer-lock`: Lets the resource use the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/WebAPI/Pointer_Lock).
     * *   `allow-popups`: Allows popups (such as `window.open()`, `target="_blank"`, or `showModalDialog()`). If this keyword is not used, the popup will silently fail to open.
     * *   `allow-popups-to-escape-sandbox`: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.
     * *   `allow-presentation`: Lets the resource start a [presentation session](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest).
     * *   `allow-same-origin`: If this token is not used, the resource is treated as being from a special origin that always fails the [same-origin policy](https://developer.mozilla.org/en-US/docs/Glossary/same-origin_policy "same-origin policy: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.").
     * *   `allow-scripts`: Lets the resource run scripts (but not create popup windows).
     * *   `allow-storage-access-by-user-activation` : Lets the resource request access to the parent's storage capabilities with the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).
     * *   `allow-top-navigation`: Lets the resource navigate the top-level browsing context (the one named `_top`).
     * *   `allow-top-navigation-by-user-activation`: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.
     *
     * **Notes about sandboxing:**
     *
     * *   When the embedded document has the same origin as the embedding page, it is **strongly discouraged** to use both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute — making it no more secure than not using the `sandbox` attribute at all.
     * *   Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` — such as if the viewer opens the frame in a new tab. Such content should be also served from a _separate origin_ to limit potential damage.
     * *   The `sandbox` attribute is unsupported in Internet Explorer 9 and earlier.
     */
    "iframe[sandbox]": T;
    "iframe[seamless]": T;
    /** Set to `true` if the `\<iframe>` can activate fullscreen mode by calling the [`requestFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen "The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in full-screen mode.") method. */
    "iframe[allowfullscreen]": T;
    /** The width of the frame in CSS pixels. Default is `300`. */
    "iframe[width]": T;
    /** The height of the frame in CSS pixels. Default is `150`. */
    "iframe[height]": T;
    /** Specifies a [feature policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy) for the `\<iframe>`. */
    "iframe[allow]": T;
    /** Set to `true` if a cross-origin `\<iframe>` should be allowed to invoke the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API). */
    "iframe[allowpaymentrequest]": T;
    /** A [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) enforced for the embedded resource. See [`HTMLIFrameElement.csp`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/csp "The csp property of the HTMLIFrameElement interface specifies the Content Security Policy that an embedded document must agree to enforce upon itself.") for details. */
    "iframe[csp]": T;
    /**
     * The download priority of the resource in the `\<iframe>`'s `src` attribute. Allowed values:
     *
     * `auto` (default)
     *
     * No preference. The browser uses its own heuristics to decide the priority of the resource.
     *
     * `high`
     *
     * The resource should be downloaded before other lower-priority page resources.
     *
     * `low`
     *
     * The resource should be downloaded after other higher-priority page resources.
     */
    "iframe[importance]": T;
    /**
     * Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the frame's resource:
     *
     * *   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.
     * *   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin "origin: Web content's origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS "TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS "HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.")).
     * *   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host "host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails."), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port "port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.").
     * *   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.
     * *   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy "same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin."), but cross-origin requests will contain no referrer information.
     * *   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).
     * *   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).
     * *   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.
     */
    "iframe[referrerpolicy]": T;
    /** The URL of the resource being embedded. */
    "embed[src]": T;
    /** The MIME type to use to select the plug-in to instantiate. */
    "embed[type]": T;
    /** The displayed width of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed. */
    "embed[width]": T;
    /** The displayed height of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed. */
    "embed[height]": T;
    /** The address of the resource as a valid URL. At least one of **data** and **type** must be defined. */
    "object[data]": T;
    /** The [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource specified by **data**. At least one of **data** and **type** must be defined. */
    "object[type]": T;
    /** This Boolean attribute indicates if the **type** attribute and the actual [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource must match to be used. */
    "object[typemustmatch]": T;
    /** The name of valid browsing context (HTML5), or the name of the control (HTML 4). */
    "object[name]": T;
    /** A hash-name reference to a [`\<map>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map "The HTML \<map> element is used with \<area> elements to define an image map (a clickable link area).") element; that is a '#' followed by the value of a [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map#attr-name) of a map element. */
    "object[usemap]": T;
    /** The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. */
    "object[form]": T;
    /** The width of the display resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes)) */
    "object[width]": T;
    /** The height of the displayed resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes)) */
    "object[height]": T;
    /** A space-separated list of URIs for archives of resources for the object. */
    "object[archive]": T;
    /** The width of a border around the control, in pixels. */
    "object[border]": T;
    /** The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute. */
    "object[classid]": T;
    /** The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document. */
    "object[codebase]": T;
    /** The content type of the data specified by **classid**. */
    "object[codetype]": T;
    /** The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `\<object>` element. In HTML5, repeat the \<object> element completely each that that the resource is reused. */
    "object[declare]": T;
    /** A message that the browser can show while loading the object's implementation and data. */
    "object[standby]": T;
    /** The position of the element in the tabbing navigation order for the current document. */
    "object[tabindex]": T;
    /** Name of the parameter. */
    "param[name]": T;
    /** Specifies the value of the parameter. */
    "param[value]": T;
    /** Only used if the `valuetype` is set to "ref". Specifies the MIME type of values found at the URI specified by value. */
    "param[type]": T;
    /**
     * Specifies the type of the `value` attribute. Possible values are:
     *
     * *   data: Default value. The value is passed to the object's implementation as a string.
     * *   ref: The value is a URI to a resource where run-time values are stored.
     * *   object: An ID of another [`\<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object "The HTML \<object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.") in the same document.
     */
    "param[valuetype]": T;
    "video[src]": T;
    "video[crossorigin]": T;
    "video[poster]": T;
    "video[preload]": T;
    /** A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data. */
    "video[autoplay]": T;
    "video[mediagroup]": T;
    "video[loop]": T;
    "video[muted]": T;
    "video[controls]": T;
    "video[width]": T;
    "video[height]": T;
    /** The URL of the audio to embed. This is subject to [HTTP access controls](https://developer.mozilla.org/en-US/docs/HTTP_access_control). This is optional; you may instead use the [`\<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML \<source> element specifies multiple media resources for the \<picture>, the \<audio> element, or the \<video> element.") element within the audio block to specify the audio to embed. */
    "audio[src]": T;
    /**
     * This enumerated attribute indicates whether to use CORS to fetch the related image. [CORS-enabled resources](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`\<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML \<canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:
     *
     * anonymous
     *
     * Sends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the image will be _tainted_, and its usage restricted.
     *
     * use-credentials
     *
     * Sends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the image will be _tainted_ and its usage restricted.
     *
     * When not present, the resource is fetched without a CORS request (i.e. without sending the `Origin:` HTTP header), preventing its non-tainted used in [`\<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML \<canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") elements. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/HTML/CORS_settings_attributes) for additional information.
     */
    "audio[crossorigin]": T;
    /**
     * This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:
     *
     * *   `none`: Indicates that the audio should not be preloaded.
     * *   `metadata`: Indicates that only audio metadata (e.g. length) is fetched.
     * *   `auto`: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.
     * *   _empty string_: A synonym of the `auto` value.
     *
     * If not set, `preload`'s default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to `metadata`.
     *
     * **Usage notes:**
     *
     * *   The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.
     * *   The browser is not forced by the specification to follow the value of this attribute; it is a mere hint.
     */
    "audio[preload]": T;
    /**
     * A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.
     *
     * **Note**: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.
     */
    "audio[autoplay]": T;
    "audio[mediagroup]": T;
    /** A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio. */
    "audio[loop]": T;
    /** A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is `false`. */
    "audio[muted]": T;
    /** If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback. */
    "audio[controls]": T;
    /** Required for [`\<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML \<audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the \<source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") and [`\<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (\<video>) embeds a media player which supports video playback into the document."), address of the media resource. The value of this attribute is ignored when the `\<source>` element is placed inside a [`\<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML \<picture> element contains zero or more \<source> elements and one \<img> element to provide versions of an image for different display/device scenarios.") element. */
    "source[src]": T;
    /** The MIME-type of the resource, optionally with a `codecs` parameter. See [RFC 4281](https://tools.ietf.org/html/rfc4281) for information about how to specify codecs. */
    "source[type]": T;
    /**
     * Is a list of source sizes that describes the final rendered width of the image represented by the source. Each source size consists of a comma-separated list of media condition-length pairs. This information is used by the browser to determine, before laying the page out, which image defined in [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attr-srcset) to use.
     * The `sizes` attribute has an effect only when the [`\<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML \<source> element specifies multiple media resources for the \<picture>, the \<audio> element, or the \<video> element.") element is the direct child of a [`\<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML \<picture> element contains zero or more \<source> elements and one \<img> element to provide versions of an image for different display/device scenarios.") element.
     */
    "source[sizes]": T;
    /**
     * A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use. Each string is composed of:
     *
     * 1.  one URL to an image,
     * 2.  a width descriptor, that is a positive integer directly followed by `'w'`. The default value, if missing, is the infinity.
     * 3.  a pixel density descriptor, that is a positive floating number directly followed by `'x'`. The default value, if missing, is `1x`.
     *
     * Each string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, there must be only one string containing the same tuple of width descriptor and pixel density descriptor.
     * The browser chooses the most adequate image to display at a given point of time.
     * The `srcset` attribute has an effect only when the [`\<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML \<source> element specifies multiple media resources for the \<picture>, the \<audio> element, or the \<video> element.") element is the direct child of a [`\<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML \<picture> element contains zero or more \<source> elements and one \<img> element to provide versions of an image for different display/device scenarios.") element.
     */
    "source[srcset]": T;
    /** [Media query](https://developer.mozilla.org/en-US/docs/CSS/Media_queries) of the resource's intended media; this should be used only in a [`\<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML \<picture> element contains zero or more \<source> elements and one \<img> element to provide versions of an image for different display/device scenarios.") element. */
    "source[media]": T;
    /** This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element. */
    "track[default]": T;
    /**
     * How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.) The following keywords are allowed:
     *
     * *   `subtitles`
     * *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.
     * *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.
     * *   `captions`
     * *   Closed captions provide a transcription and possibly a translation of audio.
     * *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).
     * *   Suitable for users who are deaf or when the sound is muted.
     * *   `descriptions`
     * *   Textual description of the video content.
     * *   Suitable for users who are blind or where the video cannot be seen.
     * *   `chapters`
     * *   Chapter titles are intended to be used when the user is navigating the media resource.
     * *   `metadata`
     * *   Tracks used by scripts. Not visible to the user.
     */
    "track[kind]": T;
    /** A user-readable title of the text track which is used by the browser when listing available text tracks. */
    "track[label]": T;
    /** Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the [`\<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML \<audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the \<source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") or [`\<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (\<video>) embeds a media player which supports video playback into the document.") parent element of the `track` element has a [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute. */
    "track[src]": T;
    /** Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to `subtitles,` then `srclang` must be defined. */
    "track[srclang]": T;
    /** The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value. */
    "map[name]": T;
    "area[alt]": T;
    "area[coords]": T;
    "area[shape]": T;
    "area[href]": T;
    "area[target]": T;
    "area[download]": T;
    "area[ping]": T;
    "area[rel]": T;
    "area[hreflang]": T;
    "area[type]": T;
    /** Specifies a keyboard navigation accelerator for the element. Pressing ALT or a similar key in association with the specified character selects the form control correlated with that key sequence. Page designers are forewarned to avoid key sequences already bound to browsers. This attribute is global since HTML5. */
    "area[accesskey]": T;
    "table[border]": T;
    /**
     * This enumerated attribute indicates how the table must be aligned inside the containing document. It may have the following values:
     *
     * *   left: the table is displayed on the left side of the document;
     * *   center: the table is displayed in the center of the document;
     * *   right: the table is displayed on the right side of the document.
     *
     * **Usage Note**
     *
     * *   **Do not use this attribute**, as it has been deprecated. The [`\<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table "The HTML \<table> element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). Set [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") and [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") to `auto` or [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin "The margin CSS property sets the margin area on all four sides of an element. It is a shorthand for margin-top, margin-right, margin-bottom, and margin-left.") to `0 auto` to achieve an effect that is similar to the align attribute.
     * *   Prior to Firefox 4, Firefox also supported the `middle`, `absmiddle`, and `abscenter` values as synonyms of `center`, in quirks mode only.
     */
    "table[align]": T;
    /**
     * This enumerated attribute indicates how the caption must be aligned with respect to the table. It may have one of the following values:
     *
     * `left`
     *
     * The caption is displayed to the left of the table.
     *
     * `top`
     *
     * The caption is displayed above the table.
     *
     * `right`
     *
     * The caption is displayed to the right of the table.
     *
     * `bottom`
     *
     * The caption is displayed below the table.
     *
     * **Usage note:** Do not use this attribute, as it has been deprecated. The [`\<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption "The HTML Table Caption element (\<caption>) specifies the caption (or title) of a table, and if used is always the first child of a \<table>.") element should be styled using the [CSS](https://developer.mozilla.org/en-US/docs/CSS) properties [`caption-side`](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side "The caption-side CSS property puts the content of a table's \<caption> on the specified side. The values are relative to the writing-mode of the table.") and [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.").
     */
    "caption[align]": T;
    "colgroup[span]": T;
    /**
     * This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:
     *
     * *   `left`, aligning the content to the left of the cell
     * *   `center`, centering the content in the cell
     * *   `right`, aligning the content to the right of the cell
     * *   `justify`, inserting spaces into the textual content so that the content is justified in the cell
     * *   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:\<string>)")).
     *
     * If this attribute is not set, the `left` value is assumed. The descendant [`\<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML \<col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a \<colgroup> element.") elements may override this value using their own [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-align) attribute.
     *
     * **Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.
     *
     * *   To achieve the same effect as the `left`, `center`, `right` or `justify` values:
     * *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`\<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML \<colgroup> element defines a group of columns within a table.") element. Because [`\<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML \<td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`\<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML \<colgroup> element defines a group of columns within a table.") element, they won't inherit it.
     * *   If the table doesn't use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use one `td:nth-child(an+b)` CSS selector per column, where a is the total number of the columns in the table and b is the ordinal position of this column in the table. Only after this selector the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property can be used.
     * *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.
     * *   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.
     */
    "colgroup[align]": T;
    "col[span]": T;
    /**
     * This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:
     *
     * *   `left`, aligning the content to the left of the cell
     * *   `center`, centering the content in the cell
     * *   `right`, aligning the content to the right of the cell
     * *   `justify`, inserting spaces into the textual content so that the content is justified in the cell
     * *   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:\<string>)")).
     *
     * If this attribute is not set, its value is inherited from the [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-align) of the [`\<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML \<colgroup> element defines a group of columns within a table.") element this `\<col>` element belongs too. If there are none, the `left` value is assumed.
     *
     * **Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.
     *
     * *   To achieve the same effect as the `left`, `center`, `right` or `justify` values:
     * *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`\<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML \<col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a \<colgroup> element.") element. Because [`\<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML \<td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`\<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML \<col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a \<colgroup> element.") element, they won't inherit it.
     * *   If the table doesn't use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use the `td:nth-child(an+b)` CSS selector. Set `a` to zero and `b` to the position of the column in the table, e.g. `td:nth-child(2) \{ text-align: right; \}` to right-align the second column.
     * *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.
     * *   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.
     */
    "col[align]": T;
    /**
     * This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:
     *
     * *   `left`, aligning the content to the left of the cell
     * *   `center`, centering the content in the cell
     * *   `right`, aligning the content to the right of the cell
     * *   `justify`, inserting spaces into the textual content so that the content is justified in the cell
     * *   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes.
     *
     * If this attribute is not set, the `left` value is assumed.
     *
     * **Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.
     *
     * *   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.
     * *   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.
     */
    "tbody[align]": T;
    /**
     * This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:
     *
     * *   `left`, aligning the content to the left of the cell
     * *   `center`, centering the content in the cell
     * *   `right`, aligning the content to the right of the cell
     * *   `justify`, inserting spaces into the textual content so that the content is justified in the cell
     * *   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:\<string>)")).
     *
     * If this attribute is not set, the `left` value is assumed.
     *
     * **Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.
     *
     * *   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.
     * *   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.
     */
    "thead[align]": T;
    /**
     * This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:
     *
     * *   `left`, aligning the content to the left of the cell
     * *   `center`, centering the content in the cell
     * *   `right`, aligning the content to the right of the cell
     * *   `justify`, inserting spaces into the textual content so that the content is justified in the cell
     * *   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:\<string>)")).
     *
     * If this attribute is not set, the `left` value is assumed.
     *
     * **Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.
     *
     * *   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.
     * *   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.
     */
    "tfoot[align]": T;
    /**
     * A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") which specifies how the cell's context should be aligned horizontally within the cells in the row; this is shorthand for using `align` on every cell in the row individually. Possible values are:
     *
     * `left`
     *
     * Align the content of each cell at its left edge.
     *
     * `center`
     *
     * Center the contents of each cell between their left and right edges.
     *
     * `right`
     *
     * Align the content of each cell at its right edge.
     *
     * `justify`
     *
     * Widen whitespaces within the text of each cell so that the text fills the full width of each cell (full justification).
     *
     * `char`
     *
     * Align each cell in the row on a specific character (such that each row in the column that is configured this way will horizontally align its cells on that character). This uses the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-charoff) to establish the alignment character (typically "." or "," when aligning numerical data) and the number of characters that should follow the alignment character. This alignment type was never widely supported.
     *
     * If no value is expressly set for `align`, the parent node's value is inherited.
     *
     * Instead of using the obsolete `align` attribute, you should instead use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to establish `left`, `center`, `right`, or `justify` alignment for the row's cells. To apply character-based alignment, set the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the alignment character (such as `"."` or `","`).
     */
    "tr[align]": T;
    "td[colspan]": T;
    "td[rowspan]": T;
    "td[headers]": T;
    /**
     * This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.
     *
     * **Note:** Do not use this attribute as it is obsolete in the latest standard. Alternatively, you can put the abbreviated description inside the cell and place the long content in the **title** attribute.
     */
    "td[abbr]": T;
    /**
     * This enumerated attribute specifies how the cell content's horizontal alignment will be handled. Possible values are:
     *
     * *   `left`: The content is aligned to the left of the cell.
     * *   `center`: The content is centered in the cell.
     * *   `right`: The content is aligned to the right of the cell.
     * *   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.
     * *   `char` (with text only): The content is aligned to a character inside the `\<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:\<string>)")).
     *
     * The default value when this attribute is not specified is `left`.
     *
     * **Note:** Do not use this attribute as it is obsolete in the latest standard.
     *
     * *   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.
     * *   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char). Unimplemented in CSS3.
     */
    "td[align]": T;
    /**
     * This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.
     *
     * **Note:** Do not use this attribute as it is obsolete in the latest standard.
     */
    "td[axis]": T;
    /**
     * This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by '#'. This attribute may be used with one of sixteen predefined color strings:
     *
     *
     *
     * `black` = "#000000"
     *
     *
     *
     * `green` = "#008000"
     *
     *
     *
     * `silver` = "#C0C0C0"
     *
     *
     *
     * `lime` = "#00FF00"
     *
     *
     *
     * `gray` = "#808080"
     *
     *
     *
     * `olive` = "#808000"
     *
     *
     *
     * `white` = "#FFFFFF"
     *
     *
     *
     * `yellow` = "#FFFF00"
     *
     *
     *
     * `maroon` = "#800000"
     *
     *
     *
     * `navy` = "#000080"
     *
     *
     *
     * `red` = "#FF0000"
     *
     *
     *
     * `blue` = "#0000FF"
     *
     *
     *
     * `purple` = "#800080"
     *
     *
     *
     * `teal` = "#008080"
     *
     *
     *
     * `fuchsia` = "#FF00FF"
     *
     *
     *
     * `aqua` = "#00FFFF"
     *
     * **Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`\<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML \<td> element defines a cell of a table that contains data. It participates in the table model.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To create a similar effect use the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](https://developer.mozilla.org/en-US/docs/CSS) instead.
     */
    "td[bgcolor]": T;
    "th[colspan]": T;
    "th[rowspan]": T;
    "th[headers]": T;
    "th[scope]": T;
    "th[sorted]": T;
    /** This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself. */
    "th[abbr]": T;
    /**
     * This enumerated attribute specifies how the cell content's horizontal alignment will be handled. Possible values are:
     *
     * *   `left`: The content is aligned to the left of the cell.
     * *   `center`: The content is centered in the cell.
     * *   `right`: The content is aligned to the right of the cell.
     * *   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.
     * *   `char` (with text only): The content is aligned to a character inside the `\<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-charoff) attributes.
     *
     * The default value when this attribute is not specified is `left`.
     *
     * **Note:** Do not use this attribute as it is obsolete in the latest standard.
     *
     * *   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.
     * *   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char). Unimplemented in CSS3.
     */
    "th[align]": T;
    /**
     * This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.
     *
     * **Note:** Do not use this attribute as it is obsolete in the latest standard: use the [`scope`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope) attribute instead.
     */
    "th[axis]": T;
    /**
     * This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by '#'. This attribute may be used with one of sixteen predefined color strings:
     *
     *
     *
     * `black` = "#000000"
     *
     *
     *
     * `green` = "#008000"
     *
     *
     *
     * `silver` = "#C0C0C0"
     *
     *
     *
     * `lime` = "#00FF00"
     *
     *
     *
     * `gray` = "#808080"
     *
     *
     *
     * `olive` = "#808000"
     *
     *
     *
     * `white` = "#FFFFFF"
     *
     *
     *
     * `yellow` = "#FFFF00"
     *
     *
     *
     * `maroon` = "#800000"
     *
     *
     *
     * `navy` = "#000080"
     *
     *
     *
     * `red` = "#FF0000"
     *
     *
     *
     * `blue` = "#0000FF"
     *
     *
     *
     * `purple` = "#800080"
     *
     *
     *
     * `teal` = "#008080"
     *
     *
     *
     * `fuchsia` = "#FF00FF"
     *
     *
     *
     * `aqua` = "#00FFFF"
     *
     * **Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`\<th>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th "The HTML \<th> element defines a cell as header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). To create a similar effect use the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) instead.
     */
    "th[bgcolor]": T;
    /**
     * A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `"UNKNOWN"`, indicates the same encoding as that of the document containing the form element.
     * In previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters.
     */
    "form[accept-charset]": T;
    /** The URI of a program that processes the form information. This value can be overridden by a [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formaction) attribute on a [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`\<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element. */
    "form[action]": T;
    /**
     * Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:
     *
     * *   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.
     * *   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.
     *
     * For most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields).
     */
    "form[autocomplete]": T;
    /**
     * When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:
     *
     * *   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.
     * *   `multipart/form-data`: The value used for an [`\<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the `type` attribute set to "file".
     * *   `text/plain`: (HTML5)
     *
     * This value can be overridden by a [`formenctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formenctype) attribute on a [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`\<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.
     */
    "form[enctype]": T;
    /**
     * The [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:
     *
     * *   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.
     * *   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.
     * *   `dialog`: Use when the form is inside a [`\<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog "The HTML \<dialog> element represents a dialog box or other interactive component, such as an inspector or window.") element to close the dialog when submitted.
     *
     * This value can be overridden by a [`formmethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formmethod) attribute on a [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`\<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.
     */
    "form[method]": T;
    /** The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5. */
    "form[name]": T;
    /** This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a [`formnovalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formnovalidate) attribute on a [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`\<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element belonging to the form. */
    "form[novalidate]": T;
    /**
     * A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a _browsing context_ (for example, tab, window, or inline frame). The following keywords have special meanings:
     *
     * *   `_self`: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.
     * *   `_blank`: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.
     * *   `_parent`: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.
     * *   `_top`: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.
     * *   _iframename_: The response is displayed in a named [`\<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe "The HTML Inline Frame element (\<iframe>) represents a nested browsing context, embedding another HTML page into the current one.").
     *
     * HTML5: This value can be overridden by a [`formtarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formtarget) attribute on a [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`\<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.
     */
    "form[target]": T;
    /**
     * A comma-separated list of content types that the server accepts.
     *
     * **Usage note:** This attribute has been removed in HTML5 and should no longer be used. Instead, use the [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) attribute of the specific [`\<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.
     */
    "form[accept]": T;
    /**
     * This is a nonstandard attribute used by iOS Safari Mobile which controls whether and how the text value for textual form control descendants should be automatically capitalized as it is entered/edited by the user. If the `autocapitalize` attribute is specified on an individual form control descendant, it trumps the form-wide `autocapitalize` setting. The non-deprecated values are available in iOS 5 and later. The default value is `sentences`. Possible values are:
     *
     * *   `none`: Completely disables automatic capitalization
     * *   `sentences`: Automatically capitalize the first letter of sentences.
     * *   `words`: Automatically capitalize the first letter of words.
     * *   `characters`: Automatically capitalize all characters.
     * *   `on`: Deprecated since iOS 5.
     * *   `off`: Deprecated since iOS 5.
     */
    "form[autocapitalize]": T;
    /** The [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.") element with which the label is associated (its _form owner_). If specified, the value of the attribute is the `id` of a [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. This lets you place label elements anywhere within a document, not just as descendants of their form elements. */
    "label[form]": T;
    /**
     * The [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-id) of a [labelable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `\<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.
     *
     * **Note**: A `\<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element.
     */
    "label[for]": T;
    "input[accept]": T;
    "input[alt]": T;
    "input[autocomplete]": T;
    "input[autofocus]": T;
    "input[checked]": T;
    "input[dirname]": T;
    "input[disabled]": T;
    "input[form]": T;
    "input[formaction]": T;
    "input[formenctype]": T;
    "input[formmethod]": T;
    "input[formnovalidate]": T;
    "input[formtarget]": T;
    "input[height]": T;
    "input[inputmode]": T;
    "input[list]": T;
    "input[max]": T;
    "input[maxlength]": T;
    "input[min]": T;
    "input[minlength]": T;
    "input[multiple]": T;
    "input[name]": T;
    "input[pattern]": T;
    "input[placeholder]": T;
    "input[readonly]": T;
    "input[required]": T;
    "input[size]": T;
    "input[src]": T;
    "input[step]": T;
    "input[type]": T;
    "input[value]": T;
    "input[width]": T;
    /** This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified. */
    "button[autofocus]": T;
    /**
     * This Boolean attribute indicates that the user cannot interact with the button. If this attribute is not specified, the button inherits its setting from the containing element, for example [`\<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML \<fieldset> element is used to group several controls as well as labels (\<label>) within a web form."); if there is no containing element with the **disabled** attribute set, then the button is enabled.
     *
     * Firefox will, unlike other browsers, by default, [persist the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") across page loads. Use the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-autocomplete) attribute to control this feature.
     */
    "button[disabled]": T;
    /** The form element that the button is associated with (its _form owner_). The value of the attribute must be the **id** attribute of a [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. If this attribute is not specified, the `\<button>` element will be associated to an ancestor [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.") element, if one exists. This attribute enables you to associate `\<button>` elements to [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.") elements anywhere within a document, not just as descendants of [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.") elements. */
    "button[form]": T;
    /** The URI of a program that processes the information submitted by the button. If specified, it overrides the [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action) attribute of the button's form owner. */
    "button[formaction]": T;
    /**
     * If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. Possible values are:
     *
     * *   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.
     * *   `multipart/form-data`: Use this value if you are using an [`\<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) attribute set to `file`.
     * *   `text/plain`
     *
     * If this attribute is specified, it overrides the [`enctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype) attribute of the button's form owner.
     */
    "button[formenctype]": T;
    /**
     * If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. Possible values are:
     *
     * *   `post`: The data from the form are included in the body of the form and sent to the server.
     * *   `get`: The data from the form are appended to the **form** attribute URI, with a '?' as a separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.
     *
     * If specified, this attribute overrides the [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method) attribute of the button's form owner.
     */
    "button[formmethod]": T;
    /** If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the [`novalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate) attribute of the button's form owner. */
    "button[formnovalidate]": T;
    /**
     * If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form. This is a name of, or keyword for, a _browsing context_ (for example, tab, window, or inline frame). If this attribute is specified, it overrides the [`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-target) attribute of the button's form owner. The following keywords have special meanings:
     *
     * *   `_self`: Load the response into the same browsing context as the current one. This value is the default if the attribute is not specified.
     * *   `_blank`: Load the response into a new unnamed browsing context.
     * *   `_parent`: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.
     * *   `_top`: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.
     */
    "button[formtarget]": T;
    /** The name of the button, which is submitted with the form data. */
    "button[name]": T;
    /**
     * The type of the button. Possible values are:
     *
     * *   `submit`: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.
     * *   `reset`: The button resets all the controls to their initial values.
     * *   `button`: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur.
     */
    "button[type]": T;
    /** The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted. */
    "button[value]": T;
    /** The use of this attribute on a [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") is nonstandard and Firefox-specific. By default, unlike other browsers, [Firefox persists the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`\<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML \<button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") across page loads. Setting the value of this attribute to `off` (i.e. `autocomplete="off"`) disables this feature. See [bug 654072](https://bugzilla.mozilla.org/show_bug.cgi?id=654072 "if disabled state is changed with javascript, the normal state doesn't return after refreshing the page"). */
    "button[autocomplete]": T;
    /** A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") providing a hint for a [user agent's](https://developer.mozilla.org/en-US/docs/Glossary/user_agent "user agent's: A user agent is a computer program representing a person, for example, a browser in a Web context.") autocomplete feature. See [The HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for a complete list of values and details on how to use autocomplete. */
    "select[autocomplete]": T;
    /** This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the `autofocus` attribute. */
    "select[autofocus]": T;
    /** This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example `fieldset`; if there is no containing element with the `disabled` attribute set, then the control is enabled. */
    "select[disabled]": T;
    /** This attribute lets you specify the form element to which the select element is associated (that is, its "form owner"). If this attribute is specified, its value must be the same as the `id` of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements. */
    "select[form]": T;
    /** This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When `multiple` is specified, most browsers will show a scrolling list box instead of a single line dropdown. */
    "select[multiple]": T;
    /** This attribute is used to specify the name of the control. */
    "select[name]": T;
    /** A Boolean attribute indicating that an option with a non-empty string value must be selected. */
    "select[required]": T;
    /**
     * If the control is presented as a scrolling list box (e.g. when `multiple` is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.
     *
     * **Note:** According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox.
     */
    "select[size]": T;
    /** If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones. */
    "optgroup[disabled]": T;
    /** The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used. */
    "optgroup[label]": T;
    /** If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won't receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled [`\<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup "The HTML \<optgroup> element creates a grouping of options within a \<select> element.") element. */
    "option[disabled]": T;
    /** This attribute is text for the label indicating the meaning of the option. If the `label` attribute isn't defined, its value is that of the element text content. */
    "option[label]": T;
    /** If present, this Boolean attribute indicates that the option is initially selected. If the `\<option>` element is the descendant of a [`\<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML \<select> element represents a control that provides a menu of options") element whose [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute is not set, only one single `\<option>` of this [`\<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML \<select> element represents a control that provides a menu of options") element may have the `selected` attribute. */
    "option[selected]": T;
    /** The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element. */
    "option[value]": T;
    /**
     * This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:
     *
     * *   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.
     * *   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.
     *
     * If the `autocomplete` attribute is not specified on a `\<textarea>` element, then the browser uses the `autocomplete` attribute value of the `\<textarea>` element's form owner. The form owner is either the [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.") element that this `\<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete) attribute in [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.").
     */
    "textarea[autocomplete]": T;
    /** This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified. */
    "textarea[autofocus]": T;
    /** The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`. */
    "textarea[cols]": T;
    "textarea[dirname]": T;
    /** This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example [`\<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML \<fieldset> element is used to group several controls as well as labels (\<label>) within a web form."); if there is no containing element when the `disabled` attribute is set, the control is enabled. */
    "textarea[disabled]": T;
    /** The form element that the `\<textarea>` element is associated with (its "form owner"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `\<textarea>` element must be a descendant of a form element. This attribute enables you to place `\<textarea>` elements anywhere within a document, not just as descendants of form elements. */
    "textarea[form]": T;
    "textarea[inputmode]": T;
    /** The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters. */
    "textarea[maxlength]": T;
    /** The minimum number of characters (unicode code points) required that the user should enter. */
    "textarea[minlength]": T;
    /** The name of the control. */
    "textarea[name]": T;
    /**
     * A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.
     *
     * **Note:** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are _not_ a substitute for a proper [`\<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label "The HTML \<label> element represents a caption for an item in a user interface.") element tied to the input. See [Labels and placeholders](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Labels_and_placeholders "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") in [\<input>: The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") for a full explanation.
     */
    "textarea[placeholder]": T;
    /** This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form. */
    "textarea[readonly]": T;
    /** This attribute specifies that the user must fill in a value before submitting a form. */
    "textarea[required]": T;
    /** The number of visible text lines for the control. */
    "textarea[rows]": T;
    /**
     * Indicates how the control wraps text. Possible values are:
     *
     * *   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.
     * *   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.
     * *   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `\<textarea>` becomes horizontally scrollable.
     *
     * If this attribute is not specified, `soft` is its default value.
     */
    "textarea[wrap]": T;
    /**
     * This is a non-standard attribute supported by WebKit on iOS (therefore nearly all browsers running on iOS, including Safari, Firefox, and Chrome), which controls whether and how the text value should be automatically capitalized as it is entered/edited by the user. The non-deprecated values are available in iOS 5 and later. Possible values are:
     *
     * *   `none`: Completely disables automatic capitalization.
     * *   `sentences`: Automatically capitalize the first letter of sentences.
     * *   `words`: Automatically capitalize the first letter of words.
     * *   `characters`: Automatically capitalize all characters.
     * *   `on`: Deprecated since iOS 5.
     * *   `off`: Deprecated since iOS 5.
     */
    "textarea[autocapitalize]": T;
    /**
     * Specifies whether the `\<textarea>` is subject to spell checking by the underlying browser/OS. the value can be:
     *
     * *   `true`: Indicates that the element needs to have its spelling and grammar checked.
     * *   `default` : Indicates that the element is to act according to a default behavior, possibly based on the parent element's own `spellcheck` value.
     * *   `false` : Indicates that the element should not be spell checked.
     */
    "textarea[spellcheck]": T;
    /** A space-separated list of other elements’ [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)s, indicating that those elements contributed input values to (or otherwise affected) the calculation. */
    "output[for]": T;
    /** The [form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) that this element is associated with (its "form owner"). The value of the attribute must be an `id` of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements. */
    "output[form]": T;
    /** The name of the element, exposed in the [`HTMLFormElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement "The HTMLFormElement interface represents a \<form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements.") API. */
    "output[name]": T;
    /** This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take. */
    "progress[value]": T;
    /** This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1. */
    "progress[max]": T;
    /**
     * The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.
     *
     * **Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it.
     */
    "meter[value]": T;
    /** The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0. */
    "meter[min]": T;
    /** The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1. */
    "meter[max]": T;
    /** The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value. */
    "meter[low]": T;
    /** The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value. */
    "meter[high]": T;
    /** This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred. */
    "meter[optimum]": T;
    /** This attribute associates the element with a `form` element that has ownership of the `meter` element. For example, a `meter` might be displaying a range corresponding to an `input` element of `type` _number_. This attribute is only used if the `meter` element is being used as a form-associated element; even then, it may be omitted if the element appears as a descendant of a `form` element. */
    "meter[form]": T;
    /** If this Boolean attribute is set, all form controls that are descendants of the `\<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the `\<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`\<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend "The HTML \<legend> element represents a caption for the content of its parent \<fieldset>.") element won't be disabled. */
    "fieldset[disabled]": T;
    /** This attribute takes the value of the `id` attribute of a [`\<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML \<form> element represents a document section that contains interactive controls for submitting information to a web server.") element you want the `\<fieldset>` to be part of, even if it is not inside the form. */
    "fieldset[form]": T;
    /**
     * The name associated with the group.
     *
     * **Note**: The caption for the fieldset is given by the first [`\<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend "The HTML \<legend> element represents a caption for the content of its parent \<fieldset>.") element nested inside it.
     */
    "fieldset[name]": T;
    /** This Boolean attribute indicates whether or not the details — that is, the contents of the `\<details>` element — are currently visible. The default, `false`, means the details are not visible. */
    "details[open]": T;
    /** Indicates that the dialog is active and available for interaction. When the `open` attribute is not set, the dialog shouldn't be shown to the user. */
    "dialog[open]": T;
    /**
     * This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.
     *
     * If a `script` element has a `src` attribute specified, it should not have a script embedded inside its tags.
     */
    "script[src]": T;
    /**
     * This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:
     *
     * *   **Omitted or a JavaScript MIME type:** For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the `src` attribute) code. JavaScript MIME types are [listed in the specification](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#JavaScript_types).
     * *   **`module`:** For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the `charset` and `defer` attributes. For information on using `module`, see [ES6 in Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/). Code may behave differently when the `module` keyword is used.
     * *   **Any other value:** The embedded content is treated as a data block which won't be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The `src` attribute will be ignored.
     *
     * **Note:** in Firefox you could specify the version of JavaScript contained in a `\<script>` element by including a non-standard `version` parameter inside the `type` attribute — for example `type="text/javascript;version=1.8"`. This has been removed in Firefox 59 (see [bug 1428745](https://bugzilla.mozilla.org/show_bug.cgi?id=1428745 "FIXED: Remove support for version parameter from script loader")).
     */
    "script[type]": T;
    "script[charset]": T;
    /**
     * This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.
     *
     * This attribute must not be used if the `src` attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.
     *
     * Browsers usually assume the worst case scenario and load scripts synchronously, (i.e. `async="false"`) during HTML parsing.
     *
     * Dynamically inserted scripts (using [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement "In an HTML document, the document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized.")) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set `async="false"`.
     *
     * See [Browser compatibility](#Browser_compatibility) for notes on browser support. See also [Async scripts for asm.js](https://developer.mozilla.org/en-US/docs/Games/Techniques/Async_scripts).
     */
    "script[async]": T;
    /**
     * This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded "/en-US/docs/Web/Events/DOMContentLoaded").
     *
     * Scripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.
     *
     * This attribute must not be used if the `src` attribute is absent (i.e. for inline scripts), in this case it would have no effect.
     *
     * To achieve a similar effect for dynamically inserted scripts use `async="false"` instead. Scripts with the `defer` attribute will execute in the order in which they appear in the document.
     */
    "script[defer]": T;
    /** Normal `script` elements pass minimal information to the [`window.onerror`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror "The onerror property of the GlobalEventHandlers mixin is an EventHandler that processes error events.") for scripts which do not pass the standard [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for a more descriptive explanation of its valid arguments. */
    "script[crossorigin]": T;
    /** A cryptographic nonce (number used once) to whitelist inline scripts in a [script-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial. */
    "script[nonce]": T;
    /** This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). */
    "script[integrity]": T;
    /** This Boolean attribute is set to indicate that the script should not be executed in browsers that support [ES2015 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code. */
    "script[nomodule]": T;
    /**
     * Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the script, or resources fetched by the script:
     *
     * *   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.
     * *   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin "origin: Web content's origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS "TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS "HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.")).
     * *   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host "host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails."), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port "port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.").
     * *   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.
     * *   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy "same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin."), but cross-origin requests will contain no referrer information.
     * *   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (e.g. HTTPS→HTTPS), but don't send it to a less secure destination (e.g. HTTPS→HTTP).
     * *   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, but only send the origin when the protocol security level stays the same (e.g.HTTPS→HTTPS), and send no header to a less secure destination (e.g. HTTPS→HTTP).
     * *   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.
     *
     * **Note**: An empty string value (`""`) is both the default value, and a fallback value if `referrerpolicy` is not supported. If `referrerpolicy` is not explicitly specified on the `\<script>` element, it will adopt a higher-level referrer policy, i.e. one set on the whole document or domain. If a higher-level policy is not available, the empty string is treated as being equivalent to `no-referrer-when-downgrade`.
     */
    "script[referrerpolicy]": T;
    /** Like the `textContent` attribute, this attribute sets the text content of the element. Unlike the `textContent` attribute, however, this attribute is evaluated as executable code after the node is inserted into the DOM. */
    "script[text]": T;
    /** The width of the coordinate space in CSS pixels. Defaults to 300. */
    "canvas[width]": T;
    /** The height of the coordinate space in CSS pixels. Defaults to 150. */
    "canvas[height]": T;
    /** Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized [`canvas.getContext('2d', \{ alpha: false \})`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext "The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.") instead. */
    "canvas[moz-opaque]": T;
    /**
     * Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey)
     */
    "[accesskey]": T;
    /**
     * Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:
     *
     * *   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)
     * *   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase
     * *   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase
     * *   `characters`, all letters should default to uppercase
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocapitalize)
     */
    "[autocapitalize]": T;
    /**
     * A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the [class selectors](https://developer.mozilla.org/docs/Web/CSS/Class_selectors) or functions like the method [`Document.getElementsByClassName()`](https://developer.mozilla.org/docs/Web/API/Document/getElementsByClassName "returns an array-like object of all child elements which have all of the given class names.").
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/class)
     */
    "[class]": T;
    /**
     * An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:
     *
     * *   `true` or the _empty string_, which indicates that the element must be editable;
     * *   `false`, which indicates that the element must not be editable.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contenteditable)
     */
    "[contenteditable]": T;
    /**
     * The `[**id**](#attr-id)` of a [`\<menu>`](https://developer.mozilla.org/docs/Web/HTML/Element/menu "The HTML \<menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.") to use as the contextual menu for this element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contextmenu)
     */
    "[contextmenu]": T;
    /**
     * An enumerated attribute indicating the directionality of the element's text. It can have the following values:
     *
     * *   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);
     * *   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);
     * *   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/dir)
     */
    "[dir]": T;
    /**
     * An enumerated attribute indicating whether the element can be dragged, using the [Drag and Drop API](https://developer.mozilla.org/docs/DragDrop/Drag_and_Drop). It can have the following values:
     *
     * *   `true`, which indicates that the element may be dragged
     * *   `false`, which indicates that the element may not be dragged.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable)
     */
    "[draggable]": T;
    /**
     * An enumerated attribute indicating what types of content can be dropped on an element, using the [Drag and Drop API](https://developer.mozilla.org/docs/DragDrop/Drag_and_Drop). It can have the following values:
     *
     * *   `copy`, which indicates that dropping will create a copy of the element that was dragged
     * *   `move`, which indicates that the element that was dragged will be moved to this new location.
     * *   `link`, will create a link to the dragged data.
     */
    "[dropzone]": T;
    /**
     * Used to transitively export shadow parts from a nested shadow tree into a containing light tree.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/exportparts)
     */
    "[exportparts]": T;
    /**
     * A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/hidden)
     */
    "[hidden]": T;
    /**
     * Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/id)
     */
    "[id]": T;
    /**
     * Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on [`\<input>`](https://developer.mozilla.org/docs/Web/HTML/Element/input "The HTML \<input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") elements, but is usable on any element while in `[contenteditable](https://developer.mozilla.org/docs/Web/HTML/Global_attributes#attr-contenteditable)` mode.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/inputmode)
     */
    "[inputmode]": T;
    /**
     * Allows you to specify that a standard HTML element should behave like a registered custom built-in element (see [Using custom elements](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements) for more details).
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/is)
     */
    "[is]": T;
    /**
     * The unique, global identifier of an item.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemid)
     */
    "[itemid]": T;
    /**
     * Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemprop)
     */
    "[itemprop]": T;
    /**
     * Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemref)
     */
    "[itemref]": T;
    /**
     * `itemscope` (usually) works along with `[itemtype](https://developer.mozilla.org/docs/Web/HTML/Global_attributes#attr-itemtype)` to specify that the HTML contained in a block is about a particular item. `itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `itemtype` is a valid URL of a vocabulary (such as [schema.org](https://schema.org/)) that describes the item and its properties context.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemscope)
     */
    "[itemscope]": T;
    /**
     * Specifies the URL of the vocabulary that will be used to define `itemprop`s (item properties) in the data structure. `[itemscope](https://developer.mozilla.org/docs/Web/HTML/Global_attributes#attr-itemscope)` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemtype)
     */
    "[itemtype]": T;
    /**
     * Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user. The attribute contains one “language tag” (made of hyphen-separated “language subtags”) in the format defined in [_Tags for Identifying Languages (BCP47)_](https://www.ietf.org/rfc/bcp/bcp47.txt). [**xml:lang**](#attr-xml:lang) has priority over it.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang)
     */
    "[lang]": T;
    /**
     * A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the [`::part`](https://developer.mozilla.org/docs/Web/CSS/::part "The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.") pseudo-element.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/part)
     */
    "[part]": T;
    "[role]": T;
    /**
     * Assigns a slot in a [shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Shadow_DOM) shadow tree to an element: An element with a `slot` attribute is assigned to the slot created by the [`\<slot>`](https://developer.mozilla.org/docs/Web/HTML/Element/slot "The HTML \<slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.") element whose `[name](https://developer.mozilla.org/docs/Web/HTML/Element/slot#attr-name)` attribute's value matches that `slot` attribute's value.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/slot)
     */
    "[slot]": T;
    /**
     * An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:
     *
     * *   `true`, which indicates that the element should be, if possible, checked for spelling errors;
     * *   `false`, which indicates that the element should not be checked for spelling errors.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck)
     */
    "[spellcheck]": T;
    /**
     * Contains [CSS](https://developer.mozilla.org/docs/Web/CSS) styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the [`\<style>`](https://developer.mozilla.org/docs/Web/HTML/Element/style "The HTML \<style> element contains style information for a document, or part of a document.") element have mainly the purpose of allowing for quick styling, for example for testing purposes.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/style)
     */
    "[style]": T;
    /**
     * An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:
     *
     * *   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;
     * *   `0` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;
     * *   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex)
     */
    "[tabindex]": T;
    /**
     * Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/title)
     */
    "[title]": T;
    /**
     * An enumerated attribute that is used to specify whether an element's attribute values and the values of its [`Text`](https://developer.mozilla.org/docs/Web/API/Text "The Text interface represents the textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children.") node children are to be translated when the page is localized, or whether to leave them unchanged. It can have the following values:
     *
     * *   empty string and `yes`, which indicates that the element will be translated.
     * *   `no`, which indicates that the element will not be translated.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/translate)
     */
    "[translate]": T;
    /** The loading of a resource has been aborted. */
    "[onabort]": T;
    /** An element has lost focus (does not bubble). */
    "[onblur]": T;
    /** The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content. */
    "[oncanplay]": T;
    /** The user agent can play the media up to its end without having to stop for further buffering of content. */
    "[oncanplaythrough]": T;
    /** The change event is fired for \<input>, \<select>, and \<textarea> elements when a change to the element's value is committed by the user. */
    "[onchange]": T;
    /** A pointing device button has been pressed and released on an element. */
    "[onclick]": T;
    /** The right button of the mouse is clicked (before the context menu is displayed). */
    "[oncontextmenu]": T;
    /** A pointing device button is clicked twice on an element. */
    "[ondblclick]": T;
    /** An element or text selection is being dragged (every 350ms). */
    "[ondrag]": T;
    /** A drag operation is being ended (by releasing a mouse button or hitting the escape key). */
    "[ondragend]": T;
    /** A dragged element or text selection enters a valid drop target. */
    "[ondragenter]": T;
    /** A dragged element or text selection leaves a valid drop target. */
    "[ondragleave]": T;
    /** An element or text selection is being dragged over a valid drop target (every 350ms). */
    "[ondragover]": T;
    /** The user starts dragging an element or text selection. */
    "[ondragstart]": T;
    /** An element is dropped on a valid drop target. */
    "[ondrop]": T;
    /** The duration attribute has been updated. */
    "[ondurationchange]": T;
    /** The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it. */
    "[onemptied]": T;
    /** Playback has stopped because the end of the media was reached. */
    "[onended]": T;
    /** A resource failed to load. */
    "[onerror]": T;
    /** An element has received focus (does not bubble). */
    "[onfocus]": T;
    "[onformchange]": T;
    "[onforminput]": T;
    /** The value of an element changes or the content of an element with the attribute contenteditable is modified. */
    "[oninput]": T;
    /** A submittable element has been checked and doesn't satisfy its constraints. */
    "[oninvalid]": T;
    /** A key is pressed down. */
    "[onkeydown]": T;
    /** A key is pressed down and that key normally produces a character value (use input instead). */
    "[onkeypress]": T;
    /** A key is released. */
    "[onkeyup]": T;
    /** A resource and its dependent resources have finished loading. */
    "[onload]": T;
    /** The first frame of the media has finished loading. */
    "[onloadeddata]": T;
    /** The metadata has been loaded. */
    "[onloadedmetadata]": T;
    /** Progress has begun. */
    "[onloadstart]": T;
    /** A pointing device button (usually a mouse) is pressed on an element. */
    "[onmousedown]": T;
    /** A pointing device is moved over an element. */
    "[onmousemove]": T;
    /** A pointing device is moved off the element that has the listener attached or off one of its children. */
    "[onmouseout]": T;
    /** A pointing device is moved onto the element that has the listener attached or onto one of its children. */
    "[onmouseover]": T;
    /** A pointing device button is released over an element. */
    "[onmouseup]": T;
    "[onmousewheel]": T;
    /** A pointing device is moved onto the element that has the listener attached. */
    "[onmouseenter]": T;
    /** A pointing device is moved off the element that has the listener attached. */
    "[onmouseleave]": T;
    /** Playback has been paused. */
    "[onpause]": T;
    /** Playback has begun. */
    "[onplay]": T;
    /** Playback is ready to start after having been paused or delayed due to lack of data. */
    "[onplaying]": T;
    /** In progress. */
    "[onprogress]": T;
    /** The playback rate has changed. */
    "[onratechange]": T;
    /** A form is reset. */
    "[onreset]": T;
    /** The document view has been resized. */
    "[onresize]": T;
    /** The readyState attribute of a document has changed. */
    "[onreadystatechange]": T;
    /** The document view or an element has been scrolled. */
    "[onscroll]": T;
    /** A seek operation completed. */
    "[onseeked]": T;
    /** A seek operation began. */
    "[onseeking]": T;
    /** Some text is being selected. */
    "[onselect]": T;
    /** A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute */
    "[onshow]": T;
    /** The user agent is trying to fetch media data, but data is unexpectedly not forthcoming. */
    "[onstalled]": T;
    /** A form is submitted. */
    "[onsubmit]": T;
    /** Media data loading has been suspended. */
    "[onsuspend]": T;
    /** The time indicated by the currentTime attribute has been updated. */
    "[ontimeupdate]": T;
    /** The volume has changed. */
    "[onvolumechange]": T;
    /** Playback has stopped because of a temporary lack of data. */
    "[onwaiting]": T;
    /** The pointer is unlikely to produce any more events. */
    "[onpointercancel]": T;
    /** The pointer enters the active buttons state. */
    "[onpointerdown]": T;
    /** Pointing device is moved inside the hit-testing boundary. */
    "[onpointerenter]": T;
    /** Pointing device is moved out of the hit-testing boundary. */
    "[onpointerleave]": T;
    /** The pointer was locked or released. */
    "[onpointerlockchange]": T;
    /** It was impossible to lock the pointer for technical reasons or because the permission was denied. */
    "[onpointerlockerror]": T;
    /** The pointer changed coordinates. */
    "[onpointermove]": T;
    /** The pointing device moved out of hit-testing boundary or leaves detectable hover range. */
    "[onpointerout]": T;
    /** The pointing device is moved into the hit-testing boundary. */
    "[onpointerover]": T;
    /** The pointer leaves the active buttons state. */
    "[onpointerup]": T;
    /**
     * Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant)
     */
    "[aria-activedescendant]": T;
    /**
     * Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic)
     */
    "[aria-atomic]": T;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete)
     */
    "[aria-autocomplete]": T;
    /**
     * Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-busy)
     */
    "[aria-busy]": T;
    /**
     * Indicates the current "checked" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-checked)
     */
    "[aria-checked]": T;
    /**
     * Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount)
     */
    "[aria-colcount]": T;
    /**
     * Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex)
     */
    "[aria-colindex]": T;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)
     */
    "[aria-colspan]": T;
    /**
     * Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-controls)
     */
    "[aria-controls]": T;
    /**
     * Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-current)
     */
    "[aria-current]": T;
    /**
     * Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)
     */
    "[aria-describedby]": T;
    /**
     * Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)
     */
    "[aria-disabled]": T;
    /**
     * \[Deprecated in ARIA 1.1\] Indicates what functions can be performed when a dragged object is released on the drop target.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect)
     */
    "[aria-dropeffect]": T;
    /**
     * Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage)
     */
    "[aria-errormessage]": T;
    /**
     * Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded)
     */
    "[aria-expanded]": T;
    /**
     * Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-flowto)
     */
    "[aria-flowto]": T;
    /**
     * \[Deprecated in ARIA 1.1\] Indicates an element's "grabbed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-grabbed)
     */
    "[aria-grabbed]": T;
    /**
     * Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup)
     */
    "[aria-haspopup]": T;
    /**
     * Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden)
     */
    "[aria-hidden]": T;
    /**
     * Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid)
     */
    "[aria-invalid]": T;
    /**
     * Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-label)
     */
    "[aria-label]": T;
    /**
     * Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)
     */
    "[aria-labelledby]": T;
    /**
     * Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-level)
     */
    "[aria-level]": T;
    /**
     * Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-live)
     */
    "[aria-live]": T;
    /**
     * Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-modal)
     */
    "[aria-modal]": T;
    /**
     * Indicates whether a text box accepts multiple lines of input or only a single line.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-multiline)
     */
    "[aria-multiline]": T;
    /**
     * Indicates that the user may select more than one item from the current selectable descendants.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable)
     */
    "[aria-multiselectable]": T;
    /**
     * Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-orientation)
     */
    "[aria-orientation]": T;
    /**
     * Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-owns)
     */
    "[aria-owns]": T;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder)
     */
    "[aria-placeholder]": T;
    /**
     * Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset)
     */
    "[aria-posinset]": T;
    /**
     * Indicates the current "pressed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed)
     */
    "[aria-pressed]": T;
    /**
     * Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly)
     */
    "[aria-readonly]": T;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant)
     */
    "[aria-relevant]": T;
    /**
     * Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-required)
     */
    "[aria-required]": T;
    /**
     * Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription)
     */
    "[aria-roledescription]": T;
    /**
     * Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount)
     */
    "[aria-rowcount]": T;
    /**
     * Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex)
     */
    "[aria-rowindex]": T;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)
     */
    "[aria-rowspan]": T;
    /**
     * Indicates the current "selected" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-selected)
     */
    "[aria-selected]": T;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize)
     */
    "[aria-setsize]": T;
    /**
     * Indicates if items in a table or grid are sorted in ascending or descending order.
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-sort)
     */
    "[aria-sort]": T;
    /**
     * Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax)
     */
    "[aria-valuemax]": T;
    /**
     * Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin)
     */
    "[aria-valuemin]": T;
    /**
     * Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow)
     */
    "[aria-valuenow]": T;
    /**
     * Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).
     *
     * [WAI-ARIA Reference](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)
     */
    "[aria-valuetext]": T;
    /** Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby). */
    "[aria-details]": T;
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    "[aria-keyshortcuts]": T;
}
declare type DollarFunc = (...utilities: Utilities[]) => StyleObject;
declare type StyleExport = {
    selector: string;
    children: StyleObject[];
    style: StyleObject;
};
declare type DollarAttr = ((attribute: string) => DollarCall) & GeneralHTMLAttrs<DollarCall & {
    /** CSS [attribute="value"] Selector */
    match: ((value: string) => DollarCall) & {
        [key: string]: DollarCall;
    };
    /** CSS [attribute|="value"] Selector */
    hyphenMatch: ((value: string) => DollarCall) & {
        [key: string]: DollarCall;
    };
    /** CSS [attribute~="value"] Selector */
    contains: ((value: string) => DollarCall) & {
        [key: string]: DollarCall;
    };
    /** CSS [attribute*="value"] Selector */
    includes: ((value: string) => DollarCall) & {
        [key: string]: DollarCall;
    };
    /** CSS [attribute^="value"] Selector */
    startsWith: ((value: string) => DollarCall) & {
        [key: string]: DollarCall;
    };
    /** CSS [attribute$="value"] Selector */
    endsWith: ((value: string) => DollarCall) & {
        [key: string]: DollarCall;
    };
}>;
declare type DollarCall = DollarFunc & {
    /** CSS group Selector, select `element, element, ..` */
    $: DollarType;
    /** CSS child Selector, select `element > element` */
    $$: DollarType;
    /** CSS descendant Selector, select `element element ..` */
    _: DollarType;
    /** CSS adjacent sibling Selector, select `element + element` */
    __: DollarType;
    /** CSS general sibling Selector, select `element ~ element` */
    _$_: DollarType;
    /** CSS attribute Selector, select `element[attribute]` */
    ATTR: DollarAttr;
    /** CSS styles */
    styles: StyleObject[];
} & {
    /** CSS sub class Selector, select `element.class` */
    [key: string]: DollarCall;
} & {
    [key in keyof ElementSelectors<unknown>]: DollarCall;
};
declare type DollarType = typeof apply & ElementSelectors<DollarCall> & {
    /** CSS class Selector */
    [key: string]: DollarCall;
} & {
    /** CSS universal Selector, select `*` */
    All: DollarCall;
    /** CSS root element Selector, select `:root`  */
    Root: DollarCall;
    /** CSS shadow host Selector, select `:host` or `:host(...)` */
    Host: DollarCall & DollarType;
    /** CSS id Selector, select `#id` */
    ID: ((id: string) => DollarCall) & {
        [key: string]: DollarCall;
    };
    /** CSS attribute Selector, select `[attribute]` */
    ATTR: DollarAttr;
    /** CSS styles */
    styles: StyleObject[] & {
        [key: string]: StyleObject[] | undefined;
    };
    /** CSS exports */
    exports: StyleExport[];
    /** Initial $ func, clear all styles */
    init: () => void;
};
export declare function queryStyles(selector: string): StyleObject[] | undefined;
export declare const $: DollarType;
export declare function escapeCSS(str: string): string;
export declare function quote(str: string): string;
export declare function attr(name: string, type?: CSSAttributeType, fallback?: string | number): string;
export declare function url(url: string, base64?: boolean, dataType?: string): string;
export declare function $var(name: string, defaultValue?: string): string;
export declare function path(path: string, fillRule?: CSSFillRule): string;
/** Creates a Color from hue, white and black. */
export declare function hwb(hue: CSSAngle | number, whiteness: CSSPercentage, blackness: CSSPercentage, alpha?: CSSAlphaValue): string;
export declare function dropShadow(offsetX: CSSLength, offsetY: CSSLength, blurRadius: CSSLength, color: string): string;
export declare function counters(name: string, char: string, style?: string): string;
export declare function circle(shapeRadius: CSSLengthPercentage | "closest-side" | "farthest-side", positon?: CSSPosition | CSSLengthPercentage): string;
export declare function ellipse(shapeRadiusX: CSSLengthPercentage | "closest-side" | "farthest-side", shapeRadiusY: CSSLengthPercentage | "closest-side" | "farthest-side", positon?: CSSPosition | CSSLengthPercentage): string;
declare function round(radius: CSSLengthPercentage): string;
declare function round(radius: CSSLengthPercentage, radius2: CSSLengthPercentage): string;
declare function round(radius: CSSLengthPercentage, radius2: CSSLengthPercentage, radius3: CSSLengthPercentage): string;
declare function round(radius: CSSLengthPercentage, radius2: CSSLengthPercentage, radius3: CSSLengthPercentage, radius4: CSSLengthPercentage): string;
declare function round(radiusArray: CSSBorderRadiusItem, radiusArray2: CSSBorderRadiusItem): string;
declare class Inset {
    values: (CSSLengthPercentage | undefined)[];
    round: typeof round;
    constructor(values: (CSSLengthPercentage | undefined)[]);
    toString(): string;
}
export declare function inset(lengthOrPercent: CSSLengthPercentage): Inset;
export declare function inset(lengthOrPercent: CSSLengthPercentage, lengthOrPercent2: CSSLengthPercentage): Inset;
export declare function inset(lengthOrPercent: CSSLengthPercentage, lengthOrPercent2: CSSLengthPercentage, lengthOrPercent3: CSSLengthPercentage): Inset;
export declare function inset(lengthOrPercent: CSSLengthPercentage, lengthOrPercent2: CSSLengthPercentage, lengthOrPercent3: CSSLengthPercentage, lengthOrPercent4: CSSLengthPercentage): Inset;
export declare function polygon(...lengthOrPercent: [
    CSSLengthPercentage,
    CSSLengthPercentage
][]): string;
export declare function polygon(fillRule: "nonzero" | "evenodd", ...lengthOrPercent: [
    CSSLengthPercentage,
    CSSLengthPercentage
][]): string;
export declare const matrix: (a: number, b: number, c: number, d: number, tx: number, ty: number) => string, matrix3d: (a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number) => string, perspective: (d: CSSLength | number | string) => string, rotate: (a: CSSAngle | number) => string, rotate3d: {
    (a: CSSAngle | number): string;
    (x: number, y: number, z: number, a: CSSAngle): string;
}, rotateX: (a: CSSAngle) => string, rotateY: (a: CSSAngle) => string, rotateZ: (a: CSSAngle) => string, scale: (sx: number | CSSPercentage, sy?: number | CSSPercentage) => string, scale3d: (sx: number, sy: number, sz: number) => string, scaleX: (s: number) => string, scaleY: (s: number) => string, scaleZ: (s: number) => string, skew: (ax: CSSAngle, ay?: CSSAngle) => string, skewX: (a: CSSAngle) => string, skewY: (a: CSSAngle) => string, translate: (tx: CSSLengthPercentage, ty?: CSSLengthPercentage) => string, translate3d: (tx: CSSLengthPercentage, ty?: CSSLengthPercentage, tz?: CSSLength) => string, translateX: (tx: CSSLengthPercentage) => string, translateY: (ty: CSSLengthPercentage) => string, translateZ: (tz: CSSLength) => string, steps: (count: number) => string, calc: (expr: string | CSSDimension | CSSPercentage | number) => string, clamp: (min: CSSLength, val: CSSLength, max: CSSLength) => string, max: (...exprs: (string | CSSDimension | CSSPercentage | number)[]) => string, min: (...exprs: (string | CSSDimension | CSSPercentage | number)[]) => string, abs: (expr: string | CSSDimension | CSSPercentage | number) => string, sign: (expr: string | CSSDimension | CSSPercentage | number) => string, blur: (radius: CSSLength) => string, brightness: (amount: number | CSSPercentage) => string, contrast: (amount: number | CSSPercentage) => string, grayscale: (amount: number | CSSPercentage) => string, invert: (amount: number | CSSPercentage) => string, opacity: (amount: number | CSSPercentage) => string, saturate: (amount: number | CSSPercentage) => string, sepia: (amount: number | CSSPercentage) => string, rgb: (red: number, green: number, blue: number) => string, rgba: (red: number, green: number, blue: number, alpha: CSSAlphaValue) => string, hsl: (hue: number, saturation: CSSPercentage, lightness: CSSPercentage) => string, hsla: (hue: number, saturation: CSSPercentage, lightness: CSSPercentage, alpha: CSSAlphaValue) => string, counter: (name: string, style?: string) => string, env: (inset: EnvInsetValue | string, fallback?: CSSLength) => string, minmax: (min: CSSLengthPercentage | CSSFlex | "max-content" | "min-content" | "auto", max: CSSLengthPercentage | CSSFlex | "max-content" | "min-content" | "auto") => string, repeat: (repeatCount: "auto-fill" | "auto-fit" | number, tracks: string | CSSDimension | CSSPercentage | CSSFlex | number) => string;
export declare const hueRotate: (angle: CSSAngle) => string, fitContent: (lengthOrPercent: CSSLengthPercentage) => string, cubicBezier: (x1: number, y1: number, x2: number, y2: number) => string, linearGradient: (direction: CSSSideOrCorner | CSSAngle, ...colorStops: CSSLinearColorStopOrHint[]) => string, radialGradient: {
    (...colors: CSSLinearColorStopOrHint[]): string;
    (shapeSizeAtPosition: string | undefined, ...colors: CSSLinearColorStopOrHint[]): string;
}, conicGradient: {
    (...colorDegrees: CSSAngularColorStopOrHint[]): string;
    (fromAngleAtPosition: string | undefined, ...colorDegrees: CSSAngularColorStopOrHint[]): string;
}, repeatingConicGradient: {
    (...colorDegrees: CSSAngularColorStopOrHint[]): string;
    (fromAngleAtPosition: string | undefined, ...colorDegrees: CSSAngularColorStopOrHint[]): string;
}, repeatingLinearGradient: (direction: CSSSideOrCorner | CSSAngle, ...colorStops: CSSLinearColorStopOrHint[]) => string, repeatingRadialGradient: {
    (...colors: CSSLinearColorStopOrHint[]): string;
    (shapeSizeAtPosition: string | undefined, ...colors: CSSLinearColorStopOrHint[]): string;
};
export declare const filters: {
    blur: (radius: CSSLength) => string;
    brightness: (amount: number | CSSPercentage) => string;
    contrast: (amount: number | CSSPercentage) => string;
    dropShadow: typeof dropShadow;
    grayscale: (amount: number | CSSPercentage) => string;
    hueRotate: (angle: CSSAngle) => string;
    invert: (amount: number | CSSPercentage) => string;
    saturate: (amount: number | CSSPercentage) => string;
    sepia: (amount: number | CSSPercentage) => string;
};
export declare const transforms: {
    rotate: (a: CSSAngle | number) => string;
    scale: (sx: number | CSSPercentage, sy?: number | CSSPercentage) => string;
    skew: (ax: CSSAngle, ay?: CSSAngle) => string;
    translate: (tx: CSSLengthPercentage, ty?: CSSLengthPercentage) => string;
};
export declare function sub(left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage): string;
export declare function add(left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage): string;
export declare function mul(left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage): string;
export declare function div(left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage): string;
export declare function prec(n: number): number;
export declare function resetMeta(uid?: string, type?: MetaType, props?: string[], variants?: string[]): void;
export declare function getMeta(): UtilityMeta;
export declare function getUid(): string;
export declare function pushMetaProp(prop: string): number;
export declare function updateMetaType(type: MetaType): void;
export declare function resetStyleMeta(style: StyleObject, meta?: UtilityMeta): StyleObject<{}>;
export declare function alphaCount(n: number): string;
export declare function alphaNamer(style: StyleObject): string;
export declare function atomicNamer(style: StyleObject): string;
export declare function hashNamer(style: StyleObject): string;
export declare function useNamer(f: StyleNamer): void;
export declare function nameStyle(style: StyleObject): string;
declare type ColorFunc = {
    var(name: string, defaultValue?: string): string;
    calc(expr: string): string;
    rgb(red: number, green: number, blue: number): string;
    rgba(red: number, green: number, blue: number, alpha: CSSAlphaValue): string;
    hsl(hue: number, saturation: CSSPercentage, lightness: CSSPercentage): string;
    hsla(hue: number, saturation: CSSPercentage, lightness: CSSPercentage, alpha: CSSAlphaValue): string;
    hwb(hue: CSSAngle | number, whiteness: CSSPercentage, blackness: CSSPercentage, alpha?: CSSAlphaValue): string;
};
declare type ColorValue = {
    [key in CSSColors]: string;
} & {
    [key in "transparent" | "currentColor" | "inherit" | "initial" | "unset"]: string;
} & ColorFunc;
export declare const color: ColorValue;
export declare const percent: {
    [value: number]: CSSPercentage;
};
export declare const deg: {
    [value: number]: CSSAngle;
}, grad: {
    [value: number]: CSSAngle;
}, rad: {
    [value: number]: CSSAngle;
}, turn: {
    [value: number]: CSSAngle;
};
export declare const s: {
    [value: number]: CSSTime;
}, ms: {
    [value: number]: CSSTime;
};
export declare const fr: {
    [value: number]: CSSFlex;
};
export declare const $in: {
    [value: number]: CSSLength;
};
export declare const dpi: {
    [value: number]: CSSResolution;
}, dpcm: {
    [value: number]: CSSResolution;
}, dppx: {
    [value: number]: CSSResolution;
}, x: {
    [value: number]: CSSResolution;
};
export declare const px: {
    [value: number]: CSSLength;
}, pc: {
    [value: number]: CSSLength;
}, pt: {
    [value: number]: CSSLength;
}, cm: {
    [value: number]: CSSLength;
}, mm: {
    [value: number]: CSSLength;
}, Q: {
    [value: number]: CSSLength;
}, ch: {
    [value: number]: CSSLength;
}, ex: {
    [value: number]: CSSLength;
}, em: {
    [value: number]: CSSLength;
}, rem: {
    [value: number]: CSSLength;
}, vw: {
    [value: number]: CSSLength;
}, vh: {
    [value: number]: CSSLength;
}, vmax: {
    [value: number]: CSSLength;
}, vmin: {
    [value: number]: CSSLength;
};
