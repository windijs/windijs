import { StyleNamer, StyleObject } from "../types";

import { escapeCSS } from "./escape";
import { getStyleProps } from "./css";
import { hash } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-use-before-define
let CURRENT_NAMER = alphaNamer;

let MINI_COUNT = 0;
const MINI_MAP: { [key: string]: string } = {};

// a, b, c ... a0, a1, ...
export function alphaCount (n: number): string {
  if (n < 26) return String.fromCharCode(n + 97);
  const x = (n - 26) % 36;
  return alphaCount(Math.floor((n - 26) / 36)) + (x < 10 ? x.toString() : String.fromCharCode(x + 87));
}

export function alphaNamer (style: StyleObject): string {
  const key = getStyleProps(style).join(".");
  if (key in MINI_MAP) return MINI_MAP[key];
  return (MINI_MAP[key] = alphaCount(MINI_COUNT++));
}

export function atomicNamer (style: StyleObject): string {
  return escapeCSS(getStyleProps(style).join("."));
}

export function hashNamer (style: StyleObject): string {
  return "windi-" + hash(getStyleProps(style).join("."));
}

export function useNamer (f: StyleNamer) {
  CURRENT_NAMER = f;
}

export function nameStyle (style: StyleObject) {
  return CURRENT_NAMER(style);
}
