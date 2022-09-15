import { blendModeConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("blend").use(configHandler(blendModeConfig, "mixBlendMode")).init();
