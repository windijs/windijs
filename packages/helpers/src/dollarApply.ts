import { entries, isNumber, parenWrap } from "@windijs/shared";
import { bundle, isStyleArray, isStyleObject, SymbolCSS, SymbolMeta } from "./common";
import { apply, css } from "./css";

import type { AtRuleSelectors, ImportSelector, ImportSelectorConfig, KeyframesSelector, StyleExport } from "./dollarTypes";
import type { CSSMap, CSSObject, StyleObject, Utilities } from "./types";

let GLOBAL_STYLES: StyleExport[] = [];

export function exportStyles(): StyleExport[] {
  return GLOBAL_STYLES;
}

export function cleanStyles() {
  GLOBAL_STYLES = [];
}

export function queryStyles(selector: string): StyleObject[] | undefined {
  for (let i = GLOBAL_STYLES.length - 1; i >= 0; i--) if (GLOBAL_STYLES[i].selector === selector) return GLOBAL_STYLES[i].children;
}

export function funcProxy<T>(f: (prop: string) => T) {
  return new Proxy(f, {
    get(target, p: string) {
      return Reflect.apply(target, undefined, [p]);
    },
    apply(target, thisArg, argArray) {
      return Reflect.apply(target, thisArg, argArray);
    },
  });
}

export function globalApply(strings: TemplateStringsArray, ...values: unknown[]): (...utilities: Utilities[]) => StyleObject;
export function globalApply(selector: string, ...utilities: Utilities[]): StyleObject;
export function globalApply(selector: string, css: CSSObject | CSSMap): StyleObject;
export function globalApply(...utilities: Utilities[]): StyleObject;
export function globalApply(css: CSSObject | CSSMap): StyleObject;
export function globalApply(
  first: string | TemplateStringsArray | CSSObject | CSSMap | Utilities,
  ...values: unknown[]
): StyleObject | ((...utilities: Utilities[]) => StyleObject) {
  const isSelector = typeof first === "string";
  const isStyles = isStyleArray(first);

  if (isSelector || isStyles || !Array.isArray(first)) {
    const selector = isSelector ? first : "";
    const children = values.flat().filter(i => i != null) as StyleObject[];

    if (isSelector) {
      if (!isStyleObject(children[0])) children[0] = css(children[0] as CSSObject);
    } else children.unshift(...(isStyles ? (first as StyleObject[]) : isStyleObject(first) ? [first] : [css(first as CSSObject)]));

    // remove nested dollar styles
    const count = children.filter(i => i[SymbolMeta].selector != null).length;
    count > 0 && GLOBAL_STYLES.splice(-count);

    const style = apply(selector, ...children);

    GLOBAL_STYLES.push({
      selector,
      children,
      style,
    });

    return style;
  }

  const tmpl = (first as unknown as TemplateStringsArray).reduce((query, queryPart, i) => {
    const text = query + queryPart;

    return i < values.length ? text + values[i] : text;
  }, "");

  return (...utilities) => globalApply(tmpl, ...utilities) as unknown as StyleObject;
}

const applyCharset: AtRuleSelectors["Charset"] = (charset: string) =>
  globalApply({
    "@charset": JSON.stringify(charset),
  });

const applyPage = new Proxy(((...args: Utilities[]) => globalApply("@page", ...args)) as AtRuleSelectors["Page"], {
  get(target, p: string) {
    return (...args: Utilities[]) => globalApply(`@page :${p}`, ...args);
  },
});

const applyCounterStyle = new Proxy(
  ((name, declarations) =>
    globalApply({
      [`@counter-style ${name}`]: declarations,
    })) as AtRuleSelectors["CounterStyle"],
  {
    get(target, p) {
      if (Reflect.has(target, p)) return Reflect.get(target, p);
      return (...utilities: Utilities[]) => globalApply(`@counter-style ${p as string}`, ...utilities);
    },
  }
);

const buildSupportCondition = (styles: CSSObject | CSSMap | StyleObject | Utilities[]) => {
  if (!styles) return undefined;
  const build = (css: CSSObject | CSSMap) => {
    const supports: string[] = [];
    for (const [k, v] of entries(css)) supports.push(`(${k}: ${v})`);

    return "supports" + supports.join(" and ");
  };

  if (isStyleObject(styles)) return build(styles.css);
  if (isStyleArray(styles)) return build(bundle(styles as Utilities[]));
  return build(styles as CSSObject);
};

const applyImport = new Proxy(
  ((path, config) => {
    if (!path.startsWith("url(")) path = JSON.stringify(path);
    const s = new Proxy(
      globalApply({
        "@import": [
          path,
          config?.layer ? parenWrap("layer", config.layer) : undefined,
          config?.supports ? buildSupportCondition(config?.supports) : undefined,
          config?.media,
        ]
          .filter(Boolean)
          .join(" "),
      }),
      {
        get(target, p) {
          const updateImport = (v: string) => {
            const baseStyle = GLOBAL_STYLES[GLOBAL_STYLES.length - 1];
            const css = baseStyle.style[SymbolCSS] as CSSMap;
            css.set("@import", css.get("@import") + " " + v);
            baseStyle.children = [baseStyle.style];
            return baseStyle.style;
          };

          const handleMedia = (query: string) => updateImport(query);
          const handleSupports = (args: Utilities[]) =>
            new Proxy(updateImport(buildSupportCondition(args) ?? ""), {
              get(target, p) {
                if (p === "media") return handleMedia;
                return Reflect.get(target, p);
              },
            });

          if (p === "media") return handleMedia;
          if (p === "supports") return handleSupports;
          if (p === "layer")
            return funcProxy(
              (name: string) =>
                new Proxy(updateImport(`layer(${name})`), {
                  get(target, p) {
                    if (p === "supports") return handleSupports;
                    if (p === "media") return handleMedia;
                    return Reflect.get(target, p);
                  },
                })
            );

          return Reflect.get(target, p);
        },
      }
    );
    return s;
  }) as ImportSelector,
  {
    get(target, p: string) {
      if (p === "url") return (url: string, config?: ImportSelectorConfig) => Reflect.apply(target, this, [`url(${JSON.stringify(url)})`, config]);
      return Reflect.get(target, p);
    },
  }
);

const applyMedia =
  (query: string) =>
  (...args: Utilities[]) =>
    globalApply("@media " + query, ...args);

const applyFontFace = (...args: Utilities[]) => globalApply("@font-face", ...args);

const applyProperty = funcProxy(
  (name: string) =>
    (...args: Utilities[]) =>
      globalApply(`@property --${name}`, ...args)
);

const updateNamespace = (prefix?: string, suffix?: string) => {
  const baseStyle = GLOBAL_STYLES[GLOBAL_STYLES.length - 1];
  const css = baseStyle.style[SymbolCSS] as CSSMap;
  css.set("@namespace", (prefix ? prefix + " " : "") + css.get("@namespace") + (suffix ? " " + suffix : ""));
  baseStyle.children = [baseStyle.style];
  return baseStyle.style;
};

const applyNamespace = new Proxy(
  (name: string) =>
    new Proxy(globalApply({ "@namespace": JSON.stringify(name) }), {
      get(target, p) {
        if (p === "prefix") return (prefix: string) => updateNamespace(prefix);
      },
    }),
  {
    get(target, p) {
      if (p === "url")
        return (url: string) =>
          new Proxy(globalApply({ "@namespace": `url(${url})` }), {
            get(target2, p2) {
              return p2 === "prefix" ? (prefix: string) => updateNamespace(prefix) : Reflect.get(target2, p2);
            },
          });
      if (p === "prefix")
        return (prefix: string) =>
          new Proxy(globalApply({ "@namespace": prefix }), {
            get(target2, p2: string) {
              const v = Reflect.get(target2, p2);
              return p2 === "url" ? (url: string) => updateNamespace(undefined, `url(${url})`) : v || updateNamespace(undefined, JSON.stringify(p2));
            },
          });
      return Reflect.get(target, p);
    },
  }
);

const applyLayer = new Proxy(
  (...names: string[]) =>
    (...args: Utilities[]) =>
      globalApply("@layer " + names.join(", "), ...args),
  {
    get(target, p) {
      if (typeof p === "string") return (...args: Utilities[]) => globalApply("@layer " + p, ...args);
      return Reflect.get(target, p);
    },
  }
);

const applySupports = new Proxy(
  (utilities: Utilities[], isNot = false) => {
    const handleNested = (target: (...args: Utilities[]) => StyleObject, p: string) => {
      if (p === "and" || p === "or") {
        const style = target(utilities);
        GLOBAL_STYLES.splice(-1);

        return new Proxy(
          (...args: Utilities[]) =>
            new Proxy(
              (...utilities: Utilities[]) => {
                const selector = style[SymbolMeta].selector;
                return globalApply(`${selector} ${p} ${buildSupportCondition(args)?.replace("supports", "")}`, ...utilities);
              },
              {
                get: handleNested,
              }
            ),
          {
            get(target, p2: string) {
              if (p2 === "not")
                return (...args: Utilities[]) =>
                  new Proxy(
                    (...utilities: Utilities[]) => {
                      const selector = style[SymbolMeta].selector;
                      return globalApply(`${selector} ${p} not ${buildSupportCondition(args)?.replace("supports", "")}`, ...utilities);
                    },
                    { get: handleNested }
                  );
            },
          }
        );
      }

      return Reflect.get(target, p);
    };

    return new Proxy(
      (...args: Utilities[]) =>
        globalApply("@" + buildSupportCondition(utilities)?.replace("supports", "supports " + (isNot ? "not " : "")), ...args),
      {
        get: handleNested,
      }
    );
  },
  {
    get(target, p) {
      if (p === "selector")
        return (selector: string) =>
          (...args: Utilities[]) =>
            globalApply("@supports selector(" + selector + ")", ...args);

      if (p === "not")
        return new Proxy((...args: Utilities[]) => target(args, true), {
          get(target, p) {
            if (p === "not")
              return (...utilities: Utilities[]) =>
                (...args: Utilities[]) =>
                  globalApply(`@supports not (not ${buildSupportCondition(utilities)?.replace("supports", "")})`, ...args);
            if (p === "selector")
              return (selector: string) =>
                (...args: Utilities[]) =>
                  globalApply("@supports not selector(" + selector + ")", ...args);
          },
        });
    },
  }
);

export const applyKeyframes = new Proxy({} as KeyframesSelector, {
  get(target, p: string) {
    const selector = "@keyframes " + p;

    const handleDeep = (target2: StyleObject, p2: string) => {
      if (p2 === "from" || p2 === "to") {
        const style = GLOBAL_STYLES.splice(-1)[0].style;
        return (...args: Utilities[]) =>
          globalApply(selector, {
            ...Object.fromEntries(entries(style.css)),
            [p2]: isStyleObject(args[0]) ? bundle(args) : args[0],
          } as CSSObject);
      }

      if (p2 === "via") {
        const style = GLOBAL_STYLES.splice(-1)[0].style;

        return (percent: number, ...args: Utilities[]) =>
          new Proxy(
            globalApply(selector, {
              ...Object.fromEntries(entries(style.css)),
              [percent + "%"]: isStyleObject(args[0]) ? bundle(args) : args[0],
            } as CSSObject),
            {
              get: handleDeep,
            }
          );
      }

      return Reflect.get(target2, p2);
    };

    const handleNested = (target: (...args: Utilities[]) => StyleObject, p: string) => {
      if (p === "from" || p === "to")
        return (...args: Utilities[]) =>
          new Proxy(
            globalApply(selector, {
              [p]: isStyleObject(args[0]) ? bundle(args) : args[0],
            } as CSSObject),
            {
              get: handleDeep,
            }
          );

      if (p === "via")
        return (percent: number, ...args: Utilities[]) =>
          new Proxy(
            globalApply(selector, {
              [percent + "%"]: isStyleObject(args[0]) ? bundle(args) : args[0],
            } as CSSObject),
            { get: handleDeep }
          );

      return Reflect.get(target, p);
    };

    return new Proxy(
      (...args: Utilities[]) => {
        if (args.length === 1 && typeof args[0] === "object" && args[0] != null && !isStyleObject(args[0])) {
          const css = Object.fromEntries(
            Object.entries(args[0]).map(([k, v]) => [isNumber(k) ? k + "%" : k, isStyleObject(v) ? v.css : v && isStyleArray(v) ? bundle(v) : v])
          ) as CSSObject;
          return globalApply(selector, css);
        }

        return globalApply(selector, ...args);
      },
      {
        get: handleNested,
      }
    );
  },
});

export const dollarKeywords: Record<string, unknown> = {
  Init: cleanStyles,
  Charset: applyCharset,
  CounterStyle: applyCounterStyle,
  FontFace: applyFontFace,
  Import: applyImport,
  Layer: applyLayer,
  Media: applyMedia,
  Page: applyPage,
  Property: applyProperty,
  Supports: applySupports,
  Namespace: applyNamespace,
  Keyframes: applyKeyframes,
};
