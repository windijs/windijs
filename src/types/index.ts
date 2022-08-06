import { CSSAngleType, CSSFrequencyType, CSSLengthType, CSSResolutionType, CSSTimeType } from "./css";
import { CSSAtRules, CSSClasses, CSSDecls, CSSElements, HTMLAttrs, HTMLTags } from "./data";
import type { SymbolCSS, SymbolData, SymbolMeta, SymbolProxy } from "helpers/common";

export * from "./css";
export * from "./data";
export * from "./calc";
export { CSSDecls, CSSAtRules, CSSClasses, CSSElements, HTMLTags, HTMLAttrs };

export type GeneralCSSData = CSSDecls & { [key in keyof CSSDecls]: { [key: string]: StyleObject } } & { [key: string]: { [key: string]: StyleObject } }

export type CSSProps = {
  [prop in keyof CSSDecls]?: {
    [value in keyof CSSDecls[prop]]?:
    CSSDecls[prop][value] extends Function ?
    value extends string ? `${value}()` : value
    : value extends CSSLengthType | CSSAngleType | CSSTimeType | CSSResolutionType | CSSFrequencyType ? `0${value}`
    : value extends "percent" ? "0%"
    : value extends "fr" ? "0fr"
    : value
  }[keyof CSSDecls[prop]]
  | String | string[]; // use camel cased String here is desired behavior, for we want trigger union suggestions and also allow other strings.
}

type ExtractAttrName<S extends string> = S extends `${string}[${infer A}]` ? A : S;

export type GeneralHTMLAttrs<T> = {
  [key in ExtractAttrName<keyof HTMLAttrs<unknown>>]: T
} & {
  [key: string]: T
}

// used when build css
export type CSSBlockBody = (string | { selector: string, body: CSSBlockBody })[]
export type CSSDecl = { property: string, value: string | string[] };
export type CSSRule = { selector: string, children: CSSDecl[] };
export type CSSAtRule = { rule: string, children: CSSRules };
export type CSSRules = (CSSRule | CSSAtRule)[];
export type CSSStyleSheet = { rules: CSSRules };

export type CSSSelector = String | keyof CSSClasses<unknown> | keyof CSSElements<unknown> | keyof HTMLTags<unknown> | keyof HTMLAttrs<unknown>;

export type CSSObject = CSSProps & Partial<CSSAtRules<CSSObject>> & Partial<CSSClasses<CSSObject>> & Partial<CSSElements<CSSObject>> & Partial<HTMLTags<CSSObject>> & Partial<HTMLAttrs<CSSObject>> & { [key: string]: CSSObject | String | string[] | number }

export type CSSMap = Map<keyof CSSProps, string> & Map<keyof CSSAtRules<CSSObject>, CSSObject | CSSMap> & Map<keyof CSSClasses<CSSObject>, CSSObject | CSSMap> & Map<keyof CSSElements<CSSObject>, CSSObject | CSSMap> & Map<keyof HTMLTags<CSSObject>, CSSObject | CSSMap> & Map<string, CSSObject | CSSMap | String | string[] | number>

export type NumberDict = { [key: number]: string };

export type MetaType = "css" | "static" | "color" | "generic" | "variant";

export type UtilityMeta = {
  uid: string;
  type: MetaType;
  props: string[];
  variants: string[];
} & {
  [key: string]: any;
};

export interface StyleObjectBase {
  [SymbolCSS]: CSSObject | CSSMap;
  [SymbolMeta]: UtilityMeta;
  [SymbolData]: object | undefined,
  [SymbolProxy]: true;
}

export type StyleObject<T = {}> = StyleObjectBase & {
  readonly css: CSSObject | CSSMap;
  readonly meta: UtilityMeta;
} & T;

export type SafeEntry<T extends {DEFAULT?: unknown}> = T["DEFAULT"] extends undefined | null | never ? Omit<T, "DEFAULT"> : (Omit<T, "DEFAULT"> & T["DEFAULT"]);

export type StyleEntry<T> = SafeEntry<{ [key in keyof T]: StyleObject }>

export type Handler<R> = (prop: string) => R;

export type UnknownDict = { [key: string]: unknown };

export type TargetCreator = (css: CSSObject | CSSMap, meta: UtilityMeta, data?: UnknownDict) => StyleObjectBase;

export type StyleLoader = (css: CSSObject | CSSMap, meta: UtilityMeta, data?: UnknownDict) => StyleObject;

export type StyleNamer = (style: StyleObject) => string;

export type VariantBuilder = (...utilities: (StyleObject | StyleObject[])[]) => StyleObject[];

export type NestedProxy<T, O> = SafeEntry<{
  [key in keyof T]: (T[key] extends object ? T[key] extends Array<unknown> ? O : SafeEntry<{
    [k in keyof T[key]]: (T[key][k] extends object ? T[key][k] extends Array<unknown> ? O : NestedProxy<T[key][k], O> : O)
  }> : O);
}>;

export type StyleProxy<T, O = {}> = NestedProxy<T, StyleObject<O>>;

export type StyleProxyHandler<T> = Handler<StyleProxy<T>>

export type ColorOpacityProxy<T> = NestedProxy<T, StyleObject<{
  opacity: (op: number) => StyleObject
}>>;

export type PickValue<T, ValueType> = Pick<T, { [key in keyof T]-?: T[key] extends ValueType ? key : never }[keyof T]>;
