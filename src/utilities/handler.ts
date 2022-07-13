import { CSSObject, ObjectEntry, StyleObject, StyleProperties, UtilityMeta } from "../types";
import { calcRgba, hasKey, parenWrap, sliceColor, useProxy } from "../utils";

/* Static Handler */

export function createStaticHandler<T extends object> (statics: T, property: StyleProperties | StyleProperties[]): ((uid: string, prop: string) => ObjectEntry<T> | undefined);
export function createStaticHandler<T extends object> (statics: T, property: StyleProperties | StyleProperties[], key: undefined, handleDefault: true): ((uid: string, prop: string) => ObjectEntry<T> & { css: CSSObject } | undefined);
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], key: K, handleDefault: true): (uid: string, prop: string) => Record<K, ObjectEntry<T> & { css: CSSObject }>;
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], key: K): (uid: string, prop: string) => Record<K, ObjectEntry<T>>;
export function createStaticHandler<T extends object, K extends string> (statics: T, property: StyleProperties | StyleProperties[], key: K | undefined = undefined, handleDefault = false) {
  type ProxyType = (uid: string, prop: string) => ObjectEntry<T> | undefined;
  type KeyProxyType = (uid: string, prop: string) => Record<K, ObjectEntry<T>>;

  const build = (uid: string, prop: string, value: string) => {
    const css: CSSObject = {};
    if (Array.isArray(property)) {
      property.forEach(p => (css[p] = value));
    } else {
      css[property] = value;
    }
    return { css, meta: { uid, type: "static", props: [key, prop].filter(p => p != null) } } as StyleObject;
  };

  const handler = (uid: string, prop: string) => {
    if (handleDefault) {
      if (prop === "meta") return { uid, type: "static" };
      // @ts-ignore, generate default css
      if (prop === "css" && "DEFAULT" in statics) return build(uid, prop, statics.DEFAULT).css;
    }
    if (hasKey(statics, prop)) {
      const value = statics[prop];
      if (typeof value === "string") return build(uid, prop, value);
    }
  };

  if (key == null) return handler as ProxyType;

  return ((uid, prop) => {
    if (prop === key) return useProxy(p => handler(uid, p));
  }) as KeyProxyType;
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

export function createColorHandler<T extends object> (colors: T, colorProperty: StyleProperties): (uid: string, prop: string) => ColorProxy<T> | undefined;
export function createColorHandler<T extends object> (colors: T, colorProperty: StyleProperties, colorOpacityProperty: string): (uid: string, prop: string) => ColorOpacityProxy<T> | undefined;
export function createColorHandler<T extends object> (colors: T, colorProperty: StyleProperties, colorOpacityProperty?: string) {
  function build (uid: string, p1: string, p2: string | undefined, value: string): ColorOpacityObject | StyleObject {
    let css: CSSObject = { [colorProperty]: value };
    const meta: UtilityMeta = { type: "color", uid, props: [p1, p2].filter(i => i != null) as string[] };

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
        meta,
        opacity (op) {
          const css: CSSObject = { ...this.css };
          css[colorOpacityProperty] = (op / 100).toString();
          meta.props!.push(parenWrap("opacity", op.toString()));
          return { css, meta };
        },
      };
    }
    return { css, meta };
  }

  return (uid: string, p1: string) => {
    if (hasKey(colors, p1)) {
      const value = colors[p1];
      if (typeof value === "string") {
        const color = build(uid, p1, undefined, value);
        if (color) return color;
      }
      if (typeof value === "object") {
        const children = value as unknown as { [key: string]: string };
        return useProxy(p2 => {
          if (hasKey(children, p2)) return build(uid, p1, p2, children[p2]);
        });
      }
    }
  };
}
