import type { VariantBuilder } from "types";
import { useVariant } from "./base";

/**
 * Targets svg nodes.
 */
export const svg: VariantBuilder = (...utilities) => useVariant("& svg", utilities);

/**
 * Target all nodes.
 */
export const all: VariantBuilder = (...utilities) => useVariant("& *", utilities);

/**
 * Targets children nodes.
 */
export const children: VariantBuilder = (...utilities) => useVariant("& > *", utilities);

/**
 * Targets siblings nodes.
 */
export const siblings: VariantBuilder = (...utilities) => useVariant("& ~ *", utilities);

/**
 * Targets first sibling node.
 */
export const sibling: VariantBuilder = (...utilities) => useVariant("& + *", utilities);
