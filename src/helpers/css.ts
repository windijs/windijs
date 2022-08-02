import type { CSSObject, StyleLoader, StyleObject, TargetCreator, UtilityMeta } from "types";
import { SymbolCSS, SymbolData, SymbolMeta, SymbolProxy } from "./symbol";
import { buildRules, createRules } from "./build";
import { getMeta, pushMetaProp } from "./meta";

import { nameStyle } from "./namer";
import { parenWrap } from "utils";

export const baseStyleTarget: TargetCreator = (css, meta, data) => {
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
    [SymbolProxy]: true,
    [SymbolCSS]: css,
    [SymbolMeta]: meta,
    [SymbolData]: data,
  };
};

export const baseStyleHandler = (target: StyleObject<{}>, prop: string | symbol, receiver: any) => {
  if (prop === "css") return Reflect.get(target, SymbolCSS, receiver);
  if (prop === "meta") return Reflect.get(target, SymbolMeta, receiver);
  const data = Reflect.get(target, SymbolData, receiver);
  if (data && prop in data) return data[prop];
  return Reflect.get(target, prop, receiver);
};

let CurrentLoader: StyleLoader = (css, meta, data) => new Proxy(baseStyleTarget(css, meta, data), { get: baseStyleHandler }) as StyleObject;

export function useStyleLoader (loader: StyleLoader) {
  CurrentLoader = loader;
}

export function css (css: CSSObject, data?: { [key: string]: unknown }, meta?: UtilityMeta): StyleObject {
  return CurrentLoader(css, meta ?? getMeta(), data);
}

export function isStyleObject (i: unknown) {
  return i != null && typeof i === "object" && SymbolCSS in i;
}

export function useArrayHelper () {
  // eslint-disable-next-line no-extend-native
  Array.prototype.toString = function () {
    if (this.find(isStyleObject)) return this.join(" ");
    return this.join(",");
  };
}

const BUILDED_CLASSES: string[] = [];
let CSSINJS_LOADED = false;

export function injectCSS (css: string) {
  if (CSSINJS_LOADED) document.getElementById("windijs")!.textContent += ("\n" + css);
  else {
    const el = document.createElement("style");
    el.id = "windijs";
    el.setAttribute("type", "text/css");
    el.textContent = css;
    document.head.appendChild(el);
    CSSINJS_LOADED = true;
  }
}

export function applyVariant (utility: StyleObject) {
  let css = utility[SymbolCSS];
  for (const variant of utility[SymbolMeta].variants) {
    css = {
      [variant]: css,
    };
  }

  return css;
}

/**
 * Bundle all utilities to a single css object.
 * @param utilities Utilities and Variants
 * @returns CSSObject
 */
export function bundle (utilities: (StyleObject | StyleObject[])[]): CSSObject {
  const css: CSSObject = {};
  for (const utility of utilities.flat()) {
    for (const [k, v] of Object.entries(applyVariant(utility))) {
      if (v != null) css[k] = k in css ? Object.assign(css[k], v) : v;
    }
  }
  return css;
}

export function getStyleVariants (style: StyleObject): string[] {
  return style[SymbolMeta].variants;
}

export function getStyleProps (style: StyleObject): string[] {
  const { uid, children, props } = style[SymbolMeta];
  if (Array.isArray(children)) style = children[0]!;
  return [uid, ...props ?? []].filter(i => i != null) as string[];
}

export function getStyleIdent (style: StyleObject): string {
  return getStyleVariants(style).map(i => i + ":").join("") + getStyleProps(style).join(".");
}

export const cssInJsLoader: StyleLoader = (css, meta, data) => {
  const baseStyle = baseStyleTarget(css, meta, data) as StyleObject;
  const className = nameStyle(baseStyle);
  const inject = (v: unknown) => {
    if (!BUILDED_CLASSES.includes(className)) {
      BUILDED_CLASSES.push(className);
      injectCSS(buildRules(createRules(applyVariant(baseStyle), "." + className)));
    }
    return v;
  };

  return new Proxy({
    [className]: true,
    ...baseStyle,
  }, {
    get (target, prop, receiver) {
      // for react, svelte...
      if (prop === "toString") return () => inject(Object.keys(target).join(" "));
      // for vue
      if (prop in target) return inject(Reflect.get(target, prop, receiver));
      return baseStyleHandler(target, prop, receiver);
    },
  });
};
