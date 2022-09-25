import {
  BuildFunc,
  CSSDimensionType,
  CSSMap,
  CSSObject,
  ColorStyleProxy,
  Handler,
  MetaType,
  NestedProxy,
  StyleObject,
  StyleProperties,
  StyleProxy,
  StyleProxyHandler,
  SymbolCSS,
  SymbolMeta,
  SymbolProxy,
  UtilityMeta,
  VariantBuilder,
  css,
  getMeta,
  getUid,
  isStyleObject,
  pushMetaProp,
  resetMeta,
  resetStyleMeta,
  updateMetaType,
  useProxy,
} from "@windijs/helpers";
import { fracToPercent, isFraction, isNumber, parenWrap } from "@windijs/shared";

import { buildColor, buildProperty, buildStatic } from "./builder";

export function handleConfig<T extends object & { DEFAULT?: unknown }>(
  build: BuildFunc,
  statics: T,
  type: MetaType,
  p: string | symbol
): StyleObject | CSSObject | CSSMap | UtilityMeta | (() => string) | undefined {
  updateMetaType(type);

  // handle DEFAULT
  if (p === "meta" || p === SymbolMeta) return getMeta();
  if ((p === "css" || p === SymbolCSS) && "DEFAULT" in statics) return build(statics.DEFAULT)?.css;
  if (p === "toString" && "DEFAULT" in statics) return build(statics.DEFAULT)?.toString;
  if (typeof p === "symbol") return undefined;

  const value = (statics as Record<string, unknown>)[p];
  if (value != null && pushMetaProp(p)) {
    if (typeof value === "object" && !Array.isArray(value)) {
      if (SymbolCSS in value) {
        (value as StyleObject)[SymbolMeta] = getMeta();
        return value as StyleObject;
      }
      return useProxy(p2 => handleConfig(build, value, type, p2)) as StyleObject;
    }
    return build(value);
  }
}

export function handler<R>(type: Handler<R>["type"] | string, get: (prop: string) => R, meta?: object): Handler<R> {
  return { type, meta, get } as Handler<R>;
}

export function isHandler<R>(i: unknown): i is Handler<R> {
  return i != null && typeof i === "object" && "get" in i && "type" in i;
}

export function cssHandler(cssOrStyle: StyleObject | CSSObject | CSSMap) {
  return {
    type: "css",
    get(p) {
      cssOrStyle = isStyleObject(cssOrStyle) ? resetStyleMeta(cssOrStyle) : css(cssOrStyle);
      return Reflect.get(cssOrStyle, p);
    },
  } as Handler<StyleObject>;
}

export function callHandler<F extends Function, R extends object = Record<string, unknown>>(call: F, plugin?: Handler<R>): Handler<F & R> {
  return {
    type: "call",
    get: (prop: string) =>
      new Proxy(call, {
        get(target, p: string, receiver) {
          if (p in target) return Reflect.get(target, p, receiver);
          if (plugin) return plugin.get(p);
        },
        apply(target, thisArg, argArray) {
          pushMetaProp(parenWrap(prop, argArray.toString()));
          return Reflect.apply(target, thisArg, argArray);
        },
      }),
  } as Handler<F & R>;
}

export function colorHandler<T extends object>(colors: T, colorProperty: StyleProperties | StyleProperties[]): StyleProxyHandler<T>;
export function colorHandler<T extends object, O extends object = Record<string, unknown>>(
  colors: T,
  build: (value: unknown) => StyleObject<O> | undefined
): Handler<NestedProxy<T, StyleObject<O>>>;
export function colorHandler<T extends object>(
  colors: T,
  colorProperty: StyleProperties | StyleProperties[],
  colorOpacityProperty: string
): Handler<ColorStyleProxy<T>>;
export function colorHandler<T extends object>(
  colors: T,
  colorPropertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc,
  colorOpacityProperty?: string
) {
  const build: BuildFunc =
    typeof colorPropertyOrBuildFunc === "function"
      ? colorPropertyOrBuildFunc
      : value => buildColor(colorPropertyOrBuildFunc, colorOpacityProperty as undefined, value);
  return {
    type: "color",
    meta: { colors, op: colorOpacityProperty },
    get: (p: string) => handleConfig(build, colors, "color", p),
  } as Handler<StyleProxy<T> | ColorStyleProxy<T> | undefined>;
}

export function configHandler<T extends object>(statics: T, property: StyleProperties | StyleProperties[]): StyleProxyHandler<T>;
export function configHandler<T extends object, O extends object = Record<string, unknown>>(
  statics: T,
  build: (value: unknown) => StyleObject<O> | undefined
): Handler<NestedProxy<T, StyleObject<O>>>;
export function configHandler<T extends object>(config: T, propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) {
  const build: BuildFunc = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  return {
    type: "config",
    meta: { config },
    get: (p: string) => handleConfig(build, config, "static", p),
  } as unknown as StyleProxyHandler<T>;
}

type handleDynamic = (prop: string) => CSSObject | StyleObject | undefined;
type handleDynamicWithValue = (prop: string) => string | undefined;

export function genericHandler<R = { [key: string]: StyleObject }>(
  property: StyleProperties | StyleProperties[],
  handler: handleDynamicWithValue
): Handler<R>;
export function genericHandler<R = { [key: string]: StyleObject }>(builder: BuildFunc, handler: handleDynamicWithValue): Handler<R>;
export function genericHandler<R = { [key: string]: StyleObject }>(handler: handleDynamic): Handler<R>;
export function genericHandler<R = { [key: string]: StyleObject }>(
  a: StyleProperties | StyleProperties[] | Function,
  b?: handleDynamicWithValue
): Handler<R> {
  return {
    type: "generic",
    get(p: string) {
      let v: string | undefined, r: StyleObject | CSSObject;
      pushMetaProp(p) && updateMetaType("generic");
      if (typeof b === "function" && (v = b(p))) return v == null ? undefined : typeof a === "function" ? a(v) : css(buildProperty(a, v));

      if (typeof a === "function" && (r = a(p))) return isStyleObject(r) ? r : css(r);
    },
  };
}

export function numberHandler<T extends object = { [key: number]: StyleObject }>(
  propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc,
  size: "" | CSSDimensionType = ""
) {
  const build: BuildFunc = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  return {
    type: "number",
    meta: { size },
    get: p => (isNumber(p) ? build(p + size) : undefined),
  } as Handler<T>;
}

export const pxHandler = <T extends object = { [key: number]: StyleObject }>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) =>
  numberHandler<T>(propertyOrBuildFunc, "px");

export const remHandler = <T extends object = { [key: number]: StyleObject }>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) =>
  numberHandler<T>(propertyOrBuildFunc, "rem");

export const degHandler = <T extends object = { [key: number]: StyleObject }>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) =>
  numberHandler<T>(propertyOrBuildFunc, "deg");

export const msHandler = <T extends object = { [key: number]: StyleObject }>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) =>
  numberHandler<T>(propertyOrBuildFunc, "ms");

export function spacingHandler<T extends object = { [key: number]: StyleObject }>(
  propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc
) {
  const build: BuildFunc = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  return {
    type: "spacing",
    get: p => (isNumber(p) ? build(+p / 4 + (p === "0" ? "px" : "rem")) : undefined),
  } as Handler<T>;
}

export function fractionHandler<T extends object = { [key: string]: StyleObject }>(
  propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc
) {
  const build: BuildFunc = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  return {
    type: "fraction",
    get: p => (isFraction(p) ? build(fracToPercent(p)) : undefined),
  } as Handler<T>;
}

/**
 * Use single plugin.
 * @param uid
 * @param plugin
 * @returns
 */
export function use<U>(uid: string, plugin: Handler<U>): U {
  return new Proxy(
    {},
    {
      get(target, prop: string) {
        resetMeta(uid);
        const res = plugin.get(prop);
        if (res) return res;
      },
    }
  ) as unknown as U;
}

export function useVariant(rule: string, utilities: (StyleObject | StyleObject[])[]): StyleObject[] {
  return utilities
    .flat()
    .map(u =>
      SymbolProxy in u ? css(u.css, undefined, { ...u.meta, variants: [...u.meta.variants, rule] }) : (u[SymbolMeta].variants.push(rule), u)
    );
}

export const useMedia = (rule: string, utilities: (StyleObject | StyleObject[])[]) => useVariant("@media " + rule, utilities);

export const createVariant =
  (rule: string): VariantBuilder =>
  (...utilities) =>
    useVariant(rule, utilities);

export const createMedia =
  (rule: string): VariantBuilder =>
  (...utilities) =>
    useMedia(rule, utilities);

export function createScreenVariants<T extends object>(screens: T, mobile = true) {
  return Object.fromEntries(Object.entries(screens).map(([k, v]) => [k, createMedia(`(${mobile ? "min" : "max"}-width: ${v})`)])) as Record<
    keyof T,
    VariantBuilder
  >;
}

export function createDarkModeVariants(media = true) {
  return {
    dark: media ? createMedia("(prefers-color-scheme: dark)") : createVariant(".dark &"),
    light: media ? createMedia("(prefers-color-scheme: light)") : createVariant(".light &"),
  };
}

export function createOrientationVariants<T extends object>(orientations: T) {
  return Object.fromEntries(Object.entries(orientations).map(([k, v]) => [k, createMedia(`(orientation: ${v})`)])) as Record<keyof T, VariantBuilder>;
}

export function createMotionVariants<T extends object>(motions: T) {
  return Object.fromEntries(Object.entries(motions).map(([k, v]) => [k, createMedia(`(prefers-reduced-motion: ${v})`)])) as Record<
    keyof T,
    VariantBuilder
  >;
}

export const variant = (rule: string, ...utilities: (StyleObject | StyleObject[])[]) => useVariant(rule, utilities);

export const media = (rule: string, ...utilities: (StyleObject | StyleObject[])[]) => useMedia(rule, utilities);

export function bind<T extends Record<string, string>>(cfg: T, f: (v: string) => StyleObject | undefined) {
  return ((v: string) => f(v in cfg ? cfg[v as keyof typeof cfg] : v)) as unknown as T;
}

export function guard<K extends string, R>(key: K, handler: Handler<R>): Handler<{ [P in K]: R }> {
  return {
    type: "guard",
    meta: { key, handler },
    get: p => (p === key ? (handler.type === "call" ? handler.get(p) : pushMetaProp(p) && useProxy(handler.get)) : undefined),
  } as Handler<{ [P in K]: R }>;
}

type HandleValue<V> = V extends Handler<unknown> ? ReturnType<V["get"]> : V extends StyleObject ? V : V extends object ? SetUp<V> : V;
type ExposeDefault<T> = T extends { DEFAULT: Handler<unknown> }
  ? ReturnType<T["DEFAULT"]["get"]>
  : T extends { DEFAULT: StyleObject }
  ? T["DEFAULT"]
  : T;

type HandleDefault<T extends { DEFAULT?: unknown } & object> = ExposeDefault<
  Pick<
    {
      [k in Extract<keyof T, "DEFAULT">]: k extends "DEFAULT" ? T[k] : never;
    },
    Extract<keyof T, "DEFAULT">
  >
>;

export type SetUp<T extends object> = {
  [k in Exclude<keyof T, "DEFAULT">]: HandleValue<T[k]>;
} & HandleDefault<T>;

export function setup<T extends object & { DEFAULT?: unknown }>(t: T, root = true): SetUp<T> {
  return new Proxy(t, {
    get(target, p) {
      let v: unknown;
      if (root) resetMeta(getUid());
      if (typeof p === "symbol") return p === SymbolProxy ? true : undefined;
      if (p in target) {
        v = Reflect.get(target, p);
        if (v == null) return;
        return (
          pushMetaProp(p) && (isHandler(v) ? useProxy(v.get) : isStyleObject(v) ? css(v[SymbolCSS]) : typeof v === "object" ? setup(v, false) : v)
        );
      }
      v = target.DEFAULT;
      return isHandler(v) ? v.get(p) : v;
    },
  }) as SetUp<T>;
}

export function setupHandler<T extends object>(config: T): Handler<SetUp<T>> {
  return {
    type: "setup",
    meta: { config },
    get: p => Reflect.get(setup(config), p),
  };
}

export function setupUtility<T extends StyleObject>(uid: string, css: T): T;
export function setupUtility<U>(uid: string, handler: Handler<U>): U;
export function setupUtility<T extends object>(uid: string, config: T): SetUp<T>;
export function setupUtility<T extends object>(uid: string, t: T) {
  resetMeta(uid);
  if (isStyleObject(t)) return css(t[SymbolCSS]);
  return isHandler(t) ? use(uid, t) : setup(t);
}

export function setupVariant<T extends object>(config: T): { [key in keyof T]: VariantBuilder } {
  return Object.fromEntries(Object.entries(config).map(([k, v]) => [k, createVariant(v as string)])) as { [key in keyof T]: VariantBuilder };
}
