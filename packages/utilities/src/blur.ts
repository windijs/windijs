import { blurConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

export default createUtility("blur")
  .use(configHandler(blurConfig, v => css({ "--w-blur": `blur(${v})` })))
  .init(filters.blur);
