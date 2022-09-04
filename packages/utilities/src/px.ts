import { configHandler, createUtility } from "@windijs/core";

import { paddingConfig } from "@windijs/config";

export default createUtility("px")
  .use(configHandler(paddingConfig, ["paddingLeft", "paddingRight"]))
  .init();
