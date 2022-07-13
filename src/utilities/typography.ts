import { CSSObject, ProxyEntry, StyleObject, StyleProperties } from "../types";
import { hasKey } from "../utils";
import { ColorOpacityProxy, ColorProxy, createColorHandler, createStaticHandler } from "./handler";

export function fontFamily<T extends object> (fonts: T) {
  const cssFonts = {} as {[key in keyof T]: string};
  for (const [key, value] of Object.entries(fonts)) {
    cssFonts[key as keyof T] = Array.isArray(value) ? value.join(",") : value as string;
  }
  return createStaticHandler(cssFonts, "fontFamily");
}

export function fontSize<T extends object> (sizes: T) {
  const build = (uid: string, prop: string, fontSize: string, lineHeight?: string, others?: { [key in StyleProperties]: string }) => {
    let css: CSSObject = { fontSize };
    if (lineHeight != null) css.lineHeight = lineHeight;
    if (others != null) css = { ...css, ...others } as CSSObject;

    return { css, meta: { type: "static", uid, props: [prop] } } as StyleObject;
  };

  return ((uid, prop) => {
    if (hasKey(sizes, prop)) {
      const value = sizes[prop];
      if (typeof value === "string") return build(uid, prop, value);
      if (Array.isArray(value) && value[0]) {
        if (value[1] == null || typeof value[1] === "string") return build(uid, prop, value[0], value[1]);
        if (typeof value[1] === "object" && value[1] != null) return build(uid, prop, value[0], undefined, value[1]);
      }
    }
  }) as ProxyEntry<T>;
}

/* Font Smoothing */

export const antialiased: StyleObject & { auto: StyleObject } = {
  css: {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  meta: {
    type: "static",
    uid: "antialiased",
  },
  auto: {
    css: {
      "-webkit-font-smoothing": "auto",
      "-moz-osx-font-smoothing": "auto",
    },
    meta: {
      type: "static",
      uid: "antialiased",
      props: ["auto"],
    },
  },
};

/* Font Style */

export const italic: StyleObject & { not: StyleObject } = {
  css: {
    fontStyle: "italic",
  },
  meta: {
    type: "static",
    uid: "italic",
  },
  not: {
    css: {
      fontStyle: "normal",
    },
    meta: {
      type: "static",
      uid: "italic",
      props: ["not"],
    },
  },
};

export function fontWeight<T extends object> (weights: T) {
  return createStaticHandler(weights, "fontWeight");
}

/* Font Variant Numeric */
// TODO: I don't like the font variant utilities, maybe implemented later...

export function hyphens<T extends object> (hyphens: T) {
  return createStaticHandler(hyphens, ["-webkit-hyphens" as StyleProperties, "-ms-hyphens" as StyleProperties, "hyphens"]);
}

export function tracking<T extends object> (letterSpacings: T) {
  return createStaticHandler(letterSpacings, "letterSpacing");
}

export function leading<T extends object> (lineHeights: T) {
  return createStaticHandler(lineHeights, "lineHeight");
}

export function tabSize<T extends object> (tabs: T) {
  return createStaticHandler(tabs, ["-moz-tab-size" as StyleProperties, "-o-tab-size" as StyleProperties, "tabSize"]);
}

export function textAlignment<T extends object> (aligns: T) {
  return createStaticHandler(aligns, "textAlign");
}

export function textColor<T extends object> (colors: T): (key: string) => ColorOpacityProxy<T> | undefined;
export function textColor<T extends object> (colors: T, withOpacity: true | undefined): (key: string) => ColorOpacityProxy<T> | undefined;
export function textColor<T extends object> (colors: T, withOpacity: true | undefined, opacityName: string): (key: string) => ColorOpacityProxy<T> | undefined;
export function textColor<T extends object> (colors: T, withOpacity: false): (key: string) => ColorProxy<T> | undefined;
export function textColor<T extends object> (colors: T, withOpacity = true, opacityName = "--w-text-opacity") {
  if (!withOpacity) return createColorHandler(colors, "color");
  return createColorHandler(colors, "color", opacityName);
}
