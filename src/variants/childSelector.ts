import { createVariant } from "./base";

/**
 * Targets svg nodes.
 */
export const svg = createVariant("& svg");

/**
 * Target all nodes.
 */
export const all = createVariant("& *");

/**
 * Targets children nodes.
 */
export const children = createVariant("& > *");

/**
 * Targets siblings nodes.
 */
export const siblings = createVariant("& ~ *");

/**
 * Targets first sibling node.
 */
export const sibling = createVariant("& + *");
