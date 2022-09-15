/**
 * Check if input is a number
 *
 * @param value A numeric string
 * @returns Boolean
 */
export declare function isNumber(value: string): boolean;
export declare function isFraction(amount: string): boolean;
export declare function isSize(amount: string): boolean;
export declare function isVarName(value: string): boolean;
export declare function roundUp(num: number, precision?: number): number;
export declare function fracToPercent(amount: string): string | undefined;
export declare const hasKey: <T extends object>(obj: T, k: keyof any) => k is keyof T;
export declare function commaJoin(...items: (string | number | undefined)[]): string;
export declare function parenWrap(key: string, value: string): string;
export declare function camelToDash(str: string): string;
export declare function dashToCamel(str: string): string;
export declare function hash(str: string): string;
export declare function indent(value: string, count?: number): string;
export declare const entries: <T extends object | Map<string, any>>(t: T) => [string, any][] | IterableIterator<[string, any]>;
export declare function negative<T extends Record<string | number, string>>(t: T): Negative<T>;
export declare function range(start: number, end: number): number[];
export declare function fractions<S extends number, E extends number>(start: S, end: E): FractionObject<S, E>;
export declare function spacings<T extends Array<any>>(numbers: T): Record<T[number], string>;
export declare function degrees<T extends number>(numbers: T[]): Record<T, string>;
export declare function scales<T extends number>(numbers: T[]): Record<T, string>;
export declare function omit<T extends object, K extends object>(t: T, keys: K): Omit<T, keyof K>;
export declare type Negative<T extends object> = {
    [k in keyof T as k extends 0 | "0" ? k : k extends number ? `-${k}` : `-${string & k}`]: T[k] extends number | string ? `-${T[k]}` : T[k];
};
declare type PrependNextNum<A extends Array<unknown>> = A["length"] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never;
declare type EnumerateInternal<A extends Array<unknown>, N extends number> = {
    0: A;
    1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A["length"] ? 0 : 1];
export declare type Enumerate<N extends number> = EnumerateInternal<[
], N> extends (infer E)[] ? E : never;
export declare type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;
export declare type Fraction<T extends number> = `${Range<1, T> & number}/${T}`;
export declare type FractionObject<FROM extends number, TO extends number> = {
    [key in Range<FROM, TO> as `${Fraction<key & number>}`]: string;
};
