import { gridRowConfig, gridRowEndConfig, gridRowStartConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("row")
  .case("start", configHandler(gridRowStartConfig, "gridRowStart"))
  .case("end", configHandler(gridRowEndConfig, "gridRowEnd"))

  .use(configHandler(gridRowConfig, "gridRow"))
  .init();
