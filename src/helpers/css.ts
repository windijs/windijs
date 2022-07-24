import { CSSObject, StyleObject, UtilityMeta } from "../types";
import { SymbolCSS, SymbolData, SymbolMeta, SymbolProxy } from "./symbol";
import { getMeta, pushMetaProp } from "./meta";

import { parenWrap } from "../utils";

export function isStyleObject (i: unknown) {
  return i != null && typeof i === "object" && SymbolCSS in i;
}

export function css (css: CSSObject, data?: { [key: string]: unknown }, meta?: UtilityMeta) {
  if (data != null) {
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === "function") {
        data[k] = (...args: unknown[]) => {
          pushMetaProp(parenWrap(k, args.toString())); // push func prop, for example bg.red.opacity(50) -> [..., opacity(50)]
          return v(...args);
        };
      }
    }
  }

  return new Proxy({
    [SymbolProxy]: true,
    [SymbolCSS]: css,
    [SymbolMeta]: meta ?? getMeta(),
    [SymbolData]: data,
  }, {
    get (target, prop, receiver) {
      if (prop === "css") return Reflect.get(target, SymbolCSS, receiver);
      if (prop === "meta") return Reflect.get(target, SymbolMeta, receiver);
      if (prop === "toString") return () => Object.keys(target).join(" ");
      const data = Reflect.get(target, SymbolData, receiver);
      if (data && prop in data) return data[prop];
      return Reflect.get(target, prop, receiver);
    },
  }) as StyleObject;
}
