import { buildFlexDirection, buildFlexStretch, configHandler, createUtility, cssHandler } from "core";
import { flexDirectionConfig, flexGrowConfig, flexShrinkConfig, flexStretchConfig, flexWrapConfig, gridAutoColumnsConfig, gridAutoFlowConfig, gridAutoRowsConfig, gridColumnConfig, gridColumnEndConfig, gridColumnStartConfig, gridRowConfig, gridRowEndConfig, gridRowStartConfig, gridTemplateColumnsConfig, gridTemplateRowsConfig, spacingConfig } from "config";

import { prop } from "helpers";

export const flex = createUtility("flex")
  .use(cssHandler({ display: ["-webkit-box", "-ms-flexbox", "-webkit-flex", "flex"] }))
  .use(configHandler(flexDirectionConfig, buildFlexDirection))
  .use(configHandler(flexWrapConfig, [prop`-ms-flex-wrap`, prop`-webkit-flex-wrap`, "flexWrap"]))
  .use(configHandler(flexStretchConfig, buildFlexStretch))
  .case("grow", configHandler(flexGrowConfig, [prop`-webkit-box-flex`, prop`-ms-flex-positive`, prop`-webkit-flex-grow`, "flexGrow"]))
  .case("shrink", configHandler(flexShrinkConfig, [prop`-ms-flex-negative`, prop`-webkit-flex-shrink`, "flexShrink"]))
  .init();

export const grid = createUtility("grid")
  .case("cols", configHandler(gridTemplateColumnsConfig, "gridTemplateColumns"))
  .case("rows", configHandler(gridTemplateRowsConfig, "gridTemplateRows"))
  .case("inline", cssHandler({ display: ["-ms-inline-grid", "inline-grid"] }))
  .case("flow", configHandler(gridAutoFlowConfig, "gridAutoFlow"))
  .use(cssHandler({ display: ["-ms-grid", "grid"] }))
  .init();

export const gap = createUtility("gap")
  .use(configHandler(spacingConfig, ["gridGap", "gap"]))
  .case("x", configHandler(spacingConfig, [prop`-webkit-column-gap`, prop`-moz-column-gap`, "gridColumnGap", "columnGap"]))
  .case("y", configHandler(spacingConfig, [prop`-webkit-row-gap`, prop`-moz-row-gap`, "gridRowGap", "rowGap"]))
  .init();

export const auto = createUtility("auto")
  .case("rows", configHandler(gridAutoRowsConfig, "gridAutoRows"))
  .case("cols", configHandler(gridAutoColumnsConfig, "gridAutoColumns"))
  .init();

export const col = createUtility("col")
  .case("start", configHandler(gridColumnStartConfig, "gridColumnStart"))
  .case("end", configHandler(gridColumnEndConfig, "gridColumnEnd"))

  .use(configHandler(gridColumnConfig, "gridColumn"))
  .init();

export const row = createUtility("row")
  .case("start", configHandler(gridRowStartConfig, "gridRowStart"))
  .case("end", configHandler(gridRowEndConfig, "gridRowEnd"))

  .use(configHandler(gridRowConfig, "gridRow"))
  .init();
