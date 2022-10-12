import { globalApply, queryStyles, funcProxy, exportStyles, dollarKeywords } from "./dollarApply";
import { isStyleArray, isStyleObject } from "./common";
import { apply, css } from "./css";

import type { CSSObject } from "./types";
import type { DollarCall, DollarType } from "./dollarTypes";

// TODO: support variant group

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
      if (p === "Styles") return queryStyles(selector) ?? [];

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
    if (p === "Exports") return exportStyles();
    if (p === "Styles")
      return new Proxy(
        exportStyles()
          .map(i => i.children)
          .flat(),
        {
          get(target, p: string) {
            if (Reflect.has(target, p)) return Reflect.get(target, p);
            return queryStyles(p);
          },
        }
      );
    if (p === "call") return (thisArg: unknown, ...args: unknown[]) => Reflect.apply(target, thisArg, args);

    if (p in dollarKeywords) return dollarKeywords[p];

    let selector = "";

    if (p === "ID")
      return funcProxy(function (id) {
        selector += "#" + id;
        return createDollarCall(selector);
      });

    if (p === "ATTR") return createAttrProxy(selector);

    if (p === "All") selector += "*";
    else if (p === "Root") selector += ":root";
    // TODO: support :host(.selector) and other variants like :is(), :not(), :where()
    else if (p === "Host") selector += ":host";
    else if (p.charCodeAt(0) < 91) selector += p.toLowerCase(); // HTML Elements
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    else selector += "." + p;

    return createDollarCall(selector);
  },
}) as DollarType;
