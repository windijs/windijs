import { auto, col, gap, grid, row } from "utilities";

test("Grid", () => {
  expect(grid.css).toMatchSnapshot();
  expect(grid.inline.css).toMatchSnapshot();
});

test("Grid Template Columns", () => {
  expect(grid.cols[4].css).toMatchSnapshot();
  expect(grid.cols.none.css).toMatchSnapshot();
});

test("Grid Template Rows", () => {
  expect(grid.rows[4].css).toMatchSnapshot();
  expect(grid.rows.none.css).toMatchSnapshot();
});

test("Grid Column Span", () => {
  expect(col.auto.css).toMatchSnapshot();
  expect(col.span[4].css).toMatchSnapshot();
});

test("Grid Row Span", () => {
  expect(row.auto.css).toMatchSnapshot();
  expect(row.span[12].css).toMatchSnapshot();
});

test("Grid Column Start", () => {
  expect(col.start.auto.css).toMatchSnapshot();
  expect(col.start[4].css).toMatchSnapshot();
});

test("Grid Column End", () => {
  expect(col.end.auto.css).toMatchSnapshot();
  expect(col.end[4].css).toMatchSnapshot();
});

test("Grid Row Start", () => {
  expect(row.start.auto.css).toMatchSnapshot();
  expect(row.start[4].css).toMatchSnapshot();
});

test("Grid Row End", () => {
  expect(row.end.auto.css).toMatchSnapshot();
  expect(row.end[4].css).toMatchSnapshot();
});

test("Grid Auto Flow", () => {
  expect(grid.flow.row.css).toMatchSnapshot();
  expect(grid.flow.col.dense.css).toMatchSnapshot();
});

test("Grid Auto Rows/Columns", () => {
  expect(auto.rows.auto.css).toMatchSnapshot();
  expect(auto.cols.max.css).toMatchSnapshot();
});

test("Gap", () => {
  expect(gap[2].css).toMatchSnapshot();
  expect(gap[1.5].css).toMatchSnapshot();
  expect(gap[48].css).toMatchSnapshot();
  expect(gap.x[12].css).toMatchSnapshot();
  expect(gap.y[2.5].css).toMatchSnapshot();
});
