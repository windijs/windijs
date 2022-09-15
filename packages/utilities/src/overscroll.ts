import { overscrollConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("overscroll")
  .use(configHandler(overscrollConfig, "overscrollBehavior"))
  .case("x", configHandler(overscrollConfig, "overscrollBehaviorX"))
  .case("y", configHandler(overscrollConfig, "overscrollBehaviorY"))
  .init();
