import { $in, $var, BuildFunc, CSSDecls, GeneralCSSData, Q, StyleHandler, StyleProxy, abs, attr, blur, brightness, calc, ch, circle, clamp, cm, conicGradient, contrast, counter, counters, css, cubicBezier, deg, dpcm, dpi, dppx, dropShadow, ellipse, em, env, ex, fitContent, fr, getMeta, grad, grayscale, hsl, hsla, hueRotate, hwb, inset, invert, linearGradient, matrix, matrix3d, max, min, minmax, mm, ms, opacity, path, pc, percent, perspective, polygon, pt, pushMetaProp, px, quote, rad, radialGradient, rem, repeat, repeatingConicGradient, repeatingLinearGradient, repeatingRadialGradient, rgb, rgba, rotate, rotate3d, rotateX, rotateY, rotateZ, s, saturate, scale, scale3d, scaleX, scaleY, scaleZ, sepia, sign, skew, skewX, skewY, steps, translate, translate3d, translateX, translateY, translateZ, turn, url, useProxy, vh, vmax, vmin, vw, x } from "@windijs/helpers";

import { handleConfig } from "@windijs/core";
import { hasKey } from "@windijs/shared";

const funcs = { quote, attr, url, $var, path, hwb, dropShadow, counters, circle, ellipse, inset, polygon, matrix, matrix3d, perspective, rotate, rotate3d, rotateX, rotateY, rotateZ, scale, scale3d, scaleX, scaleY, scaleZ, skew, skewX, skewY, translate, translate3d, translateX, translateY, translateZ, steps, calc, clamp, max, min, abs, sign, blur, brightness, contrast, grayscale, invert, opacity, saturate, sepia, rgb, rgba, hsl, hsla, counter, env, minmax, repeat, hueRotate, fitContent, cubicBezier, linearGradient, radialGradient, conicGradient, repeatingConicGradient, repeatingLinearGradient, repeatingRadialGradient };
const units = { percent, deg, grad, rad, turn, s, ms, fr, $in, dpi, dpcm, dppx, x, px, pc, pt, cm, mm, Q, ch, ex, em, rem, vw, vh, vmax, vmin };

export function stylePropertyHandler<T extends Partial<Record<keyof CSSDecls, unknown | BuildFunc<string>>> = {}> (cfg: T = {} as T) {
  const build = (prop: string, value: string) => {
    const meta = getMeta();
    if (meta.props.length === 1) meta.props.push(value);
    return css({ [prop]: value }, undefined, meta);
  };
  return {
    type: "style",
    get: (prop) => useProxy(value => {
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
    }),
  } as StyleHandler<GeneralCSSData & StyleProxy<T>>;
}
