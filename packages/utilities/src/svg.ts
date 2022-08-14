import { colorHandler, configHandler, createUtility, numberHandler } from "@windi/core";
import { strokeLineCapConfig, strokeLineJoinConfig } from "@windi/config";

import type { StyleObject } from "@windi/helpers";
import { colors } from "./colors";

export const fill = createUtility("fill")
  .use(colorHandler({ none: "none", ...colors }, "fill"))
  .init();

export const stroke = createUtility("stroke")
  .use(colorHandler({ none: "none", ...colors }, "stroke"))
  .case("dash", numberHandler<Record<0 | 1 | 2 | 3 | 4 | 5 | 10 | 100, StyleObject>>("strokeDasharray"))
  .case("offset", numberHandler<Record<0 | 1 | 2 | 3 | 4 | 5 | 10 | 100, StyleObject>>("strokeDashoffset"))
  .case("cap", configHandler(strokeLineCapConfig, "strokeLinecap"))
  .case("join", configHandler(strokeLineJoinConfig, "strokeLinejoin"))
  .use(numberHandler<Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, StyleObject>>("strokeWidth"))
  .init();
