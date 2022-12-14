import { entries } from "@windijs/shared";
import { mergeObject } from "./merge";

import type { CSSMap, CSSObject, StyleObject, StyleProperties, Utilities } from "./types";

export const SymbolCSS = Symbol.for("css");
export const SymbolMeta = Symbol.for("meta");
export const SymbolData = Symbol.for("data");
export const SymbolProxy = Symbol.for("proxy");

export function isProxy<T extends object | Function>(i: T) {
  return i != null && SymbolProxy in i;
}

export function isStyleObject(i: unknown): i is StyleObject {
  return i != null && (typeof i === "object" || typeof i === "function") && (i as StyleObject)[SymbolCSS] != null;
}

export function isStyleArray(i: unknown): boolean {
  return Array.isArray(i) && i.find(o => isStyleObject(o) || isStyleArray(o));
}

export function getStyleVariants(style: StyleObject): string[] {
  return style[SymbolMeta].variants;
}

export function getStyleProps(style: StyleObject): string[] {
  const { uid, children, props } = style[SymbolMeta];
  if (Array.isArray(children)) style = children[0];
  return [uid, ...(props ?? [])].filter(i => i != null) as string[];
}

export function getStyleIdent(style: StyleObject): string {
  return (
    getStyleVariants(style)
      .map(i => i + ":")
      .join("") + getStyleProps(style).join(".")
  );
}

export function getFirstVar(style: StyleObject): [string, string] | undefined {
  const css = style[SymbolCSS];
  for (const [k, v] of entries(css)) if (k.startsWith("--w-")) return [k, v];

  return undefined;
}

export function applyVariant(utility: StyleObject): CSSObject | CSSMap {
  let css = utility[SymbolCSS];
  for (const variant of utility[SymbolMeta].variants)
    css = {
      [variant]: css,
    } as CSSObject;

  return css;
}

export function useArrayHelper() {
  // eslint-disable-next-line no-extend-native
  Array.prototype.toString = function () {
    return this.join(isStyleArray(this) ? " " : ",");
  };
}

/**
 * Bundle all utilities to a single css object.
 * @param utilities - Utilities and Variants
 * @returns CSSObject
 */
export function bundle(utilities: Utilities[]): CSSMap {
  let vcss: CSSMap | CSSObject;
  let selector: string | undefined;
  const css: CSSMap = new Map();
  for (const utility of utilities.flat().filter(i => i != null) as StyleObject[]) {
    vcss = applyVariant(utility);
    selector = utility[SymbolMeta].selector;
    if (selector)
      vcss = {
        [selector]: vcss,
      };
    for (const [k, v] of entries(vcss)) if (v != null) css.set(k, css.has(k) && typeof v === "object" ? mergeObject(css.get(k) as object, v) : v);
  }
  return css;
}

export const prop = (strings: TemplateStringsArray, ...expr: string[]) =>
  strings.map((string, i) => string + (expr[i] || "")).join("") as StyleProperties;
