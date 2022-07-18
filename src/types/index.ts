import { CSSAngleType, CSSFrequencyType, CSSLengthType, CSSResolutionType, CSSTimeType } from "./css";
import { CSSDecls, CSSAtRules, CSSClasses, CSSElements, HTMLTags, HTMLAttrs } from "./data";

export * from "./css";
export { CSSDecls, CSSAtRules, CSSClasses, CSSElements, HTMLTags, HTMLAttrs };

export type GeneralCSSData = CSSDecls & { [key in keyof CSSDecls]: { [key: string]: StyleObject } } & { [key: string]: { [key: string]: StyleObject } }

export type CSSDict = {
  [prop in keyof CSSDecls]?: {
    [value in keyof CSSDecls[prop]]?:
      CSSDecls[prop][value] extends Function ?
        value extends string ? `${value}()` : value
      : value extends CSSLengthType | CSSAngleType | CSSTimeType | CSSResolutionType | CSSFrequencyType ? `0${value}`
      : value extends "percent" ? "0%"
      : value extends "fr" ? "0fr"
      : value
  }[keyof CSSDecls[prop]]
  | String; // use camel cased String here is desired behavior, for we want trigger union suggestions and also allow other strings.
}

export type CSSObject = CSSDict & Partial<CSSAtRules<CSSObject>> & Partial<CSSClasses<CSSObject>> & Partial<CSSElements<CSSObject>> & Partial<HTMLTags<CSSObject>> & Partial<HTMLAttrs<CSSObject>> & { [key: string]: CSSObject | String }

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
