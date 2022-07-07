import { CSSColors, NumberDict } from "../types";
import { useProxy } from "../utils";

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

// Color
export const color = useProxy<object, string>(v => v) as {[key in CSSColors]: string};
