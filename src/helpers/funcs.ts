import { camelToDash, parenWrap } from "../utils";

export function sub (left: string | number, right: string | number) {
  return left + " - " + right;
}

export function add (left: string | number, right: string | number) {
  return left + " + " + right;
}

export function mul (left: string | number, right: string | number) {
  return left + " * " + right;
}

export function div (left: string | number, right: string | number) {
  return left + " / " + right;
}

export function join (...args: string[]) {
  return args.join(" ");
}

export function str (str: string) {
  return `${JSON.stringify(str)}`;
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions

type CSSLength = number | string;
type CSSAngle = number | string;
type CSSPercentage = number | string;
type CSSFlex = "1fr"; // number + fr
type CSSFillRule = "nonzero" | "evenodd";

type AttributeType = "string" | "color" | "url" | "integer" | "number" | "length" | "em" | "ex" | "px" | "rem" | "vw" | "vh" | "vmin" | "vmax" | "mm" | "cm" | "in" | "pt" | "pc" | "angle" | "deg" | "grad" | "rad" | "time" | "s" | "ms" | "frequency" | "Hz" | "kHz";

// reference functionns

export function attr (name: string, type?: AttributeType, fallback?: string | number): string {
  if (!type) return parenWrap("attr", name);
  return parenWrap("attr", name + " " + type + fallback ? (", " + fallback) : "");
}

export function url (url: string, base64 = false, dataType = "image/png"): string {
  return parenWrap("url", base64 ? (JSON.stringify(`data:${dataType};base64,` + url)) : JSON.stringify(url));
}

export function $var (name: string, defaultValue?: string): string {
  return defaultValue ? `var(--${name}, ${defaultValue})` : `var(--${name})`;
}

// shape functions

export function path (path: string, fillRule?: CSSFillRule): string {
  return parenWrap("path", fillRule ? (fillRule + ", " + JSON.stringify(path)) : JSON.stringify(path));
}

type EnvInsetValue = "safe-area-inset-top" | "safe-area-inset-right" | "safe-area-inset-bottom" | "safe-area-inset-left titlebar-area-x" | "titlebar-area-y" | "titlebar-area-width" | "titlebar-area-height";

export interface CSSFunctions {
  // transform functions
  matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): string;
  matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): string;
  perspective(d: CSSLength): string;
  rotate(a: CSSAngle): string;
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
  translate(tx: CSSLength | CSSPercentage, ty?: CSSLength | CSSPercentage): string;
  translate3d(tx: CSSLength | CSSPercentage, ty: CSSLength | CSSPercentage, tz: CSSLength): string;
  translateX(tx: CSSLength | CSSPercentage): string;
  translateY(ty: CSSLength | CSSPercentage): string;
  translateZ(tz: CSSLength): string;
  cubicBezier(x1: number, y1: number, x2: number, y2: number): string;
  steps(count: number): string;

  // math functions
  calc(expr: string): string;
  clamp(min: CSSLength, val: CSSLength, max: CSSLength): string;
  max(...exprs: string[]): string;
  min(...exprs: string[]): string;
  abs(expr: string): string;
  sign(expr: string): string;

  // filter functions
  blur(radius: CSSLength): string;
  brightness(amount: number | CSSPercentage): string;
  contrast(amount: number | CSSPercentage): string;
  /**
   * ```css
   * filter: drop-shadow(30px 10px 4px #4444dd);
   * filter: drop-shadow(0 -6mm 4mm rgb(160, 0, 210));
   * filter: drop-shadow(0 0 0.75rem crimson);
   * ```
   * @param shadow
   */
  dropShadow(shadow: string): string;
  grayscale(amount: number | CSSPercentage): string;
  hueRotate(angle: CSSAngle): string;
  invert(amount: number | CSSPercentage): string;
  opacity(amount: number | CSSPercentage): string;
  saturate(amount: number | CSSPercentage): string;
  sepia(amount: number | CSSPercentage): string;

  // color functions

  rgb(red: number, green: number, blue: number): string;
  rgba(red: number, green: number, blue: number, alpha: number): string;
  hsl(hue: number, saturation: string, lightness: string): string;
  hsla(hue: number, saturation: string, lightness: string, alpha: number): string;

  // image functions

  conicGradient(fromAngleAtPosition: string | undefined, ...colorDegrees: string[]): string;
  linearGradient(direction: string, ...colorStops: string[]): string;
  radialGradient(shapeSizeAtPosition: string | undefined, ...colors: string[]): string;
  repeatingConicGradient(fromAngleAtPosition: string | undefined, ...colorDegrees: string[]): string;
  repeatingLinearGradient(angleSideOrCorner: string | undefined, ...colorStops: string[]): string;
  repeatingRadialGradient(shapeSizeAtPosition: string | undefined, ...colors: string[]): string;

  // counter functions

  /**
   * ```css
   * ol {
      counter-reset: listCounter;
    }
    li {
      counter-increment: listCounter;
    }
    li::after {
      content: "[" counter(listCounter) "] == [" counter(listCounter, upper-roman) "]";
    }
   * ```
   * @param name
   * @param style
   */
  counter(name: string, style?: string): string;

  /**
   * ```css
   * ol {
      counter-reset: listCounter;
    }
    li {
      counter-increment: listCounter;
    }
    li::marker {
      content:  counters(listCounter, '.', upper-roman) ') ';
    }
    li::before {
      content:  counters(listCounter, ".") " == " counters(listCounter, ".", lower-roman) ;
    }
   * ```
   * @param name
   * @param char
   * @param style
   */
  counters(name: string, char: string, style?: string): string;

  // font functions

  // shape functions

  /**
   * ```css
   * clip-path: circle(50px);
   * clip-path: circle(6rem at right center);
   * clip-path: circle(10% at 2rem 90%);
   * clip-path: circle(closest-side at 5rem 6rem);
   * clip-path: circle(farthest-side);
   * ```
   */
  circle(value: string): string;

  /**
   * ```css
   * clip-path: ellipse(20px 50px);
   * clip-path: ellipse(4rem 50% at right center);
   * clip-path: ellipse(closest-side closest-side at 5rem 6rem);
   * clip-path: ellipse(closest-side farthest-side);
   * ```
   */
  ellipse(value: string): string;

  /**
   * ```css
   * clip-path: inset(30px);
   * clip-path: inset(1rem 2rem 3rem 4rem);
   * clip-path: inset(20% 30% round 20px);
   * clip-path: inset(4rem 20% round 1rem 2rem 3rem 4rem);
   * ```
   */
  inset(value: string): string;

  /**
   * ```css
   * clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
   * clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
   * ```
   */
  polygon(...lengthOrPercent: (CSSLength | CSSPercentage)[]): string

  // reference functionns
  env(inset: EnvInsetValue, fallback: CSSLength): string

  // css grid functions
  fitContent(lengthOrPercent: CSSLength | CSSPercentage): string;
  minmax(min: CSSLength | CSSPercentage | CSSFlex, max: CSSLength | CSSPercentage | CSSFlex): string;
  repeat(repeatCount: "auto-fill" | "auto-fit" | number, tracks: string): string;
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
  cubicBezier,
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
  dropShadow,
  grayscale,
  hueRotate,
  invert,
  opacity,
  saturate,
  sepia,
  rgb,
  rgba,
  hsl,
  hsla,
  conicGradient,
  linearGradient,
  radialGradient,
  repeatingConicGradient,
  repeatingLinearGradient,
  repeatingRadialGradient,
  counter,
  counters,
  circle,
  ellipse,
  inset,
  polygon,
  env,
  fitContent,
  minmax,
  repeat,
} = new Proxy({}, {
  get (target, prop: string, receiver) {
    return (...args: any[]) => (["conicGradient", "cubicBezier", "linearGradient", "radialGradient", "repeatingConicGradient", "repeatingLinearGradient", "repeatingRadialGradient", "fitContent", "dropShadow", "hueRotate"].includes(prop) ? camelToDash(prop) : prop) + "(" + args.filter(i => i).join(", ") + ")";
  },
}) as CSSFunctions;
