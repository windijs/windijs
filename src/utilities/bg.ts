import { StyleObject } from "../types";
import { isNumber } from "../utils";
import { useColorHandler, useStaticHandler } from "./handler";

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

export const backgroundColor = useColorHandler((handle, colors, withOpacity = true, opacityName = "--w-bg-opacity") =>
  handle(colors, "backgroundColor", withOpacity ? opacityName : undefined),
);

export const backgroundAttachment = useStaticHandler((handle, attachments) =>
  handle(attachments, "backgroundAttachment"),
);

export const backgroundClip = useStaticHandler("clip", (handle, clips, key) =>
  handle(clips, ["backgroundClip", "webkitBackgroundClip"], key),
);
