import { configHandler, createUtility } from "@windijs/core";

import { marginConfig } from "@windijs/config";

export default createUtility("mb")
  .use(configHandler(marginConfig, "marginBottom"))
  .init();
