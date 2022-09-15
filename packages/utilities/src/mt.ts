import { marginConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("mt").use(configHandler(marginConfig, "marginTop")).init();
