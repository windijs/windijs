import { paddingConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("pt").use(configHandler(paddingConfig, "paddingTop")).init();
