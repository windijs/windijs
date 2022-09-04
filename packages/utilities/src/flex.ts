import { buildFlexDirection, buildFlexStretch, configHandler, createUtility, cssHandler } from "@windijs/core";
import { flexDirectionConfig, flexGrowConfig, flexShrinkConfig, flexStretchConfig, flexWrapConfig } from "@windijs/config";

import { prop } from "@windijs/helpers";

export default createUtility("flex")
  .use(cssHandler({ display: ["-webkit-box", "-ms-flexbox", "-webkit-flex", "flex"] }))
  .use(configHandler(flexDirectionConfig, buildFlexDirection))
  .use(configHandler(flexWrapConfig, [prop`-ms-flex-wrap`, prop`-webkit-flex-wrap`, "flexWrap"]))
  .use(configHandler(flexStretchConfig, buildFlexStretch))
  .case("grow", configHandler(flexGrowConfig, [prop`-webkit-box-flex`, prop`-ms-flex-positive`, prop`-webkit-flex-grow`, "flexGrow"]))
  .case("shrink", configHandler(flexShrinkConfig, [prop`-ms-flex-negative`, prop`-webkit-flex-shrink`, "flexShrink"]))
  .init();
