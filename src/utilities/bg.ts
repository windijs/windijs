import type { StyleObject } from "types";
import { genericHandler } from "./api";
import { isNumber } from "utils";

export function backgroundGenericHandler () {
  return genericHandler<{ [key: string]: StyleObject } & { $: {[key: string]: StyleObject} }>("backgroundColor", (prop) => {
    if (isNumber(prop)) {
      return "#" + (+prop).toString(16);
    }
    return prop;
  });
}
