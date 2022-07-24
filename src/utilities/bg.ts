import { CSSObject, StyleObject } from "../types";
import { useColorHandler, useGenericHandler, useStaticHandler } from "./handler";

import { isNumber } from "../utils";

// TODO: support call bg as a function via apply proxy
// TODO: maybe support delete api, like delete bg.red[500]??

export const backgroundGeneric = useGenericHandler<{ [key: string]: StyleObject } & { $: {[key: string]: StyleObject} }>(prop => {
  const build = (value: string) => ({
    backgroundColor: value,
  } as CSSObject);

  if (isNumber(prop)) {
    return build("#" + (+prop).toString(16));
  }
  return build(prop);
});

export const backgroundColor = useColorHandler((handle, colors, withOpacity = true, opacityName = "--w-bg-opacity") =>
  handle(colors, "backgroundColor", withOpacity ? opacityName : undefined),
);

export const backgroundAttachment = useStaticHandler((handle, attachments) =>
  handle(attachments, "backgroundAttachment"),
);

export const backgroundClip = useStaticHandler("clip", (handle, clips, trigger) =>
  handle(clips, ["backgroundClip", "webkitBackgroundClip"], trigger),
);
