import type { CSSMap, CSSObject, StyleObject, StyleProperties } from "types";
import { calcRgba, parenWrap, sliceColor } from "utils";
import { css, getFirstVar } from "helpers";

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

export function buildColor (colorProperty: StyleProperties, colorOpacityProperty: string | undefined, value: unknown): StyleObject | undefined {
  if (typeof value !== "string") return undefined;

  let decl: CSSObject = { [colorProperty]: value };

  if (colorOpacityProperty != null) {
    if (value.startsWith("#")) {
      const [r, g, b, a] = calcRgba(value);
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
    return css(decl, {
      opacity (op: number) {
        const obj: CSSObject = { ...decl };
        obj[colorOpacityProperty] = (op / 100).toString();
        return css(obj);
      },
    }) as StyleObject<{ opacity(op: number): StyleObject }>;
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

const joinFilters = (filters: (string | StyleObject)[]) => filters.map(i => typeof i === "string" ? i : getFirstVar(i)).join(" ");

export function buildFilter (...filters: (string | StyleObject)[]) {
  const v = joinFilters(filters);
  return css({ "-webkit-filter": v, filter: v });
}

export function buildBackdropFilter (...filters: (string | StyleObject)[]) {
  const v = joinFilters(filters);
  return css({ "-webkit-backdrop-filter": v, backdropFilter: v });
}
