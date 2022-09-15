import { marginConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("mx")
  .use(configHandler(marginConfig, ["marginLeft", "marginRight"]))
  .init();
