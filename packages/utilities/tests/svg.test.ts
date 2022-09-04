import { fill, stroke } from "../src";

test("Fill", () => {
  expect(fill.none.css).toMatchSnapshot();
  expect(fill.transparent.css).toMatchSnapshot();
  expect(fill.current.css).toMatchSnapshot();
  expect(fill.gray[500].css).toMatchSnapshot();
});

test("Stroke", () => {
  expect(stroke.none.css).toMatchSnapshot();
  expect(stroke.transparent.css).toMatchSnapshot();
  expect(stroke.current.css).toMatchSnapshot();
  expect(stroke.blue[500].css).toMatchSnapshot();
  expect(stroke.dash[0].css).toMatchSnapshot();
  expect(stroke.dash[10].css).toMatchSnapshot();
  expect(stroke.offset[10].css).toMatchSnapshot();
  expect(stroke.cap.auto.css).toMatchSnapshot();
  expect(stroke.cap.round.css).toMatchSnapshot();
  expect(stroke.cap.square.css).toMatchSnapshot();
  expect(stroke.join.auto.css).toMatchSnapshot();
  expect(stroke.join.bevel.css).toMatchSnapshot();
  expect(stroke[2].css).toMatchSnapshot();
});
