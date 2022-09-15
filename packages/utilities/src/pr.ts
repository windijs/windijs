import { paddingConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("pr").use(configHandler(paddingConfig, "paddingRight")).init();
