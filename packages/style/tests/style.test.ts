import { createUtility } from "@windi/core";
import { percent } from "@windi/helpers";
import { stylePropertyHandler } from "../src/handler";
import { windiColors } from "@windi/colors";

const style = createUtility("style").use(stylePropertyHandler()).init();

test("style with color entry", () => {
  expect(style.backgroundColor.aliceblue.css).toMatchSnapshot();
  expect(style.backgroundColor.rgba(22, 22, 22, 0.5).css).toMatchSnapshot();
  expect(style.borderColor.hsl(10, percent[10], percent[20]).css).toMatchSnapshot();
  expect(style.color.hwb(10, percent[10], percent[20], 0.2).css).toMatchSnapshot();
  expect(style.borderColor.azure.css).toMatchSnapshot();
});

test("style with string entry", () => {
  expect(style.content.quote("Hello World").css).toMatchSnapshot();
});

test("style with url entry", () => {
  expect(style.background.url("https://example.com/test.png").css).toMatchSnapshot();
});

test("style with length entry", () => {
  expect(style.width.rem[1.5].css).toMatchSnapshot();
  expect(style.width.px[3].css).toMatchSnapshot();
  expect(style.width.cm[3].css).toMatchSnapshot();
  expect(style.width.mm[4].css).toMatchSnapshot();
  expect(style.width.Q[5].css).toMatchSnapshot();
  expect(style.width.in[6].css).toMatchSnapshot();
});

test("style with percentage entry", () => {
  expect(style.width.fr[2].css).toMatchSnapshot();
  expect(style.width.percent[10].css).toMatchSnapshot();
});

test("style with angle entry", () => {
  expect(style.imageOrientation.deg[30].css).toMatchSnapshot();
  expect(style.imageOrientation.turn[30].css).toMatchSnapshot();
  expect(style.imageOrientation.rad[30].css).toMatchSnapshot();
  expect(style.imageOrientation.grad[30].css).toMatchSnapshot();
});

test("style with number entry", () => {
  expect(style.lineHeight[5].css).toMatchSnapshot();
  expect(style.lineHeight[5.5].css).toMatchSnapshot();
});

test("style with integer entry", () => {
  expect(style.order[3].css).toMatchSnapshot();
});

test("style with alpha entry", () => {
  expect(style.fillOpacity["0.5"].css).toMatchSnapshot();
  expect(style.fillOpacity["0.52"].css).toMatchSnapshot();
});

test("style with time entry", () => {
  expect(style.transitionDelay.ms[300].css).toMatchSnapshot();
  expect(style.transitionDelay.s[3].css).toMatchSnapshot();
});

test("style with image entry", () => {
  // TODO: turn image() into a function
  expect(style.background["image()"].css).toMatchSnapshot();
});

test("style with position entry", () => {
  expect(style.backgroundPosition.bottom.css).toMatchSnapshot();
  expect(style.backgroundPosition.center.css).toMatchSnapshot();
  expect(style.backgroundPosition.left.css).toMatchSnapshot();
});

test("style with repeat entry", () => {
  expect(style.backgroundRepeat["repeat-x"].css).toMatchSnapshot();
  expect(style.backgroundRepeat["no-repeat"].css).toMatchSnapshot();
});

test("style with line-width entry", () => {
  expect(style.border.medium.css).toMatchSnapshot();
  expect(style.border.thick.css).toMatchSnapshot();
  expect(style.border.thin.css).toMatchSnapshot();
});

test("style with line-style entry", () => {
  expect(style.border.solid.css).toMatchSnapshot();
  expect(style.border.dashed.css).toMatchSnapshot();
  expect(style.border.hidden.css).toMatchSnapshot();
  expect(style.border.none.css).toMatchSnapshot();
});

test("style with shape entry", () => {
  expect(style.clipPath.circle("closest-side", percent[40]).css).toMatchSnapshot();
  expect(style.clipPath.ellipse("closest-side", "closest-side", percent[10]).css).toMatchSnapshot();
});

test("style with box entry", () => {
  expect(style.background["border-box"].css).toMatchSnapshot();
  expect(style.background["content-box"].css).toMatchSnapshot();
});

test("style with geometry-box entry", () => {
  expect(style.clipPath["margin-box"].css).toMatchSnapshot();
  expect(style.clipPath["stroke-box"].css).toMatchSnapshot();
});

test("style with timing-function entry", () => {
  expect(style.transitionTimingFunction["cubic-bezier(0.075, 0.82, 0.165, 1)"].css).toMatchSnapshot();
  expect(style.transitionTimingFunction.ease.css).toMatchSnapshot();
  expect(style.transitionTimingFunction.steps(3).css).toMatchSnapshot();
  expect(style.transitionTimingFunction.cubicBezier(0.075, 0.82, 0.165, 1).css).toMatchSnapshot();
});

test("style with wide entry", () => {
  expect(style.width.calc("100% - 1rem").css).toMatchSnapshot();
  expect(style.outlineColor.var("w-outline-color", "blue").css).toMatchSnapshot();
});

test("style with string", () => {
  expect(style.fontSize["1rem"].css).toMatchSnapshot();
  expect(style.borderColor["rgb(22, 22, 22)"].css).toMatchSnapshot();
});

test("style with config", () => {
  const style = createUtility("style").use(stylePropertyHandler({ backgroundColor: windiColors, willChange: { scroll: "scroll-position", transform: "transform" } })).init();

  expect(style.willChange.scroll.css).toMatchSnapshot();
  expect(style.willChange.transform.css).toMatchSnapshot();
  expect(style.backgroundColor.red[500].css).toMatchSnapshot();
  expect(style.backgroundColor.blue[300].meta).toMatchSnapshot();
  expect(style.fontSize["1rem"].meta).toMatchSnapshot();
  expect(style.width.calc("100% - 1rem").meta).toMatchSnapshot();
  expect(style.clipPath.ellipse("closest-side", "closest-side", percent[10]).meta).toMatchSnapshot();
  expect(style.fontSize.em[2].meta).toMatchSnapshot();
});
