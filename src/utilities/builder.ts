import type { CSSMap, CSSObject, ColorStyleObject, StyleObject, StyleProperties } from "types";
import { css, getFirstVar } from "helpers";
import { dashToCamel, parenWrap } from "utils";
import { hexToRGB, sliceColor } from "helpers/color";

export function buildStatic (property: StyleProperties | StyleProperties[], value: unknown): StyleObject | undefined {
  if (typeof value !== "string") return undefined;

  const decl: CSSObject = {};
  if (Array.isArray(property)) {
    property.forEach(p => (decl[p as string] = value));
  } else {
    decl[property as string] = value;
  }
  return css(decl);
}

// TODO: consider put this into api, allow use to define their methods
export function buildColor (colorProperty: StyleProperties, colorOpacityProperty: string | undefined, value: unknown): StyleObject | undefined {
  if (typeof value !== "string") return undefined;

  let decl: CSSObject = { [colorProperty]: value };

  if (colorOpacityProperty != null) {
    if (value.startsWith("#")) {
      const [r, g, b, a] = hexToRGB(value);
      decl = {
        [colorProperty]: parenWrap("rgba", [r, g, b, parenWrap("var", colorOpacityProperty)].join(", ")),
        [colorOpacityProperty]: a.toString(),
      };
    } else if (/^(rgb|hwb|hsl)/.test(value)) {
      const values = sliceColor(value);
      decl = {
        [colorProperty]: value.startsWith("hwb") ? parenWrap("hwb", values.slice(0, 3).join(" ") + " / " + parenWrap("var", colorOpacityProperty)) : parenWrap(value.startsWith("hsl") ? "hsla" : "rgba", [...values.slice(0, 3), parenWrap("var", colorOpacityProperty)].join(", ")),
        [colorOpacityProperty]: values[3] ?? "1",
      };
    }

    const gradient = (obj: CSSObject) => ({
      get gradient () {
        return css({ ...obj, backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))" });
      },
    });

    return css(decl, {
      opacity (op: number) {
        const obj: CSSObject = { ...decl };
        obj[colorOpacityProperty] = (op / 100).toString();
        return css(obj, gradient(obj));
      },
      ...gradient(decl),
    }) as ColorStyleObject;
  }
  return css(decl);
}

export function buildContainer<T extends Record<string, string | [string, CSSObject]>> (screens: T, center = false) {
  const m = new Map() as CSSMap;
  m.set("width", "100%");
  if (center) m.set("marginLeft", "auto") && m.set("marginRight", "auto");

  for (const [k, v] of Object.entries(screens)) {
    if (k === "DEFAULT") {
      if (Array.isArray(v)) Object.entries(v[1]).forEach(([k, v]) => m.set(k, v));
    } else if (typeof v === "string") {
      m.set(`@media (min-width: ${v})`, { maxWidth: v });
    } else {
      m.set(`@media (min-width: ${v[0]})`, { maxWidth: v[0], ...v[1] });
    }
  }

  return css(m);
}

export function buildFontSize (fontSize: string, lineHeight?: string, others?: { [key in StyleProperties]: string }): StyleObject {
  let decl: CSSObject = { fontSize };
  if (lineHeight != null) decl.lineHeight = lineHeight;
  if (others != null) decl = { ...decl, ...others } as CSSObject;

  return css(decl);
}

export function buildFlexDirection (v: unknown) {
  if (typeof v !== "string") return undefined;
  return css({
    "-webkit-box-orient": v.startsWith("row") ? "horizontal" : "vertical",
    "-webkit-box-direction": v.includes("reverse") ? "reverse" : "normal",
    "-ms-flex-direction": v,
    "-webkit-flex-direction": v,
    flexDirection: v,
  });
}

export function buildFlexStretch (v: unknown) {
  if (typeof v !== "string") return undefined;
  return css({
    "-webkit-box-flex": v === "none" || v.startsWith("0") ? "0" : "1",
    "-ms-flex": v,
    "-webkit-flex": v,
    flex: v,
  });
}

export function buildSpaceBetweenY (v: unknown) {
  return css({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--w-space-y-reverse": "0",
      marginBottom: `calc(${v} * var(--w-space-y-reverse))`,
      marginTop: `calc(${v} * calc(1 - var(--w-space-y-reverse)))`,
    },
  });
}

export function buildSpaceBetweenX (v: unknown) {
  return css({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--w-space-x-reverse": "0",
      marginRight: `calc(${v} * var(--w-space-x-reverse))`,
      marginLeft: `calc(${v} * calc(1 - var(--w-space-x-reverse)))`,
    },
  });
}

export const joinFilters = (filters: (string | StyleObject)[]) => filters.map(i => typeof i === "string" ? i : getFirstVar(i)?.[1]).join(" ");

export const buildFilter = (...filters: (string | StyleObject)[]) => css(Object.fromEntries(["-webkit-filter", "filter"].map(i => [i, joinFilters(filters)])));

export const buildBackdropFilter = (...filters: (string | StyleObject)[]) => css(Object.fromEntries(["-webkit-backdrop-filter", "backdropFilter"].map(i => [i, joinFilters(filters)])));

export const joinTransforms = (transformations: (string | StyleObject)[]) => transformations.map(t => {
  if (typeof t === "string") return t;
  const [k, v] = getFirstVar(t) ?? [];
  return k && v ? parenWrap(dashToCamel(k.slice(4)), v) : "";
}).join(" ");

export const buildTransform = (...transformations: (string | StyleObject)[]) => css(Object.fromEntries(["-webkit-transform", "-ms-transform", "transform"].map(i => [i, joinTransforms(transformations)])));
