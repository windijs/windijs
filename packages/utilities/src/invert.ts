import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

import { invertConfig } from "@windijs/config";

export default createUtility("invert")
  .use(configHandler(invertConfig, v => css({ "--w-invert": `invert(${v})` })))
  .init(filters.invert);
