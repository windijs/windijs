import { borderRadiusConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("rounded").use(configHandler(borderRadiusConfig, "borderRadius")).init();
