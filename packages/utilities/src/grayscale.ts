import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

import { grayscaleConfig } from "@windijs/config";

export default createUtility("grayscale")
  .use(configHandler(grayscaleConfig, v => css({ "--w-grayscale": `grayscale(${v})` })))
  .init(filters.grayscale);
