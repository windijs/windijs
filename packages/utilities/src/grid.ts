import { gridAutoFlowConfig, gridTemplateColumnsConfig, gridTemplateRowsConfig } from "@windijs/config";
import { configHandler, createUtility, cssHandler } from "@windijs/core";

export default createUtility("grid")
  .case("cols", configHandler(gridTemplateColumnsConfig, "gridTemplateColumns"))
  .case("rows", configHandler(gridTemplateRowsConfig, "gridTemplateRows"))
  .case("inline", cssHandler({ display: ["-ms-inline-grid", "inline-grid"] }))
  .case("flow", configHandler(gridAutoFlowConfig, "gridAutoFlow"))
  .use(cssHandler({ display: ["-ms-grid", "grid"] }))
  .init();
