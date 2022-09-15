import { marginConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("mr").use(configHandler(marginConfig, "marginRight")).init();
