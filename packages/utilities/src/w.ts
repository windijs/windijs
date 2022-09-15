import { widthConfig } from "@windijs/config";
import { configHandler, createUtility } from "@windijs/core";

export default createUtility("w")
  .case("min", configHandler(widthConfig, "minWidth"))
  .case("max", configHandler(widthConfig, "maxWidth"))

  .use(configHandler(widthConfig, "width"))
  .init();
