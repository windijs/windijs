import { $var, calc, hsl, hsla, hwb, rgb, rgba } from "./funcs";

import type {
  CSSAlphaValue,
  CSSAngle,
  CSSAngleType,
  CSSColors,
  CSSFlex,
  CSSLength,
  CSSLengthType,
  CSSPercentage,
  CSSResolution,
  CSSResolutionType,
  CSSTime,
  CSSTimeType,
} from "./types";

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

type ColorValue = { [key in CSSColors]: string } & {
  [key in "transparent" | "currentColor" | "inherit" | "initial" | "unset"]: string;
} & ColorFunc;
type CSSLengthProxy = { [k in CSSLengthType]: { [value: number]: CSSLength } };
type CSSAngleProxy = { [k in CSSAngleType]: { [value: number]: CSSAngle } };
type CSSTimeProxy = { [k in CSSTimeType]: { [value: number]: CSSTime } };
type CSSResolutionProxy = { [k in CSSResolutionType]: { [value: number]: CSSResolution } };

// Color
export const color = new Proxy({} as ColorValue, {
  get: (_, v) => {
    const map: ColorFunc = { var: $var, calc, rgb, rgba, hsl, hsla, hwb };
    return v in map ? map[v as keyof ColorFunc] : v;
  },
});

function dimension<T>(type: string, suffix = type) {
  return new Proxy({} as { [value: number]: T }, {
    get: (_, value: string) =>
      Object.create({
        value: +value,
        type,
        valueOf: () => value + suffix,
        toString: () => value + suffix,
      }),
  });
}

export const percent = dimension<CSSPercentage>("percent", "%");

export const { deg, grad, rad, turn } = new Proxy({} as CSSAngleProxy, { get: (_, k: string) => dimension<CSSAngle>(k) });

export const { s, ms } = new Proxy({} as CSSTimeProxy, { get: (_, k: string) => dimension<CSSTime>(k) });

export const fr = dimension<CSSFlex>("fr");

export const $in = dimension<CSSLength>("in");

export const { dpi, dpcm, dppx, x } = new Proxy({} as CSSResolutionProxy, { get: (_, k: string) => dimension<CSSResolution>(k) });

export const { px, pc, pt, cm, mm, Q, ch, ex, em, rem, vw, vh, vmax, vmin } = new Proxy({} as CSSLengthProxy, {
  get: (_, k: string) => dimension<CSSLength>(k),
});
