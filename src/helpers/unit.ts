import { CSSAngle, CSSColors, CSSPercentage, NumberDict } from "../types";
import { useProxy } from "../utils";
import { $var, calc, rgb, rgba, hsl, hsla, hwb } from "./funcs";

// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units

// Relative Distance

export const em = useProxy<object, string>(v => v + "em") as NumberDict;

export const rem = useProxy<object, string>(v => v + "rem") as NumberDict;

export const vh = useProxy<object, string>(v => v + "vh") as NumberDict;

export const vw = useProxy<object, string>(v => v + "vw") as NumberDict;

// Absolute Distance

export const cm = useProxy<object, string>(v => v + "cm") as NumberDict;

export const mm = useProxy<object, string>(v => v + "mm") as NumberDict;

export const pt = useProxy<object, string>(v => v + "pt") as NumberDict;

export const px = useProxy<object, string>(v => v + "px") as NumberDict;

// Angle

export const deg = useProxy<object, string>(v => v + "deg") as NumberDict;

// Time

export const s = useProxy<object, string>(v => v + "s") as NumberDict;

export const ms = useProxy<object, string>(v => v + "ms") as NumberDict;

// Resolution

export const dpi = useProxy<object, string>(v => v + "dpi") as NumberDict;

// Percentage

export const percent = useProxy<object, string>(v => v + "%") as NumberDict;

type ColorFunc = {
  var(name: string, defaultValue?: string): string;
  calc(expr: string): string;
  rgb(red: number, green: number, blue: number): string;
  rgba(red: number, green: number, blue: number, alpha: number): string;
  hsl(hue: number, saturation: CSSPercentage, lightness: CSSPercentage): string;
  hsla(hue: number, saturation: CSSPercentage, lightness: CSSPercentage, alpha: number): string;
  hwb(hue: CSSAngle | number, whiteness: CSSPercentage, blackness: CSSPercentage, alpha?: number | CSSPercentage): string;
};

// eslint-disable-next-line no-unused-vars
type ColorValue = {[key in CSSColors]: string} & {[key in "transparent" | "currentColor" | "inherit" | "initial" | "unset"]: string} & ColorFunc;

// Color
export const color = useProxy<object, string | Function>(v => {
  const map: ColorFunc = { var: $var, calc, rgb, rgba, hsl, hsla, hwb };
  return v in map ? map[v as keyof ColorFunc] : v;
}) as ColorValue;
