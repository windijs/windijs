import { letterSpacingConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("tracking").use(configHandler(letterSpacingConfig, "letterSpacing")).init();
