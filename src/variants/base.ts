import { CSSObject, StyleObject } from "../types";
import { bundleStyle } from "../utils";

export function useVariant (key: string, utilities: StyleObject[]): StyleObject {
  const css: CSSObject = {};
  css[key] = bundleStyle(utilities);
  return { css };
}

export const useMedia = (media: string, utilities: StyleObject[]) => useVariant("@media " + media, utilities);
