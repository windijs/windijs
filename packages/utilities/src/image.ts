import { buildImageRendering, configHandler, createUtility } from "@windijs/core";

import { imageRenderingConfig } from "@windijs/config";

export default createUtility("image")
  .case("render", configHandler(imageRenderingConfig, buildImageRendering))
  .init();
