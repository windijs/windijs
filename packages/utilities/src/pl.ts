import { configHandler, createUtility } from "@windijs/core";

import { paddingConfig } from "@windijs/config";

export default createUtility("pl")
  .use(configHandler(paddingConfig, "paddingLeft"))
  .init();
