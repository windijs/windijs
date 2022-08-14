import { blendModeConfig, boxShadowConfig, opacityConfig } from "config";
import { buildBoxShadowColor, buildBoxShadowSize, colorHandler, configHandler, createUtility } from "core";

import { colors } from "./colors";
import { prop } from "helpers";

export const shadow = createUtility("shadow")
  .use(configHandler(boxShadowConfig, buildBoxShadowSize))
  .use(colorHandler(colors, buildBoxShadowColor))
  .case("opacity", configHandler(opacityConfig, prop`--w-shadow-color-opacity`))
  .init();

export const opacity = createUtility("opacity")
  .use(configHandler(opacityConfig, "opacity"))
  .init();

export const blend = createUtility("blend")
  .use(configHandler(blendModeConfig, "mixBlendMode"))
  .init();
