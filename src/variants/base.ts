import { SymbolMeta, SymbolProxy } from "../helpers/symbol";

import { StyleObject } from "../types";
import { css } from "../helpers/css";

export function useVariant (rule: string, utilities: (StyleObject | StyleObject[])[]): StyleObject[] {
  return utilities.flat().map(u => SymbolProxy in u ? css(u.css, undefined, { ...u.meta, variants: [...u.meta.variants, rule] }) : (u[SymbolMeta].variants.push(rule), u));
}

export const useMedia = (rule: string, utilities: (StyleObject | StyleObject[])[]) => useVariant("@media " + rule, utilities);

export function variant (rule: string, ...utilities: (StyleObject | StyleObject[])[]): StyleObject[] {
  return useVariant(rule, utilities);
}

export function media (rule: string, ...utilities: (StyleObject | StyleObject[])[]): StyleObject[] {
  return useMedia(rule, utilities);
}
