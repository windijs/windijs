import { baseColors, windiColors } from "colors";
import { colorHandler, configHandler, createUtility, numberHandler } from "core";
import { strokeLineCapConfig, strokeLineJoinConfig } from "config";

import type { StyleObject } from "types";

test("Fill", () => {
  const fill = createUtility("fill").use(colorHandler({ none: "none", ...baseColors, ...windiColors }, "fill")).init();

  expect(fill.none.css).toMatchSnapshot();
  expect(fill.transparent.css).toMatchSnapshot();
  expect(fill.current.css).toMatchSnapshot();
  expect(fill.gray[500].css).toMatchSnapshot();
});

test("Stroke", () => {
  const stroke = createUtility("stroke")
    .use(colorHandler({ none: "none", ...baseColors, ...windiColors }, "stroke"))
    .case("dash", numberHandler<Record<0 | 1 | 2 | 3 | 4 | 5 | 10 | 100, StyleObject>>("strokeDasharray"))
    .case("offset", numberHandler<Record<0 | 1 | 2 | 3 | 4 | 5 | 10 | 100, StyleObject>>("strokeDashoffset"))
    .case("cap", configHandler(strokeLineCapConfig, "strokeLinecap"))
    .case("join", configHandler(strokeLineJoinConfig, "strokeLinejoin"))
    .use(numberHandler<Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, StyleObject>>("strokeWidth"))
    .init();

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
