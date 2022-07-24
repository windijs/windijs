import { NestedProxy, StyleObject, StyleProperties, StyleProxy, UtilityMeta, Handler, StyleProxyHandler, KeyedStyleProxyHandler, KeyedDefaultedStyleProxyHandler, DefaultedStyleProxyHandler, MetaType, CSSObject, CSSEntry } from "../types";
import { hasKey } from "../utils";
import { useProxy, isProxy } from "../helpers/proxy";
import { buildStatic, buildColor } from "./builder";
import { css, pushMetaProp, SymbolCSS, SymbolMeta, getMeta, updateMetaType } from "./base";

type BuildFunc = (value: unknown) => StyleObject | undefined;

function process<T extends object> (build: BuildFunc, statics: T, type: MetaType, p: string, handleDefault = false): StyleObject | UtilityMeta | undefined {
  updateMetaType(type);

  if (handleDefault) {
    if (p === "meta" || p as unknown as Symbol === SymbolMeta) return getMeta();
    // @ts-ignore, generate default css
    if ((p === "css" || p === SymbolCSS) && "DEFAULT" in statics) return build(statics.DEFAULT).css;
    // if (p === "toString") return
    // TODO: fix toString
  }
  if (hasKey(statics, p)) {
    const value = pushMetaProp(p) && statics[p];
    return (typeof value === "object" && !Array.isArray(value))
      ? useProxy(p2 => process(build, value as any, type, p2, handleDefault)) as StyleObject
      : build(value);
  }
};

/* Static Handler */

export function createStaticHandler<T extends object> (statics: T, property: StyleProperties | StyleProperties[]): StyleProxyHandler<T>;
export function createStaticHandler<T extends object> (statics: T, property: StyleProperties | StyleProperties[], trigger: undefined): StyleProxyHandler<T>;
export function createStaticHandler<T extends object> (statics: T, property: StyleProperties | StyleProperties[], trigger: undefined, handleDefault: false): StyleProxyHandler<T>;
export function createStaticHandler<T extends object> (statics: T, property: StyleProperties | StyleProperties[], trigger: undefined, handleDefault: true): DefaultedStyleProxyHandler<T>;
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], trigger: K): KeyedStyleProxyHandler<T, K>;
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], trigger: K, handleDefault: false): KeyedStyleProxyHandler<T, K>;
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], trigger: K, handleDefault: true): KeyedDefaultedStyleProxyHandler<T, K>;
export function createStaticHandler<T extends object> (statics: T, build: BuildFunc): StyleProxyHandler<T>;
export function createStaticHandler<T extends object> (statics: T, build: BuildFunc, trigger: undefined): StyleProxyHandler<T>;
export function createStaticHandler<T extends object> (statics: T, build: BuildFunc, trigger: undefined, handleDefault: false): StyleProxyHandler<T>;
export function createStaticHandler<T extends object> (statics: T, build: BuildFunc, trigger: undefined, handleDefault: true): DefaultedStyleProxyHandler<T>;
export function createStaticHandler<T extends object, K extends string> (statics: T, build: BuildFunc, trigger: K): KeyedStyleProxyHandler<T, K>;
export function createStaticHandler<T extends object, K extends string> (statics: T, build: BuildFunc, trigger: K, handleDefault: false): KeyedStyleProxyHandler<T, K>;
export function createStaticHandler<T extends object, K extends string> (statics: T, build: BuildFunc, trigger: K, handleDefault: true): KeyedDefaultedStyleProxyHandler<T, K>;
export function createStaticHandler<T extends object, K extends string> (statics: T, propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc, trigger: K | undefined = undefined, handleDefault = false) {
  const build: BuildFunc = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  if (trigger == null) return (p => process(build, statics, "static", p, handleDefault)) as StyleProxyHandler<T>;

  return (p1 => {
    if (p1 === trigger) {
      pushMetaProp(p1);
      return useProxy(p2 => process(build, statics, "static", p2, handleDefault));
    };
  }) as KeyedStyleProxyHandler<T, K>;
};

// /* CSS Handler */
// export function createCSSHandler (key: string, css: CSSObject) {

// }

/* Color Handler  */

type ColorOpacityProxy<T> = NestedProxy<T, StyleObject & {
  opacity: (op: number) => StyleObject
}>;

type ColorOpacityProxyHandler<T> = Handler<ColorOpacityProxy<T>>;

export type ColorHandler =
  (<T extends object> (colors: T, withOpacity?: boolean, opacityName?: string) => ColorOpacityProxyHandler<T>) &
  (<T extends object> (colors: T, withOpacity: true | undefined, opacityName?: string) => ColorOpacityProxyHandler<T>) &
  (<T extends object> (colors: T, withOpacity: false, opacityName?: string) => StyleProxyHandler<T>);

// TODO: support handle Color with DEFAULT and key

export function createColorHandler<T extends object> (colors: T, colorProperty: StyleProperties, colorOpacityProperty?: string): StyleProxyHandler<T>;
export function createColorHandler<T extends object> (colors: T, colorProperty: StyleProperties, colorOpacityProperty: string): ColorOpacityProxyHandler<T>;
export function createColorHandler<T extends object> (colors: T, colorPropertyOrBuildFunc: StyleProperties | BuildFunc, colorOpacityProperty?: string) {
  const build: BuildFunc = typeof colorPropertyOrBuildFunc === "function" ? colorPropertyOrBuildFunc : value => buildColor(colorPropertyOrBuildFunc, colorOpacityProperty, value);
  return (p: string) => process(build, colors, "color", p, false) as StyleProxy<T> | ColorOpacityProxy<T> | undefined;
}

type handleColor = <T extends object>(handle: typeof createColorHandler, colors: T, withOpacity?: boolean, opacityName?: string) => StyleProxyHandler<T>;

export function useColorHandler (f: handleColor) {
  return ((colors, withOpacity, opacityName) => f(createColorHandler, colors, withOpacity, opacityName)) as ColorHandler;
}

type StaticHandler = <T extends object> (statics: T, k?: undefined) => DefaultedStyleProxyHandler<T>;
type StaticHandlerWithKey<DEFAULT_KEY extends string> = <T extends object, K extends string = DEFAULT_KEY>(statics: T, key?: K) => KeyedDefaultedStyleProxyHandler<T, K>;

type handleStatic = <T extends object> (handle: typeof createStaticHandler, statics: T) => StyleProxyHandler<T>;
type handleStaticWithDefault = <T extends object> (handle: typeof createStaticHandler, statics: T) => DefaultedStyleProxyHandler<T>;
type handleStaticWithKey = <T extends object, K extends string> (handle: typeof createStaticHandler, statics: T, key: K) => KeyedStyleProxyHandler<T, K>;
type handleStaticWithKeyDefault = <T extends object, K extends string> (handle: typeof createStaticHandler, statics: T, key: K) => KeyedDefaultedStyleProxyHandler<T, K>;

/**
 * Shortcut for using createStaticHandler, for example
 * ```ts
 * export const backgroundAttachment = useStaticHandler((handle, attachments) =>
 *   handle(attachments, "backgroundAttachment"),
 * );
 * ```
 * Equal to
 * ```ts
 * export function backgroundAttachment<T extends object> (attachments: T) {
 *   return createStaticHandler(attachments, "backgroundAttachment");
 * }
 * ```
 *
 * @param k
 * @param f
 */
export function useStaticHandler <K extends string> (k: K, f: handleStaticWithKeyDefault): StaticHandlerWithKey<K>;
export function useStaticHandler <K extends string> (k: K, f: handleStaticWithKey): StaticHandlerWithKey<K>;
export function useStaticHandler (f: handleStaticWithDefault): StaticHandler;
export function useStaticHandler (f: handleStatic): StaticHandler;
export function useStaticHandler (tOrF: string | Function, f2?: Function) {
  if (typeof tOrF === "string") return <T> (statics: T, trigger?: string) => f2!(createStaticHandler, statics, trigger ?? tOrF);
  return <T> (statics: T) => tOrF(createStaticHandler, statics);
}

export function fixMeta<T extends object> (t: T, props: string[] = []): true {
  for (const [k, v] of Object.entries(t)) {
    if (v == null || Array.isArray(v) || typeof v !== "object") continue;
    if (SymbolCSS in v) (v as StyleObject)[SymbolMeta].props = [...props, k];
    fixMeta(v, [...props, k]);
  }
  return true;
}

// export function fixUid<T extends object> (t: T, uid: string): T {
//   if (SymbolMeta in t) (t as StyleObject)[SymbolMeta].uid = uid;
//   for (const v of Object.values(t)) {
//     if (v == null || Array.isArray(v) || typeof v !== "object") continue;
//     if (SymbolCSS in v) (v as StyleObject)[SymbolMeta].uid = uid;
//     fixUid(v, uid);
//   }
//   return t;
// }

export function createCSSHandler <T extends object> (t: T): StyleProxyHandler<T> {
  return fixMeta(t) && (prop => {
    if (hasKey(t, prop)) {
      pushMetaProp(prop);
      return t[prop];
      // if (typeof v === "object") return fixUid(v as unknown as object);
    }
  }) as StyleProxyHandler<T>;
}

export function useCSSHandler<T extends object> (f: (css: CSSEntry) => T) {
  return () => createCSSHandler(f(decl => css(decl)));
}

type ProxyType = (f: (prop: string) => CSSObject | undefined) => CSSObject;
type handleDynamic = ((prop: string, proxy: ProxyType) => CSSObject | undefined);
type DynamicHandler<R> = () => Handler<R>;

export function useGenericHandler <K extends string, R> (k: K, f: handleDynamic): DynamicHandler<Record<K, R>>;
export function useGenericHandler <R> (f: handleDynamic): DynamicHandler<R>;
export function useGenericHandler <K extends string, R> (tOrF: K | handleDynamic, f2?: handleDynamic): DynamicHandler<R> | DynamicHandler<Record<K, R>> {
  if (typeof tOrF === "string") {
    return () => ((p1: string) => {
      if (p1 === tOrF) {
        pushMetaProp(p1) && updateMetaType("generic");
        return useProxy(p2 => css(f2!(p2, () => ({}))!)) as StyleObject;
      }
    }) as unknown as Handler<Record<K, R>>;
  }

  return () => (p1: string) => {
    pushMetaProp(p1) && updateMetaType("generic");
    const r = tOrF(p1, f => useProxy(p2 => css(f(p2)!)));
    return (isProxy(r) ? r : css(r!)) as unknown as R;
  };
}

export function guard <K extends string, R> (key: K, handler: Handler<R>): Handler<Record<K, R>> {
  return ((prop: string) => {
    if (prop === key) {
      pushMetaProp(prop);
      return useProxy(p => handler(p));
    }
  }) as Handler<Record<K, R>>;
}

// TODO: not sure if there is a way to do this better
/* Generate Using: console.log(new Array(26).fill(0).map((_, i) => new Array(i + 1).fill(0).map((_, u) => String.fromCharCode(u + 65))).map(v => `export function meld <${v.join(", ")}> (${v.map(x => x.toLowerCase() + ": " + "Handler<" + x + ">").join(", ")}): Handler<${v.join(" & ")}>;`).reverse().join("\n")); */

export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>, w: Handler<W>, x: Handler<X>, y: Handler<Y>, z: Handler<Z>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>, w: Handler<W>, x: Handler<X>, y: Handler<Y>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>, w: Handler<W>, x: Handler<X>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>, w: Handler<W>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M, N> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L, M> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M>;
export function meld <A, B, C, D, E, F, G, H, I, J, K, L> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>): Handler<A & B & C & D & E & F & G & H & I & J & K & L>;
export function meld <A, B, C, D, E, F, G, H, I, J, K> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>): Handler<A & B & C & D & E & F & G & H & I & J & K>;
export function meld <A, B, C, D, E, F, G, H, I, J> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>): Handler<A & B & C & D & E & F & G & H & I & J>;
export function meld <A, B, C, D, E, F, G, H, I> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>): Handler<A & B & C & D & E & F & G & H & I>;
export function meld <A, B, C, D, E, F, G, H> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>): Handler<A & B & C & D & E & F & G & H>;
export function meld <A, B, C, D, E, F, G> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>): Handler<A & B & C & D & E & F & G>;
export function meld <A, B, C, D, E, F> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>): Handler<A & B & C & D & E & F>;
export function meld <A, B, C, D, E> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>): Handler<A & B & C & D & E>;
export function meld <A, B, C, D> (a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>): Handler<A & B & C & D>;
export function meld <A, B, C> (a: Handler<A>, b: Handler<B>, c: Handler<C>): Handler<A & B & C>;
export function meld <A, B> (a: Handler<A>, b: Handler<B>): Handler<A & B>;
export function meld <A> (a: Handler<A>): Handler<A>;
export function meld (...handlers: Handler<unknown>[]): Handler<unknown>;
export function meld (...handlers: Handler<unknown>[]) {
  return ((prop: string) => {
    let result;
    for (const handler of handlers) {
      result = handler(prop);
      if (result) return result;
    }
  }) as any;
}
