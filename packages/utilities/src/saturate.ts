import { saturateConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

export default createUtility("saturate")
  .use(configHandler(saturateConfig, v => css({ "--w-saturate": `saturate(${v})` })))
  .init(filters.saturate);
