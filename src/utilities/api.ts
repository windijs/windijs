import type {
  CSSObject,
  ColorStyleProxy,
  Handler,
  MetaType,
  StyleObject,
  StyleProperties,
  StyleProxy,
  StyleProxyHandler,
  UtilityMeta,
} from "types";
import { SymbolCSS, SymbolMeta, isStyleObject } from "helpers/common";
import { buildColor, buildStatic } from "./builder";
import { getMeta, pushMetaProp, resetMeta, updateMetaType } from "helpers/meta";

import { css } from "helpers/css";
import { useProxy } from "helpers/proxy";

type BuildFunc = (value: unknown) => StyleObject | undefined;

/**
 * Use single plugin.
 * @param uid
 * @param plugin
 * @returns
 */
export function use<U> (uid: string, plugin: (prop: string) => U): U {
  return new Proxy({}, {
    get (target, prop: string) {
      resetMeta(uid);
      const res = plugin(prop);
      if (res) return res;
    },
  }) as unknown as U;
}

export function handleConfig<T extends object> (build: BuildFunc, statics: T, type: MetaType, p: string): StyleObject | UtilityMeta | undefined {
  updateMetaType(type);

  // handle DEFAULT
  if (p === "meta" || p as unknown as Symbol === SymbolMeta) return getMeta();
  // @ts-ignore, generate default css
  if ((p === "css" || p === SymbolCSS) && "DEFAULT" in statics) return build(statics.DEFAULT).css;
  // if (p === "toString") return
  // TODO: fix toString
  const value = (statics as Record<string, unknown>)[p];
  if (value != null) {
    pushMetaProp(p);
    // const value = pushMetaProp(p) && statics[p];
    if (typeof value === "object" && !Array.isArray(value)) {
      if (SymbolCSS in value) {
        (value as StyleObject)[SymbolMeta] = getMeta();
        return value as StyleObject;
      }
      return useProxy(p2 => handleConfig(build, value as any, type, p2)) as StyleObject;
    }
    return build(value);
  }
};

export function configHandler<T extends object> (statics: T, property: StyleProperties | StyleProperties[]): StyleProxyHandler<T>;
export function configHandler<T extends object> (statics: T, build: BuildFunc): StyleProxyHandler<T>;
export function configHandler<T extends object> (statics: T, propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) {
  const build: BuildFunc = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  return (p => handleConfig(build, statics, "static", p)) as StyleProxyHandler<T>;
};

export function colorHandler<T extends object> (colors: T, colorProperty: StyleProperties): StyleProxyHandler<T>;
export function colorHandler<T extends object> (colors: T, colorProperty: StyleProperties, colorOpacityProperty: string): Handler<ColorStyleProxy<T>>;
export function colorHandler<T extends object> (colors: T, colorPropertyOrBuildFunc: StyleProperties | BuildFunc, colorOpacityProperty?: string) {
  const build: BuildFunc = typeof colorPropertyOrBuildFunc === "function" ? colorPropertyOrBuildFunc : value => buildColor(colorPropertyOrBuildFunc, colorOpacityProperty, value);
  return (p: string) => handleConfig(build, colors, "color", p) as StyleProxy<T> | ColorStyleProxy<T> | undefined;
}

export function cssHandler (cssOrStyle: StyleObject | CSSObject) {
  return (p => {
    cssOrStyle = isStyleObject(cssOrStyle) ? cssOrStyle : css(cssOrStyle);
    cssOrStyle[SymbolMeta].props = []; // remove meta prop
    return Reflect.get(cssOrStyle, p);
  }) as Handler<StyleObject>;
}

type handleDynamic = ((prop: string) => CSSObject | StyleObject | undefined);
type handleDynamicWithValue = ((prop: string) => string | undefined);

export function genericHandler <R = { [key: string]: StyleObject }> (property: StyleProperties | StyleProperties[], handler: handleDynamicWithValue): Handler<R>
export function genericHandler <R = { [key: string]: StyleObject }> (builder: BuildFunc, handler: handleDynamicWithValue): Handler<R>
export function genericHandler <R = { [key: string]: StyleObject }> (handler: handleDynamic): Handler<R>
export function genericHandler <R = { [key: string]: StyleObject }> (a: StyleProperties | StyleProperties[] | Function, b?: handleDynamicWithValue): Handler<R> {
  return (p: string) => {
    pushMetaProp(p) && updateMetaType("generic");
    if (typeof b === "function") {
      const v = b(p);
      if (v == null) return;
      if (typeof a === "function") return a(v);
      if (Array.isArray(a)) return css(Object.fromEntries(a.map(i => [i, v as string])));
      return css({ [a]: v });
    }
    if (typeof a === "function") {
      const r = a(p);
      return (isStyleObject(r) ? r : css(r)) as unknown as R;
    }
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
