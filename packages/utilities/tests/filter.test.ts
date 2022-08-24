import { backdrop, blur, brightness, contrast, dropShadow, filter, grayscale, hueRotate, invert, saturate, sepia } from "../src/filters";
import { deg, percent, px, rem, rgba } from "@windijs/helpers";

test("Blur", () => {
  expect(blur.css).toMatchSnapshot();
  expect(blur.sm.css).toMatchSnapshot();
  expect(blur.lg.css).toMatchSnapshot();
  expect(blur(rem[0.5])).toEqual("blur(0.5rem)");
});

test("Brightness", () => {
  expect(brightness[100].css).toMatchSnapshot();
  expect(brightness[75].css).toMatchSnapshot();
  expect(brightness(0.8)).toEqual("brightness(0.8)");
});

test("Contrast", () => {
  expect(contrast[100].css).toMatchSnapshot();
  expect(contrast[75].css).toMatchSnapshot();
  expect(contrast(0.8)).toEqual("contrast(0.8)");
});

test("Drop Shadow", () => {
  expect(dropShadow.css).toMatchSnapshot();
  expect(dropShadow.sm.css).toMatchSnapshot();
  expect(dropShadow.xl.css).toMatchSnapshot();
  expect(dropShadow(0, px[4], px[3], rgba(0, 0, 0, 0.07))).toEqual("drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))");
});

test("Grayscale", () => {
  expect(grayscale.css).toMatchSnapshot();
  expect(grayscale[10].css).toMatchSnapshot();
  expect(grayscale[75].css).toMatchSnapshot();
  expect(grayscale(0.5)).toEqual("grayscale(0.5)");
});

test("Hue Rotate", () => {
  expect(hueRotate[-30].css).toMatchSnapshot();
  expect(hueRotate[60].css).toMatchSnapshot();
  expect(hueRotate(deg[25])).toEqual("hue-rotate(25deg)");
});

test("Invert", () => {
  expect(invert.css).toMatchSnapshot();
  expect(invert[20].css).toMatchSnapshot();
  expect(invert[50].css).toMatchSnapshot();
  expect(invert(0.35)).toEqual("invert(0.35)");
});

test("Saturate", () => {
  expect(saturate.css).toMatchSnapshot();
  expect(saturate[75].css).toMatchSnapshot();
  expect(saturate[50].css).toMatchSnapshot();
  expect(saturate(0.35)).toEqual("saturate(0.35)");
});

test("Sepia", () => {
  expect(sepia.css).toMatchSnapshot();
  expect(sepia[20].css).toMatchSnapshot();
  expect(sepia[50].css).toMatchSnapshot();
  expect(sepia(0.35)).toEqual("sepia(0.35)");
});

test("Filter", () => {
  expect(filter(blur(px[3]), brightness(percent[10])).css).toMatchSnapshot();

  expect(filter(blur.lg, brightness[50]).css).toMatchSnapshot();

  expect([filter.css, blur.lg.css, brightness[75].css]).toMatchSnapshot();
});

test("Backdrop Filter", () => {
  expect(backdrop(blur(px[3]), brightness(percent[10])).css).toMatchSnapshot();

  expect(backdrop(blur.lg, brightness[50]).css).toMatchSnapshot();

  expect([backdrop.css, backdrop.blur.lg.css, backdrop.brightness[75].css]).toMatchSnapshot();
});
