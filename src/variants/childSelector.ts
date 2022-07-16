import { VariantBuilder } from "../types";
import { useVariant } from "./base";

export const svg: VariantBuilder = (...utilities) => useVariant("& svg", utilities);
export const all: VariantBuilder = (...utilities) => useVariant("& *", utilities);
export const children: VariantBuilder = (...utilities) => useVariant("& > *", utilities);
export const siblings: VariantBuilder = (...utilities) => useVariant("& ~ *", utilities);
export const sibling: VariantBuilder = (...utilities) => useVariant("& + *", utilities);
