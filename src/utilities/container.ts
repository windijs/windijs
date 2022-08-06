import type { CSSMap, CSSObject } from "types";

import { css } from "helpers";

export function createContainer<T extends Record<string, string | [string, CSSObject]>> (screens: T, center = false) {
  const m: CSSMap = new Map();
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
