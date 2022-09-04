import { configHandler, createUtility } from "@windijs/core";

import { marginConfig } from "@windijs/config";

export default createUtility("mr")
  .use(configHandler(marginConfig, "marginRight"))
  .init();
