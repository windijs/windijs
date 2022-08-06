import type { CSSObject, StyleObject } from "types";

export const SymbolCSS = Symbol.for("css");
export const SymbolMeta = Symbol.for("meta");
export const SymbolData = Symbol.for("data");
export const SymbolProxy = Symbol.for("proxy");

export function isStyleObject (i: unknown) {
  return i != null && typeof i === "object" && SymbolCSS in i;
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

export function applyVariant (utility: StyleObject) {
  let css = utility[SymbolCSS];
  for (const variant of utility[SymbolMeta].variants) {
    css = {
      [variant]: css,
    };
  }

  return css;
}

export function useArrayHelper () {
  // eslint-disable-next-line no-extend-native
  Array.prototype.toString = function () {
    if (this.find(isStyleObject)) return this.join(" ");
    return this.join(",");
  };
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