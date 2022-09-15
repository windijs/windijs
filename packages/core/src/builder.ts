import { css, getFirstVar, hexToRGB, prop, sliceColor, SymbolCSS } from "@windijs/helpers";
import { dashToCamel, parenWrap } from "@windijs/shared";

import { prefixImageRendering, prefixKeyframes, prefixNotHidden, prefixPlaceholder, prefixWritingMode } from "./prefixer";

import type {
  ColorStyleObject,
  CSSAngle,
  CSSLinearColorStopOrHint,
  CSSMap,
  CSSObject,
  CSSPrefixer,
  CSSSideOrCorner,
  StyleObject,
  StyleProperties,
} from "@windijs/helpers";

export const buildProperty = (property: StyleProperties | StyleProperties[], value: string) =>
  (Array.isArray(property) ? Object.fromEntries(property.map(i => [i, value as string])) : { [property]: value as string }) as CSSObject;

export function buildStatic(property: StyleProperties | StyleProperties[], value: unknown): StyleObject | undefined {
  if (typeof value === "string") return css(buildProperty(property, value));
}

// TODO: consider put this into api, allow user to define their methods
export function buildColor(
  colorProperty: StyleProperties | StyleProperties[],
  colorOpacityProperty: undefined,
  value: unknown,
  prefixer?: (css: CSSObject) => CSSObject
): StyleObject;
export function buildColor(
  colorProperty: StyleProperties | StyleProperties[],
  colorOpacityProperty: string,
  value: unknown,
  prefixer?: (css: CSSObject) => CSSObject
): ColorStyleObject;
export function buildColor(
  colorProperty: StyleProperties | StyleProperties[],
  colorOpacityProperty: string | undefined,
  value: unknown,
  prefixer: CSSPrefixer = i => i
): StyleObject | ColorStyleObject | undefined {
  if (typeof value !== "string") return undefined;

  let decl = buildProperty(colorProperty, value);

  if (colorOpacityProperty != null) {
    if (value.startsWith("#")) {
      const [r, g, b, a] = hexToRGB(value);
      decl = {
        ...buildProperty(colorProperty, parenWrap("rgba", [r, g, b, parenWrap("var", colorOpacityProperty)].join(", "))),
        [colorOpacityProperty]: a.toString(),
      };
    } else if (/^(rgb|hwb|hsl)/.test(value)) {
      const values = sliceColor(value);
      decl = {
        ...buildProperty(
          colorProperty,
          value.startsWith("hwb")
            ? parenWrap("hwb", values.slice(0, 3).join(" ") + " / " + parenWrap("var", colorOpacityProperty))
            : parenWrap(value.startsWith("hsl") ? "hsla" : "rgba", [...values.slice(0, 3), parenWrap("var", colorOpacityProperty)].join(", "))
        ),
        [colorOpacityProperty]: values[3] ?? "1",
      };
    }

    const gradient = (obj: CSSObject) => ({
      get gradient() {
        return css(
          prefixer({
            ...obj,
            backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))",
          })
        );
      },
    });

    return css(prefixer(decl), {
      opacity(op: number) {
        const obj: CSSObject = { ...decl };
        obj[colorOpacityProperty] = (op / 100).toString();
        return css(prefixer(obj), gradient(obj));
      },
      ...gradient(decl),
    }) as ColorStyleObject;
  }
  return css(prefixer(decl));
}

export function buildContainer<T extends Record<string, string | [string, CSSObject]>>(screens: T, center = false) {
  const m = new Map() as CSSMap;
  m.set("width", "100%");
  if (center) m.set("marginLeft", "auto") && m.set("marginRight", "auto");

  for (const [k, v] of Object.entries(screens))
    if (k === "DEFAULT") {
      if (Array.isArray(v)) Object.entries(v[1]).forEach(([k, v]) => m.set(k, v));
    } else if (typeof v === "string") m.set(`@media (min-width: ${v})`, { maxWidth: v });
    else m.set(`@media (min-width: ${v[0]})`, { maxWidth: v[0], ...v[1] });

  return css(m);
}

export function buildNotHidden(property: StyleProperties | StyleProperties[]) {
  return (v: unknown) => css(prefixNotHidden(buildProperty(property, v as string)));
}

export function buildFontSize(fontSize: string, lineHeight?: string, others?: { [key in StyleProperties]: string }): StyleObject {
  let decl: CSSObject = { fontSize };
  if (lineHeight != null) decl.lineHeight = lineHeight;
  if (others != null) decl = { ...decl, ...others } as CSSObject;

  return css(decl);
}

export function buildFlexDirection(v: unknown) {
  if (typeof v !== "string") return undefined;
  return css({
    "-webkit-box-orient": v.startsWith("row") ? "horizontal" : "vertical",
    "-webkit-box-direction": v.includes("reverse") ? "reverse" : "normal",
    "-ms-flex-direction": v,
    "-webkit-flex-direction": v,
    flexDirection: v,
  });
}

export function buildFlexStretch(v: unknown) {
  if (typeof v !== "string") return undefined;
  return css({
    "-webkit-box-flex": v === "none" || v.startsWith("0") ? "0" : "1",
    "-ms-flex": v,
    "-webkit-flex": v,
    flex: v,
  });
}

export function buildReverse(v: unknown, first: StyleProperties, second: StyleProperties, rev: string): CSSObject {
  return {
    [rev]: "0",
    [first]: `calc(${v} * var(${rev}))`,
    [second]: `calc(${v} * calc(1 - var(${rev})))`,
  };
}

export function buildDivideY(v: unknown) {
  return css(prefixNotHidden(buildReverse(v, "borderBottomWidth", "borderTopWidth", "--w-divide-y-reverse")));
}

export function buildDivideX(v: unknown) {
  return css(prefixNotHidden(buildReverse(v, "borderRightWidth", "borderLeftWidth", "--w-divide-x-reverse")));
}

export function buildSpaceBetweenY(v: unknown) {
  return css(prefixNotHidden(buildReverse(v, "marginBottom", "marginTop", "--w-space-y-reverse")));
}

export function buildSpaceBetweenX(v: unknown) {
  return css(prefixNotHidden(buildReverse(v, "marginRight", "marginLeft", "--w-space-x-reverse")));
}

export const joinFilters = (filters: (string | StyleObject)[]) => filters.map(i => (typeof i === "string" ? i : getFirstVar(i)?.[1])).join(" ");

export const buildFilter = (...filters: (string | StyleObject)[]) =>
  css(Object.fromEntries(["-webkit-filter", "filter"].map(i => [i, joinFilters(filters)])));

export const buildBackdropFilter = (...filters: (string | StyleObject)[]) =>
  css(Object.fromEntries(["-webkit-backdrop-filter", "backdropFilter"].map(i => [i, joinFilters(filters)])));

export const joinTransforms = (transformations: (string | StyleObject)[]) =>
  transformations
    .map(t => {
      if (typeof t === "string") return t;
      const [k, v] = getFirstVar(t) ?? [];
      return k && v ? parenWrap(dashToCamel(k.slice(4)), v) : "";
    })
    .join(" ");

export const buildTransform = (...transformations: (string | StyleObject)[]) =>
  css(Object.fromEntries(["-webkit-transform", "-ms-transform", "transform"].map(i => [i, joinTransforms(transformations)])));

export function buildTransition(property: string, ...styles: StyleObject[]): StyleObject {
  return css(Object.assign({ transitionProperty: property }, ...styles.map(i => i[SymbolCSS])));
}

export function buildKeyframes(name: string, keyframes: Record<string, CSSObject>): CSSObject {
  keyframes = Object.fromEntries(Object.entries(keyframes).map(([k, v]) => [k, prefixKeyframes(v)]));
  return {
    [`@-webkit-keyframes ${name}`]: keyframes,
    [`@keyframes ${name}`]: keyframes,
  };
}

function buildODir(v: string): string {
  return [
    v.includes("top") ? "bottom" : v.includes("bottom") ? "top" : null,
    v.includes("left") ? "right" : v.includes("right") ? "left" : null,
    v.endsWith("deg") ? (Math.abs(450 - +v.slice(0, -3)) % 360) + "deg" : null,
  ]
    .filter(i => i != null)
    .join(" ");
}

function buildWebkitGradient(v: string, colorStops: CSSLinearColorStopOrHint[]): string {
  const len = colorStops.length;
  const dirs = v.split(" ");
  const stops = colorStops.map((stop, i) =>
    i === 0 && typeof stop === "string"
      ? parenWrap("from", stop)
      : i === len - 1 && len > 1 && typeof stop === "string"
      ? parenWrap("to", stop)
      : parenWrap("color-stop", Array.isArray(stop) ? stop.reverse().join(", ") : stop.toString())
  );
  return `-webkit-gradient(linear, ${dirs.find(v => v === "left") ? "right" : "left"} ${dirs.find(v => v === "top") ? "bottom" : "top"}, ${
    dirs.find(v => v === "left" || v === "right") ?? "left"
  } ${dirs.find(v => v === "top" || v === "bottom") ?? "top"}, ${stops.join(", ")})`;
}

export function buildGradientDirection(v: unknown, colorStops: CSSLinearColorStopOrHint[] = ["var(--w-gradient-stops)"]) {
  if (typeof v !== "string") return;
  let d;
  const isTo = () => /top|left|bottom|right/.test(v as string);
  if (isTo()) d = "to " + v;
  else {
    d = v;
    switch (v) {
      case "0deg":
        v = "top";
        break;
      case "90deg":
        v = "right";
        break;
      case "180deg":
        v = "bottom";
        break;
      case "270deg":
        v = "left";
        break;
    }
  }
  const c = colorStops.map(i => (Array.isArray(i) ? i.join(" ") : i)).join(", ");
  const g = `linear-gradient(${d}, ${c})`;
  const o = `-o-linear-gradient(${buildODir(v as string)}, ${c})`;
  return css({
    backgroundImage: isTo() ? [buildWebkitGradient(v as string, colorStops), o, g] : [o, g],
  });
}

export function buildLinearGradient(direction: CSSSideOrCorner | CSSAngle | string, ...colorStops: CSSLinearColorStopOrHint[]) {
  return buildGradientDirection(
    typeof direction === "string" && direction.startsWith("to ") ? direction.slice(3) : direction.toString(),
    colorStops
  )!;
}

export function buildGradientFrom(v: unknown) {
  return buildColor(prop`--w-gradient-from`, "--w-from-opacity", v, c => ({
    ...c,
    "--w-gradient-stops": "var(--w-gradient-from), var(--w-gradient-to, rgba(255, 255, 255, 0))",
  }));
}

export function buildGradientVia(v: unknown) {
  return buildColor(prop`--w-gradient-via`, "--w-via-opacity", v, c => ({
    "--w-gradient-stops": `var(--w-gradient-from), ${c["--w-gradient-via"]}, var(--w-gradient-to, rgba(255, 255, 255, 0))`,
  }));
}

export function buildGradientTo(v: unknown) {
  return buildColor(prop`--w-gradient-to`, "--w-to-opacity", v);
}

export function buildDivideColor(v: unknown) {
  return buildColor("borderColor", "--w-divide-opacity", v, prefixNotHidden);
}

export function buildDivideOpacity(v: unknown) {
  return buildNotHidden(prop`--w-divide-opacity`)(v);
}

export function buildDivideStyle(v: unknown) {
  return buildNotHidden("borderStyle")(v);
}

export function buildRingWidth(v: unknown) {
  return css({
    "--w-ring-offset-shadow": "var(--w-ring-inset) 0 0 0 var(--w-ring-offset-width) var(--w-ring-offset-color)",
    "--w-ring-shadow": `var(--w-ring-inset) 0 0 0 calc(${v} + var(--w-ring-offset-width)) var(--w-ring-color)`,
    "-webkit-box-shadow": "var(--w-ring-offset-shadow), var(--w-ring-shadow), var(--w-shadow, 0 0 #0000)",
    boxShadow: "var(--w-ring-offset-shadow), var(--w-ring-shadow), var(--w-shadow, 0 0 #0000)",
  });
}

export function buildBoxShadowSize(v: unknown) {
  return css({
    "--w-shadow": v as string,
    "--w-shadow-colored": (v as string).replace(/rgba?\([0-9.,/\s]*\)/g, "var(--w-shadow-color)"),
    "-webkit-box-shadow": "var(--w-ring-offset-shadow, 0 0 #0000), var(--w-ring-shadow, 0 0 #0000), var(--w-shadow)",
    boxShadow: "var(--w-ring-offset-shadow, 0 0 #0000), var(--w-ring-shadow, 0 0 #0000), var(--w-shadow)",
  });
}

export function buildBoxShadowColor(v: unknown) {
  return buildColor(prop`--w-shadow-color`, "--w-shadow-color-opacity", v, o => ({
    ...o,
    "--w-shadow": "var(--w-shadow-colored)",
  }));
}

export function buildImageRendering(v: unknown) {
  return css(prefixImageRendering(buildProperty("imageRendering", v as string)));
}

export function buildPlaceholder(v: unknown) {
  return buildColor("color", "--w-placeholder-opacity", v, prefixPlaceholder);
}

export function buildWritingMode(v: unknown) {
  return css(prefixWritingMode(buildProperty("writingMode", v as string)));
}
