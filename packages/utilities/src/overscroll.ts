import { configHandler, createUtility } from "@windijs/core";

import { overscrollConfig } from "@windijs/config";

export default createUtility("overscroll")
  .use(configHandler(overscrollConfig, "overscrollBehavior"))
  .case("x", configHandler(overscrollConfig, "overscrollBehaviorX"))
  .case("y", configHandler(overscrollConfig, "overscrollBehaviorY"))
  .init();
