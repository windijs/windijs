import { buildFontSize, configHandler } from "utilities";

export function fontFamilyHandler<T extends object> (fonts: T) {
  const cssFonts = {} as {[key in keyof typeof fonts]: string};
  for (const [key, value] of Object.entries(fonts)) {
    cssFonts[key as keyof typeof fonts] = Array.isArray(value) ? value.join(",") : value as string;
  }
  return configHandler(cssFonts as T, "fontFamily");
}

export function fontSizeHandler<T extends object> (sizes: T) {
  return configHandler(sizes, value => {
    if (typeof value === "string") return buildFontSize(value);
    if (Array.isArray(value) && value[0]) {
      if (value[1] == null || typeof value[1] === "string") return buildFontSize(value[0], value[1]);
      if (typeof value[1] === "object" && value[1] != null) return buildFontSize(value[0], undefined, value[1]);
    }
  });
}
