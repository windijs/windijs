import * as funcs from "helpers/funcs";
import * as units from "helpers/unit";

import type { CSSDecls, CSSMap, CSSObject, GeneralCSSData, Handler, StyleObject, StyleProxy } from "types";
import { buildFontSize, buildKeyframes, buildProperty } from "./builder";
import { configHandler, cssHandler, genericHandler, guard, handleConfig } from "./api";
import { css, useProxy } from "helpers";
import { getMeta, pushMetaProp } from "helpers/meta";
import { hasKey, isNumber } from "utils";
import { prefixAnimation, prefixNotHidden } from "./prefixer";

import { prop } from "helpers/common";

export const animateHandler = <T extends string> (name: T, value: string | CSSObject, keyframes?: Record<string, CSSObject>) => {
  const map: CSSMap = new Map();
  const setValue = (o: CSSObject) => Object.entries(o).map(([k, v]) => map.set(k, v));
  if (keyframes) setValue(buildKeyframes(name, keyframes));
  setValue(typeof value === "string" ? buildProperty([prop`-webkit-animation`, "animation"], value) : prefixAnimation(value));

  return guard(name, cssHandler(map));
};

export function backgroundGenericHandler () {
  return genericHandler<{ [key: string]: StyleObject } & { $: {[key: string]: StyleObject} }>("backgroundColor", (prop) => {
    if (isNumber(prop)) {
      return "#" + (+prop).toString(16);
    }
    return prop;
  });
}

export function divideXReverseHandler () {
  return cssHandler(prefixNotHidden({
    "--w-divide-x-reverse": "1",
  }));
}

export function divideYReverseHandler () {
  return cssHandler(prefixNotHidden({
    "--w-divide-y-reverse": "1",
  }));
}

export function fontFamilyHandler<T extends object> (fonts: T) {
  const cssFonts = {} as {[key in keyof typeof fonts]: string};
  for (const [key, value] of Object.entries(fonts)) {
    cssFonts[key as keyof typeof fonts] = Array.isArray(value) ? value.join(",") : value as string;
  }
  return configHandler(cssFonts as T, "fontFamily");
}

export function fontSizeHandler<T extends object> (sizes: T) {
  return configHandler(sizes, value => {
    if (typeof value === "string") return buildFontSize(value);
    if (Array.isArray(value) && value[0]) {
      if (value[1] == null || typeof value[1] === "string") return buildFontSize(value[0], value[1]);
      if (typeof value[1] === "object" && value[1] != null) return buildFontSize(value[0], undefined, value[1]);
    }
  });
}

export function spaceBetweenXReverseHandler () {
  return cssHandler(prefixNotHidden({
    "--w-space-x-reverse": "1",
  }));
}

export function spaceBetweenYReverseHandler () {
  return cssHandler(prefixNotHidden({
    "--w-space-y-reverse": "1",
  }));
}

type BuildFunc = (value: string) => StyleObject | undefined;

export function stylePropertyHandler<T extends Partial<Record<keyof CSSDecls, unknown | BuildFunc>> = {}> (cfg: T = {} as T) {
  const build = (prop: string, value: string) => {
    const meta = getMeta();
    if (meta.props.length === 1) meta.props.push(value);
    return css({ [prop]: value }, undefined, meta);
  };
  return (prop => useProxy(value => {
    pushMetaProp(prop);
    if (hasKey(cfg, prop)) {
      const cv = cfg[prop];
      const result = typeof cv === "function" ? cv(value) : handleConfig(v => build(prop, v as string), cv as object, "css", value);
      if (result) return result;
    }
    if (value === "var") return (name: string, defaultValue?: string | undefined) => build(prop, funcs.$var(name, defaultValue));
    if (value in funcs) return (...args: any[]) => build(prop, ((funcs as unknown as { [key: string]: Function })[value])(...args));
    if (value === "in") return useProxy(v => build(prop, units.$in[+v].toString()));
    if (value in units && value !== "color") return useProxy(v => build(prop, (units as any)[value][v].toString()));
    return build(prop, value);
  })) as Handler<GeneralCSSData & StyleProxy<T>>;
}
