import { globalApply } from "./dollarApply";
import { CSSMap, CSSObject, CSSPercentageValue, ElementSelectors, GeneralHTMLAttrs, StyleObject, Utilities } from "./types";

type DollarFunc = ((...utilities: Utilities[]) => StyleObject) & ((css: CSSObject | CSSMap) => StyleObject);

export type StyleExport = { selector: string; children: StyleObject[]; style: StyleObject };

type DollarAttr = ((attribute: string) => DollarCall) &
  GeneralHTMLAttrs<
    DollarCall & {
      /** CSS [attribute="value"] Selector */
      match: ((value: string) => DollarCall) & { [key: string]: DollarCall };
      /** CSS [attribute|="value"] Selector */
      hyphenMatch: ((value: string) => DollarCall) & { [key: string]: DollarCall };
      /** CSS [attribute~="value"] Selector */
      contains: ((value: string) => DollarCall) & { [key: string]: DollarCall };
      /** CSS [attribute*="value"] Selector */
      includes: ((value: string) => DollarCall) & { [key: string]: DollarCall };
      /** CSS [attribute^="value"] Selector */
      startsWith: ((value: string) => DollarCall) & { [key: string]: DollarCall };
      /** CSS [attribute$="value"] Selector */
      endsWith: ((value: string) => DollarCall) & { [key: string]: DollarCall };
    }
  >;

export type DollarCall = DollarFunc & {
  /** CSS group Selector, select `element, element, ..` */
  $: DollarType;
  /** CSS child Selector, select `element > element` */
  $$: DollarType;
  /** CSS descendant Selector, select `element element ..` */
  _: DollarType;
  /** CSS adjacent sibling Selector, select `element + element` */
  __: DollarType;
  /** CSS general sibling Selector, select `element ~ element` */
  _$_: DollarType;
  /** CSS attribute Selector, select `element[attribute]` */
  ATTR: DollarAttr;
  /** CSS styles */
  Styles: StyleObject[];
} & {
  /** CSS sub class Selector, select `element.class` */
  [key: string]: DollarCall;
} & {
  [key in keyof ElementSelectors<unknown>]: DollarCall;
};

export type DollarType = typeof globalApply &
  ElementSelectors<DollarCall> & {
    /** CSS class Selector */
    [key: string]: DollarCall;
  } & {
    /** CSS universal Selector, select `*` */
    All: DollarCall;
    Is: (selector: string) => DollarCall;
    /** CSS root element Selector, select `:root`  */
    Root: DollarCall;
    /** CSS shadow host Selector, select `:host` or `:host(...)` */
    Host: DollarCall & DollarType & ((selector: string) => DollarCall);
    /** CSS id Selector, select `#id` */
    ID: ((id: string) => DollarCall) & { [key: string]: DollarCall };
    /** CSS attribute Selector, select `[attribute]` */
    ATTR: DollarAttr;
    /** CSS styles */
    Styles: StyleObject[] & { [key: string]: StyleObject[] | undefined };
    /** CSS exports */
    Exports: StyleExport[];
    /** Initial $ func, clear all styles */
    Init: () => void;
  } & AtRuleSelectors;

type LayerSelector<T extends object = {}> = ((...names: string[]) => DollarFunc & T) & { [key: string]: DollarFunc & T };

type NamespaceSelector = ((name: string) => StyleObject & { prefix: (prefix: string) => StyleObject }) & {
  url: (url: string) => StyleObject & { prefix: (prefix: string) => StyleObject };
  prefix: (prefix: string) => { url: (url: string) => StyleObject } & { [url: string]: StyleObject };
};

type SupportsCondition = {
  selector: (selector: string) => SupportsSelector;
  not: SupportsSelector;
  or: SupportsSelector;
  and: SupportsSelector;
};

type SupportsSelector<T extends object = {}> = ((...utilities: Utilities[]) => DollarFunc & SupportsCondition & T) &
  ((css: CSSObject | CSSMap) => DollarFunc & T & SupportsCondition) &
  SupportsCondition;

type ImportProps = {
  media: (query: string) => StyleObject;
  supports: SupportsSelector<Pick<ImportProps, "media">>;
  layer: ((name: string) => StyleObject & Omit<ImportProps, "layer">) & { [name: string]: StyleObject & Omit<ImportProps, "layer"> };
};

export type ImportSelectorConfig = { layer?: string; supports?: StyleObject | CSSObject | CSSMap | Utilities[]; media?: string };
export type ImportSelector = ((path: string, config?: ImportSelectorConfig) => StyleObject & ImportProps) & {
  url: (url: string, config?: ImportSelectorConfig) => StyleObject & ImportProps;
};

type KeyframesSelectorProps = {
  from: ((css: CSSObject | CSSMap) => Omit<KeyframesSelectorProps, "from"> & StyleObject) &
    ((...utilties: Utilities[]) => Omit<KeyframesSelectorProps, "from"> & StyleObject);
  via: (percent: number, ...utilities: Utilities[]) => KeyframesSelectorProps & StyleObject;
  to: ((css: CSSObject | CSSMap) => Omit<KeyframesSelectorProps, "to"> & StyleObject) &
    ((...utilties: Utilities[]) => Omit<KeyframesSelectorProps, "to"> & StyleObject);
};

export type KeyframesSelector = {
  [key: string]: ((
    keyframes: Partial<Record<"from" | "to" | CSSPercentageValue | number, StyleObject | Utilities[] | CSSObject | CSSMap>> &
      Record<string, StyleObject | Utilities[] | CSSObject | CSSMap>
  ) => StyleObject) &
    KeyframesSelectorProps;
};

export type AtRuleSelectors = {
  /**
   * CSS at-rule `@charset ...`
   *
   * Defines character set of the document.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@charset)
   */
  Charset(charset: string): StyleObject;
  /**
   * CSS at-rule, `@counter-style ...`
   *
   * Defines a custom counter style.
   *
   * (Edge 91, Firefox 33, Chrome 91, Opera 77)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@counter-style)
   */
  CounterStyle: ((
    name: string,
    declarations: Partial<
      Record<"system" | "negative" | "prefix" | "suffix" | "range" | "pad" | "fallback" | "symbols" | "additive-symbols" | "speak-as", string>
    >
  ) => StyleObject) & { [key: string]: DollarFunc };
  /**
   * CSS at-rule, `@font-face ...`
   *
   * Allows for linking to fonts that are automatically activated when needed. This permits authors to work around the limitation of 'web-safe' fonts, allowing for consistent rendering independent of the fonts available in a given user's environment.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@font-face)
   */
  FontFace: ((
    declarations: Record<
      | "ascent-override"
      | "descent-override"
      | "font-display"
      | "font-family"
      | "font-stretch"
      | "font-style"
      | "font-weight"
      | "font-variant"
      | "font-feature-settings"
      | "font-variation-settings"
      | "line-gap-override"
      | "size-adjust"
      | "src"
      | "unicode-range",
      string
    >
  ) => StyleObject) &
    DollarFunc;
  /**
   * CSS at-rule, `@font-feature-values ...`
   *
   * Defines named values for the indices used to select alternate glyphs for a given font family.
   *
   * (Firefox 34, Safari 9.1)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@font-feature-values)
   */
  // FontFeatureValues: T;
  /**
   * CSS at-rule, `@import ...`
   *
   * Includes content of another file.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@import)
   */
  Import: ImportSelector;
  /**
   * CSS at-rule, `@keyframes ...`
   *
   * Defines set of animation key frames.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@keyframes)
   */
  Keyframes: KeyframesSelector;
  /**
   * CSS at-rule, `@layer ...`
   *
   * Declare a cascade layer and can also be used to define the order of precedence in case of multiple cascade layers.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@layer)
   */
  Layer: LayerSelector;
  /**
   * CSS at-rule, `@media ...`
   *
   * Defines a stylesheet for a particular media type.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@media)
   */
  Media(query: string): DollarFunc;
  /**
   * CSS at-rule, `@-moz-document ...`
   *
   * Gecko-specific at-rule that restricts the style rules contained within it based on the URL of the document.
   *
   * (Firefox 1.8)
   */
  // MozDocument: T;
  /**
   * CSS at-rule, `@-moz-keyframes ...`
   *
   * Defines set of animation key frames.
   *
   * (Firefox 5)
   */
  MozKeyframes: KeyframesSelector;
  /**
   * CSS at-rule, `@-ms-viewport ...`
   *
   * Specifies the size, zoom factor, and orientation of the viewport.
   *
   * (Edge, IE 10)
   */
  // MsViewport: T;
  /**
   * CSS at-rule, `@namespace ...`
   *
   * Declares a prefix and associates it with a namespace name.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@namespace)
   */
  Namespace: NamespaceSelector;
  /**
   * CSS at-rule, `@-o-keyframes ...`
   *
   * Defines set of animation key frames.
   *
   * (Opera 12)
   */
  OKeyframes: KeyframesSelector;
  /**
   * CSS at-rule, `@-o-viewport ...`
   *
   * Specifies the size, zoom factor, and orientation of the viewport.
   *
   * (Opera 11)
   */
  // OViewport: T;
  /**
   * CSS at-rule, `@page ...`
   *
   * Directive defines various page parameters.
   *
   * (Edge 12, Firefox 19, Chrome 2, IE 8, Opera 6)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@page)
   */
  Page: DollarFunc & Record<"blank" | "first" | "left" | "right" | "recto" | "verso", DollarFunc>;
  /**
   * CSS at-rule, `@page ...`
   *
   * Directive defines various page parameters.
   *
   * (Edge 12, Firefox 19, Chrome 2, IE 8, Opera 6)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@page)
   */
  Property: ((name: string) => DollarFunc) & Record<string, DollarFunc>;
  /**
   * CSS at-rule, `@supports ...`
   *
   * A conditional group rule whose condition tests whether the user agent supports CSS property:value pairs.
   *
   * (Edge 12, Firefox 22, Safari 9, Chrome 28, Opera 12.1)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/\@supports)
   */
  Supports: SupportsSelector;
  /**
   * CSS at-rule, `@-webkit-keyframes ...`
   *
   * Defines set of animation key frames.
   *
   * (Chrome, Safari 4)
   */
  WebkitKeyframes: KeyframesSelector;
};
