import { StyleObject } from "../types";
import { isNumber } from "../utils";
import { ColorOpacityProxy, ColorProxy, createColorHandler, createStaticHandler } from "./handler";

// TODO: support call bg as a function via apply proxy
// TODO: maybe support delete api, like delete bg.red[500]??

export function backgroundGeneric () {
    type RealType = (key: string) => StyleObject;
    type ProxyType = (key: string) => {
        [key: string]: StyleObject
    } & {
        $: {[key: string]: StyleObject}
    }

    const build = (value: string) => ({
      css: {
        backgroundColor: value,
      },
    });

    const handler: RealType = (key: string) => {
      if (isNumber(key)) {
        return build("#" + (+key).toString(16));
      }
      return build(key);
    };

    return handler as unknown as ProxyType;
}

export function backgroundColor<T extends object>(colors: T): (key: string) => ColorOpacityProxy<T> | undefined;
export function backgroundColor<T extends object>(colors: T, withOpacity: true | undefined): (key: string) => ColorOpacityProxy<T> | undefined;
export function backgroundColor<T extends object>(colors: T, withOpacity: true | undefined, opacityName: string): (key: string) => ColorOpacityProxy<T> | undefined;
export function backgroundColor<T extends object>(colors: T, withOpacity: false): (key: string) => ColorProxy<T> | undefined;
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
