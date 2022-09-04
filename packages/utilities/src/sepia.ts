import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

import { sepiaConfig } from "@windijs/config";

export default createUtility("sepia")
  .use(configHandler(sepiaConfig, v => css({ "--w-sepia": `sepia(${v})` })))
  .init(filters.sepia);
