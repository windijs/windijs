import { blurConfig, brightnessConfig, contrastConfig, dropShadowConfig, grayscaleConfig, hueRotateConfig, invertConfig, opacityConfig, saturateConfig, sepiaConfig } from "config";
import { buildBackdropFilter, buildFilter, configHandler, createUtility, cssHandler } from "utilities";
import { css, deg, filters, percent, px, rem, rgba } from "helpers";

test("Blur", () => {
  const blur = createUtility("blur")
    .use(configHandler(blurConfig, v => css({ "--w-blur": `blur(${v})` })))
    .init(filters.blur);

  expect(blur.css).toMatchSnapshot();
  expect(blur.sm.css).toMatchSnapshot();
  expect(blur.lg.css).toMatchSnapshot();
  expect(blur(rem[0.5])).toEqual("blur(0.5rem)");
});

test("Brightness", () => {
  const brightness = createUtility("brightness")
    .use(configHandler(brightnessConfig, v => css({ "--w-brightness": `brightness(${v})` })))
    .init(filters.brightness);

  expect(brightness[100].css).toMatchSnapshot();
  expect(brightness[75].css).toMatchSnapshot();
  expect(brightness(0.8)).toEqual("brightness(0.8)");
});

test("Contrast", () => {
  const contrast = createUtility("contrast")
    .use(configHandler(contrastConfig, v => css({ "--w-contrast": `contrast(${v})` })))
    .init(filters.contrast);

  expect(contrast[100].css).toMatchSnapshot();
  expect(contrast[75].css).toMatchSnapshot();
  expect(contrast(0.8)).toEqual("contrast(0.8)");
});

test("Drop Shadow", () => {
  const dropShadow = createUtility("dropShadow")
    .use(configHandler(dropShadowConfig, v => css({ "--w-drop-shadow": Array.isArray(v) ? v.map(i => `drop-shadow(${i})`).join(" ") : `drop-shadow(${v})` })))
    .init(filters.dropShadow);

  expect(dropShadow.css).toMatchSnapshot();
  expect(dropShadow.sm.css).toMatchSnapshot();
  expect(dropShadow.xl.css).toMatchSnapshot();
  expect(dropShadow(0, px[4], px[3], rgba(0, 0, 0, 0.07))).toEqual("drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))");
});

test("Grayscale", () => {
  const grayscale = createUtility("grayscale")
    .use(configHandler(grayscaleConfig, v => css({ "--w-grayscale": `grayscale(${v})` })))
    .init(filters.grayscale);

  expect(grayscale.css).toMatchSnapshot();
  expect(grayscale[10].css).toMatchSnapshot();
  expect(grayscale[75].css).toMatchSnapshot();
  expect(grayscale(0.5)).toEqual("grayscale(0.5)");
});

test("Hue Rotate", () => {
  const hueRotate = createUtility("hueRotate")
    .use(configHandler(hueRotateConfig, v => css({ "--w-hue-rotate": `hue-rotate(${v})` })))
    .init(filters.hueRotate);

  expect(hueRotate[-30].css).toMatchSnapshot();
  expect(hueRotate[60].css).toMatchSnapshot();
  expect(hueRotate(deg[25])).toEqual("hue-rotate(25deg)");
});

test("Invert", () => {
  const invert = createUtility("invert")
    .use(configHandler(invertConfig, v => css({ "--w-invert": `invert(${v})` })))
    .init(filters.invert);

  expect(invert.css).toMatchSnapshot();
  expect(invert[20].css).toMatchSnapshot();
  expect(invert[50].css).toMatchSnapshot();
  expect(invert(0.35)).toEqual("invert(0.35)");
});

test("Saturate", () => {
  const saturate = createUtility("saturate")
    .use(configHandler(saturateConfig, v => css({ "--w-saturate": `saturate(${v})` })))
    .init(filters.saturate);

  expect(saturate.css).toMatchSnapshot();
  expect(saturate[75].css).toMatchSnapshot();
  expect(saturate[50].css).toMatchSnapshot();
  expect(saturate(0.35)).toEqual("saturate(0.35)");
});

test("Sepia", () => {
  const sepia = createUtility("sepia")
    .use(configHandler(sepiaConfig, v => css({ "--w-sepia": `sepia(${v})` })))
    .init(filters.sepia);

  expect(sepia.css).toMatchSnapshot();
  expect(sepia[20].css).toMatchSnapshot();
  expect(sepia[50].css).toMatchSnapshot();
  expect(sepia(0.35)).toEqual("sepia(0.35)");
});

test("Filter", () => {
  const filter = createUtility("filter")
    .use(cssHandler({
      "--w-blur": "var(--w-empty,/*!*/ /*!*/)",
      "--w-brightness": "var(--w-empty,/*!*/ /*!*/)",
      "--w-contrast": "var(--w-empty,/*!*/ /*!*/)",
      "--w-grayscale": "var(--w-empty,/*!*/ /*!*/)",
      "--w-hue-rotate": "var(--w-empty,/*!*/ /*!*/)",
      "--w-invert": "var(--w-empty,/*!*/ /*!*/)",
      "--w-saturate": "var(--w-empty,/*!*/ /*!*/)",
      "--w-sepia": "var(--w-empty,/*!*/ /*!*/)",
      "--w-drop-shadow": "var(--w-empty,/*!*/ /*!*/)",
      "-webkit-filter": "var(--w-blur) var(--w-brightness) var(--w-contrast) var(--w-grayscale) var(--w-hue-rotate) var(--w-invert) var(--w-saturate) var(--w-sepia) var(--w-drop-shadow)",
      filter: "var(--w-blur) var(--w-brightness) var(--w-contrast) var(--w-grayscale) var(--w-hue-rotate) var(--w-invert) var(--w-saturate) var(--w-sepia) var(--w-drop-shadow)",
    }))
    .init(buildFilter);

  const blur = createUtility("blur")
    .use(configHandler(blurConfig, v => css({ "--w-blur": `blur(${v})` })))
    .init(filters.blur);

  const brightness = createUtility("brightness")
    .use(configHandler(brightnessConfig, v => css({ "--w-brightness": `brightness(${v})` })))
    .init(filters.brightness);

  expect(filter(blur(px[3]), brightness(percent[10])).css).toMatchSnapshot();

  expect(filter(blur.lg, brightness[50]).css).toMatchSnapshot();

  expect([filter.css, blur.lg.css, brightness[75].css]).toMatchSnapshot();
});

test("Backdrop Filter", () => {
  const backdrop = createUtility("backdrop")
    .use(cssHandler({
      "--w-backdrop-blur": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-brightness": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-contrast": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-grayscale": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-hue-rotate": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-invert": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-opacity": "var(--tw-empty,/*!*/ /*!*/)",
      "--w-backdrop-saturate": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-sepia": "var(--w-empty,/*!*/ /*!*/)",
      "-webkit-backdrop-filter": "var(--w-backdrop-blur) var(--w-backdrop-brightness) var(--w-backdrop-contrast) var(--w-backdrop-grayscale) var(--w-backdrop-hue-rotate) var(--w-backdrop-invert) var(--w-backdrop-opacity) var(--w-backdrop-saturate) var(--w-backdrop-sepia)",
      backdropFilter: "var(--w-backdrop-blur) var(--w-backdrop-brightness) var(--w-backdrop-contrast) var(--w-backdrop-grayscale) var(--w-backdrop-hue-rotate) var(--w-backdrop-invert) var(--w-backdrop-opacity) var(--w-backdrop-saturate) var(--w-backdrop-sepia)",
    }))
    .case("blur", configHandler(blurConfig, v => css({ "--w-backdrop-blur": `blur(${v})` })))
    .case("brightness", configHandler(brightnessConfig, v => css({ "--w-backdrop-brightness": `brightness(${v})` })))
    .case("contrast", configHandler(contrastConfig, v => css({ "--w-backdrop-contrast": `contrast(${v})` })))
    .case("grayscale", configHandler(grayscaleConfig, v => css({ "--w-backdrop-grayscale": `grayscale(${v})` })))
    .case("hueRotate", configHandler(hueRotateConfig, v => css({ "--w-backdrop-hue-rotate": `hue-rotate(${v})` })))
    .case("invert", configHandler(invertConfig, v => css({ "--w-backdrop-invert": `invert(${v})` })))
    .case("opacity", configHandler(opacityConfig, v => css({ "--w-backdrop-opacity": `opacity(${v})` })))
    .case("saturate", configHandler(saturateConfig, v => css({ "--w-backdrop-saturate": `saturate(${v})` })))
    .case("sepia", configHandler(sepiaConfig, v => css({ "--w-backdrop-sepia": `sepia(${v})` })))
    .init(buildBackdropFilter);

  const blur = createUtility("blur")
    .use(configHandler(blurConfig, v => css({ "--w-blur": `blur(${v})` })))
    .init(filters.blur);

  const brightness = createUtility("brightness")
    .use(configHandler(brightnessConfig, v => css({ "--w-brightness": `brightness(${v})` })))
    .init(filters.brightness);

  expect(backdrop(blur(px[3]), brightness(percent[10])).css).toMatchSnapshot();

  expect(backdrop(blur.lg, brightness[50]).css).toMatchSnapshot();

  expect([backdrop.css, backdrop.blur.lg.css, backdrop.brightness[75].css]).toMatchSnapshot();
});
