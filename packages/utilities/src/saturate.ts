import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

import { saturateConfig } from "@windijs/config";

export default createUtility("saturate")
  .use(configHandler(saturateConfig, v => css({ "--w-saturate": `saturate(${v})` })))
  .init(filters.saturate);
