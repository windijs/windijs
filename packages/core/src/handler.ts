import { $in, $var, BuildFunc, CSSDecls, CSSMap, CSSObject, GeneralCSSData, Handler, Q, StyleObject, StyleProxy, abs, attr, blur, brightness, calc, ch, circle, clamp, cm, conicGradient, contrast, counter, counters, css, cubicBezier, deg, dpcm, dpi, dppx, dropShadow, ellipse, em, env, ex, fitContent, fr, getMeta, grad, grayscale, hsl, hsla, hueRotate, hwb, inset, invert, linearGradient, matrix, matrix3d, max, min, minmax, mm, ms, opacity, path, pc, percent, perspective, polygon, prop, pt, pushMetaProp, px, quote, rad, radialGradient, rem, repeat, repeatingConicGradient, repeatingLinearGradient, repeatingRadialGradient, rgb, rgba, rotate, rotate3d, rotateX, rotateY, rotateZ, s, saturate, scale, scale3d, scaleX, scaleY, scaleZ, sepia, sign, skew, skewX, skewY, steps, translate, translate3d, translateX, translateY, translateZ, turn, url, useProxy, vh, vmax, vmin, vw, x } from "@windi/helpers";
import { buildFontSize, buildKeyframes, buildProperty } from "./builder";
import { configHandler, cssHandler, genericHandler, guard, handleConfig } from "./api";
import { hasKey, isNumber } from "@windi/shared";
import { prefixAnimation, prefixNotHidden } from "./prefixer";

const funcs = { quote, attr, url, $var, path, hwb, dropShadow, counters, circle, ellipse, inset, polygon, matrix, matrix3d, perspective, rotate, rotate3d, rotateX, rotateY, rotateZ, scale, scale3d, scaleX, scaleY, scaleZ, skew, skewX, skewY, translate, translate3d, translateX, translateY, translateZ, steps, calc, clamp, max, min, abs, sign, blur, brightness, contrast, grayscale, invert, opacity, saturate, sepia, rgb, rgba, hsl, hsla, counter, env, minmax, repeat, hueRotate, fitContent, cubicBezier, linearGradient, radialGradient, conicGradient, repeatingConicGradient, repeatingLinearGradient, repeatingRadialGradient };
const units = { percent, deg, grad, rad, turn, s, ms, fr, $in, dpi, dpcm, dppx, x, px, pc, pt, cm, mm, Q, ch, ex, em, rem, vw, vh, vmax, vmin };

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

export function stylePropertyHandler<T extends Partial<Record<keyof CSSDecls, unknown | BuildFunc<string>>> = {}> (cfg: T = {} as T) {
  const build = (prop: string, value: string) => {
    const meta = getMeta();
    if (meta.props.length === 1) meta.props.push(value);
    return css({ [prop]: value }, undefined, meta);
  };
  return (prop => useProxy(value => {
    pushMetaProp(prop);
    if (hasKey(cfg, prop)) {
      const cv = cfg[prop];
      const result = typeof cv === "function" ? cv(value) : handleConfig(v => build(prop, v as string), cv as unknown as object, "css", value);
      if (result) return result;
    }
    if (value === "var") return (name: string, defaultValue?: string | undefined) => build(prop, funcs.$var(name, defaultValue));
    if (value in funcs) return (...args: any[]) => build(prop, ((funcs as unknown as { [key: string]: Function })[value])(...args));
    if (value === "in") return useProxy(v => build(prop, units.$in[+v].toString()));
    if (value in units && value !== "color") return useProxy(v => build(prop, (units as any)[value][v].toString()));
    return build(prop, value);
  })) as Handler<GeneralCSSData & StyleProxy<T>>;
}
