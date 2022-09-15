import { borderWidthConfig, opacityConfig, ringOffsetConfig } from "@windijs/config";
import { buildRingWidth, colorHandler, configHandler, createUtility, cssHandler, guard, meld } from "@windijs/core";
import { prop } from "@windijs/helpers";

import colors from "./colors";

export default createUtility("ring")
  .case("opacity", configHandler(opacityConfig, prop`--w-ring-opacity`))
  .case("inset", cssHandler({ "--w-ring-inset": "inset" }))
  .case(
    "offset",
    meld(
      colorHandler(colors, prop`--w-ring-offset-color`, "--w-ring-offset-opacity"),
      configHandler(ringOffsetConfig, prop`--w-ring-offset-width`),
      guard("opacity", configHandler(opacityConfig, prop`--w-ring-offset-opacity`))
    )
  )
  .use(colorHandler(colors, prop`--w-ring-color`, "--w-ring-opacity"))
  .use(configHandler(borderWidthConfig, buildRingWidth))
  .init();
