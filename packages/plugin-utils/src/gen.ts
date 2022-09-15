import { Config, Handler, isStyleObject, mergeObject } from "@windijs/helpers";
import { indent, isNumber, isVarName } from "@windijs/shared";

import { injectHelper } from "./utils";

/**
 * Generate type interface for config object
 */
export function dtsConfig<T extends { DEFAULT?: unknown } & object>(
  obj: T,
  defaultType: string | ((v: unknown) => string) = "string",
  ignores: string[] = ["DEFAULT"],
  indentLevel = 0,
  indentation = 4
): string {
  const handleValue =
    typeof defaultType === "function"
      ? defaultType
      : (v: unknown) =>
          typeof v === "object" && v != null && !Array.isArray(v) ? dtsConfig(v, defaultType, ignores, indentLevel + 1, indentation) : defaultType;
  const contents = Object.entries(obj)
    .filter(([k]) => !ignores.includes(k))
    .map(([k, v]) => (isVarName(k) || isNumber(k) ? k : JSON.stringify(k)) + ": " + handleValue(v));
  return (
    ("DEFAULT" in obj ? handleValue(obj.DEFAULT) + " & " : "") +
    "{\n" +
    contents.map(i => indent(i, indentation * (indentLevel + 1))).join("\n") +
    "\n" +
    indent("}", indentation * indentLevel)
  );
}

/**
 * Generate type interface for setup object
 */
export function dtsSetup<T extends { DEFAULT?: unknown } & object>(
  obj: T,
  ignores: string[] = ["DEFAULT"],
  indentLevel = 0,
  indentation = 4
): string {
  const handleValue = (v: unknown) =>
    isStyleObject(v)
      ? "StyleObject"
      : v != null && typeof v === "object"
      ? "get" in v && "type" in v
        ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
          dtsHandler(v as Handler<unknown>, ignores, indentLevel + 1, indentation)
        : dtsSetup(v, ignores, indentLevel + 1, indentation)
      : "undefined";
  return dtsConfig(obj, handleValue, ignores, indentLevel, indentation);
}

/**
 * Generate type interface for handler
 */
export function dtsHandler<R>(handler: Handler<R>, ignores: string[] = ["DEFAULT"], indentLevel = 0, indentation = 4): string {
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
      return 'Record<"1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6", StyleObject> & { [key: string]: StyleObject }';
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
export function dtsUtilities(tmpl: string, config: Config): string {
  const theme = config.theme ?? {};
  let code = injectHelper(
    Object.entries(theme).reduce(
      (prev, [k, v]) =>
        v
          ? prev.replace(
              new RegExp(`"\\$windi\\.config\\.${k}Config.proxy"`, "g"),
              dtsConfig(theme.extend?.[k] ? mergeObject(v, theme.extend[k]!) : v, "StyleObject<{}>")
            )
          : prev,
      tmpl
    ),
    "MergeObject",
    "@windijs/helpers"
  );

  code = Object.entries(theme.extend ?? {})
    .filter(([k]) => !(k in theme))
    .reduce(
      (prev, [k, v]) =>
        v
          ? prev.replace(
              new RegExp(`Inject<(((?!Inject<)[\\s\\S])*),\\s*"\\$windi.config.${k}Config.proxy"`, "g"),
              `MergeObject<$1, ${dtsConfig(v, "StyleObject<{}>")}`
            )
          : prev,
      code
    );

  const colorStyle = "StyleObject<{opacity: (op: number) => StyleObject<{readonly gradient: StyleObject<{}>}>; readonly gradient: StyleObject<{}>}>";
  if (theme.colors) {
    const colors = theme.extend?.colors ? mergeObject(theme.colors, theme.extend.colors) : theme.colors;
    code = code
      .replace(/"\$windi\.config\.colorsConfig"/g, dtsConfig(colors))
      .replace(/"\$windi\.color\.colors\.proxy"/g, dtsConfig(colors, colorStyle));
  } else if (theme.extend?.colors)
    code = code
      .replace(/(const|var|let)(\s+colors:\s*)(Inject<[\s\S]*?);(?=\s*const)/, `$1$2MergeObject<$3, ${dtsConfig(theme.extend.colors)}>;`)
      .replace(/Inject<(((?!Inject<)[\s\S])*),\s*"\$windi.color.colors.proxy"/g, `MergeObject<$1, ${dtsConfig(theme.extend.colors, colorStyle)}`);

  return code;
}
