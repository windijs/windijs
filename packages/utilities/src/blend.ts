import { configHandler, createUtility } from "@windijs/core";

import { blendModeConfig } from "@windijs/config";

export default createUtility("blend")
  .use(configHandler(blendModeConfig, "mixBlendMode"))
  .init();
