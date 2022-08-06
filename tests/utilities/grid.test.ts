import { createUtility, gapUtility, gapXUtility, gapYUtility, gridAutoColumnsUtility, gridAutoFlowUtility, gridAutoRowsUtility, gridColumnEndUtility, gridColumnStartUtility, gridColumnUtility, gridRowEndUtility, gridRowStartUtility, gridRowUtility, gridTemplateColumnsUtility, gridTemplateRowsUtility, gridUtility, inlineGridUtility } from "utilities";
import { gridAutoColumnsConfig, gridAutoFlowConfig, gridAutoRowsConfig, gridColumnConfig, gridColumnEndConfig, gridColumnStartConfig, gridRowConfig, gridRowEndConfig, gridRowStartConfig, gridTemplateColumnsConfig, gridTemplateRowsConfig, spacingConfig } from "config";

test("Grid", () => {
  const grid = createUtility("grid")
    .use(gridUtility())
    .case("inline", inlineGridUtility())
    .init();

  expect(grid.css).toMatchSnapshot();
  expect(grid.inline.css).toMatchSnapshot();
});

test("Grid Template Columns", () => {
  const grid = createUtility("grid")
    .case("cols", gridTemplateColumnsUtility(gridTemplateColumnsConfig))
    .init();

  expect(grid.cols[4].css).toMatchSnapshot();
  expect(grid.cols.none.css).toMatchSnapshot();
});

test("Grid Template Rows", () => {
  const grid = createUtility("grid")
    .case("rows", gridTemplateRowsUtility(gridTemplateRowsConfig))
    .init();

  expect(grid.rows[4].css).toMatchSnapshot();
  expect(grid.rows.none.css).toMatchSnapshot();
});

test("Grid Column Span", () => {
  const col = createUtility("col")
    .use(gridColumnUtility(gridColumnConfig))
    .init();

  expect(col.auto.css).toMatchSnapshot();
  expect(col.span[4].css).toMatchSnapshot();
});

test("Grid Row Span", () => {
  const row = createUtility("row")
    .use(gridRowUtility(gridRowConfig))
    .init();

  expect(row.auto.css).toMatchSnapshot();
  expect(row.span[12].css).toMatchSnapshot();
});

test("Grid Column Start", () => {
  const col = createUtility("col")
    .case("start", gridColumnStartUtility(gridColumnStartConfig))
    .init();

  expect(col.start.auto.css).toMatchSnapshot();
  expect(col.start[4].css).toMatchSnapshot();
});

test("Grid Column End", () => {
  const col = createUtility("col")
    .case("end", gridColumnEndUtility(gridColumnEndConfig))
    .init();

  expect(col.end.auto.css).toMatchSnapshot();
  expect(col.end[4].css).toMatchSnapshot();
});

test("Grid Row Start", () => {
  const row = createUtility("row")
    .case("start", gridRowStartUtility(gridRowStartConfig))
    .init();

  expect(row.start.auto.css).toMatchSnapshot();
  expect(row.start[4].css).toMatchSnapshot();
});

test("Grid Row End", () => {
  const row = createUtility("row")
    .case("end", gridRowEndUtility(gridRowEndConfig))
    .init();

  expect(row.end.auto.css).toMatchSnapshot();
  expect(row.end[4].css).toMatchSnapshot();
});

test("Grid Auto Flow", () => {
  const grid = createUtility("grid")
    .case("flow", gridAutoFlowUtility(gridAutoFlowConfig))
    .init();

  expect(grid.flow.row.css).toMatchSnapshot();
  expect(grid.flow.col.dense.css).toMatchSnapshot();
});

test("Grid Auto Rows/Columns", () => {
  const auto = createUtility("auto")
    .case("rows", gridAutoRowsUtility(gridAutoRowsConfig))
    .case("cols", gridAutoColumnsUtility(gridAutoColumnsConfig))
    .init();

  expect(auto.rows.auto.css).toMatchSnapshot();
  expect(auto.cols.max.css).toMatchSnapshot();
});

test("Gap", () => {
  const gap = createUtility("gap")
    .use(gapUtility(spacingConfig))
    .case("x", gapXUtility(spacingConfig))
    .case("y", gapYUtility(spacingConfig))
    .init();

  expect(gap[2].css).toMatchSnapshot();
  expect(gap[1.5].css).toMatchSnapshot();
  expect(gap[48].css).toMatchSnapshot();
  expect(gap.x[12].css).toMatchSnapshot();
  expect(gap.y[2.5].css).toMatchSnapshot();
});
