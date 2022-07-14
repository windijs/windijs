import { CSSObject, NestedProxy, ObjectEntry, StyleObject, StyleProperties, StyleProxy, UtilityMeta } from "../types";
import { buildStatic, buildColor, hasKey, useProxy } from "../utils";

/* Static Handler */

export function createStaticHandler<T extends object> (statics: T, property: StyleProperties | StyleProperties[]): ((uid: string, prop: string) => ObjectEntry<T> | undefined);
export function createStaticHandler<T extends object> (statics: T, property: StyleProperties | StyleProperties[], key: undefined, handleDefault: true): ((uid: string, prop: string) => ObjectEntry<T> & { css: CSSObject } | undefined);
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], key: K, handleDefault: true): (uid: string, prop: string) => Record<K, ObjectEntry<T> & { css: CSSObject }>;
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], key: K): (uid: string, prop: string) => Record<K, ObjectEntry<T>>;
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], key: K | undefined = undefined, handleDefault = false) {
  type ProxyType = (uid: string, prop: string) => ObjectEntry<T> | undefined;
  type KeyProxyType = (uid: string, prop: string) => Record<K, ObjectEntry<T>>;

  const handler = (uid: string, prop: string) => {
    const meta: UtilityMeta = { uid, type: "static", props: key ? [key, prop] : [prop] };
    if (handleDefault) {
      if (prop === "meta") return { uid, type: "static" };
      // @ts-ignore, generate default css
      if (prop === "css" && "DEFAULT" in statics) return buildStatic(property, statics.DEFAULT, meta).css;
    }
    if (hasKey(statics, prop)) {
      const value = statics[prop];
      if (typeof value === "string") return buildStatic(property, value, meta);
    }
  };

  if (key == null) return handler as ProxyType;

  return ((uid, prop) => {
    if (prop === key) return useProxy(p => handler(uid, p));
  }) as KeyProxyType;
};

// /* CSS Handler */
// export function createCSSHandler (key: string, css: CSSObject) {

// }

/* Color Handler  */

type ColorOpacityProxy<T> = NestedProxy<T, StyleObject & {
  opacity: (op: number) => StyleObject
}>;

export type ColorHandler =
  (<T extends object> (colors: T, withOpacity?: boolean, opacityName?: string) => (uid: string, prop: string) => ColorOpacityProxy<T> | undefined) &
  (<T extends object> (colors: T, withOpacity: true | undefined, opacityName?: string) => (uid: string, prop: string) => ColorOpacityProxy<T> | undefined) &
  (<T extends object> (colors: T, withOpacity: false, opacityName?: string) => (uid: string, prop: string) => StyleProxy<T> | undefined);

export function createColorHandler<T extends object> (colors: T, colorProperty: StyleProperties, colorOpacityProperty?: string): (uid: string, prop: string) => StyleProxy<T> | undefined;
export function createColorHandler<T extends object> (colors: T, colorProperty: StyleProperties, colorOpacityProperty: string): (uid: string, prop: string) => ColorOpacityProxy<T> | undefined;
export function createColorHandler<T extends object> (colors: T, colorProperty: StyleProperties, colorOpacityProperty?: string) {
  function handleNested<C extends object> (uid: string, colors: C, p: string, ps: string[] = []): StyleObject | undefined {
    if (hasKey(colors, p)) {
      const value = colors[p];
      if (typeof value === "string") return buildColor(colorProperty, colorOpacityProperty, value, { type: "color", uid, props: [...ps, p] });
      if (typeof value === "object") return useProxy(p2 => handleNested(uid, value as unknown as object, p2, [...ps, p])) as StyleObject;
    }
  }

  return (uid: string, p: string) => handleNested(uid, colors, p) as StyleProxy<T> | ColorOpacityProxy<T> | undefined;
}

type handleColor = <T extends object>(handle: typeof createColorHandler, colors: T, withOpacity?: boolean, opacityName?: string) => ((uid: string, prop: string) => StyleProxy<T> | undefined);

export function useColorHandler (f: handleColor) {
  return ((colors, withOpacity, opacityName) => f(createColorHandler, colors, withOpacity, opacityName)) as ColorHandler;
}

type StaticHandler = <T extends object> (statics: T, k?: undefined) => (uid: string, prop: string) => ObjectEntry<T> | undefined;
type handleStatic = <T extends object> (handle: typeof createStaticHandler, statics: T) => (uid: string, prop: string) => ObjectEntry<T> | undefined;
type StaticHandlerWithKey<DEFAULT_KEY extends string> = <T extends object, K extends string = DEFAULT_KEY>(statics: T, key?: K) => (uid: string, prop: string) => Record<K, ObjectEntry<T>>
type handleStaticWithKey = <T extends object, K extends string> (handle: typeof createStaticHandler, statics: T, key: K) => (uid: string, prop: string) => Record<K, ObjectEntry<T>>;

export function useStaticHandler <K extends string> (k: K, f: handleStaticWithKey): StaticHandlerWithKey<K>;
export function useStaticHandler (f: handleStatic): StaticHandler;
export function useStaticHandler (keyOrF: string | Function, f2?: Function) {
  if (typeof keyOrF === "string") return <T> (statics: T, key?: string) => f2!(createStaticHandler, statics, key ?? keyOrF);
  return <T> (statics: T) => keyOrF(createStaticHandler, statics);
}
