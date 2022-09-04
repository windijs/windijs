import { configHandler, createUtility } from "@windijs/core";
import { gridRowConfig, gridRowEndConfig, gridRowStartConfig } from "@windijs/config";

export default createUtility("row")
  .case("start", configHandler(gridRowStartConfig, "gridRowStart"))
  .case("end", configHandler(gridRowEndConfig, "gridRowEnd"))

  .use(configHandler(gridRowConfig, "gridRow"))
  .init();
