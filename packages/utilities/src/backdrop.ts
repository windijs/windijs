import {
  blurConfig,
  brightnessConfig,
  contrastConfig,
  grayscaleConfig,
  hueRotateConfig,
  invertConfig,
  opacityConfig,
  saturateConfig,
  sepiaConfig,
} from "@windijs/config";
import { buildBackdropFilter, configHandler, createUtility, cssHandler } from "@windijs/core";
import { css } from "@windijs/helpers";

export default createUtility("backdrop")
  .use(
    cssHandler({
      "--w-backdrop-blur": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-brightness": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-contrast": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-grayscale": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-hue-rotate": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-invert": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-opacity": "var(--tw-empty,/*!*/ /*!*/)",
      "--w-backdrop-saturate": "var(--w-empty,/*!*/ /*!*/)",
      "--w-backdrop-sepia": "var(--w-empty,/*!*/ /*!*/)",
      "-webkit-backdrop-filter":
        "var(--w-backdrop-blur) var(--w-backdrop-brightness) var(--w-backdrop-contrast) var(--w-backdrop-grayscale) var(--w-backdrop-hue-rotate) var(--w-backdrop-invert) var(--w-backdrop-opacity) var(--w-backdrop-saturate) var(--w-backdrop-sepia)",
      backdropFilter:
        "var(--w-backdrop-blur) var(--w-backdrop-brightness) var(--w-backdrop-contrast) var(--w-backdrop-grayscale) var(--w-backdrop-hue-rotate) var(--w-backdrop-invert) var(--w-backdrop-opacity) var(--w-backdrop-saturate) var(--w-backdrop-sepia)",
    })
  )
  .case(
    "blur",
    configHandler(blurConfig, v => css({ "--w-backdrop-blur": `blur(${v})` }))
  )
  .case(
    "brightness",
    configHandler(brightnessConfig, v => css({ "--w-backdrop-brightness": `brightness(${v})` }))
  )
  .case(
    "contrast",
    configHandler(contrastConfig, v => css({ "--w-backdrop-contrast": `contrast(${v})` }))
  )
  .case(
    "grayscale",
    configHandler(grayscaleConfig, v => css({ "--w-backdrop-grayscale": `grayscale(${v})` }))
  )
  .case(
    "hueRotate",
    configHandler(hueRotateConfig, v => css({ "--w-backdrop-hue-rotate": `hue-rotate(${v})` }))
  )
  .case(
    "invert",
    configHandler(invertConfig, v => css({ "--w-backdrop-invert": `invert(${v})` }))
  )
  .case(
    "opacity",
    configHandler(opacityConfig, v => css({ "--w-backdrop-opacity": `opacity(${v})` }))
  )
  .case(
    "saturate",
    configHandler(saturateConfig, v => css({ "--w-backdrop-saturate": `saturate(${v})` }))
  )
  .case(
    "sepia",
    configHandler(sepiaConfig, v => css({ "--w-backdrop-sepia": `sepia(${v})` }))
  )
  .init(buildBackdropFilter);
