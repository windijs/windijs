import { paddingConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("p").use(configHandler(paddingConfig, "padding")).init();
