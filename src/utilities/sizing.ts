import { configHandler, createUtility } from "core";
import { heightConfig, widthConfig } from "config";

export const w = createUtility("w")
  .case("min", configHandler(widthConfig, "minWidth"))
  .case("max", configHandler(widthConfig, "maxWidth"))

  .use(configHandler(widthConfig, "width"))
  .init();

export const h = createUtility("h")
  .case("min", configHandler(heightConfig, "minHeight"))
  .case("max", configHandler(heightConfig, "maxHeight"))

  .use(configHandler(heightConfig, "height"))
  .init();
