import { hyphensConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

export default createUtility("hyphens")
  .use(configHandler(hyphensConfig, [prop`-webkit-hyphens`, prop`-ms-hyphens`, "hyphens"]))
  .init();
