import { tabSizeConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";
import { prop } from "@windijs/helpers";

export default createUtility("tab")
  .use(configHandler(tabSizeConfig, [prop`-moz-tab-size`, prop`-o-tab-size`, "tabSize"]))
  .init();
