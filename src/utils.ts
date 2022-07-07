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

export function useProxy<T extends object> (f: (prop: string) => StyleObject | undefined) {
  const handler: ProxyHandler<T> = {
    get (target, prop) {
      return f(prop as string);
    },
  };

  return new Proxy({}, handler);
}
