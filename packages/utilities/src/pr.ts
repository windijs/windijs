import { configHandler, createUtility } from "@windijs/core";

import { paddingConfig } from "@windijs/config";

export default createUtility("pr")
  .use(configHandler(paddingConfig, "paddingRight"))
  .init();
