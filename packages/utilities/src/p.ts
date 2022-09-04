import { configHandler, createUtility } from "@windijs/core";

import { paddingConfig } from "@windijs/config";

export default createUtility("p")
  .use(configHandler(paddingConfig, "padding"))
  .init();
