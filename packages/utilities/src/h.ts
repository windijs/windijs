import { configHandler, createUtility } from "@windijs/core";

import { heightConfig } from "@windijs/config";

export default createUtility("h")
  .case("min", configHandler(heightConfig, "minHeight"))
  .case("max", configHandler(heightConfig, "maxHeight"))

  .use(configHandler(heightConfig, "height"))
  .init();
