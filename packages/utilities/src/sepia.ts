import { sepiaConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

export default createUtility("sepia")
  .use(configHandler(sepiaConfig, v => css({ "--w-sepia": `sepia(${v})` })))
  .init(filters.sepia);
