import { createVariant } from "@windi/core";

/**
 * Targets an element when a marked parent matches the hover pseudo-class.
 */
export const groupHover = createVariant(".group:hover &");

/**
 * Targets an element when a marked parent matches the focus pseudo-class.
 */
export const groupFocus = createVariant(".group:focus &");

/**
 * Targets an element when a marked parent matches the active pseudo-class.
 */
export const groupActive = createVariant(".group:active &");

/**
 * Targets an element when a marked parent matches the visited pseudo-class.
 */
export const groupVisited = createVariant(".group:visited &");
