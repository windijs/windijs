import { configHandler, createUtility } from "@windijs/core";
import { listStylePositionConfig, listStyleTypeConfig } from "@windijs/config";

export default createUtility("list")
  .use(configHandler(listStyleTypeConfig, "listStyleType"))
  .use(configHandler(listStylePositionConfig, "listStylePosition"))
  .init();
