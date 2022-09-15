import { SymbolProxy } from "./common";

import type { StyleObject } from "./types";

export function useProxy<T extends object, S = StyleObject>(f: (prop: string) => S | undefined) {
  return new Proxy({ [SymbolProxy]: true } as T, {
    get: (target, prop: string) => f(prop),
  });
}

export function isProxy<T extends object | Function>(i: T) {
  return i != null && SymbolProxy in i;
}

export function setProxy<T extends object | Function>(t: T) {
  Reflect.defineProperty(t, SymbolProxy, { value: true });
  return t;
}
