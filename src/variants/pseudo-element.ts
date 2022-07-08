import { VariantBuilder } from "../types";
import { useVariant } from "./base";

export const before: VariantBuilder = (...utilities) => useVariant("&::before", utilities);
export const after: VariantBuilder = (...utilities) => useVariant("&::after", utilities);
export const fileSelectorButton: VariantBuilder = (...utilities) => useVariant("&::file-selector-button", utilities);
export const firstLetter: VariantBuilder = (...utilities) => useVariant("&::first-letter", utilities);
export const firstLine: VariantBuilder = (...utilities) => useVariant("&::first-line", utilities);
export const marker: VariantBuilder = (...utilities) => useVariant("& *::marker, &::marker", utilities);
export const selection: VariantBuilder = (...utilities) => useVariant("& *::selection, &::selection", utilities);
