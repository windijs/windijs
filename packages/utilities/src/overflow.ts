import { overflowConfig } from "@windijs/config";
import { configHandler, createUtility, cssHandler } from "@windijs/core";

export default createUtility("overflow")
  .use(configHandler(overflowConfig, "overflow"))
  .case(
    "truncate",
    cssHandler({
      overflow: "hidden",
      "-o-text-overflow": "ellipsis",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    })
  )
  .case("ellipsis", cssHandler({ "-o-text-overflow": "ellipsis", textOverflow: "ellipsis" }))
  .case("x", configHandler(overflowConfig, "overflowX"))
  .case("y", configHandler(overflowConfig, "overflowY"))
  .init();
