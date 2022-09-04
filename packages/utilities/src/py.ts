import { configHandler, createUtility } from "@windijs/core";

import { paddingConfig } from "@windijs/config";

export default createUtility("py")
  .use(configHandler(paddingConfig, ["paddingTop", "paddingBottom"]))
  .init();
