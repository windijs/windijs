import { buildImageRendering, buildPlaceholder, colorHandler, configHandler, createUtility, cssHandler } from "@windi/core";
import { imageRenderingConfig, listStylePositionConfig, listStyleTypeConfig, opacityConfig, overflowConfig, overscrollConfig } from "@windi/config";

import { colors } from "./colors";
import { prop } from "@windi/helpers";

export const image = createUtility("image")
  .case("render", configHandler(imageRenderingConfig, buildImageRendering))
  .init();

export const list = createUtility("list")
  .use(configHandler(listStyleTypeConfig, "listStyleType"))
  .use(configHandler(listStylePositionConfig, "listStylePosition"))
  .init();

export const overflow = createUtility("overflow")
  .use(configHandler(overflowConfig, "overflow"))
  .case("truncate", cssHandler({ overflow: "hidden", "-o-text-overflow": "ellipsis", textOverflow: "ellipsis", whiteSpace: "nowrap" }))
  .case("ellipsis", cssHandler({ "-o-text-overflow": "ellipsis", textOverflow: "ellipsis" }))
  .case("x", configHandler(overflowConfig, "overflowX"))
  .case("y", configHandler(overflowConfig, "overflowY"))
  .init();

export const overscroll = createUtility("overscroll")
  .use(configHandler(overscrollConfig, "overscrollBehavior"))
  .case("x", configHandler(overscrollConfig, "overscrollBehaviorX"))
  .case("y", configHandler(overscrollConfig, "overscrollBehaviorY"))
  .init();

export const placeholder = createUtility("placeholder")
  .use(colorHandler(colors, buildPlaceholder))
  .case("opacity", configHandler(opacityConfig, prop`--w-placeholder-opacity`))
  .init();
