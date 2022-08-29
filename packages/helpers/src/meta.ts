import type { MetaType, StyleObject, UtilityMeta } from "./types";

import { SymbolMeta } from "./common";

let CurrentMeta: UtilityMeta;

export function resetMeta (uid = "css", type: MetaType = "css") {
  CurrentMeta = { uid, type, props: [], variants: [] };
}

resetMeta();

export function getMeta () {
  return CurrentMeta;
}

export function getUid () {
  return CurrentMeta.uid;
}

export function pushMetaProp (prop: string) {
  return CurrentMeta.props.push(prop);
}

export function updateMetaType (type: MetaType) {
  CurrentMeta.type = type;
}

export function resetStyleMeta (style: StyleObject, meta: UtilityMeta = CurrentMeta) {
  style[SymbolMeta] = meta;
  return style;
}
