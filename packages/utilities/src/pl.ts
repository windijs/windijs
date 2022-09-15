import { paddingConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("pl").use(configHandler(paddingConfig, "paddingLeft")).init();
