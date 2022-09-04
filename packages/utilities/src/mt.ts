import { configHandler, createUtility } from "@windijs/core";

import { marginConfig } from "@windijs/config";

export default createUtility("mt")
  .use(configHandler(marginConfig, "marginTop"))
  .init();
