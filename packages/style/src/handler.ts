import { handleConfig } from "@windijs/core";
import {
  $in,
  $var,
  abs,
  attr,
  blur,
  brightness,
  BuildFunc,
  calc,
  ch,
  circle,
  clamp,
  cm,
  conicGradient,
  contrast,
  counter,
  counters,
  css,
  CSSDecls,
  cubicBezier,
  deg,
  dpcm,
  dpi,
  dppx,
  dropShadow,
  ellipse,
  em,
  env,
  ex,
  fitContent,
  fr,
  GeneralCSSData,
  getMeta,
  grad,
  grayscale,
  hsl,
  hsla,
  hueRotate,
  hwb,
  inset,
  invert,
  linearGradient,
  matrix,
  matrix3d,
  max,
  min,
  minmax,
  mm,
  ms,
  opacity,
  path,
  pc,
  percent,
  perspective,
  polygon,
  pt,
  px,
  Q,
  quote,
  rad,
  radialGradient,
  rem,
  repeat,
  repeatingConicGradient,
  repeatingLinearGradient,
  repeatingRadialGradient,
  resetMeta,
  rgb,
  rgba,
  rotate,
  rotate3d,
  rotateX,
  rotateY,
  rotateZ,
  s,
  saturate,
  scale,
  scale3d,
  scaleX,
  scaleY,
  scaleZ,
  sepia,
  sign,
  skew,
  skewX,
  skewY,
  steps,
  StyleHandler,
  StyleProxy,
  SymbolProxy,
  translate,
  translate3d,
  translateX,
  translateY,
  translateZ,
  turn,
  url,
  vh,
  vmax,
  vmin,
  vw,
  x,
} from "@windijs/helpers";
import { hasKey } from "@windijs/shared";

const funcs = {
  quote,
  attr,
  url,
  $var,
  path,
  hwb,
  dropShadow,
  counters,
  circle,
  ellipse,
  inset,
  polygon,
  matrix,
  matrix3d,
  perspective,
  rotate,
  rotate3d,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  scale3d,
  scaleX,
  scaleY,
  scaleZ,
  skew,
  skewX,
  skewY,
  translate,
  translate3d,
  translateX,
  translateY,
  translateZ,
  steps,
  calc,
  clamp,
  max,
  min,
  abs,
  sign,
  blur,
  brightness,
  contrast,
  grayscale,
  invert,
  opacity,
  saturate,
  sepia,
  rgb,
  rgba,
  hsl,
  hsla,
  counter,
  env,
  minmax,
  repeat,
  hueRotate,
  fitContent,
  cubicBezier,
  linearGradient,
  radialGradient,
  conicGradient,
  repeatingConicGradient,
  repeatingLinearGradient,
  repeatingRadialGradient,
};
const units = {
  percent,
  deg,
  grad,
  rad,
  turn,
  s,
  ms,
  fr,
  $in,
  dpi,
  dpcm,
  dppx,
  x,
  px,
  pc,
  pt,
  cm,
  mm,
  Q,
  ch,
  ex,
  em,
  rem,
  vw,
  vh,
  vmax,
  vmin,
};

export function stylePropertyHandler<T extends Partial<Record<keyof CSSDecls, unknown | BuildFunc<string>>> = {}>(cfg: T = {} as T) {
  const target = { [SymbolProxy]: true } as unknown as GeneralCSSData;

  const build = (prop: string, value: string) => {
    const meta = getMeta();
    if (meta.props.length === 1) meta.props.push(value);
    return css(value === "null" || value === "undefined" ? {} : { [prop]: value }, undefined, meta);
  };

  return {
    type: "style",
    get: prop =>
      new Proxy(target, {
        get(_, value: string) {
          const meta = getMeta();
          resetMeta("style", meta.type, [prop], meta.variants);
          if (hasKey(cfg, prop)) {
            const cv = cfg[prop];
            const result = typeof cv === "function" ? cv(value) : handleConfig(v => build(prop, v as string), cv as unknown as object, "css", value);
            if (result) return result;
          }
          if (value === "var") return (name: string, defaultValue?: string | undefined) => build(prop, funcs.$var(name, defaultValue));
          if (value === "in") return new Proxy(units.$in, { get: (_, v: string) => build(prop, units.$in[+v].toString()) });
          if (value in funcs) return (...args: unknown[]) => build(prop, (funcs as unknown as { [key: string]: Function })[value](...args));
          if (hasKey(units, value))
            return new Proxy(units[value], { get: (_, v: string) => build(prop, (units[value] as Record<string, number>)[v].toString()) });

          return build(prop, value);
        },
      }),
  } as StyleHandler<GeneralCSSData & StyleProxy<T>>;
}
