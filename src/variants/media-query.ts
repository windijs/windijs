import { VariantBuilder } from "../types";
import { useMedia, useVariant } from "./base";

// screens

export const sm: VariantBuilder = (...utilities) => useMedia("(min-width: 640px)", utilities);
export const md: VariantBuilder = (...utilities) => useMedia("(min-width: 768px)", utilities);
export const lg: VariantBuilder = (...utilities) => useMedia("(min-width: 1024px)", utilities);
export const xl: VariantBuilder = (...utilities) => useMedia("(min-width: 1280x)", utilities);
export const xxl: VariantBuilder = (...utilities) => useMedia("(min-width: 1536px)", utilities);

export const _sm: VariantBuilder = (...utilities) => useMedia("(max-width: 640px)", utilities);
export const _md: VariantBuilder = (...utilities) => useMedia("(max-width: 768px)", utilities);
export const _lg: VariantBuilder = (...utilities) => useMedia("(max-width: 1024px)", utilities);
export const _xl: VariantBuilder = (...utilities) => useMedia("(max-width: 1280x)", utilities);
export const _xxl: VariantBuilder = (...utilities) => useMedia("(max-width: 1536px)", utilities);

export const $sm: VariantBuilder = (...utilities) => useMedia("(min-width: 640px) and (max-width: 768px)", utilities);
export const $md: VariantBuilder = (...utilities) => useMedia("(min-width: 768px) and (max-width: 1024px)", utilities);
export const $lg: VariantBuilder = (...utilities) => useMedia("(min-width: 1024px) and (max-width: 1280px)", utilities);
export const $xl: VariantBuilder = (...utilities) => useMedia("(min-width: 1280px) and (max-width: 1536px)", utilities);
export const $xxl: VariantBuilder = (...utilities) => useMedia("(min-width: 1536px)", utilities);

// motions

export const motionSafe: VariantBuilder = (...utilities) => useMedia("(prefers-reduced-motion: no-preference)", utilities);
export const motionReduce: VariantBuilder = (...utilities) => useMedia("(prefers-reduced-motion: reduce)", utilities);

// themes

export const dark: VariantBuilder = (...utilities) => useMedia("(prefers-color-scheme: dark)", utilities);
export const light: VariantBuilder = (...utilities) => useMedia("(prefers-color-scheme: light)", utilities);
export const $dark: VariantBuilder = (...utilities) => useVariant(".dark &", utilities);
export const $light: VariantBuilder = (...utilities) => useVariant(".light &", utilities);

// orientations

export const portrait: VariantBuilder = (...utilities) => useMedia("(orientation: portrait)", utilities);
export const landscape: VariantBuilder = (...utilities) => useMedia("(orientation: landscape)", utilities);

// directions

export const ltr: VariantBuilder = (...utilities) => useVariant("[dir='ltr'] &, [dir='ltr']&", utilities);
export const rtl: VariantBuilder = (...utilities) => useVariant("[dir='rtl'] &, [dir='rtl']&", utilities);
