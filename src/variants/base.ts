import { CSSObject, StyleObject } from "../types";

import { bundleStyle } from "../helpers/build";
import { css } from "../utilities/base";

export function useVariant (rule: string, utilities: StyleObject[]): StyleObject {
  const decl: CSSObject = {};
  decl[rule] = bundleStyle(utilities);
  return css(decl, undefined, { type: "variant", uid: rule, props: [], children: utilities });
}

export const useMedia = (rule: string, utilities: StyleObject[]) => useVariant("@media " + rule, utilities);

export function variant (rule: string, ...utilities: StyleObject[]): StyleObject {
  return useVariant(rule, utilities);
}

export function media (rule: string, ...utilities: StyleObject[]): StyleObject {
  return useMedia(rule, utilities);
}
