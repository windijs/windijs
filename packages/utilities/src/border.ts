import { borderRadiusConfig, borderStyleConfig, borderWidthConfig, opacityConfig, outlineOffsetConfig, ringOffsetConfig } from "@windi/config";
import { buildDivideColor, buildDivideOpacity, buildDivideStyle, buildDivideX, buildDivideY, buildRingWidth, colorHandler, configHandler, createUtility, cssHandler, divideXReverseHandler, divideYReverseHandler, guard, meld } from "@windi/core";

import { colors } from "./colors";
import { prop } from "@windi/helpers";

export const rounded = createUtility("rounded")
  .use(configHandler(borderRadiusConfig, "borderRadius"))
  .init();

export const border = createUtility("border")
  .use(configHandler(borderStyleConfig, "borderStyle"))
  .use(configHandler(borderWidthConfig, "borderWidth"))
  .use(colorHandler(colors, "borderColor", "--w-border-opacity"))
  .case("opacity", configHandler(opacityConfig, prop`--w-border-opacity`))
  .init();

export const divide = createUtility("divide")
  .case("x", meld(
    guard("reverse", divideXReverseHandler()),
    configHandler(borderWidthConfig, buildDivideX),
  ))
  .case("y", meld(
    guard("reverse", divideYReverseHandler()),
    configHandler(borderWidthConfig, buildDivideY),
  ))
  .case("opacity", configHandler(opacityConfig, buildDivideOpacity))
  .use(configHandler(borderStyleConfig, buildDivideStyle))
  .use(colorHandler(colors, buildDivideColor))
  .init();

export const outline = createUtility("outline")
  .case("offset", configHandler(outlineOffsetConfig, "outlineOffset"))
  .case("opacity", configHandler(opacityConfig, prop`--w-outline-opacity`))

  .use(configHandler(borderWidthConfig, "outlineWidth"))
  .use(configHandler(borderStyleConfig, "outlineStyle"))
  .use(colorHandler(colors, "outlineColor", "--w-outline-opacity"))
  .init();

export const ring = createUtility("ring")
  .case("opacity", configHandler(opacityConfig, prop`--w-ring-opacity`))
  .case("inset", cssHandler({ "--w-ring-inset": "inset" }))
  .case("offset", meld(
    colorHandler(colors, prop`--w-ring-offset-color`, "--w-ring-offset-opacity"),
    configHandler(ringOffsetConfig, prop`--w-ring-offset-width`),
    guard("opacity", configHandler(opacityConfig, prop`--w-ring-offset-opacity`)),
  ))
  .use(colorHandler(colors, prop`--w-ring-color`, "--w-ring-opacity"))
  .use(configHandler(borderWidthConfig, buildRingWidth))
  .init();
