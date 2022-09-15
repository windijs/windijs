import { paddingConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("py")
  .use(configHandler(paddingConfig, ["paddingTop", "paddingBottom"]))
  .init();
