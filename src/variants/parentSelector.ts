import { VariantBuilder } from "../types";
import { useVariant } from "./base";

export const groupHover: VariantBuilder = (...utilities) => useVariant(".group:hover &", utilities);
export const groupFocus: VariantBuilder = (...utilities) => useVariant(".group:focus &", utilities);
export const groupActive: VariantBuilder = (...utilities) => useVariant(".group:active &", utilities);
export const groupVisited: VariantBuilder = (...utilities) => useVariant(".group:visited &", utilities);
