import type { StyleObject } from "types";
import { SymbolProxy } from "./common";

export function useProxy<T extends object, S = StyleObject> (f: (prop: string) => S | undefined) {
  return new Proxy({ [SymbolProxy]: true } as T, {
    get: (target, prop: string) => f(prop),
  });
}

export function isProxy (i: unknown) {
  return i != null && SymbolProxy in i;
}

export function setProxy<T extends object | Function> (t: T) {
  Reflect.defineProperty(t, SymbolProxy, { value: true });
  return t;
}
