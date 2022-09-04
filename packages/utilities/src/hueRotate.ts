import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

import { hueRotateConfig } from "@windijs/config";

export default createUtility("hueRotate")
  .use(configHandler(hueRotateConfig, v => css({ "--w-hue-rotate": `hue-rotate(${v})` })))
  .init(filters.hueRotate);
