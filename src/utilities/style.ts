import { StyleObject, StyleProperties } from "../types";
import { useProxy } from "../utils";

export function styleProperty () {
    type ProxyType = (uid: string, prop: string) => {[key in StyleProperties]: {[k: string]: StyleObject}} & {[key: string]: {[key: string]: StyleObject}};

    return (uid: string, prop: string) => useProxy(value => ({
      css: {
        [prop]: value,
      },
      meta: {
        type: "generic",
        uid,
        props: [prop, value],
      },
    } as StyleObject)) as ProxyType;
}
