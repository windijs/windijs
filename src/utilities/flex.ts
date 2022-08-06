import { useCSSHandler, useStaticHandler } from "./handler";

import type { StyleProperties } from "types";
import { css } from "helpers";

export const flexUtility = useCSSHandler(css => css({ display: ["-webkit-box", "-ms-flexbox", "-webkit-flex", "flex"] }));

export const inlineFlexUtility = useCSSHandler(css => css({ display: ["-webkit-inline-box", "-ms-inline-flexbox", "-webkit-inline-flex", "inline-flex"] }));

export const flexDirectionUtility = useStaticHandler((handle, cfg) => handle(cfg, (v) => {
  if (typeof v !== "string") return undefined;
  return css({
    "-webkit-box-orient": v.startsWith("row") ? "horizontal" : "vertical",
    "-webkit-box-direction": v.includes("reverse") ? "reverse" : "normal",
    "-ms-flex-direction": v,
    "-webkit-flex-direction": v,
    flexDirection: v,
  });
}));

export const flexWrapUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-ms-flex-wrap" as StyleProperties, "-webkit-flex-wrap" as StyleProperties, "flexWrap"]));

export const flexStretchUtility = useStaticHandler((handle, cfg) => handle(cfg, (v) => {
  if (typeof v !== "string") return undefined;
  return css({
    "-webkit-box-flex": v === "none" || v.startsWith("0") ? "0" : "1",
    "-ms-flex": v,
    "-webkit-flex": v,
    flex: v,
  });
}));

export const flexGrowUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-webkit-box-flex" as StyleProperties, "-ms-flex-positive" as StyleProperties, "-webkit-flex-grow" as StyleProperties, "flexGrow"]));

export const flexShrinkUtility = useStaticHandler((handle, cfg) => handle(cfg, ["-ms-flex-negative" as StyleProperties, "-webkit-flex-shrink" as StyleProperties, "flexShrink"]));
