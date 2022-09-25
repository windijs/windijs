// TODO: not sure if there is a way to do this better
/* Generate Using: console.log(new Array(26).fill(0).map((_, i) => new Array(i + 1).fill(0).map((_, u) => String.fromCharCode(u + 65))).map(v => `export function meld <${v.join(", ")}> (${v.map(x => x.toLowerCase() + ": " + "Handler<" + x + ">").join(", ")}): Handler<${v.join(" & ")}>;`).reverse().join("\n")); */

import type { Handler } from "@windijs/helpers";

export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>,
  r: Handler<R>,
  s: Handler<S>,
  t: Handler<T>,
  u: Handler<U>,
  v: Handler<V>,
  w: Handler<W>,
  x: Handler<X>,
  y: Handler<Y>,
  z: Handler<Z>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>,
  r: Handler<R>,
  s: Handler<S>,
  t: Handler<T>,
  u: Handler<U>,
  v: Handler<V>,
  w: Handler<W>,
  x: Handler<X>,
  y: Handler<Y>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>,
  r: Handler<R>,
  s: Handler<S>,
  t: Handler<T>,
  u: Handler<U>,
  v: Handler<V>,
  w: Handler<W>,
  x: Handler<X>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>,
  r: Handler<R>,
  s: Handler<S>,
  t: Handler<T>,
  u: Handler<U>,
  v: Handler<V>,
  w: Handler<W>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>,
  r: Handler<R>,
  s: Handler<S>,
  t: Handler<T>,
  u: Handler<U>,
  v: Handler<V>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>,
  r: Handler<R>,
  s: Handler<S>,
  t: Handler<T>,
  u: Handler<U>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>,
  r: Handler<R>,
  s: Handler<S>,
  t: Handler<T>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>,
  r: Handler<R>,
  s: Handler<S>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>,
  r: Handler<R>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>,
  q: Handler<Q>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>,
  p: Handler<P>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>,
  o: Handler<O>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>,
  n: Handler<N>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>,
  m: Handler<M>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M>;
export function meld<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>,
  l: Handler<L>
): Handler<A & B & C & D & E & F & G & H & I & J & K & L>;
export function meld<A, B, C, D, E, F, G, H, I, J, K>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>,
  k: Handler<K>
): Handler<A & B & C & D & E & F & G & H & I & J & K>;
export function meld<A, B, C, D, E, F, G, H, I, J>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>,
  j: Handler<J>
): Handler<A & B & C & D & E & F & G & H & I & J>;
export function meld<A, B, C, D, E, F, G, H, I>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>,
  i: Handler<I>
): Handler<A & B & C & D & E & F & G & H & I>;
export function meld<A, B, C, D, E, F, G, H>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>,
  h: Handler<H>
): Handler<A & B & C & D & E & F & G & H>;
export function meld<A, B, C, D, E, F, G>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>,
  g: Handler<G>
): Handler<A & B & C & D & E & F & G>;
export function meld<A, B, C, D, E, F>(
  a: Handler<A>,
  b: Handler<B>,
  c: Handler<C>,
  d: Handler<D>,
  e: Handler<E>,
  f: Handler<F>
): Handler<A & B & C & D & E & F>;
export function meld<A, B, C, D, E>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>): Handler<A & B & C & D & E>;
export function meld<A, B, C, D>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>): Handler<A & B & C & D>;
export function meld<A, B, C>(a: Handler<A>, b: Handler<B>, c: Handler<C>): Handler<A & B & C>;
export function meld<A, B>(a: Handler<A>, b: Handler<B>): Handler<A & B>;
export function meld<A>(a: Handler<A>): Handler<A>;
export function meld(...handlers: Handler<unknown>[]): Handler<unknown>;
export function meld(...handlers: Handler<unknown>[]) {
  return {
    type: "meld",
    meta: { handlers },
    get(prop: string) {
      let result;
      for (const handler of handlers) {
        result = handler.get(prop);
        if (result) return result;
      }
    },
  } as Handler<unknown>;
}
