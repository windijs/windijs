import { configHandler, createUtility } from "@windijs/core";
import { gridAutoColumnsConfig, gridAutoRowsConfig } from "@windijs/config";

export default createUtility("auto")
  .case("rows", configHandler(gridAutoRowsConfig, "gridAutoRows"))
  .case("cols", configHandler(gridAutoColumnsConfig, "gridAutoColumns"))
  .init();
