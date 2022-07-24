import { CSSAtRule, CSSBlockBody, CSSDecl, CSSObject, CSSRule, CSSRules, StyleObject } from "../types";
import { bundleStyle, css, isStyleObject } from "./css";
import { camelToDash, indent } from "../utils";

import { SymbolMeta } from "./symbol";
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
  for (const [key, value] of Object.entries(bundleStyle(utilities))) {
    if (typeof value === "string") {
      isGet ? styles.push(key + ":" + value) : (x as HTMLElement).style.setProperty(key, value);
    }
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

function createRules (css: CSSObject, selector: string) {
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

function buildDecl (decl: CSSDecl): string | string[] {
  if (Array.isArray(decl.value)) return decl.value.map(i => decl.property + ": " + i + ";");
  return decl.property.startsWith("webkit") ? "-" : "" + camelToDash(decl.property) + ": " + decl.value + ";";
}

function buildRule (rule: CSSRule, indent = 0) {
  return cssBlock(rule.selector, rule.children.map(i => buildDecl(i)).flat(), indent);
}

function buildAtRule (rule: CSSAtRule, indent = 0) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return cssBlock(rule.rule, createBlockBody(rule.children, indent + 2), indent, indent);
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

function buildRules (rules: CSSRules) {
  return createBlockBody(rules).join("\n\n");
}

function extractChildren (style: StyleObject): StyleObject[] {
  const { uid, children } = style[SymbolMeta];
  if (Array.isArray(children)) {
    return children.map(child => css({
      [uid]: child.css,
    }, undefined, {
      type: "variant",
      uid,
      props: [],
      children: [child],
    }));
  }
  return [style];
}

function dedupRules (rules: CSSRules): CSSRules {
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
  const flats: StyleObject[] = [];
  const rules: CSSRules = [];

  for (const utility of utilities) {
    if (Array.isArray(utility)) {
      utility.forEach(u => flats.push(...extractChildren(u)));
    } else {
      flats.push(...extractChildren(utility));
    }
  }

  for (const utility of flats) {
    rules.push(...createRules(utility.css, "." + nameStyle(utility)));
  }

  return buildRules(dedupRules(rules));
}

const _unify = (selector: string, utilities: StyleObject[]) => buildRules(createRules(bundleStyle(utilities), selector));

export function unify (...utilities: {[key: string]: StyleObject | StyleObject[]}[]): string;
export function unify (selector: string, ...utilities: (StyleObject | StyleObject[])[]): string;
export function unify (...params: unknown[]): string {
  if (typeof params[0] === "string") return _unify(params[0], params.slice(1).flat() as StyleObject[]);
  const map = Object.assign({}, ...params) as { [key: string]: StyleObject | StyleObject[] };
  return Object.entries(map).map(([k, v]) => Array.isArray(v) ? _unify(k, v) : _unify(k, [v])).join("\n\n");
}
