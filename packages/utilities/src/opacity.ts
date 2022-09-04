import { configHandler, createUtility } from "@windijs/core";

import { opacityConfig } from "@windijs/config";

export default createUtility("opacity")
  .use(configHandler(opacityConfig, "opacity"))
  .init();
