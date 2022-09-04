import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

import { contrastConfig } from "@windijs/config";

export default createUtility("contrast")
  .use(configHandler(contrastConfig, v => css({ "--w-contrast": `contrast(${v})` })))
  .init(filters.contrast);
