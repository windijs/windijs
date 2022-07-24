import { MetaType, UtilityMeta } from "../types";

let CurrentMeta: UtilityMeta;

export function resetMeta (uid = "css", type: MetaType = "css") {
  CurrentMeta = { uid, type, props: [] };
}

resetMeta();

export function getMeta () {
  return CurrentMeta;
}

export function pushMetaProp (prop: string) {
  return CurrentMeta.props.push(prop);
}

export function updateMetaType (type: MetaType) {
  CurrentMeta.type = type;
}
