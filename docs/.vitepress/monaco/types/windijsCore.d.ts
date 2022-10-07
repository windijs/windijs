import { Handler, BuildFunc, CSSDimensionType, CSSMap, CSSObject, ColorStyleProxy, MetaType, NestedProxy, StyleObject, StyleProperties, StyleProxyHandler, UtilityMeta, VariantBuilder, Utilities, CSSPrefixer, ColorStyleObject, CSSAngle, CSSLinearColorStopOrHint, CSSSideOrCorner } from "@windijs/helpers";
export declare class Utility<T extends object = {}> implements ProxyHandler<T> {
    uid: string;
    plugins: ((p: string) => unknown)[];
    constructor(uid: string);
    get(target: T, prop: string | symbol): any;
    set(target: T, prop: string | symbol, value: unknown): boolean;
    case<K extends string, U>(trigger: K, plugin: Handler<U>): Utility<T & {
        [P in K]: U;
    }>;
    use<U>(plugin: Handler<U>): Utility<T & U>;
    init(): T;
    init<F extends Function | object>(target: F): F & T;
    init<F extends Function | object>(target: F, handler: ProxyHandler<F>): F & T;
}
/**
 * Create a new utility.
 * @param uid Utility ID, usually it should be consistent with the variiable name you declared. Such as, `const bg = createUtility("bg")`
 * @returns Utility
 */
export declare function createUtility(uid: string): Utility<{}>;
export declare function handleConfig<T extends object & {
    DEFAULT?: unknown;
}>(build: BuildFunc, statics: T, type: MetaType, p: string | symbol): StyleObject | CSSObject | CSSMap | UtilityMeta | (() => string) | undefined;
export declare function handler<R>(type: Handler<R>["type"] | string, get: (prop: string) => R, meta?: object): Handler<R>;
export declare function isHandler<R>(i: unknown): i is Handler<R>;
export declare function cssHandler(cssOrStyle: StyleObject | CSSObject | CSSMap): Handler<StyleObject<{}>>;
export declare function callHandler<F extends Function, R extends object = Record<string, unknown>>(call: F, plugin?: Handler<R>): Handler<F & R>;
export declare function colorHandler<T extends object>(colors: T, colorProperty: StyleProperties | StyleProperties[]): StyleProxyHandler<T>;
export declare function colorHandler<T extends object, O extends object = Record<string, unknown>>(colors: T, build: (value: unknown) => StyleObject<O> | undefined): Handler<NestedProxy<T, StyleObject<O>>>;
export declare function colorHandler<T extends object>(colors: T, colorProperty: StyleProperties | StyleProperties[], colorOpacityProperty: string): Handler<ColorStyleProxy<T>>;
export declare function configHandler<T extends object>(statics: T, property: StyleProperties | StyleProperties[]): StyleProxyHandler<T>;
export declare function configHandler<T extends object, O extends object = Record<string, unknown>>(statics: T, build: (value: unknown) => StyleObject<O> | undefined): Handler<NestedProxy<T, StyleObject<O>>>;
declare type handleDynamic = (prop: string) => CSSObject | StyleObject | undefined;
declare type handleDynamicWithValue = (prop: string) => string | undefined;
export declare function genericHandler<R = {
    [key: string]: StyleObject;
}>(property: StyleProperties | StyleProperties[], handler: handleDynamicWithValue): Handler<R>;
export declare function genericHandler<R = {
    [key: string]: StyleObject;
}>(builder: BuildFunc, handler: handleDynamicWithValue): Handler<R>;
export declare function genericHandler<R = {
    [key: string]: StyleObject;
}>(handler: handleDynamic): Handler<R>;
export declare function numberHandler<T extends object = {
    [key: number]: StyleObject;
}>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc, size?: "" | CSSDimensionType): Handler<T>;
export declare const pxHandler: <T extends object = {
    [key: number]: StyleObject<{}>;
}>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) => Handler<T>;
export declare const remHandler: <T extends object = {
    [key: number]: StyleObject<{}>;
}>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) => Handler<T>;
export declare const degHandler: <T extends object = {
    [key: number]: StyleObject<{}>;
}>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) => Handler<T>;
export declare const msHandler: <T extends object = {
    [key: number]: StyleObject<{}>;
}>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) => Handler<T>;
export declare function spacingHandler<T extends object = {
    [key: number]: StyleObject;
}>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc): Handler<T>;
export declare function fractionHandler<T extends object = {
    [key: string]: StyleObject;
}>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc): Handler<T>;
/**
 * Use single plugin.
 * @param uid
 * @param plugin
 * @returns
 */
export declare function use<U>(uid: string, plugin: Handler<U>): U;
export declare function useVariant(rule: string, utilities: Utilities[]): StyleObject[];
export declare const useMedia: (rule: string, utilities: Utilities[]) => StyleObject<{}>[];
export declare const createVariant: (rule: string) => VariantBuilder;
export declare const createMedia: (rule: string) => VariantBuilder;
export declare function createScreenVariants<T extends object>(screens: T, mobile?: boolean): Record<keyof T, VariantBuilder>;
export declare function createDarkModeVariants(media?: boolean): {
    dark: VariantBuilder;
    light: VariantBuilder;
};
export declare function createOrientationVariants<T extends object>(orientations: T): Record<keyof T, VariantBuilder>;
export declare function createMotionVariants<T extends object>(motions: T): Record<keyof T, VariantBuilder>;
export declare const variant: (rule: string, ...utilities: Utilities[]) => StyleObject<{}>[];
export declare const media: (rule: string, ...utilities: Utilities[]) => StyleObject<{}>[];
export declare function bind<T extends Record<string, string>>(cfg: T, f: (v: string) => StyleObject | undefined): T;
export declare function guard<K extends string, R>(key: K, handler: Handler<R>): Handler<{
    [P in K]: R;
}>;
declare type HandleValue<V> = V extends Handler<unknown> ? ReturnType<V["get"]> : V extends StyleObject ? V : V extends object ? SetUp<V> : V;
declare type ExposeDefault<T> = T extends {
    DEFAULT: Handler<unknown>;
} ? ReturnType<T["DEFAULT"]["get"]> : T extends {
    DEFAULT: StyleObject;
} ? T["DEFAULT"] : T;
declare type HandleDefault<T extends {
    DEFAULT?: unknown;
} & object> = ExposeDefault<Pick<{
    [k in Extract<keyof T, "DEFAULT">]: k extends "DEFAULT" ? T[k] : never;
}, Extract<keyof T, "DEFAULT">>>;
export declare type SetUp<T extends object> = {
    [k in Exclude<keyof T, "DEFAULT">]: HandleValue<T[k]>;
} & HandleDefault<T>;
export declare function setup<T extends object & {
    DEFAULT?: unknown;
}>(t: T, root?: boolean): SetUp<T>;
export declare function setupHandler<T extends object>(config: T): Handler<SetUp<T>>;
export declare function setupUtility<T extends StyleObject>(uid: string, css: T): T;
export declare function setupUtility<U>(uid: string, handler: Handler<U>): U;
export declare function setupUtility<T extends object>(uid: string, config: T): SetUp<T>;
export declare function setupVariant<T extends object>(config: T): {
    [key in keyof T]: VariantBuilder;
};
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>, w: Handler<W>, x: Handler<X>, y: Handler<Y>, z: Handler<Z>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>, w: Handler<W>, x: Handler<X>, y: Handler<Y>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>, w: Handler<W>, x: Handler<X>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>, w: Handler<W>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>, v: Handler<V>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>, u: Handler<U>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>, t: Handler<T>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>, s: Handler<S>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>, r: Handler<R>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>, q: Handler<Q>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>, p: Handler<P>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>, o: Handler<O>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>, n: Handler<N>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M & N>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L, M>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>, m: Handler<M>): Handler<A & B & C & D & E & F & G & H & I & J & K & L & M>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K, L>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>, l: Handler<L>): Handler<A & B & C & D & E & F & G & H & I & J & K & L>;
export declare function meld<A, B, C, D, E, F, G, H, I, J, K>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>, k: Handler<K>): Handler<A & B & C & D & E & F & G & H & I & J & K>;
export declare function meld<A, B, C, D, E, F, G, H, I, J>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>, j: Handler<J>): Handler<A & B & C & D & E & F & G & H & I & J>;
export declare function meld<A, B, C, D, E, F, G, H, I>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>, i: Handler<I>): Handler<A & B & C & D & E & F & G & H & I>;
export declare function meld<A, B, C, D, E, F, G, H>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>, h: Handler<H>): Handler<A & B & C & D & E & F & G & H>;
export declare function meld<A, B, C, D, E, F, G>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>, g: Handler<G>): Handler<A & B & C & D & E & F & G>;
export declare function meld<A, B, C, D, E, F>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>, f: Handler<F>): Handler<A & B & C & D & E & F>;
export declare function meld<A, B, C, D, E>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>, e: Handler<E>): Handler<A & B & C & D & E>;
export declare function meld<A, B, C, D>(a: Handler<A>, b: Handler<B>, c: Handler<C>, d: Handler<D>): Handler<A & B & C & D>;
export declare function meld<A, B, C>(a: Handler<A>, b: Handler<B>, c: Handler<C>): Handler<A & B & C>;
export declare function meld<A, B>(a: Handler<A>, b: Handler<B>): Handler<A & B>;
export declare function meld<A>(a: Handler<A>): Handler<A>;
export declare function meld(...handlers: Handler<unknown>[]): Handler<unknown>;
export declare const animateHandler: <T extends string>(name: T, value: string | CSSObject, keyframes?: Record<string, CSSObject>) => Handler<{ [P in T]: StyleObject<{}>; }>;
export declare function backgroundGenericHandler(): Handler<{
    [key: string]: StyleObject<{}>;
} & {
    $: {
        [key: string]: StyleObject<{}>;
    };
}>;
export declare function divideXReverseHandler(): Handler<StyleObject<{}>>;
export declare function divideYReverseHandler(): Handler<StyleObject<{}>>;
export declare function fontFamilyHandler<T extends object>(fonts: T): StyleProxyHandler<T>;
export declare function fontSizeHandler<T extends object>(sizes: T): Handler<import("@windijs/helpers").SafeEntry<{ [key in keyof T]: T[key] extends object ? T[key] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key] extends infer T_1 ? { [key_1 in keyof T_1]: T[key][key_1] extends object ? T[key][key_1] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key][key_1] extends infer T_2 ? { [key_2 in keyof T_2]: T[key][key_1][key_2] extends object ? T[key][key_1][key_2] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key][key_1][key_2] extends infer T_3 ? { [key_3 in keyof T_3]: T[key][key_1][key_2][key_3] extends object ? T[key][key_1][key_2][key_3] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key][key_1][key_2][key_3] extends infer T_4 ? { [key_4 in keyof T_4]: T[key][key_1][key_2][key_3][key_4] extends object ? T[key][key_1][key_2][key_3][key_4] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key][key_1][key_2][key_3][key_4] extends infer T_5 ? { [key_5 in keyof T_5]: T[key][key_1][key_2][key_3][key_4][key_5] extends object ? T[key][key_1][key_2][key_3][key_4][key_5] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key][key_1][key_2][key_3][key_4][key_5] extends infer T_6 ? { [key_6 in keyof T_6]: T[key][key_1][key_2][key_3][key_4][key_5][key_6] extends object ? T[key][key_1][key_2][key_3][key_4][key_5][key_6] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key][key_1][key_2][key_3][key_4][key_5][key_6] extends infer T_7 ? { [key_7 in keyof T_7]: T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7] extends object ? T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7] extends infer T_8 ? { [key_8 in keyof T_8]: T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7][key_8] extends object ? T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7][key_8] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7][key_8] extends infer T_9 ? { [key_9 in keyof T_9]: T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7][key_8][key_9] extends object ? T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7][key_8][key_9] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7][key_8][key_9] extends infer T_10 ? { [key_10 in keyof T_10]: T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7][key_8][key_9][key_10] extends object ? T[key][key_1][key_2][key_3][key_4][key_5][key_6][key_7][key_8][key_9][key_10] extends unknown[] ? StyleObject<{}> : import("@windijs/helpers").SafeEntry<any> : StyleObject<{}>; } : never> : StyleObject<{}>; } : never> : StyleObject<{}>; } : never> : StyleObject<{}>; } : never> : StyleObject<{}>; } : never> : StyleObject<{}>; } : never> : StyleObject<{}>; } : never> : StyleObject<{}>; } : never> : StyleObject<{}>; } : never> : StyleObject<{}>; } : never> : StyleObject<{}>; }>>;
export declare function spaceBetweenXReverseHandler(): Handler<StyleObject<{}>>;
export declare function spaceBetweenYReverseHandler(): Handler<StyleObject<{}>>;
export declare function prefixer(filter: ((k: string, v: string) => boolean) | string | Array<string>, updater: (k: string, v: string) => object): CSSPrefixer;
export declare const prefixKeyframes: CSSPrefixer;
export declare const prefixAnimation: CSSPrefixer;
export declare const prefixImageRendering: CSSPrefixer;
export declare const prefixNotHidden: CSSPrefixer;
export declare const prefixPlaceholder: CSSPrefixer;
export declare const prefixWritingMode: CSSPrefixer;
export declare const buildProperty: (property: StyleProperties | StyleProperties[], value: string) => CSSObject;
export declare function buildStatic(property: StyleProperties | StyleProperties[], value: unknown): StyleObject | undefined;
export declare function buildColor(colorProperty: StyleProperties | StyleProperties[], colorOpacityProperty: undefined, value: unknown, prefixer?: (css: CSSObject) => CSSObject): StyleObject;
export declare function buildColor(colorProperty: StyleProperties | StyleProperties[], colorOpacityProperty: string, value: unknown, prefixer?: (css: CSSObject) => CSSObject): ColorStyleObject;
export declare function buildContainer<T extends Record<string, string | [
    string,
    CSSObject
]>>(screens: T, center?: boolean): StyleObject<Record<string, unknown>>;
export declare function buildNotHidden(property: StyleProperties | StyleProperties[]): (v: unknown) => StyleObject<Record<string, unknown>>;
export declare function buildFontSize(fontSize: string, lineHeight?: string, others?: {
    [key in StyleProperties]: string;
}): StyleObject;
export declare function buildFlexDirection(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildFlexStretch(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildReverse(v: unknown, first: StyleProperties, second: StyleProperties, rev: string): CSSObject;
export declare function buildDivideY(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildDivideX(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildSpaceBetweenY(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildSpaceBetweenX(v: unknown): StyleObject<Record<string, unknown>>;
export declare const joinFilters: (filters: (string | StyleObject)[]) => string;
export declare const buildFilter: (...filters: (string | StyleObject)[]) => StyleObject<Record<string, unknown>>;
export declare const buildBackdropFilter: (...filters: (string | StyleObject)[]) => StyleObject<Record<string, unknown>>;
export declare const joinTransforms: (transformations: (string | StyleObject)[]) => string;
export declare const buildTransform: (...transformations: (string | StyleObject)[]) => StyleObject<Record<string, unknown>>;
export declare function buildTransition(property: string, ...styles: StyleObject[]): StyleObject;
export declare function buildKeyframes(name: string, keyframes: Record<string, CSSObject>): CSSObject;
export declare function buildGradientDirection(v: unknown, colorStops?: CSSLinearColorStopOrHint[]): StyleObject<Record<string, unknown>>;
export declare function buildLinearGradient(direction: CSSSideOrCorner | CSSAngle | string, ...colorStops: CSSLinearColorStopOrHint[]): StyleObject<{}>;
export declare function buildGradientFrom(v: unknown): import("@windijs/helpers").StyleObjectBase & {
    readonly css: CSSObject | CSSMap;
    readonly meta: UtilityMeta;
} & {
    opacity: (op: number) => StyleObject<{
        readonly gradient: StyleObject<{}>;
    }>;
    readonly gradient: StyleObject<{}>;
};
export declare function buildGradientVia(v: unknown): ColorStyleObject;
export declare function buildGradientTo(v: unknown): ColorStyleObject;
export declare function buildDivideColor(v: unknown): ColorStyleObject;
export declare function buildDivideOpacity(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildDivideStyle(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildRingWidth(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildBoxShadowSize(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildBoxShadowColor(v: unknown): import("@windijs/helpers").StyleObjectBase & {
    readonly css: CSSObject | CSSMap;
    readonly meta: UtilityMeta;
} & {
    opacity: (op: number) => StyleObject<{
        readonly gradient: StyleObject<{}>;
    }>;
    readonly gradient: StyleObject<{}>;
};
export declare function buildImageRendering(v: unknown): StyleObject<Record<string, unknown>>;
export declare function buildPlaceholder(v: unknown): ColorStyleObject;
export declare function buildWritingMode(v: unknown): StyleObject<Record<string, unknown>>;
