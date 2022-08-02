import { useCSSHandler, useColorHandler, useStaticHandler } from "./handler";

import type { StyleProperties } from "types";
import { buildFontSize } from "./builder";

export const fontFamily = useStaticHandler((handle, fonts) => {
  const cssFonts = {} as {[key in keyof typeof fonts]: string};
  for (const [key, value] of Object.entries(fonts)) {
    cssFonts[key as keyof typeof fonts] = Array.isArray(value) ? value.join(",") : value as string;
  }
  return handle(cssFonts as typeof fonts, "fontFamily");
});

export const fontSize = useStaticHandler((handle, sizes) =>
  handle(sizes, value => {
    if (typeof value === "string") return buildFontSize(value);
    if (Array.isArray(value) && value[0]) {
      if (value[1] == null || typeof value[1] === "string") return buildFontSize(value[0], value[1]);
      if (typeof value[1] === "object" && value[1] != null) return buildFontSize(value[0], undefined, value[1]);
    }
  }),
);

/* Font Smoothing */

export const fontStyle = useCSSHandler(css => ({
  italic: {
    ...css({
      fontStyle: "italic",
    }),
    not: css({
      fontStyle: "normal",
    }),
  },
  antialiased: {
    ...css({
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    }),
    auto: css({
      "-webkit-font-smoothing": "auto",
      "-moz-osx-font-smoothing": "auto",
    }),
  },
}));

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
