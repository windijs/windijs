import { marginConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("ml").use(configHandler(marginConfig, "marginLeft")).init();
