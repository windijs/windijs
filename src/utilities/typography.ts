import { CSSObject, StyleHandler, StyleObject, StyleProperties } from "../types";
import { hasKey } from "../utils";
import { useStaticHandler, useColorHandler } from "./handler";

export const fontFamily = useStaticHandler((handle, fonts) => {
  const cssFonts = {} as {[key in keyof typeof fonts]: string};
  for (const [key, value] of Object.entries(fonts)) {
    cssFonts[key as keyof typeof fonts] = Array.isArray(value) ? value.join(",") : value as string;
  }
  return handle(cssFonts, "fontFamily");
});

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
  }) as StyleHandler<T>;
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

export const fontWeight = useStaticHandler((handle, weights) =>
  handle(weights, "fontWeight"),
);

/* Font Variant Numeric */
// TODO: I don't like the font variant utilities, maybe implemented later...

export const hyphens = useStaticHandler((handle, hyphens) =>
  handle(hyphens, ["-webkit-hyphens" as StyleProperties, "-ms-hyphens" as StyleProperties, "hyphens"]),
);

export const tracking = useStaticHandler((handle, letterSpacings) =>
  handle(letterSpacings, "letterSpacing"),
);

export const leading = useStaticHandler((handle, lineHeights) =>
  handle(lineHeights, "lineHeight"),
);

export const tabSize = useStaticHandler((handle, tabs) =>
  handle(tabs, ["-moz-tab-size" as StyleProperties, "-o-tab-size" as StyleProperties, "tabSize"]),
);

export const textAlignment = useStaticHandler((handle, aligns) =>
  handle(aligns, "textAlign"),
);

export const fillColor = useColorHandler((handle, colors, withOpacity = true, opacityName = "--w-textt-opacity") =>
  handle(colors, "color", withOpacity ? opacityName : undefined),
);
