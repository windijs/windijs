import { createMedia, createVariant } from "./base";

// screens

/**
 * Enable utility when the screen width is greater than 640px
 */
export const sm = createMedia("(min-width: 640px)");

/**
 * Enable utility when the screen width is greater than 768px
 */
export const md = createMedia("(min-width: 768px)");

/**
 * Enable utility when the screen width is greater than 1024px
 */
export const lg = createMedia("(min-width: 1024px)");

/**
 * Enable utility when the screen width is greater than 120px
 */
export const xl = createMedia("(min-width: 1280x)");

/**
 * Enable utility when the screen width is greater than 1536px
 */
export const xxl = createMedia("(min-width: 1536px)");

/**
 * Enable utility when the screen width is less than 640px
 */
export const _sm = createMedia("(max-width: 640px)");

/**
 * Enable utility when the screen width is less than 640px
 */
export const _md = createMedia("(max-width: 768px)");

/**
 * Enable utility when the screen width is less than 640px
 */
export const _lg = createMedia("(max-width: 1024px)");

/**
 * Enable utility when the screen width is less than 640px
 */
export const _xl = createMedia("(max-width: 1280x)");

/**
 * Enable utility when the screen width is less than 640px
 */
export const _xxl = createMedia("(max-width: 1536px)");

/**
 * Enable utility when the screen width is greater than 640px and less than 768px
 */
export const $sm = createMedia("(min-width: 640px) and (max-width: 768px)");

/**
 * Enable utility when the screen width is greater than 768px and less than 1024px
 */
export const $md = createMedia("(min-width: 768px) and (max-width: 1024px)");

/**
 * Enable utility when the screen width is greater than 1024px and less than 1280px
 */
export const $lg = createMedia("(min-width: 1024px) and (max-width: 1280px)");

/**
 * Enable utility when the screen width is greater than 1280px and less than 1536px
 */
export const $xl = createMedia("(min-width: 1280px) and (max-width: 1536px)");

/**
 * Enable utility when the screen width is greater than 1536px
 */
export const $xxl = createMedia("(min-width: 1536px)");

// motions

/**
 * Targets the prefers-reduced-motion: no-preference media query.
 */
export const motionSafe = createMedia("(prefers-reduced-motion: no-preference)");

/**
 * Targets the prefers-reduced-motion: reduce media query.
 */
export const motionReduce = createMedia("(prefers-reduced-motion: reduce)");

// themes

/**
 * Enable utility when the system turns on dark mode
 */
export const dark = createMedia("(prefers-color-scheme: dark)");

/**
 * Enable utility when the system turns on light mode
 */
export const light = createMedia("(prefers-color-scheme: light)");

/**
 * Enable utility base on application dark mode
 */
export const $dark = createVariant(".dark &");

/**
 * Enable utility base on application light mode
 */
export const $light = createVariant(".light &");

// orientations

/**
 * Enable utility when the device is in portrait orientation
 */
export const portrait = createMedia("(orientation: portrait)");

/**
 * Enable utility when the device is in landscape orientation
 */
export const landscape = createMedia("(orientation: landscape)");

// directions

/**
 * Enable utility when text is written from left to right.
 */
export const ltr = createVariant("[dir='ltr'] &, [dir='ltr']&");

/**
 * Enable utility when text is written from right to left.
 */
export const rtl = createVariant("[dir='rtl'] &, [dir='rtl']&");
