import { CSSObject, StyleBaseLoader, StyleLoader, StyleObject, UtilityMeta } from "../types";
import { SymbolCSS, SymbolData, SymbolMeta, SymbolProxy } from "./symbol";
import { getMeta, pushMetaProp } from "./meta";

import { parenWrap } from "../utils";

const baseLoader: StyleBaseLoader = (css, meta, data, props = {}) => {
  if (data != null) {
    for (const [k, v] of Object.entries(data)) {
      // push func prop, for example bg.red.opacity(50) -> [..., opacity(50)]
      if (typeof v === "function") {
        data[k] = (...args: unknown[]) => {
          pushMetaProp(parenWrap(k, args.toString()));
          return v(...args);
        };
      }
    }
  }

  return {
    ...props,
    [SymbolProxy]: true,
    [SymbolCSS]: css,
    [SymbolMeta]: meta,
    [SymbolData]: data,
  };
};

let CurrentLoader: StyleBaseLoader = baseLoader;

export function useStyleLoader (loader: StyleLoader) {
  CurrentLoader = (c, m, d, p) => {
    const { css, meta, data, props } = loader(c, m, d, p);
    return baseLoader(css, meta, data, props);
  };
}

export function css (css: CSSObject, data?: { [key: string]: unknown }, meta?: UtilityMeta) {
  return new Proxy(CurrentLoader(css, meta ?? getMeta(), data), {
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

export function isStyleObject (i: unknown) {
  return i != null && typeof i === "object" && SymbolCSS in i;
}

export function injectCSS (css: string) {
  const el = document.createElement("style");
  el.setAttribute("type", "text/css");
  el.textContent = css;
  document.head.appendChild(el);
}

/**
 * Bundle all utilities to a single css object.
 * @param utilities Utilities and Variants
 * @returns CSSObject
 */
export function bundleStyle (utilities: StyleObject[]): CSSObject {
  const css: CSSObject = {};
  for (const utility of utilities) {
    for (const [k, v] of Object.entries(utility.css)) {
      if (v != null) css[k] = v;
    }
  }
  return css;
}

export function getStyleProps (style: StyleObject): string[] {
  const { uid, children, props } = style[SymbolMeta];
  if (Array.isArray(children)) style = children[0]!;
  return [uid, ...props ?? []].filter(i => i != null) as string[];
}
