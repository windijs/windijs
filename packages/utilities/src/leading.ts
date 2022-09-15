import { lineHeightConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("leading").use(configHandler(lineHeightConfig, "lineHeight")).init();
