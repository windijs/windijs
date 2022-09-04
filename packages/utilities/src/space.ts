import { buildSpaceBetweenX, buildSpaceBetweenY, configHandler, createUtility, guard, meld, spaceBetweenXReverseHandler, spaceBetweenYReverseHandler } from "@windijs/core";

import { spaceBetweenConfig } from "@windijs/config";

export default createUtility("space")
  .case("x", meld(
    guard("reverse", spaceBetweenXReverseHandler()),
    configHandler(spaceBetweenConfig, buildSpaceBetweenX),
  ))
  .case("y", meld(
    guard("reverse", spaceBetweenYReverseHandler()),
    configHandler(spaceBetweenConfig, buildSpaceBetweenY),
  ))
  .init();
