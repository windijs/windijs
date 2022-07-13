import { calcRgba, hexToRgb, hexToRgba, sliceColor } from "../../src/utils";

test("calcRgba", () => {
  expect(calcRgba("#1CF")).toEqual([17, 204, 255, 1]);
  expect(calcRgba("#1CF0")).toEqual([17, 204, 255, 0]);
  expect(calcRgba("#1C1C1E")).toEqual([28, 28, 30, 1]);
  expect(calcRgba("#1C1C1E80")).toEqual([28, 28, 30, 0.5]);
});

test("hexToRgb", () => {
  expect(hexToRgb("#1CF")).toEqual("rgb(17, 204, 255)");
  expect(hexToRgb("#1CF0")).toEqual("rgb(17, 204, 255)");
  expect(hexToRgb("#1C1C1E")).toEqual("rgb(28, 28, 30)");
  expect(hexToRgb("#1C1C1E80")).toEqual("rgb(28, 28, 30)");
});

test("hexToRgba", () => {
  expect(hexToRgba("#1CF")).toEqual("rgba(17, 204, 255, 1)");
  expect(hexToRgba("#1CF0")).toEqual("rgba(17, 204, 255, 0)");
  expect(hexToRgba("#1C1C1E")).toEqual("rgba(28, 28, 30, 1)");
  expect(hexToRgba("#1C1C1E80")).toEqual("rgba(28, 28, 30, 0.5)");
});

test("sliceColor", () => {
  expect(sliceColor("rgb(17, 204, 255)")).toEqual(["17", "204", "255"]);
  expect(sliceColor("rgba(28, 28, 30, 0.5)")).toEqual(["28", "28", "30", "0.5"]);
  expect(sliceColor("hwb(194 0% 0%)")).toEqual(["194", "0%", "0%"]);
  expect(sliceColor("hwb(194 0% 0% / .5)")).toEqual(["194", "0%", "0%", ".5"]);
});
