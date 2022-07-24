import { CSSAlphaValue, CSSAngle, CSSAngleType, CSSColors, CSSFlex, CSSLength, CSSLengthType, CSSPercentage, CSSResolution, CSSResolutionType, CSSTime, CSSTimeType } from "../types";
import { useProxy } from "../helpers/proxy";
import { $var, calc, rgb, rgba, hsl, hsla, hwb } from "./funcs";

// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units
// TODO: maybe support math like add/sub for rem, px...
// however, javascript doesn't support operator overloading,
// maybe https://github.com/codalien/operator-overloading-js works?
// see https://github.com/microsoft/TypeScript/issues/5407

type ColorFunc = {
  var(name: string, defaultValue?: string): string;
  calc(expr: string): string;
  rgb(red: number, green: number, blue: number): string;
  rgba(red: number, green: number, blue: number, alpha: CSSAlphaValue): string;
  hsl(hue: number, saturation: CSSPercentage, lightness: CSSPercentage): string;
  hsla(hue: number, saturation: CSSPercentage, lightness: CSSPercentage, alpha: CSSAlphaValue): string;
  hwb(hue: CSSAngle | number, whiteness: CSSPercentage, blackness: CSSPercentage, alpha?: CSSAlphaValue): string;
};

type ColorValue = {[key in CSSColors]: string} & {[key in "transparent" | "currentColor" | "inherit" | "initial" | "unset"]: string} & ColorFunc;
type CSSLengthProxy = {[k in CSSLengthType]: {[value: number]: CSSLength;}}
type CSSAngleProxy = {[k in CSSAngleType]: {[value: number]: CSSAngle;}}
type CSSTimeProxy = {[k in CSSTimeType]: {[value: number]: CSSTime;}}
type CSSResolutionProxy = {[k in CSSResolutionType]: {[value: number]: CSSResolution;}}

// Color
export const color = useProxy<object, string | Function>(v => {
  const map: ColorFunc = { var: $var, calc, rgb, rgba, hsl, hsla, hwb };
  return v in map ? map[v as keyof ColorFunc] : v;
}) as ColorValue;

function dimension<T> (type: string, suffix = type) {
  return useProxy<object, T>(value => Object.create({
    value: +value,
    type,
    valueOf: () => value + suffix,
    toString: () => value + suffix,
  })) as {[value: number]: T };
}

export const percent = dimension<CSSPercentage>("percent", "%");

export const { deg, grad, rad, turn } = useProxy<object, Object>(k => dimension<CSSAngle>(k)) as CSSAngleProxy;

export const { s, ms } = useProxy<object, Object>(k => dimension<CSSTime>(k)) as CSSTimeProxy;

export const fr = dimension<CSSFlex>("fr");

export const $in = dimension<CSSLength>("in");

export const { dpi, dpcm, dppx, x } = useProxy<object, Object>(k => dimension<CSSResolution>(k)) as CSSResolutionProxy;

export const { px, pc, pt, cm, mm, Q, ch, ex, em, rem, vw, vh, vmax, vmin } = useProxy<object, Object>(k => dimension<CSSLength>(k)) as CSSLengthProxy;
