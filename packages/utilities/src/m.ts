import { marginConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("m").use(configHandler(marginConfig, "margin")).init();
