import { StyleProperties } from "./css";

export * from "./css";

export type CSSDict = {
  [key in StyleProperties]?: string;
}

export type CSSObject = CSSDict & {[key: string]: CSSObject | string}

export type NumberDict = { [key: number]: string };

export type UtilityMeta = {
  uid: string;
  type: "static" | "color" | "generic";
  props?: string[];
  variants?: string[];
};

export interface StyleObject {
    /** @internal */
    css: CSSObject;
    /** @internal */
    meta?: UtilityMeta;
}

export type StyleEntry<T> = Omit<{ [key in keyof T]: StyleObject }, "meta" | "DEFAULT">

export type Handler<R> = (uid: string, prop: string) => R;

export type StyleHandler<T> = Handler<StyleEntry<T> | undefined>;

export type DefaultedStyleHandler<T> = Handler<StyleEntry<T> & { css: CSSObject } | undefined>;

export type KeyedStyleHandler<T, K extends string> = Handler<Record<K, StyleEntry<T>>>;

export type KeyedDefaultedStyleHandler<T, K extends string> = Handler<Record<K, StyleEntry<T> & { css: CSSObject }>>;

export type VariantBuilder = (...utilities: StyleObject[]) => StyleObject;

export type NestedProxy<T, O> = {
  [key in keyof T]: (T[key] extends object ? {
    [k in keyof T[key]]: (T[key][k] extends object ? NestedProxy<T[key][k], O> : O)
  } : O);
}

export type StyleProxy<T> = NestedProxy<T, StyleObject>;

export type StyleProxyHandler<T> = Handler<StyleProxy<T> | undefined>
