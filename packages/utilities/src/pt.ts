import { configHandler, createUtility } from "@windijs/core";

import { paddingConfig } from "@windijs/config";

export default createUtility("pt")
  .use(configHandler(paddingConfig, "paddingTop"))
  .init();
