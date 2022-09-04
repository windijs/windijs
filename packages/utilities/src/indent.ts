import { configHandler, createUtility } from "@windijs/core";

import { textIndentConfig } from "@windijs/config";

export default createUtility("indent")
  .use(configHandler(textIndentConfig, "textIndent"))
  .init();
