import { configHandler, createUtility } from "@windijs/core";

import { prop } from "@windijs/helpers";
import { transformStyleConfig } from "@windijs/config";

export default createUtility("preserve")
  .use(configHandler(transformStyleConfig, [prop`-webkit-transform-style`, "transformStyle"]))
  .init();
