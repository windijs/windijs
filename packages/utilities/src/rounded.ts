import { configHandler, createUtility } from "@windijs/core";

import { borderRadiusConfig } from "@windijs/config";

export default createUtility("rounded")
  .use(configHandler(borderRadiusConfig, "borderRadius"))
  .init();
