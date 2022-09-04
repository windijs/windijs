import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

import { blurConfig } from "@windijs/config";

export default createUtility("blur")
  .use(configHandler(blurConfig, v => css({ "--w-blur": `blur(${v})` })))
  .init(filters.blur);
