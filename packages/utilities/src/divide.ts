import { borderStyleConfig, borderWidthConfig, opacityConfig } from "@windijs/config";
import { buildDivideColor, buildDivideOpacity, buildDivideStyle, buildDivideX, buildDivideY, colorHandler, configHandler, createUtility, divideXReverseHandler, divideYReverseHandler, guard, meld } from "@windijs/core";

import colors from "./colors";

export default createUtility("divide")
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
