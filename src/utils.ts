import type { FractionObject, Negative, RangeTuple } from "types";

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

export function commaJoin (...items: (string|number|undefined)[]) {
  return items.filter(i => i).join(", ");
}

export function parenWrap (key: string, value: string) {
  return key + "(" + value + ")";
}

export function camelToDash (str: string) {
  return str.replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);
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

export function indent (value: string, count: number = 2) {
  return " ".repeat(count) + value;
}

export function negative <T extends Record<string | number, string>> (t: T): Negative<T> {
  return Object.fromEntries(Object.entries(t).filter(([, v]) => !/^0(px|rem|em)?$/.test(v)).map(([k, v]) => ["-" + k, "-" + v])) as Negative<T>;
}

export function range<S extends number, E extends number> (start: S, end: E): RangeTuple<S, E> {
  return new Array(end - start).fill(0).map((_, i) => i + start) as RangeTuple<S, E>;
}

export function fractions<S extends number, E extends number> (start: S, end: E) {
  return Object.fromEntries((range(start, end) as number[]).map(i => range(1, i as 0).map(v => [v + "/" + i, v / i * 100] as [string, number]).map(([k, v]) => [k, v % 1 === 0 ? v + "%" : v.toFixed(6) + "%"])).flat()) as FractionObject<S, E>;
}

export function spacings<T extends Array<any>> (numbers: T) {
  return Object.fromEntries(numbers.map(i => [i, i / 4 + (i === 0 ? "px" : "rem")])) as Record<T[number], string>;
}
