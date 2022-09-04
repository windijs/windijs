import { configHandler, createUtility } from "@windijs/core";

import { marginConfig } from "@windijs/config";

export default createUtility("mx")
  .use(configHandler(marginConfig, ["marginLeft", "marginRight"]))
  .init();
