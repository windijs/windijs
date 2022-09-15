import { hueRotateConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

export default createUtility("hueRotate")
  .use(configHandler(hueRotateConfig, v => css({ "--w-hue-rotate": `hue-rotate(${v})` })))
  .init(filters.hueRotate);
