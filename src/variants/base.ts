import { CSSObject, StyleObject } from "../types";
import { bundleStyle } from "../utils";

export function useVariant (rule: string, utilities: StyleObject[]): StyleObject {
  const css: CSSObject = {};
  css[rule] = bundleStyle(utilities);
  return { css };
}

export const useMedia = (rule: string, utilities: StyleObject[]) => useVariant("@media " + rule, utilities);

export function variant (rule: string, ...utilities: StyleObject[]): StyleObject {
  return useVariant(rule, utilities);
}

export function media (rule: string, ...utilities: StyleObject[]): StyleObject {
  return useMedia(rule, utilities);
}
