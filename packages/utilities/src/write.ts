import { writingModeConfig, writingOrientationConfig } from "@windijs/config";
import { buildWritingMode, configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

export default createUtility("write")
  .use(configHandler(writingModeConfig, buildWritingMode))
  .use(configHandler(writingOrientationConfig, [prop`-webkit-text-orientation`, "textOrientation"]))
  .init();
