import { StyleObject } from "./types";

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
