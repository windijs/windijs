import { CSSObject, StyleObject } from "types";
import { aspectRatioConfig, spacingConfig } from "config";
import { configHandler, createUtility, cssHandler, genericHandler, numberHandler } from "core";

import { css } from "helpers";

export const aspectBase: CSSObject = {
  position: "relative",
  "> *": {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
  },
};

export const aspect = createUtility("aspect")
  .use(configHandler(aspectRatioConfig, "aspectRatio"))
  .case("none", cssHandler({
    position: "static",
    paddingBottom: "0",
    "> *": {
      position: "static",
      height: "auto",
      width: "auto",
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto",
    },
  }))
  .case("w", numberHandler<Record<keyof typeof spacingConfig, StyleObject> & Record<number, StyleObject>>((v) => css({
    "--w-aspect-w": v as string,
    paddingBottom: "calc(var(--w-aspect-h) / var(--w-aspect-w) * 100%)",
    ...aspectBase,
  })))
  .case("h", numberHandler<Record<keyof typeof spacingConfig, StyleObject> & Record<number, StyleObject>>((v) => css({
    "--w-aspect-h": v as string,
  })))
  .use(genericHandler((v) => css({
    paddingBottom: +v * 100 + "%",
    ...aspectBase,
  })))
  .init();
