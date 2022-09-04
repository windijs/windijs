import { configHandler, createUtility } from "@windijs/core";

import { marginConfig } from "@windijs/config";

export default createUtility("my")
  .use(configHandler(marginConfig, ["marginTop", "marginBottom"]))
  .init();
