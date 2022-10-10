import { isStyleArray, isStyleObject } from "./common";
import { apply, css } from "./css";

import type { CSSMap, CSSObject, ElementSelectors, GeneralHTMLAttrs, StyleObject, Utilities } from "./types";

// TODO: support variant group

type DollarFunc = ((...utilities: Utilities[]) => StyleObject) & ((css: CSSObject | CSSMap) => StyleObject);

type StyleExport = { selector: string; children: StyleObject[]; style: StyleObject };

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

type DollarCall = DollarFunc & {
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
  styles: StyleObject[];
} & {
  /** CSS sub class Selector, select `element.class` */
  [key: string]: DollarCall;
} & {
  [key in keyof ElementSelectors<unknown>]: DollarCall;
};

type DollarType = typeof apply &
  ElementSelectors<DollarCall> & {
    /** CSS class Selector */
    [key: string]: DollarCall;
  } & {
    /** CSS universal Selector, select `*` */
    All: DollarCall;
    /** CSS root element Selector, select `:root`  */
    Root: DollarCall;
    /** CSS shadow host Selector, select `:host` or `:host(...)` */
    Host: DollarCall & DollarType;
    /** CSS id Selector, select `#id` */
    ID: ((id: string) => DollarCall) & { [key: string]: DollarCall };
    /** CSS attribute Selector, select `[attribute]` */
    ATTR: DollarAttr;
    /** CSS styles */
    styles: StyleObject[] & { [key: string]: StyleObject[] | undefined };
    /** CSS exports */
    exports: StyleExport[];
    /** Initial $ func, clear all styles */
    init: () => void;
  };

function funcProxy<T>(f: (prop: string) => T) {
  return new Proxy(f, {
    get(target, p: string) {
      return Reflect.apply(target, undefined, [p]);
    },
    apply(target, thisArg, argArray) {
      return Reflect.apply(target, thisArg, argArray);
    },
  });
}

let GLOBAL_STYLES: StyleExport[] = [];

export function queryStyles(selector: string): StyleObject[] | undefined {
  for (let i = GLOBAL_STYLES.length - 1; i >= 0; i--) if (GLOBAL_STYLES[i].selector === selector) return GLOBAL_STYLES[i].children;
}

function globalApply(selector: string, ...utilities: Utilities[]): StyleObject {
  const style = apply(selector, ...utilities);

  GLOBAL_STYLES.push({
    selector,
    children: utilities.flat().filter(i => i != null) as StyleObject[],
    style,
  });

  return style;
}

function createDollarFunc(selector: string) {
  return (target: typeof apply, thisArg: unknown, argArray: unknown[]) =>
    Reflect.apply(
      target,
      thisArg,
      isStyleObject(argArray[0]) || isStyleArray(argArray[0]) ? [selector, ...argArray] : [selector, css(argArray[0] as CSSObject)]
    );
}

function createDollarCall(selector: string): DollarCall {
  return new Proxy(globalApply, {
    get(target, p: string) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (p === "ATTR") return createAttrProxy(selector);
      if (p === "styles") return queryStyles(selector) ?? [];

      if (p === "$") selector += ", ";
      else if (p === "$$") selector += " > ";
      else if (p === "_") selector += " ";
      else if (p === "__") selector += " + ";
      else if (p === "_$_") selector += " ~ ";
      else if (p.charCodeAt(0) < 91) selector += p.toLowerCase(); // HTML Elements
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      else selector += "." + p;

      return createDollarCall(selector);
    },
    apply: createDollarFunc(selector),
  }) as unknown as DollarCall;
}

const attrMatches: Record<string, string> = {
  match: "=",
  hyphenMatch: "|=",
  contains: "~=",
  includes: "*=",
  startsWith: "^=",
  endsWith: "$=",
};

const createAttrProxy = (selector: string) =>
  funcProxy(function (attribute) {
    return new Proxy(globalApply, {
      get(target, p: string) {
        if (p in attrMatches)
          return funcProxy(function (v) {
            selector += `[${attribute}${attrMatches[p]}${JSON.stringify(v)}]`;
            return createDollarCall(selector);
          });

        return Reflect.get(createDollarCall(selector), p);
      },
      apply: createDollarFunc(selector + `[${attribute}]`),
    });
  });

export const $ = new Proxy(globalApply, {
  get(target, p: string) {
    if (p === "call") return (thisArg: unknown, ...args: unknown[]) => Reflect.apply(target, thisArg, args);

    if (p === "init") return () => (GLOBAL_STYLES = []);
    if (p === "exports") return GLOBAL_STYLES;
    if (p === "styles")
      return new Proxy(GLOBAL_STYLES.map(i => i.children).flat(), {
        get(target, p: string) {
          if (Reflect.has(target, p)) return Reflect.get(target, p);
          return queryStyles(p);
        },
      });

    let selector = "";

    if (p === "ID")
      return funcProxy(function (id) {
        selector += "#" + id;
        return createDollarCall(selector);
      });

    if (p === "ATTR") return createAttrProxy(selector);

    if (p === "All") selector += "*";
    else if (p === "Root") selector += ":root";
    // TODO: support :host(.selector)
    else if (p === "Host") selector += ":host";
    else if (p.charCodeAt(0) < 91) selector += p.toLowerCase(); // HTML Elements
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    else selector += "." + p;

    return createDollarCall(selector);
  },
}) as DollarType;
