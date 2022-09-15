import { transformStyleConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

export default createUtility("preserve")
  .use(configHandler(transformStyleConfig, [prop`-webkit-transform-style`, "transformStyle"]))
  .init();
