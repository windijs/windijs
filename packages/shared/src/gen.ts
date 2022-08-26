import { indent, isNumber, isVarName } from "./utils";

/**
 * Generate type interface for config object
 */
export function dtsConfig<T extends object> (obj: T, defaultType = "string", ignores: string[] = [], indentLevel = 0, indentation = 4): string {
  const contents = Object.entries(obj).filter(([k]) => !ignores.includes(k)).map(([k, v]) => (isVarName(k) || isNumber(k) ? k : JSON.stringify(k)) + ": " + (typeof v === "object" && v != null && !Array.isArray(v) ? dtsConfig(v, defaultType, ignores, indentLevel + 1, indentation) : defaultType + ";"));
  return "{\n" + contents.map(i => indent(i, indentation * (indentLevel + 1))).join("\n") + "\n" + indent(indentLevel === 0 ? "}" : "};", indentation * indentLevel);
}

/**
 * Generate utilities.d.ts with config
 */
export function genUtilitiesDts<T extends object> (tmpl: string, config: T): string {
  let code = Object.entries(config).reduce((prev, [k, v]) => prev.replace(new RegExp(`"\\$windi\\.config\\.${k}Config.proxy"`, "g"), dtsConfig(v, "StyleObject<{}>")), tmpl);
  if ("colors" in config) {
    code = code
      // @ts-ignore
      .replace(/"\$windi\.config\.colorsConfig"/g, dtsConfig(config.colors))
      // @ts-ignore
      .replace(/"\$windi\.color\.colors\.proxy"/g, dtsConfig(config.colors, "StyleObject<{opacity: (op: number) => StyleObject<{readonly gradient: StyleObject<{}>}>; readonly gradient: StyleObject<{}>}>"));
  }
  return code;
}

/**
 * Generate utilities.js with config
 */
export function genUtilitiesJs<T extends object> (tmpl: string, config: T): string {
  const start = tmpl.match(/const\s+\S+\s*=/)?.index ?? 0;

  let code = Object.keys(config).reduce((prev, k) => prev.replace(new RegExp(`(?<=configHandler\\().*?${k}Config`, "g"), k + "WindiConfigInject"), tmpl.slice(start));
  // @ts-ignore
  if ("colors" in config) code = code.replace(/const\s+colors\s*=[\s\S]+?;/, "const colors = colorsWindiConfigInject;");

  return [tmpl.slice(0, start), ...Object.entries(config).map(([k, v]) => `const ${k}WindiConfigInject = ${JSON.stringify(v)};`), code].join("\n");
}

/**
 * Generate utilities.mjs with config
 */
export const genUtilitiesMjs = genUtilitiesJs;
