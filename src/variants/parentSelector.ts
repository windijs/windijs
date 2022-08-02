import type { VariantBuilder } from "types";
import { useVariant } from "./base";

/**
 * Targets an element when a marked parent matches the hover pseudo-class.
 */
export const groupHover: VariantBuilder = (...utilities) => useVariant(".group:hover &", utilities);

/**
 * Targets an element when a marked parent matches the focus pseudo-class.
 */
export const groupFocus: VariantBuilder = (...utilities) => useVariant(".group:focus &", utilities);

/**
 * Targets an element when a marked parent matches the active pseudo-class.
 */
export const groupActive: VariantBuilder = (...utilities) => useVariant(".group:active &", utilities);

/**
 * Targets an element when a marked parent matches the visited pseudo-class.
 */
export const groupVisited: VariantBuilder = (...utilities) => useVariant(".group:visited &", utilities);
