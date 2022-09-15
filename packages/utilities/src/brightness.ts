import { brightnessConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

export default createUtility("brightness")
  .use(configHandler(brightnessConfig, v => css({ "--w-brightness": `brightness(${v})` })))
  .init(filters.brightness);
