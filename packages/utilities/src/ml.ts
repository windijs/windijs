import { configHandler, createUtility } from "@windijs/core";

import { marginConfig } from "@windijs/config";

export default createUtility("ml")
  .use(configHandler(marginConfig, "marginLeft"))
  .init();
