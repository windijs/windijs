import { gridColumnConfig, gridColumnEndConfig, gridColumnStartConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("col")
  .case("start", configHandler(gridColumnStartConfig, "gridColumnStart"))
  .case("end", configHandler(gridColumnEndConfig, "gridColumnEnd"))

  .use(configHandler(gridColumnConfig, "gridColumn"))
  .init();
