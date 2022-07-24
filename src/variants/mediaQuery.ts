import { useMedia, useVariant } from "./base";

import { VariantBuilder } from "../types";

// screens

/**
 * Enable utility when the screen width is greater than 640px
 */
export const sm: VariantBuilder = (...utilities) => useMedia("(min-width: 640px)", utilities);

/**
 * Enable utility when the screen width is greater than 768px
 */
export const md: VariantBuilder = (...utilities) => useMedia("(min-width: 768px)", utilities);

/**
 * Enable utility when the screen width is greater than 1024px
 */
export const lg: VariantBuilder = (...utilities) => useMedia("(min-width: 1024px)", utilities);

/**
 * Enable utility when the screen width is greater than 120px
 */
export const xl: VariantBuilder = (...utilities) => useMedia("(min-width: 1280x)", utilities);

/**
 * Enable utility when the screen width is greater than 1536px
 */
export const xxl: VariantBuilder = (...utilities) => useMedia("(min-width: 1536px)", utilities);

/**
 * Enable utility when the screen width is less than 640px
 */
export const _sm: VariantBuilder = (...utilities) => useMedia("(max-width: 640px)", utilities);

/**
 * Enable utility when the screen width is less than 640px
 */
export const _md: VariantBuilder = (...utilities) => useMedia("(max-width: 768px)", utilities);

/**
 * Enable utility when the screen width is less than 640px
 */
export const _lg: VariantBuilder = (...utilities) => useMedia("(max-width: 1024px)", utilities);

/**
 * Enable utility when the screen width is less than 640px
 */
export const _xl: VariantBuilder = (...utilities) => useMedia("(max-width: 1280x)", utilities);

/**
 * Enable utility when the screen width is less than 640px
 */
export const _xxl: VariantBuilder = (...utilities) => useMedia("(max-width: 1536px)", utilities);

/**
 * Enable utility when the screen width is greater than 640px and less than 768px
 */
export const $sm: VariantBuilder = (...utilities) => useMedia("(min-width: 640px) and (max-width: 768px)", utilities);

/**
 * Enable utility when the screen width is greater than 768px and less than 1024px
 */
export const $md: VariantBuilder = (...utilities) => useMedia("(min-width: 768px) and (max-width: 1024px)", utilities);

/**
 * Enable utility when the screen width is greater than 1024px and less than 1280px
 */
export const $lg: VariantBuilder = (...utilities) => useMedia("(min-width: 1024px) and (max-width: 1280px)", utilities);

/**
 * Enable utility when the screen width is greater than 1280px and less than 1536px
 */
export const $xl: VariantBuilder = (...utilities) => useMedia("(min-width: 1280px) and (max-width: 1536px)", utilities);

/**
 * Enable utility when the screen width is greater than 1536px
 */
export const $xxl: VariantBuilder = (...utilities) => useMedia("(min-width: 1536px)", utilities);

// motions

/**
 * Targets the prefers-reduced-motion: no-preference media query.
 */
export const motionSafe: VariantBuilder = (...utilities) => useMedia("(prefers-reduced-motion: no-preference)", utilities);

/**
 * Targets the prefers-reduced-motion: reduce media query.
 */
export const motionReduce: VariantBuilder = (...utilities) => useMedia("(prefers-reduced-motion: reduce)", utilities);

// themes

/**
 * Enable utility when the system turns on dark mode
 */
export const dark: VariantBuilder = (...utilities) => useMedia("(prefers-color-scheme: dark)", utilities);

/**
 * Enable utility when the system turns on light mode
 */
export const light: VariantBuilder = (...utilities) => useMedia("(prefers-color-scheme: light)", utilities);

/**
 * Enable utility base on application dark mode
 */
export const $dark: VariantBuilder = (...utilities) => useVariant(".dark &", utilities);

/**
 * Enable utility base on application light mode
 */
export const $light: VariantBuilder = (...utilities) => useVariant(".light &", utilities);

// orientations

/**
 * Enable utility when the device is in portrait orientation
 */
export const portrait: VariantBuilder = (...utilities) => useMedia("(orientation: portrait)", utilities);

/**
 * Enable utility when the device is in landscape orientation
 */
export const landscape: VariantBuilder = (...utilities) => useMedia("(orientation: landscape)", utilities);

// directions

/**
 * Enable utility when text is written from left to right.
 */
export const ltr: VariantBuilder = (...utilities) => useVariant("[dir='ltr'] &, [dir='ltr']&", utilities);

/**
 * Enable utility when text is written from right to left.
 */
export const rtl: VariantBuilder = (...utilities) => useVariant("[dir='rtl'] &, [dir='rtl']&", utilities);
