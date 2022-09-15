import { contrastConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

export default createUtility("contrast")
  .use(configHandler(contrastConfig, v => css({ "--w-contrast": `contrast(${v})` })))
  .init(filters.contrast);
