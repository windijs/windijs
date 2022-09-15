import { listStylePositionConfig, listStyleTypeConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("list")
  .use(configHandler(listStyleTypeConfig, "listStyleType"))
  .use(configHandler(listStylePositionConfig, "listStylePosition"))
  .init();
