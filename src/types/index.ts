import { StyleProperties } from "./css";

export * from "./css";

export { CSSStyleData } from "./style";

export type CSSDict = {
  [key in StyleProperties]?: string;
}

export type CSSObject = CSSDict & {[key: string]: CSSObject | string}

export type NumberDict = { [key: number]: string };

export type MetaType = "css" | "static" | "color" | "generic";

export type UtilityMeta = {
  uid: string;
  type: MetaType;
  props?: string[];
  variants?: string[];
};

export interface StyleObject {
  /** @internal */
  css: CSSObject;
  /** @internal */
  meta?: UtilityMeta;
}

export type CSSEntry = (css: CSSObject) => StyleObject;

export type SafeEntry<T> = Omit<T, "meta" | "DEFAULT" | "css">;

export type StyleEntry<T> = SafeEntry<{ [key in keyof T]: StyleObject }>

export type Handler<R> = (uid: string, prop: string) => R;

export type StyleHandler<T> = Handler<StyleEntry<T> | undefined>;

// export type DefaultedStyleHandler<T> = Handler<StyleEntry<T> & { css: CSSObject } | undefined>;

// export type KeyedStyleHandler<T, K extends string> = Handler<Record<K, StyleEntry<T>>>;

// export type KeyedDefaultedStyleHandler<T, K extends string> = Handler<Record<K, StyleEntry<T> & { css: CSSObject }>>;

export type VariantBuilder = (...utilities: StyleObject[]) => StyleObject;

export type NestedProxy<T, O> = SafeEntry<{
  [key in keyof T]: (T[key] extends object ? T[key] extends Array<unknown> ? O : SafeEntry<{
    [k in keyof T[key]]: (T[key][k] extends object ? T[key][k] extends Array<unknown> ? O : NestedProxy<T[key][k], O> : O)
  }> : O);
}>;

export type StyleProxy<T> = NestedProxy<T, StyleObject>;

export type StyleProxyHandler<T> = Handler<StyleProxy<T> | undefined>

export type DefaultedStyleProxyHandler<T> = Handler<StyleProxy<T> & { css: CSSObject }>;

export type KeyedStyleProxyHandler<T, K extends string> = Handler<Record<K, StyleProxy<T>>>;

export type KeyedDefaultedStyleProxyHandler<T, K extends string> = Handler<Record<K, StyleProxy<T> & { css: CSSObject }>>;
