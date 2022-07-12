import { CSSObject, ObjectEntry, StyleBuilder, StyleObject, StyleProperties } from "../types";
import { calcRgba, hasKey, parenWrap, sliceColor, useProxy } from "../utils";

/* Static Handler */

export function createStaticHandler<T extends object>(statics: T, property: StyleProperties | StyleProperties[]): ((key: string) => ObjectEntry<T> | undefined);
export function createStaticHandler<T extends object, K extends string>(statics: T, property: StyleProperties | StyleProperties[], key: K): (key: string) => Record<K, ObjectEntry<T>>;
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], key: K | undefined = undefined) {
  // @ts-ignore, generate default css
  if ("DEFAULT" in statics) statics.css = statics.DEFAULT;

  const build: StyleBuilder = (value) => {
    const css: CSSObject = {};
    if (Array.isArray(property)) {
      property.forEach(p => (css[p] = value));
    } else {
      css[property] = value;
    }
    return { css };
  };

  const handler = (key: string) => {
    if (hasKey(statics, key)) {
      const value = statics[key];
      if (typeof value === "string") return build(value);
    }
  };

  if (key == null) return handler as (key: string) => ObjectEntry<T> | undefined;

  return ((prop) => {
    if (prop === key) return useProxy(handler);
  }) as (key: string) => Record<K, ObjectEntry<T>>;
};

// /* CSS Handler */
// export function createCSSHandler (key: string, css: CSSObject) {

// }

/* Color Handler  */

export interface ColorOpacityObject extends StyleObject {
  opacity: (op: number) => StyleObject
}

export type ColorOpacityProxy<T> = {
  [key in keyof T]: (T[key] extends object ? { [k in keyof T[key]]: ColorOpacityObject } : ColorOpacityObject) & {
    [key: string]: ColorOpacityObject
  }
}

export type ColorProxy<T> = {
  [key in keyof T]: (T[key] extends object ? { [k in keyof T[key]]: StyleObject } : StyleObject) & {
    [key: string]: StyleObject
  }
}

export function createColorHandler<T extends object>(colors: T, colorProperty: StyleProperties): (key: string) => ColorProxy<T> | undefined;
export function createColorHandler<T extends object>(colors: T, colorProperty: StyleProperties, colorOpacityProperty: string): (key: string) => ColorOpacityProxy<T> | undefined;
export function createColorHandler<T extends object> (colors: T, colorProperty: StyleProperties, colorOpacityProperty?: string) {
  function build (value: string): ColorOpacityObject | StyleObject {
    let css: CSSObject = { [colorProperty]: value };
    if (colorOpacityProperty != null) {
      if (value.startsWith("#")) {
        const [r, g, b, a] = calcRgba(value);
        css = {
          [colorProperty]: parenWrap("rgba", [r, g, b, parenWrap("var", colorOpacityProperty)].join(", ")),
          [colorOpacityProperty]: a.toString(),
        };
      } else if (/^(rgb|hwb|hsl)/.test(value)) {
        const values = sliceColor(value);
        const alpha = values[3] ?? "1";
        css = {
          [colorProperty]: value.startsWith("hwb") ? parenWrap("hwb", values.slice(0, 3).join(" ") + " / " + parenWrap("var", colorOpacityProperty)) : parenWrap(value.startsWith("hsl") ? "hsla" : "rgba", [...values.slice(0, 3), parenWrap("var", colorOpacityProperty)].join(", ")),
          [colorOpacityProperty]: alpha,
        };
      }
      return {
        css,
        opacity (op) {
          const css: CSSObject = { ...this.css };
          css[colorOpacityProperty] = (op / 100).toString();
          return { css };
        },
      };
    }
    return { css };
  }

  return (key: string) => {
    if (hasKey(colors, key)) {
      const value = colors[key];
      if (typeof value === "string") {
        const singleColor = build(value);
        if (singleColor) return singleColor;
      }
      if (typeof value === "object") {
        const child = value as unknown as { [key: string]: string };
        return useProxy(prop => {
          if (hasKey(child, prop)) return build(child[prop]);
        });
      }
    }
  };
}
