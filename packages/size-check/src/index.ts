import { configHandler, createUtility } from "@windijs/core";

import { paddingConfig } from "@windijs/config";

export const p = createUtility("p")
  .use(configHandler(paddingConfig, "padding"))
  .init();
