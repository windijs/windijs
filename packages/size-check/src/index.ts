import { configHandler, createUtility } from "@windi/core";

import { paddingConfig } from "@windi/config";

export const p = createUtility("p")
  .use(configHandler(paddingConfig, "padding"))
  .init();
