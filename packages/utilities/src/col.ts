import { configHandler, createUtility } from "@windijs/core";
import { gridColumnConfig, gridColumnEndConfig, gridColumnStartConfig } from "@windijs/config";

export default createUtility("col")
  .case("start", configHandler(gridColumnStartConfig, "gridColumnStart"))
  .case("end", configHandler(gridColumnEndConfig, "gridColumnEnd"))

  .use(configHandler(gridColumnConfig, "gridColumn"))
  .init();
