// TODO: we need typescript 4.8 to support infer number from template
export type ParseInt<T> = T extends `${infer N extends number}` ? N : never

export type Negative<T extends object> = {
  [k in keyof T as k extends 0 | "0" ? k : k extends number ? ParseInt<`-${k}`> : `-${string & k}`]: T[k] extends number | string ? `-${T[k]}` : T[k]
};

export type NonNegativeInteger<T extends number> =
  number extends T
  ? never
  : `${T}` extends `-${string}` | `${string}.${string}`
  ? never
  : T;

// Range Type
// https://www.codegrepper.com/code-examples/typescript/typescript+type+number+in+range

type PrependNextNum<A extends Array<unknown>> = A["length"] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never;

type EnumerateInternal<A extends Array<unknown>, N extends number> = { 0: A, 1: EnumerateInternal<PrependNextNum<A>, N> }[N extends A["length"] ? 0 : 1];

export type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never;

export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>

export type Fraction<T extends number> = `${Range<1, T> & number}/${T}`

export type FractionObject<FROM extends number, TO extends number> = {
  [key in Range<FROM, TO> as `${Fraction<key & number>}`]: string
}

export type RangeTuple<FROM extends number, TO extends number> = TuplifyUnion<Range<FROM, TO>>

// Convert Union Type to Tuple Type
// https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type/55128956#55128956

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never

type Push<T extends any[], V> = [...T, V];

export type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>
