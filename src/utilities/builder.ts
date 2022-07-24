import { CSSObject, StyleObject, StyleProperties } from "../types";
import { calcRgba, parenWrap, sliceColor } from "../utils";

import { css } from "../helpers/css";

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

export function buildFontSize (fontSize: string, lineHeight?: string, others?: { [key in StyleProperties]: string }): StyleObject {
  let decl: CSSObject = { fontSize };
  if (lineHeight != null) decl.lineHeight = lineHeight;
  if (others != null) decl = { ...decl, ...others } as CSSObject;

  return css(decl);
}
