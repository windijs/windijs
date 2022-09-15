import { textIndentConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("indent").use(configHandler(textIndentConfig, "textIndent")).init();
