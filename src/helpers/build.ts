import { CSSAtRule, CSSBlockBody, CSSDecl, CSSObject, CSSRule, CSSRules, StyleObject } from "../types";
import { applyVariant, bundle, isStyleObject } from "./css";
import { camelToDash, indent } from "../utils";

import { nameStyle } from "./namer";

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
export function inline (...utilities: StyleObject[]): string;
export function inline (el: HTMLElement, ...utilities: StyleObject[]): void;
export function inline (x: HTMLElement | StyleObject, ...utilities: StyleObject[]): string | void {
  const isGet = isStyleObject(x);
  const styles = [];
  for (const [key, value] of Object.entries(bundle(utilities))) {
    if (typeof value === "string") isGet ? styles.push(key + ":" + value) : (x as HTMLElement).style.setProperty(key, value);
  }
  if (isGet) return styles.join(";");
}

function cssBlock (selector: string, body: CSSBlockBody = [], rootIndent = 0, childIndent = rootIndent + 2): string {
  const statements: string[] = [];

  for (const item of body) {
    if (typeof item === "string") {
      statements.push(indent(item, childIndent));
    } else {
      statements.push(cssBlock(item.selector, item.body, childIndent + 2));
    }
  }

  return [
    indent(selector, rootIndent) + " {",
    ...statements,
    indent("}", rootIndent),
  ].join("\n");
}

export function createRules (css: CSSObject, selector: string) {
  const rules: CSSRules = [];

  let atRule: CSSAtRule | undefined;
  const rootRule: CSSRule = { selector, children: [] };

  for (const [key, value] of Object.entries(css)) {
    if (typeof value === "string" || value instanceof String) {
      rootRule.children.push({ property: key, value: value as string });
    } else if (typeof value === "number") {
      rootRule.children.push({ property: key, value: value.toString() });
    } else if (value != null) {
      if (key.startsWith("@")) {
        atRule = { rule: key, children: createRules(value, selector) };
        rules.push(atRule);
      } else {
        rules.push(...createRules(value, key.replace(/&/g, selector)));
      }
    }
  }

  rootRule.children[0] && rules.unshift(rootRule);

  return rules;
}

export function buildDecl ({ value, property }: CSSDecl): string | string[] {
  if (Array.isArray(value)) return value.map(i => property + ": " + i + ";");
  return property.startsWith("webkit") ? "-" : "" + camelToDash(property) + ": " + value + ";";
}

export function buildRule ({ selector, children }: CSSRule, indent = 0) {
  return cssBlock(selector, children.map(i => buildDecl(i)).flat(), indent);
}

export function buildAtRule ({ rule, children }: CSSAtRule, indent = 0) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return cssBlock(rule, createBlockBody(children, indent + 2), indent, 0);
}

function createBlockBody (rules: CSSRules, indent = 0) {
  const blocks: CSSBlockBody = [];

  for (const rule of rules) {
    if ("selector" in rule) {
      blocks.push(buildRule(rule, indent));
    } else {
      blocks.push(buildAtRule(rule, indent));
    }
  }

  return blocks;
}

export function buildRules (rules: CSSRules) {
  return createBlockBody(rules).join("\n\n");
}

export function dedupRules (rules: CSSRules): CSSRules {
  const styles: CSSRules = [];
  const atRules: {[key: string]: CSSAtRule} = {};

  for (const r of rules) {
    if ("selector" in r) {
      styles.push(r);
    } else {
      if (r.rule in atRules) {
        atRules[r.rule].children.push(...r.children);
      } else {
        atRules[r.rule] = r;
      }
    }
  }

  return [...styles, ...Object.values(atRules)];
}

export function atomic (...utilities: (StyleObject | StyleObject[])[]): string {
  const rules: CSSRules = [];

  for (const utility of utilities.flat()) {
    rules.push(...createRules(applyVariant(utility), "." + nameStyle(utility)));
  }

  return buildRules(dedupRules(rules));
}

const _unify = (selector: string, utilities: StyleObject[]) => buildRules(createRules(bundle(utilities), selector));

export function unify (...utilities: {[key: string]: StyleObject | StyleObject[]}[]): string;
export function unify (selector: string, ...utilities: (StyleObject | StyleObject[])[]): string;
export function unify (...params: unknown[]): string {
  if (typeof params[0] === "string") return _unify(params[0], params.slice(1).flat() as StyleObject[]);
  const map = Object.assign({}, ...params) as { [key: string]: StyleObject | StyleObject[] };
  return Object.entries(map).map(([k, v]) => Array.isArray(v) ? _unify(k, v) : _unify(k, [v])).join("\n\n");
}
