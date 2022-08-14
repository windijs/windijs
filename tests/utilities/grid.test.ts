import { configHandler, createUtility, cssHandler } from "core";
import { gridAutoColumnsConfig, gridAutoFlowConfig, gridAutoRowsConfig, gridColumnConfig, gridColumnEndConfig, gridColumnStartConfig, gridRowConfig, gridRowEndConfig, gridRowStartConfig, gridTemplateColumnsConfig, gridTemplateRowsConfig, spacingConfig } from "config";

import { prop } from "index";

test("Grid", () => {
  const grid = createUtility("grid")
    .use(cssHandler({ display: ["-ms-grid", "grid"] }))
    .case("inline", cssHandler({ display: ["-ms-inline-grid", "inline-grid"] }))
    .init();

  expect(grid.css).toMatchSnapshot();
  expect(grid.inline.css).toMatchSnapshot();
});

test("Grid Template Columns", () => {
  const grid = createUtility("grid")
    .case("cols", configHandler(gridTemplateColumnsConfig, "gridTemplateColumns"))
    .init();

  expect(grid.cols[4].css).toMatchSnapshot();
  expect(grid.cols.none.css).toMatchSnapshot();
});

test("Grid Template Rows", () => {
  const grid = createUtility("grid")
    .case("rows", configHandler(gridTemplateRowsConfig, "gridTemplateRows"))
    .init();

  expect(grid.rows[4].css).toMatchSnapshot();
  expect(grid.rows.none.css).toMatchSnapshot();
});

test("Grid Column Span", () => {
  const col = createUtility("col")
    .use(configHandler(gridColumnConfig, "gridColumn"))
    .init();

  expect(col.auto.css).toMatchSnapshot();
  expect(col.span[4].css).toMatchSnapshot();
});

test("Grid Row Span", () => {
  const row = createUtility("row")
    .use(configHandler(gridRowConfig, "gridRow"))
    .init();

  expect(row.auto.css).toMatchSnapshot();
  expect(row.span[12].css).toMatchSnapshot();
});

test("Grid Column Start", () => {
  const col = createUtility("col")
    .case("start", configHandler(gridColumnStartConfig, "gridColumnStart"))
    .init();

  expect(col.start.auto.css).toMatchSnapshot();
  expect(col.start[4].css).toMatchSnapshot();
});

test("Grid Column End", () => {
  const col = createUtility("col")
    .case("end", configHandler(gridColumnEndConfig, "gridColumnEnd"))
    .init();

  expect(col.end.auto.css).toMatchSnapshot();
  expect(col.end[4].css).toMatchSnapshot();
});

test("Grid Row Start", () => {
  const row = createUtility("row")
    .case("start", configHandler(gridRowStartConfig, "gridRowStart"))
    .init();

  expect(row.start.auto.css).toMatchSnapshot();
  expect(row.start[4].css).toMatchSnapshot();
});

test("Grid Row End", () => {
  const row = createUtility("row")
    .case("end", configHandler(gridRowEndConfig, "gridRowEnd"))
    .init();

  expect(row.end.auto.css).toMatchSnapshot();
  expect(row.end[4].css).toMatchSnapshot();
});

test("Grid Auto Flow", () => {
  const grid = createUtility("grid")
    .case("flow", configHandler(gridAutoFlowConfig, "gridAutoFlow"))
    .init();

  expect(grid.flow.row.css).toMatchSnapshot();
  expect(grid.flow.col.dense.css).toMatchSnapshot();
});

test("Grid Auto Rows/Columns", () => {
  const auto = createUtility("auto")
    .case("rows", configHandler(gridAutoRowsConfig, "gridAutoRows"))
    .case("cols", configHandler(gridAutoColumnsConfig, "gridAutoColumns"))
    .init();

  expect(auto.rows.auto.css).toMatchSnapshot();
  expect(auto.cols.max.css).toMatchSnapshot();
});

test("Gap", () => {
  const gap = createUtility("gap")
    .use(configHandler(spacingConfig, ["gridGap", "gap"]))
    .case("x", configHandler(spacingConfig, [prop`-webkit-column-gap`, prop`-moz-column-gap`, "gridColumnGap", "columnGap"]))
    .case("y", configHandler(spacingConfig, [prop`-webkit-row-gap`, prop`-moz-row-gap`, "gridRowGap", "rowGap"]))
    .init();

  expect(gap[2].css).toMatchSnapshot();
  expect(gap[1.5].css).toMatchSnapshot();
  expect(gap[48].css).toMatchSnapshot();
  expect(gap.x[12].css).toMatchSnapshot();
  expect(gap.y[2.5].css).toMatchSnapshot();
});
