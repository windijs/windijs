import type { CSSAlphaValue, CSSAngle, CSSAttributeType, CSSBorderRadiusItem, CSSDimension, CSSFillRule, CSSFlex, CSSFunctions, CSSLength, CSSLengthPercentage, CSSPercentage, CSSPosition } from "types";
import { camelToDash, parenWrap } from "utils";

import { useProxy } from "./proxy";

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

export function quote (str: string) {
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

/** Creates a Color from hue, white and black. */
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

export const { matrix, matrix3d, perspective, rotate, rotate3d, rotateX, rotateY, rotateZ, scale, scale3d, scaleX, scaleY, scaleZ, skew, skewX, skewY, translate, translate3d, translateX, translateY, translateZ, steps, calc, clamp, max, min, abs, sign, blur, brightness, contrast, grayscale, invert, opacity, saturate, sepia, rgb, rgba, hsl, hsla, counter, env, minmax, repeat } =
  useProxy<CSSFunctions, Function>(prop => (...args: any[]) => prop + "(" + args.filter(i => i != null).join(", ") + ")");

export const { hueRotate, fitContent, cubicBezier, linearGradient, radialGradient, conicGradient, repeatingConicGradient, repeatingLinearGradient, repeatingRadialGradient } =
  useProxy<CSSFunctions, Function>(prop => (...args: any[]) => camelToDash(prop) + "(" + args.map(i => Array.isArray(i) ? i.join(" ") : i).filter(i => i != null).join(", ") + ")");
