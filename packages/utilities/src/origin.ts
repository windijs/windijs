import { configHandler, createUtility } from "@windijs/core";

import { prop } from "@windijs/helpers";
import { transformOriginConfig } from "@windijs/config";

export default createUtility("origin")
  .use(configHandler(transformOriginConfig, [prop`-webkit-transform-origin`, prop`-ms-transform-origin`, "transformOrigin"]))
  .init();
