import { configHandler, createUtility } from "@windijs/core";

import { letterSpacingConfig } from "@windijs/config";

export default createUtility("tracking")
  .use(configHandler(letterSpacingConfig, "letterSpacing"))
  .init();
