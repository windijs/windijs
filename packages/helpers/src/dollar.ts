import type { ElementSelectors, GeneralHTMLAttrs, StyleObject } from "./types";

import { hasKey } from "@windi/shared";
import { unify } from "./build";

// TODO: support variant group

type DollarFunc = (...utilities: (StyleObject | StyleObject[])[]) => string;

type DollarAttr = ((attribute: string) => DollarCall) & GeneralHTMLAttrs<DollarCall & {
  /** CSS [attribute="value"] Selector */
  match: ((value: string) => DollarCall) & {[key: string]: DollarCall}
  /** CSS [attribute|="value"] Selector */
  hyphenMatch: ((value: string) => DollarCall) & {[key: string]: DollarCall}
  /** CSS [attribute~="value"] Selector */
  contains: ((value: string) => DollarCall) & {[key: string]: DollarCall}
  /** CSS [attribute*="value"] Selector */
  includes: ((value: string) => DollarCall) & {[key: string]: DollarCall}
  /** CSS [attribute^="value"] Selector */
  startsWith: ((value: string) => DollarCall) & {[key: string]: DollarCall}
  /** CSS [attribute$="value"] Selector */
  endsWith: ((value: string) => DollarCall) & {[key: string]: DollarCall}
}>

type DollarCall = DollarFunc & {
  /** CSS group Selector, select `element, element, ..` */
  $: DollarType
  /** CSS child Selector, select `element > element` */
  $$: DollarType
  /** CSS descendant Selector, select `element element ..` */
  _: DollarType
  /** CSS adjacent sibling Selector, select `element + element` */
  __: DollarType
  /** CSS general sibling Selector, select `element ~ element` */
  _$_: DollarType
  /** CSS attribute Selector, select `element[attribute]` */
  ATTR: DollarAttr,
} & {
  /** CSS sub class Selector, select `element.class` */
  [key: string]: DollarCall
} & {
  [key in keyof ElementSelectors<unknown>]: DollarCall
}

type DollarType = typeof unify & ElementSelectors<DollarCall> & {
  /** CSS class Selector */
  [key: string]: DollarCall
} & {
  /** CSS universal Selector, select `*` */
  All: DollarCall,
  /** CSS root element Selector, select `:root`  */
  Root: DollarCall,
  /** CSS shadow host Selector, select `:host` or `:host(...)` */
  Host: DollarCall & DollarType,
  /** CSS id Selector, select `#id` */
  ID: ((id: string) => DollarCall) & {[key: string]: DollarCall},
  /** CSS attribute Selector, select `[attribute]` */
  ATTR: DollarAttr,
}

let CURRENT_SELECTOR = "";
let CURRENT_ATTRIBUTE = "";

function funcProxy<T> (f: (prop: string) => T) {
  return new Proxy(f, {
    get (target, p: string) {
      return Reflect.apply(target, undefined, [p]);
    },
    apply (target, thisArg, argArray) {
      return Reflect.apply(target, thisArg, argArray);
    },
  });
}

const dollarCall = new Proxy(unify, {
  get (target, p: string) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (p === "ATTR") return attrProxy;
    if (p === "$") CURRENT_SELECTOR += ", ";
    else if (p === "$$") CURRENT_SELECTOR += " > ";
    else if (p === "_") CURRENT_SELECTOR += " ";
    else if (p === "__") CURRENT_SELECTOR += " + ";
    else if (p === "_$_") CURRENT_SELECTOR += " ~ ";
    else if (p.charCodeAt(0) < 91) CURRENT_SELECTOR += p.toLowerCase(); // HTML Elements
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    else CURRENT_SELECTOR += "." + p;

    return dollarCall;
  },
  apply (target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [CURRENT_SELECTOR, ...argArray]);
  },
}) as unknown as DollarCall;

const attrFuncs = {
  match: funcProxy(function (v) {
    CURRENT_SELECTOR += `[${CURRENT_ATTRIBUTE}=${JSON.stringify(v)}]`;
    return dollarCall;
  }),
  hyphenMatch: funcProxy(function (v) {
    CURRENT_SELECTOR += `[${CURRENT_ATTRIBUTE}|=${JSON.stringify(v)}]`;
    return dollarCall;
  }),
  contains: funcProxy(function (v) {
    CURRENT_SELECTOR += `[${CURRENT_ATTRIBUTE}~=${JSON.stringify(v)}]`;
    return dollarCall;
  }),
  includes: funcProxy(function (v) {
    CURRENT_SELECTOR += `[${CURRENT_ATTRIBUTE}*=${JSON.stringify(v)}]`;
    return dollarCall;
  }),
  startsWith: funcProxy(function (v) {
    CURRENT_SELECTOR += `[${CURRENT_ATTRIBUTE}^=${JSON.stringify(v)}]`;
    return dollarCall;
  }),
  endsWith: funcProxy(function (v) {
    CURRENT_SELECTOR += `[${CURRENT_ATTRIBUTE}$=${JSON.stringify(v)}]`;
    return dollarCall;
  }),
};

const attrProxy = funcProxy(function (attribute) {
  CURRENT_ATTRIBUTE = attribute;

  return new Proxy(unify, {
    get (target, p) {
      if (hasKey(attrFuncs, p)) return attrFuncs[p];
      return Reflect.get(dollarCall, p);
    },
    apply (target, thisArg, argArray) {
      CURRENT_SELECTOR += `[${CURRENT_ATTRIBUTE}]`;
      return Reflect.apply(target, thisArg, [CURRENT_SELECTOR, ...argArray]);
    },
  });
});

export const $ = new Proxy(unify, {
  get (target, p: string) {
    CURRENT_SELECTOR = "";

    if (p === "call") return (thisArg: unknown, ...args: unknown[]) => Reflect.apply(target, thisArg, args);

    if (p === "ID") {
      return funcProxy(function (id) {
        CURRENT_SELECTOR += ("#" + id);
        return dollarCall;
      });
    }

    if (p === "ATTR") return attrProxy;

    if (p === "All") CURRENT_SELECTOR += "*";
    else if (p === "Root") CURRENT_SELECTOR += ":root";
    // TODO: support :host(.selector)
    else if (p === "Host") CURRENT_SELECTOR += ":host";
    else if (p.charCodeAt(0) < 91) CURRENT_SELECTOR += p.toLowerCase(); // HTML Elements
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    else CURRENT_SELECTOR += "." + p;

    return dollarCall;
  },
}) as DollarType;
