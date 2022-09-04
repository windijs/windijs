import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

import { brightnessConfig } from "@windijs/config";

export default createUtility("brightness")
  .use(configHandler(brightnessConfig, v => css({ "--w-brightness": `brightness(${v})` })))
  .init(filters.brightness);
