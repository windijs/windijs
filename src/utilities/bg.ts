import { StyleObject } from "../types";
import { isNumber } from "../utils";
import { ColorOpacityProxy, ColorProxy, createColorHandler, createStaticHandler } from "./handler";

// TODO: support call bg as a function via apply proxy
// TODO: maybe support delete api, like delete bg.red[500]??

export function backgroundGeneric () {
    type ProxyType = (uid: string, prop: string) => {
        [key: string]: StyleObject
    } & {
        $: {[key: string]: StyleObject}
    }

    const build = (uid: string, prop: string, value: string) => ({
      css: {
        backgroundColor: value,
      },
      meta: {
        uid,
        type: "generic",
        props: [prop],
      },
    }) as StyleObject;

    const handler = (uid: string, prop: string) => {
      if (isNumber(prop)) {
        return build(uid, prop, "#" + (+prop).toString(16));
      }
      return build(uid, prop, prop);
    };

    return handler as unknown as ProxyType;
}

export function backgroundColor<T extends object> (colors: T): (uid: string, prop: string) => ColorOpacityProxy<T> | undefined;
export function backgroundColor<T extends object> (colors: T, withOpacity: true | undefined): (uid: string, prop: string) => ColorOpacityProxy<T> | undefined;
export function backgroundColor<T extends object> (colors: T, withOpacity: true | undefined, opacityName: string): (uid: string, prop: string) => ColorOpacityProxy<T> | undefined;
export function backgroundColor<T extends object> (colors: T, withOpacity: false): (uid: string, prop: string) => ColorProxy<T> | undefined;
export function backgroundColor<T extends object> (colors: T, withOpacity = true, opacityName = "--w-bg-opacity") {
  if (!withOpacity) return createColorHandler(colors, "backgroundColor");
  return createColorHandler(colors, "backgroundColor", opacityName);
}

export function backgroundAttachment<T extends object> (attachments: T) {
  return createStaticHandler(attachments, "backgroundAttachment");
}

export function backgroundClip<T extends object, K extends string = "clip"> (clips: T, key?: K) {
  if (!key) key = "clip" as K;
  return createStaticHandler(clips, ["backgroundClip", "webkitBackgroundClip"], key);
}
