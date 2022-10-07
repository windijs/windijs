import { parenWrap } from "@windijs/shared";

import { buildStyle } from "./build";
import { bundle, SymbolCSS, SymbolData, SymbolMeta, SymbolProxy } from "./common";
import { getMeta, pushMetaProp } from "./meta";
import { nameStyle } from "./namer";

import type { CSSMap, CSSObject, StyleLoader, StyleObject, TargetCreator, Utilities, UtilityMeta } from "./types";

export const baseStyleTarget: TargetCreator = (css, meta, data) => {
  if (data != null)
    // push func prop, for example bg.red.opacity(50) -> [..., opacity(50)]
    for (const [k, v] of Object.entries(data))
      if (typeof v === "function")
        data[k] = (...args: unknown[]) => {
          pushMetaProp(parenWrap(k, args.toString()));
          return v(...args);
        };

  return {
    [SymbolProxy]: true,
    [SymbolCSS]: css,
    [SymbolMeta]: meta,
    [SymbolData]: data,
  };
};

export const baseStyleHandler = (target: StyleObject<{}>, prop: string | symbol, receiver: unknown) => {
  if (prop === "css") return Reflect.get(target, SymbolCSS, receiver);
  if (prop === "meta") return Reflect.get(target, SymbolMeta, receiver);
  const data = Reflect.get(target, SymbolData, receiver);
  if (data && prop in data) return data[prop];
  return Reflect.get(target, prop, receiver);
};

let CurrentLoader: StyleLoader = (css, meta, data) => new Proxy(baseStyleTarget(css, meta, data), { get: baseStyleHandler }) as StyleObject;

export function useStyleLoader(loader: StyleLoader) {
  CurrentLoader = loader;
}

export function css<D extends Record<string, unknown>>(css: CSSObject | CSSMap, data?: D, meta?: UtilityMeta): StyleObject<D> {
  return CurrentLoader(css, meta ?? getMeta(), data) as StyleObject<D>;
}

const BUILDED_CLASSES: string[] = [];

export function injectCSS(css: string) {
  const container = document.getElementById("windijs");
  if (container) container.textContent += "\n" + css;
  else {
    const el = document.createElement("style");
    el.id = "windijs";
    el.setAttribute("type", "text/css");
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/** Create a styleLoader */
export function createStyleLoader(inject: (className: string, style: StyleObject) => void): StyleLoader {
  return (css, meta, data) => {
    const baseStyle = baseStyleTarget(css, meta, data) as StyleObject;
    const className = nameStyle(baseStyle);

    return new Proxy(
      {
        [className]: true,
        ...baseStyle,
      },
      {
        get(target, prop, receiver) {
          // for react, svelte...
          if (prop === "toString")
            return () => {
              inject(className, baseStyle);
              return Object.keys(target).join(" ");
            };

          // for vue
          if (prop === className) {
            inject(className, baseStyle);
            return Reflect.get(target, prop, receiver);
          }
          return baseStyleHandler(target, prop, receiver);
        },
      }
    );
  };
}

/** CSS-In-JS Loader */
export const cssInJsLoader = createStyleLoader((className, style) => {
  if (!BUILDED_CLASSES.includes(className)) {
    BUILDED_CLASSES.push(className);
    injectCSS(buildStyle(className, style));
  }
});

const SSR_CLASSES: string[] = [];
const SSR_CSS_LIST: string[] = [];

/** SSR Loader */
export const ssrLoader = createStyleLoader((className, style) => {
  if (!SSR_CLASSES.includes(className)) {
    SSR_CLASSES.push(className);
    SSR_CSS_LIST.push(buildStyle(className, style));
  }
});

/** Mount server side generated css */
export function mountCSS() {
  return SSR_CSS_LIST.join("\n");
}

export function apply(selector: string, ...utilities: Utilities[]): StyleObject {
  return css(bundle(utilities), undefined, {
    uid: "apply",
    type: "css",
    props: [selector],
    variants: [],
    selector,
  });
}
