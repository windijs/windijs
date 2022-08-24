import { blurConfig, brightnessConfig, contrastConfig, dropShadowConfig, grayscaleConfig, hueRotateConfig, invertConfig, opacityConfig, saturateConfig, sepiaConfig } from "@windijs/config";
import { buildBackdropFilter, buildFilter, configHandler, createUtility, cssHandler } from "@windijs/core";
import { css, filters } from "@windijs/helpers";

export const filter = createUtility("filter")
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

export const backdrop = createUtility("backdrop")
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

export const blur = createUtility("blur")
  .use(configHandler(blurConfig, v => css({ "--w-blur": `blur(${v})` })))
  .init(filters.blur);

export const brightness = createUtility("brightness")
  .use(configHandler(brightnessConfig, v => css({ "--w-brightness": `brightness(${v})` })))
  .init(filters.brightness);

export const contrast = createUtility("contrast")
  .use(configHandler(contrastConfig, v => css({ "--w-contrast": `contrast(${v})` })))
  .init(filters.contrast);

export const dropShadow = createUtility("dropShadow")
  .use(configHandler(dropShadowConfig, v => css({ "--w-drop-shadow": Array.isArray(v) ? v.map(i => `drop-shadow(${i})`).join(" ") : `drop-shadow(${v})` })))
  .init(filters.dropShadow);

export const grayscale = createUtility("grayscale")
  .use(configHandler(grayscaleConfig, v => css({ "--w-grayscale": `grayscale(${v})` })))
  .init(filters.grayscale);

export const hueRotate = createUtility("hueRotate")
  .use(configHandler(hueRotateConfig, v => css({ "--w-hue-rotate": `hue-rotate(${v})` })))
  .init(filters.hueRotate);

export const invert = createUtility("invert")
  .use(configHandler(invertConfig, v => css({ "--w-invert": `invert(${v})` })))
  .init(filters.invert);

export const saturate = createUtility("saturate")
  .use(configHandler(saturateConfig, v => css({ "--w-saturate": `saturate(${v})` })))
  .init(filters.saturate);

export const sepia = createUtility("sepia")
  .use(configHandler(sepiaConfig, v => css({ "--w-sepia": `sepia(${v})` })))
  .init(filters.sepia);
