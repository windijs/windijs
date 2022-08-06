import { SymbolMeta, SymbolProxy } from "helpers/common";

import type { StyleObject, VariantBuilder } from "types";
import { css } from "helpers/css";

export function useVariant (rule: string, utilities: (StyleObject | StyleObject[])[]): StyleObject[] {
  return utilities.flat().map(u => SymbolProxy in u ? css(u.css, undefined, { ...u.meta, variants: [...u.meta.variants, rule] }) : (u[SymbolMeta].variants.push(rule), u));
}

export const useMedia = (rule: string, utilities: (StyleObject | StyleObject[])[]) => useVariant("@media " + rule, utilities);

export const createVariant = (rule: string): VariantBuilder => (...utilities) => useVariant(rule, utilities);

export const createMedia = (rule: string): VariantBuilder => (...utilities) => useMedia(rule, utilities);

export const variant = (rule: string, ...utilities: (StyleObject | StyleObject[])[]) => useVariant(rule, utilities);

export const media = (rule: string, ...utilities: (StyleObject | StyleObject[])[]) => useMedia(rule, utilities);
