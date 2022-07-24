import { StyleObject } from "../types";

export const SymbolProxy = Symbol.for("proxy");

export function useProxy<T extends object, S = StyleObject> (f: (prop: string) => S | undefined) {
  const handler: ProxyHandler<T> = {
    get (target, prop: string) {
      return f(prop);
    },
  };

  return new Proxy({ [SymbolProxy]: true } as T, handler);
}

export function isProxy (i: unknown) {
  return i != null && typeof i === "object" && SymbolProxy in i;
}
