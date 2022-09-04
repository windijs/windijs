import { buildFilter, createUtility, cssHandler } from "@windijs/core";

export default createUtility("filter")
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
