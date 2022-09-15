import { gridAutoColumnsConfig, gridAutoRowsConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("auto")
  .case("rows", configHandler(gridAutoRowsConfig, "gridAutoRows"))
  .case("cols", configHandler(gridAutoColumnsConfig, "gridAutoColumns"))
  .init();
