import { FractionObject, Negative } from "./types";

/**
 * Check if input is a number
 *
 * @param value A numeric string
 * @returns Boolean
 */
export function isNumber(value: string) {
  return !isNaN(value as unknown as number);
}

export function isFraction(amount: string): boolean {
  return /^\d+\/\d+$/.test(amount);
}

export function isSize(amount: string): boolean {
  return /^-?(\d+(\.\d+)?)+(rem|em|px|rpx|vh|vw|ch|ex|cm|mm|in|pt|pc)$/.test(amount);
}

export function isColor(amount: string): boolean {
  return /^(#|rgb|hsl|hwb)/.test(amount);
}

export function isUrl(amount: string): boolean {
  return amount.startsWith("url(");
}

export function isPosition(amount: string): boolean {
  return /^top|left|bottom|right|center/.test(amount);
}

export function isGradient(amount: string): boolean {
  return /^(-webkit-)?(linear|radial)-gradient/.test(amount);
}

export function isVarName(value: string): boolean {
  return /^[a-zA-Z_$]+[a-zA-Z_$\d]*$/.test(value);
}

export function roundUp(num: number, precision = 0): number {
  precision = Math.pow(10, precision);
  return Math.round(num * precision) / precision;
}

export function fracToPercent(amount: string): string | undefined {
  const matches = amount.match(/[^/]+/g);
  if (!matches || matches.length < 2) return;
  const a = +matches[0];
  const b = +matches[1];
  return roundUp((a / b) * 100, 6) + "%";
}

export const hasKey = <T extends Record<string, unknown>>(obj: T, k: string | number | symbol): k is keyof T => k in obj;

export function commaJoin(...items: (string | number | undefined)[]) {
  return items.filter(i => i).join(", ");
}

export function parenWrap(key: string, value: string) {
  return key + "(" + value + ")";
}

export function camelToDash(str: string) {
  return str.replace(/([A-Z])/g, v => `-${v.toLowerCase()}`);
}

export function dashToCamel(str: string) {
  return str.replace(/(-[a-z])/g, v => v.toUpperCase().replace("-", ""));
}

export function hash(str: string): string {
  str = str.replace(/\r/g, "");
  let hash = 5381;
  let i = str.length;

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
  return (hash >>> 0).toString(36);
}

export function uniqueId(): string {
  return "w" + hash(Math.random().toString());
}

export function indent(value: string, count = 2) {
  return " ".repeat(count) + value;
}

export const entries = <T extends object | Map<string, unknown>>(t: T) => (t instanceof Map ? t.entries() : Object.entries(t));

export function negative<T extends Record<string | number, string>>(t: T): Negative<T> {
  return Object.fromEntries(
    Object.entries(t)
      .filter(([, v]) => !/^0(px|rem|em)?$/.test(v))
      .map(([k, v]) => ["-" + k, "-" + v])
  ) as Negative<T>;
}

export function range(start: number, end: number): number[] {
  return new Array(end - start).fill(0).map((_, i) => i + start);
}

export function fractions<S extends number, E extends number>(start: S, end: E) {
  return Object.fromEntries(
    (range(start, end) as number[])
      .map(i =>
        range(1, i as 0)
          .map(v => [v + "/" + i, (v / i) * 100] as [string, number])
          .map(([k, v]) => [k, v % 1 === 0 ? v + "%" : v.toFixed(6) + "%"])
      )
      .flat()
  ) as FractionObject<S, E>;
}

export function spacings<T extends Array<number>>(numbers: T) {
  return Object.fromEntries(numbers.map(i => [i, i / 4 + (i === 0 ? "px" : "rem")])) as Record<T[number], string>;
}

export function degrees<T extends number>(numbers: T[]) {
  return Object.fromEntries(numbers.map(i => [i, i + "deg"])) as Record<T, string>;
}

export function scales<T extends number>(numbers: T[]) {
  return Object.fromEntries(numbers.map(i => [i, i / 100 + ""])) as Record<T, string>;
}

export function omit<T extends object, K extends object>(t: T, keys: K) {
  return Object.fromEntries(Object.entries(t).filter(([k]) => !(k in keys))) as Omit<T, keyof K>;
}
