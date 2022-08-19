import { CSSMap, CSSObject, StyleObject, prop } from "@windi/helpers";
import { buildFontSize, buildKeyframes, buildProperty } from "./builder";
import { configHandler, cssHandler, genericHandler, guard } from "./api";
import { prefixAnimation, prefixNotHidden } from "./prefixer";

import { isNumber } from "@windi/shared";

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
