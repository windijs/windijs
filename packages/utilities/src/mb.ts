import { marginConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("mb").use(configHandler(marginConfig, "marginBottom")).init();
