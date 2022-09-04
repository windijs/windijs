import { configHandler, createUtility } from "@windijs/core";
import { perspectiveConfig, perspectiveOriginConfig } from "@windijs/config";

import { prop } from "@windijs/helpers";

export default createUtility("perspect")
  .use(configHandler(perspectiveConfig, [prop`-webkit-perspective`, "perspective"]))
  .case("origin", configHandler(perspectiveOriginConfig, [prop`-webkit-perspective-origin`, "perspectiveOrigin"]))
  .init();
