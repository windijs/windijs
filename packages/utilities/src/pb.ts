import { configHandler, createUtility } from "@windijs/core";

import { paddingConfig } from "@windijs/config";

export default createUtility("pb")
  .use(configHandler(paddingConfig, "paddingBottom"))
  .init();
