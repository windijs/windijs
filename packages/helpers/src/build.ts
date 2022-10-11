import { camelToDash, entries, indent } from "@windijs/shared";

import { applyVariant, bundle, isStyleObject, SymbolMeta } from "./common";
import { nameStyle } from "./namer";

import type { CSSAtRule, CSSBlockBody, CSSDecl, CSSInlineAtRule, CSSMap, CSSObject, CSSRule, CSSRules, StyleObject, Utilities } from "./types";

/**
 * Build style value string or style target `HTMLElement`.
 * ```jsx
 * <div style={inline(bg.red.500, bg.clip.border)}></div>
 * ```
 * Or with `HTMLElement` as first param
 * ```jsx
 * el = document.getElementById('btn');
 * inline(el, bg.red.500, bg.clip.border);
 * ```
 */
export function inline(...utilities: StyleObject[]): string;
export function inline(el: HTMLElement, ...utilities: StyleObject[]): void;
export function inline(x: HTMLElement | StyleObject, ...utilities: StyleObject[]): string | void {
  const isGet = isStyleObject(x);
  const styles: string[] = [];
  for (const [key, value] of Object.entries(bundle(utilities)))
    if (typeof value === "string") isGet ? styles.push(key + ":" + value) : (x as HTMLElement).style.setProperty(key, value);

  if (isGet) return styles.join(";");
}

function cssBlock(selector: string, body: CSSBlockBody = [], rootIndent = 0, childIndent = rootIndent + 2): string {
  const statements: string[] = [];

  for (const item of body)
    if (typeof item === "string") statements.push(indent(item, childIndent));
    else statements.push(cssBlock(item.selector, item.body, childIndent + 2));

  return [indent(selector, rootIndent) + " {", ...statements, indent("}", rootIndent)].join("\n");
}

function createDecls(css: CSSObject | CSSMap): CSSDecl[] {
  const decls: CSSDecl[] = [];
  for (const [k, v] of entries(css)) {
    if (typeof v !== "string") throw new Error(`Invalid value type in "${k}: ${v}"`);
    decls.push({ property: k, value: v });
  }
  return decls;
}

export function createRules(css: CSSObject | CSSMap, selector?: string) {
  const rules: CSSRules = [];
  let decls: CSSDecl[] = [];
  const isAtRule = selector?.charCodeAt(0) === 64; /* @ */

  const pushBaseStyle = () => {
    if (decls[0])
      if (selector) rules.push({ selector, children: decls });
      else throw new Error(`Expect a selector or at-rule for "${decls[0].property}: ${decls[0].value}"`);
    decls = [];
  };

  for (const [key, value] of entries(css))
    if (typeof value === "string" || value instanceof String)
      key.charCodeAt(0) === 64 /* @ */ ? rules.push({ rule: key, value: value as string }) : decls.push({ property: key, value: value as string });
    else if (typeof value === "number") decls.push({ property: key, value: value.toString() });
    else if (Array.isArray(value))
      if (typeof value[0] === "string") value.map(i => decls.push({ property: key, value: i }));
      else value.map(i => rules.push(...createRules(i, key)));
    else if (typeof value === "object" && value != null) {
      pushBaseStyle();
      if (key.charCodeAt(0) === 64) {
        const r = {
          rule: key,
          children: /^@(media|supports|layer|font-feature-values|.*keyframes)/.test(key) ? createRules(value, selector) : createDecls(value),
        };
        if (isAtRule) rules.push({ rule: selector, children: [r] });
        else rules.push(r);
      } else {
        const r = createRules(value, selector && !isAtRule ? (key.includes("&") ? key.replace(/&/g, selector) : selector + " " + key) : key);
        isAtRule ? rules.push({ rule: selector, children: r }) : rules.push(...r);
      }
    }

  pushBaseStyle();

  return rules;
}

export function buildDecl({ value, property }: CSSDecl): string | string[] {
  if (Array.isArray(value)) return value.map(i => property + ": " + i + ";");
  return property.startsWith("webkit") ? "-" : "" + camelToDash(property) + ": " + value + ";";
}

export function buildRule({ selector, children }: CSSRule, indentCount = 0) {
  return cssBlock(selector, children.map(i => buildDecl(i)).flat(), indentCount);
}

export function buildInlineAtRule({ rule, value }: CSSInlineAtRule, indentCount = 0): string {
  return indent(rule + " " + value + ";", indentCount);
}

export function buildAtRule({ rule, children }: CSSAtRule, indentCount = 0) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return cssBlock(rule, createBlockBody(children, indentCount + 2), indentCount, 0);
}

function createBlockBody(rules: CSSRules, indentCount = 0) {
  const blocks: CSSBlockBody = [];

  for (const rule of rules)
    if ("selector" in rule) blocks.push(buildRule(rule, indentCount));
    else if ("property" in rule) {
      const decl = buildDecl(rule);
      blocks.push(...(Array.isArray(decl) ? decl : [decl]).map(i => indent(i, indentCount)));
    } else blocks.push("value" in rule ? buildInlineAtRule(rule, indentCount) : buildAtRule(rule, indentCount));

  return blocks;
}

export function buildRules(rules: CSSRules) {
  return createBlockBody(rules).join("\n\n");
}

export function buildCSS(css: CSSObject | CSSMap, selector?: string) {
  return buildRules(createRules(css, selector));
}

export function dedupRules(rules: CSSRules): CSSRules {
  const styles: CSSRules = [];
  const atRules: { [key: string]: CSSAtRule } = {};

  for (const r of rules)
    if ("selector" in r || "value" in r) styles.push(r);
    else if (r.rule in atRules) atRules[r.rule].children.push(...r.children);
    else atRules[r.rule] = r;

  return [...styles, ...Object.values(atRules)];
}

/** build a single StyleObject to css */
export function buildStyle(className: string, style: StyleObject): string {
  return buildCSS(applyVariant(style), "." + className);
}

export function atomic(...utilities: Utilities[]): string {
  const rules: CSSRules = [];

  for (const utility of utilities.flat().filter(i => i != null) as StyleObject[])
    rules.push(...createRules(applyVariant(utility), "." + nameStyle(utility)));

  return buildRules(dedupRules(rules));
}

const _unify = (selector: string, utilities: Utilities[]) => buildCSS(bundle(utilities), selector);

export function unify(selector: string, ...utilities: Utilities[]): string;
export function unify(...utilities: { [key: string]: StyleObject | Utilities[] }[]): string;
export function unify(...params: unknown[]): string {
  if (typeof params[0] === "string") return _unify(params[0], params.slice(1) as Utilities[]);
  const map = Object.assign({}, ...params) as { [key: string]: Utilities };
  return Object.entries(map)
    .map(([k, v]) => (Array.isArray(v) ? _unify(k, v) : _unify(k, [v])))
    .join("\n\n");
}

export function build(...utilities: Utilities[]): string {
  const rules: CSSRules = [];

  for (const utility of utilities.flat().filter(i => i != null) as StyleObject[]) {
    const selector = utility[SymbolMeta].selector;
    if (typeof selector === "string") rules.push(...createRules(applyVariant(utility), selector));
  }

  return buildRules(dedupRules(rules));
}
