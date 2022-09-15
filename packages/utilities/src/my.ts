import { marginConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("my")
  .use(configHandler(marginConfig, ["marginTop", "marginBottom"]))
  .init();
