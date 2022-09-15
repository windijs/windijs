import { paddingConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("px")
  .use(configHandler(paddingConfig, ["paddingLeft", "paddingRight"]))
  .init();
