import { indent, isNumber, isVarName } from "@windijs/shared";

import { Handler } from "./types";
import { isStyleObject } from "./common";

/**
 * Generate type interface for config object
 */
export function dtsConfig<T extends { DEFAULT?: unknown } & object> (obj: T, defaultType: string | ((v: unknown) => string) = "string", ignores: string[] = ["DEFAULT"], indentLevel = 0, indentation = 4): string {
  const handleValue = typeof defaultType === "function" ? defaultType : (v: unknown) => (typeof v === "object" && v != null && !Array.isArray(v) ? dtsConfig(v, defaultType, ignores, indentLevel + 1, indentation) : defaultType);
  const contents = Object.entries(obj).filter(([k]) => !ignores.includes(k)).map(([k, v]) => (isVarName(k) || isNumber(k) ? k : JSON.stringify(k)) + ": " + handleValue(v));
  return ("DEFAULT" in obj ? handleValue(obj.DEFAULT) + " & " : "") + "{\n" + contents.map(i => indent(i, indentation * (indentLevel + 1))).join("\n") + "\n" + indent("}", indentation * indentLevel);
}

/**
 * Generate type interface for setup object
 */
export function dtsSetup<T extends { DEFAULT?: unknown } & object> (obj: T, ignores: string[] = ["DEFAULT"], indentLevel = 0, indentation = 4): string {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const handleValue = (v: unknown) => isStyleObject(v) ? "StyleObject" : v != null && typeof v === "object" ? "get" in v && "type" in v ? dtsHandler(v as Handler<unknown>, ignores, indentLevel + 1, indentation) : dtsSetup(v, ignores, indentLevel + 1, indentation) : "undefined";
  return dtsConfig(obj, handleValue, ignores, indentLevel, indentation);
}

/**
 * Generate type interface for handler
 */
export function dtsHandler<R> (handler: Handler<R>, ignores: string[] = ["DEFAULT"], indentLevel = 0, indentation = 4): string {
  switch (handler.type) {
  case "config":
    return dtsConfig(handler.meta.config, "StyleObject", ignores, indentLevel, indentation);
  case "color":
    return dtsConfig(handler.meta.colors, handler.meta.op ? "ColorStyleObject" : "StyleObject", ignores, indentLevel, indentation);
  case "number":
    return "Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, StyleObject> & Record<number, StyleObject>";
  case "spacing":
    return "Record<0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96, StyleObject> & Record<number, StyleObject>";
  case "fraction":
    return "Record<\"1/2\" | \"1/3\" | \"2/3\" | \"1/4\" | \"2/4\" | \"3/4\" | \"1/5\" | \"2/5\" | \"3/5\" | \"4/5\" | \"1/6\" | \"2/6\" | \"3/6\" | \"4/6\" | \"5/6\", StyleObject> & { [key: string]: StyleObject }";
  case "guard":
    return `{ ${handler.meta.key}: ${dtsHandler(handler.meta.handler, ignores, indentLevel + 1, indentation)} }`;
  case "meld":
    return handler.meta.handlers.map(i => dtsHandler(i, ignores, indentLevel, indentation)).join(" & ");
  case "setup":
    return dtsSetup(handler.meta.config, ignores, indentLevel, indentation);
  default:
    return "{}";
  }
}

/**
 * Generate utilities.d.ts with config
 */
export function genUtilitiesDts<T extends object & { theme?: object }> (tmpl: string, config: T): string {
  const theme = config.theme ?? {};
  let code = Object.entries(theme).reduce((prev, [k, v]) => prev.replace(new RegExp(`"\\$windi\\.config\\.${k}Config.proxy"`, "g"), dtsConfig(v, "StyleObject<{}>")), tmpl);
  if ("colors" in theme) {
    code = code
      // @ts-ignore
      .replace(/"\$windi\.config\.colorsConfig"/g, dtsConfig(theme.colors))
      // @ts-ignore
      .replace(/"\$windi\.color\.colors\.proxy"/g, dtsConfig(theme.colors, "StyleObject<{opacity: (op: number) => StyleObject<{readonly gradient: StyleObject<{}>}>; readonly gradient: StyleObject<{}>}>"));
  }
  return code;
}

/**
 * Generate utilities.js with config
 */
export function genUtilitiesJs<T extends object & { theme?: object }> (tmpl: string, config: T): string {
  const start = tmpl.match(/const\s+\S+\s*=/)?.index ?? 0;
  const theme = config.theme ?? {};

  let code = Object.keys(theme).reduce((prev, k) => prev.replace(new RegExp(`(?<=configHandler\\().*?${k}Config`, "g"), k + "WindiConfigInject"), tmpl.slice(start));
  // @ts-ignore
  if ("colors" in theme) code = code.replace(/const\s+colors\s*=[\s\S]+?;/, "const colors = colorsWindiConfigInject;");

  return [tmpl.slice(0, start), ...Object.entries(theme).map(([k, v]) => `const ${k}WindiConfigInject = ${JSON.stringify(v)};`), code].join("\n");
}
