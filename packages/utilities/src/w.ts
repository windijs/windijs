import { configHandler, createUtility } from "@windijs/core";

import { widthConfig } from "@windijs/config";

export default createUtility("w")
  .case("min", configHandler(widthConfig, "minWidth"))
  .case("max", configHandler(widthConfig, "maxWidth"))

  .use(configHandler(widthConfig, "width"))
  .init();
