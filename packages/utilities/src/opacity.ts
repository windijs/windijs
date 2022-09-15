import { opacityConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("opacity").use(configHandler(opacityConfig, "opacity")).init();
