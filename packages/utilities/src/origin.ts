import { transformOriginConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

export default createUtility("origin")
  .use(configHandler(transformOriginConfig, [prop`-webkit-transform-origin`, prop`-ms-transform-origin`, "transformOrigin"]))
  .init();
