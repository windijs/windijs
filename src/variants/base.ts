import { CSSObject, StyleObject } from "../types";
import { css } from "../utilities/base";
import { bundleStyle } from "../utils";

export function useVariant (rule: string, utilities: StyleObject[]): StyleObject {
  const decl: CSSObject = {};
  decl[rule] = bundleStyle(utilities);
  return css(decl, { type: "variant", uid: rule, children: utilities });
}

export const useMedia = (rule: string, utilities: StyleObject[]) => useVariant("@media " + rule, utilities);

export function variant (rule: string, ...utilities: StyleObject[]): StyleObject {
  return useVariant(rule, utilities);
}

export function media (rule: string, ...utilities: StyleObject[]): StyleObject {
  return useMedia(rule, utilities);
}
