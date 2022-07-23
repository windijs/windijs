import { CSSObject, StyleObject, StyleProperties } from "./types";
import { css } from "./utilities";

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

export const SymbolProxy = Symbol.for("proxy");

export function isProxy (i: unknown) {
  return i != null && typeof i === "object" && SymbolProxy in i;
}

export function useProxy<T extends object, S = StyleObject> (f: (prop: string) => S | undefined) {
  const handler: ProxyHandler<T> = {
    get (target, prop: string) {
      return f(prop);
    },
  };

  return new Proxy({ [SymbolProxy]: true } as T, handler);
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
      if (v != null) css[k] = v;
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

export function hash (str: string): string {
  str = str.replace(/\r/g, "");
  let hash = 5381;
  let i = str.length;

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
  return (hash >>> 0).toString(36);
}

export function firstRet (fns: Function[], args: any[] = []) {
  let result;
  for (const fn of fns) {
    result = fn.apply(undefined, args);
    if (result) return result;
  }
}

export function buildStatic (property: StyleProperties | StyleProperties[], value: unknown): StyleObject | undefined {
  if (typeof value !== "string") return undefined;

  const decl: CSSObject = {};
  if (Array.isArray(property)) {
    property.forEach(p => (decl[p as string] = value));
  } else {
    decl[property as string] = value;
  }
  return css(decl);
}

export function buildColor (colorProperty: StyleProperties, colorOpacityProperty: string | undefined, value: unknown): StyleObject | undefined {
  if (typeof value !== "string") return undefined;

  let decl: CSSObject = { [colorProperty]: value };

  if (colorOpacityProperty != null) {
    if (value.startsWith("#")) {
      const [r, g, b, a] = calcRgba(value);
      decl = {
        [colorProperty]: parenWrap("rgba", [r, g, b, parenWrap("var", colorOpacityProperty)].join(", ")),
        [colorOpacityProperty]: a.toString(),
      };
    } else if (/^(rgb|hwb|hsl)/.test(value)) {
      const values = sliceColor(value);
      decl = {
        [colorProperty]: value.startsWith("hwb") ? parenWrap("hwb", values.slice(0, 3).join(" ") + " / " + parenWrap("var", colorOpacityProperty)) : parenWrap(value.startsWith("hsl") ? "hsla" : "rgba", [...values.slice(0, 3), parenWrap("var", colorOpacityProperty)].join(", ")),
        [colorOpacityProperty]: values[3] ?? "1",
      };
    }
    return css(decl, {
      opacity (op: number) {
        const obj: CSSObject = { ...decl };
        obj[colorOpacityProperty] = (op / 100).toString();
        return css(obj);
      },
    }) as StyleObject & { opacity(op: number): StyleObject };
  }
  return css(decl);
}

export function buildFontSize (fontSize: string, lineHeight?: string, others?: { [key in StyleProperties]: string }): StyleObject {
  let decl: CSSObject = { fontSize };
  if (lineHeight != null) decl.lineHeight = lineHeight;
  if (others != null) decl = { ...decl, ...others } as CSSObject;

  return css(decl);
}
