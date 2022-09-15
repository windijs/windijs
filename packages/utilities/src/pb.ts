import { paddingConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("pb").use(configHandler(paddingConfig, "paddingBottom")).init();
