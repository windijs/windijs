import { StyleObject, StyleProperties } from "../types";
import { useProxy } from "../utils";

export function styleProperty () {
    type RealType = (key: string) => object | undefined;
    type ProxyType = (key: string) => {[key in StyleProperties]: {[k: string]: StyleObject}} & {[key: string]: {[key: string]: StyleObject}};

    const build = (key: string, value: string) => {
      return {
        css: {
          [key]: value,
        },
      };
    };

    const handler: RealType = (prop) => useProxy(value => build(prop, value));

    return handler as ProxyType;
}
