import { CSSAlphaValue, CSSAngle, CSSAttributeType, CSSLinearColorStopOrHint, CSSDimension, CSSFillRule, CSSFlex, CSSLength, CSSLengthPercentage, CSSPercentage, CSSSideOrCorner, CSSAngularColorStopOrHint, CSSPosition, CSSBorderRadiusItem } from "../types";
import { camelToDash, parenWrap } from "../utils";

// TODO: should return object, like CSSPercentage/CSSDimension...
// TODO: support multiple add/sub/mul/div

export function sub (left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage) {
  if (typeof left === "object" && typeof right === "object") {
    if (left.type === right.type) return (left.value - right.value) + (left.type === "percent" ? "%" : left.type);
  }
  return left + " - " + right;
}

export function add (left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage) {
  if (typeof left === "object" && typeof right === "object") {
    if (left.type === right.type) return (left.value + right.value) + (left.type === "percent" ? "%" : left.type);
  }
  return left + " + " + right;
}

export function mul (left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage) {
  if (typeof left === "number" && typeof right === "object") return (left * right.value) + (right.type === "percent" ? "%" : right.type);
  if (typeof left === "object" && typeof right === "number") return (left.value * right) + (left.type === "percent" ? "%" : left.type);
  if (typeof left === "number" && typeof right === "number") return (left * right) + "";
  return left + " * " + right;
}

export function div (left: string | number | CSSDimension | CSSFlex | CSSPercentage, right: string | number | CSSDimension | CSSFlex | CSSPercentage) {
  if (typeof left === "object" && typeof right === "number") return (left.value / right) + (left.type === "percent" ? "%" : left.type);
  if (typeof left === "number" && typeof right === "number") return (left / right) + "";
  return left + " / " + right;
}

export function join (...args: (string | number | CSSDimension | CSSFlex | CSSPercentage)[]) {
  return args.join(" ");
}

export function str (str: string) {
  return `${JSON.stringify(str)}`;
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions
// TODO: more detailed help documentation for css functions
// TODO: support var as type & param
// TODO: support calc as type & param

// reference functionns

export function attr (name: string, type?: CSSAttributeType, fallback?: string | number): string {
  const defaultValue = fallback != null ? (", " + fallback) : "";
  if (!type) return parenWrap("attr", name + defaultValue);
  return parenWrap("attr", name + " " + type + defaultValue);
}

export function url (url: string, base64 = false, dataType = "image/png"): string {
  return parenWrap("url", base64 ? (`data:${dataType};base64,` + url) : url);
}

export function $var (name: string, defaultValue?: string): string {
  return defaultValue ? `var(--${name}, ${defaultValue})` : `var(--${name})`;
}

// shape functions

export function path (path: string, fillRule?: CSSFillRule): string {
  return parenWrap("path", fillRule ? (fillRule + ", " + JSON.stringify(path)) : JSON.stringify(path));
}

// color functions

export function hwb (hue: CSSAngle | number, whiteness: CSSPercentage, blackness: CSSPercentage, alpha?: CSSAlphaValue): string {
  return parenWrap("hwb", [hue, whiteness, blackness].join(" ") + (alpha ? (" / " + alpha) : ""));
}

// filter functions

export function dropShadow (offsetX: CSSLength, offsetY: CSSLength, blurRadius: CSSLength, color: string) {
  return parenWrap("drop-shadow", [offsetX, offsetY, blurRadius, color].join(" "));
}

export function counters (name: string, char: string, style?: string): string {
  return parenWrap("counters", [name, JSON.stringify(char), style].filter(i => i != null).join(", "));
}

// shape functions

export function circle (shapeRadius: CSSLengthPercentage | "closest-side" | "farthest-side", positon?: CSSPosition | CSSLengthPercentage): string {
  return parenWrap("circle", positon == null ? shapeRadius.toString() : shapeRadius + " at " + (Array.isArray(positon) ? positon.join(" ") : positon));
}

export function ellipse (shapeRadiusX: CSSLengthPercentage | "closest-side" | "farthest-side", shapeRadiusY: CSSLengthPercentage | "closest-side" | "farthest-side", positon?: CSSPosition | CSSLengthPercentage): string {
  const shapeRadius = [shapeRadiusX, shapeRadiusY].join(" ");
  return parenWrap("ellipse", positon == null ? shapeRadius : shapeRadius + " at " + (Array.isArray(positon) ? positon.join(" ") : positon));
}

function round (radius: CSSLengthPercentage): string;
function round (radius: CSSLengthPercentage, radius2: CSSLengthPercentage): string;
function round (radius: CSSLengthPercentage, radius2: CSSLengthPercentage, radius3: CSSLengthPercentage): string;
function round (radius: CSSLengthPercentage, radius2: CSSLengthPercentage, radius3: CSSLengthPercentage, radius4: CSSLengthPercentage): string;
function round (radiusArray: CSSBorderRadiusItem, radiusArray2: CSSBorderRadiusItem): string;
function round (radius: CSSLengthPercentage | CSSBorderRadiusItem, radius2?: CSSLengthPercentage | CSSBorderRadiusItem, radius3?: CSSLengthPercentage, radius4?: CSSLengthPercentage): string {
  if (Array.isArray(radius) || Array.isArray(radius2)) return [radius, radius2].map(i => Array.isArray(i) ? i.join(" ") : i).join(" / ");
  return [radius, radius2, radius3, radius4].filter(i => i != null).join(" ");
}

class Inset {
  values: (CSSLengthPercentage | undefined)[] = [];
  round: typeof round;

  constructor (values: (CSSLengthPercentage | undefined)[]) {
    this.values = values;
    // @ts-ignore
    this.round = (...args) => parenWrap("inset", this.values.filter(i => i != null).join(" ") + " round " + round(...args));
  }

  toString () {
    return parenWrap("inset", this.values.filter(i => i != null).join(" "));
  }
}

export function inset (lengthOrPercent: CSSLengthPercentage): Inset;
export function inset (lengthOrPercent: CSSLengthPercentage, lengthOrPercent2: CSSLengthPercentage): Inset;
export function inset (lengthOrPercent: CSSLengthPercentage, lengthOrPercent2: CSSLengthPercentage, lengthOrPercent3: CSSLengthPercentage): Inset;
export function inset (lengthOrPercent: CSSLengthPercentage, lengthOrPercent2: CSSLengthPercentage, lengthOrPercent3: CSSLengthPercentage, lengthOrPercent4: CSSLengthPercentage): Inset;
export function inset (lengthOrPercent: CSSLengthPercentage, lengthOrPercent2?: CSSLengthPercentage, lengthOrPercent3?: CSSLengthPercentage, lengthOrPercent4?: CSSLengthPercentage): Inset {
  return new Inset([lengthOrPercent, lengthOrPercent2, lengthOrPercent3, lengthOrPercent4]);
}

export function polygon (...lengthOrPercent: ([CSSLengthPercentage, CSSLengthPercentage])[]): string;
export function polygon (fillRule: "nonzero" | "evenodd", ...lengthOrPercent: ([CSSLengthPercentage, CSSLengthPercentage])[]): string;
export function polygon (fillRule?: "nonzero" | "evenodd" | [CSSLengthPercentage, CSSLengthPercentage], ...lengthOrPercent: ([CSSLengthPercentage, CSSLengthPercentage])[]): string {
  return parenWrap("polygon", [fillRule, ...lengthOrPercent].filter(i => i != null).map(i => Array.isArray(i) ? i.join(" ") : i).join(", "));
}

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

  rgb(red: number, green: number, blue: number): string;
  rgba(red: number, green: number, blue: number, alpha: CSSAlphaValue): string;
  hsl(hue: number, saturation: CSSPercentage, lightness: CSSPercentage): string;
  hsla(hue: number, saturation: CSSPercentage, lightness: CSSPercentage, alpha: CSSAlphaValue): string;

  // others

  counter(name: string, style?: string): string;
  env(inset: EnvInsetValue | string, fallback?: CSSLength): string
  minmax(min: CSSLengthPercentage | CSSFlex | "max-content" | "min-content" | "auto", max: CSSLengthPercentage | CSSFlex | "max-content" | "min-content" | "auto"): string;
  repeat(repeatCount: "auto-fill" | "auto-fit" | number, tracks: string | CSSDimension | CSSPercentage | CSSFlex | number): string;
}

export const {
  matrix,
  matrix3d,
  perspective,
  rotate,
  rotate3d,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  scale3d,
  scaleX,
  scaleY,
  scaleZ,
  skew,
  skewX,
  skewY,
  translate,
  translate3d,
  translateX,
  translateY,
  translateZ,
  steps,
  calc,
  clamp,
  max,
  min,
  abs,
  sign,
  blur,
  brightness,
  contrast,
  grayscale,
  invert,
  opacity,
  saturate,
  sepia,
  rgb,
  rgba,
  hsl,
  hsla,
  counter,
  env,
  minmax,
  repeat,
} = new Proxy({}, {
  get (target, prop: string) {
    return (...args: any[]) => prop + "(" + args.filter(i => i != null).join(", ") + ")";
  },
}) as CSSFunctions;

// camel cased functions

export const { hueRotate, fitContent, cubicBezier, linearGradient, radialGradient, conicGradient, repeatingConicGradient, repeatingLinearGradient, repeatingRadialGradient } = new Proxy({}, {
  get (target, prop: string) {
    return (...args: any[]) => camelToDash(prop) + "(" + args.map(i => Array.isArray(i) ? i.join(" ") : i).filter(i => i != null).join(", ") + ")";
  },
}) as {
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
};
