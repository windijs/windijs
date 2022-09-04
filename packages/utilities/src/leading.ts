import { configHandler, createUtility } from "@windijs/core";

import { lineHeightConfig } from "@windijs/config";

export default createUtility("leading")
  .use(configHandler(lineHeightConfig, "lineHeight"))
  .init();
