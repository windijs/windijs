/**
 * Take two objects T and U and create the new one with uniq keys for T a U objectI
 * helper generic for `MergeObject`
 */
type GetObjDifferentKeys<T, U, T0 = Omit<T, keyof U> & Omit<U, keyof T>, T1 = { [K in keyof T0]-?: T0[K] }> = T1;
/**
 * Take two objects T and U and create the new one with the same objects keys
 * helper generic for `MergeObject`
 */
type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>;

type MergeTwoObjects<
  T,
  U,
  // non shared keys are optional
  T0 = Partial<GetObjDifferentKeys<T, U>> & {
    // shared keys are recursively resolved by `MergeObject<...>`
    [K in keyof GetObjSameKeys<T, U>]-?: MergeObject<T[K], U[K]>;
  },
  T1 = { [K in keyof T0]-?: T0[K] }
> = T1;

export type MergeObject<T, U> =
  // check if generic types are arrays and unwrap it and do the recursion
  [T, U] extends [{ [key: string]: unknown }, { [key: string]: unknown }] ? MergeTwoObjects<T, U> : T | U;

/**
 * Merge two object and their nested children
 */
export function mergeObject<A extends object, B extends object>(a: A, b: B): MergeObject<A, B> {
  return Object.entries(b).reduce((o, [k, v]) => {
    o[k as keyof A] = v && typeof v === "object" ? mergeObject((o[k as keyof A] = o[k as keyof A] || ((Array.isArray(v) ? [] : {}) as any)), v) : v;
    return o;
  }, a) as MergeObject<A, B>;
}
