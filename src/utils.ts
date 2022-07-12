import { CSSObject, StyleObject } from "./types";

/**
 * Check if value is a number
 * @param value {string}
 * @returns {boolean}
 */
export function isNumber (value: string) {
  // @ts-ignore
  return !isNaN(value);
}

export const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T => k in obj;

export function useProxy<T extends object, S = StyleObject> (f: (prop: string) => S | undefined) {
  const handler: ProxyHandler<T> = {
    get (target, prop) {
      return f(prop as string);
    },
  };

  return new Proxy({}, handler);
}

export function commaJoin (...items: (string|number|undefined)[]) {
  return items.filter(i => i).join(", ");
}

export function parenWrap (key: string, value: string) {
  return key + "(" + value + ")";
}

export function camelToDash (str: string) {
  return str.replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);
}

export function bundleStyle (utilities: StyleObject[]): CSSObject {
  const css: CSSObject = {};
  for (const utility of utilities) {
    for (const [k, v] of Object.entries(utility.css)) {
      if (v != null) {
        css[k] = v;
      }
    }
  }
  return css;
}

export function calcRgba (hex: string): [number, number, number, number] {
  if (hex.length === 4) hex = "#" + [hex[1], hex[1], hex[2], hex[2], hex[3], hex[3]].join("");
  else if (hex.length === 5) hex = "#" + [hex[1], hex[1], hex[2], hex[2], hex[3], hex[3], hex[4], hex[4]].join("");
  const c = +("0x" + hex.substring(1));
  if (hex.length === 9) return [(c >> 24) & 255, (c >> 16) & 255, (c >> 8) & 255, (c & 255) / 256];
  return [(c >> 16) & 255, (c >> 8) & 255, c & 255, 1];
}

export function sliceColor (str: string): string[] {
  const params = str.slice(str.indexOf("(") + 1, str.indexOf(")"));
  return params.indexOf(",") !== -1 ? params.split(/,\s*/) : params.split(/\s+\/?\s*/);
}

export function hexToRgb (hex: string): string {
  return parenWrap("rgb", calcRgba(hex).slice(0, 3).join(", "));
}

export function hexToRgba (hex: string) {
  return parenWrap("rgba", calcRgba(hex).join(", "));
}
