import { blendModeConfig, boxShadowConfig, opacityConfig } from "@windi/config";
import { buildBoxShadowColor, buildBoxShadowSize, colorHandler, configHandler, createUtility } from "@windi/core";

import { colors } from "./colors";
import { prop } from "@windi/helpers";

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
