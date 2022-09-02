import { fractionConfig, negativeSpacingConfig, spacingConfig } from "./spacing";

export const justifyContentConfig = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

export const justifyItemsConfig = {
  auto: "auto",
  start: "start",
  end: "end",
  center: "center",
  stretch: "stretch",
};

export const justifySelfConfig = justifyItemsConfig;

export const alignContentConfig = justifyContentConfig;

export const alignItemsConfig = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  baseline: "baseline",
  stretch: "stretch",
};

export const alignSelfConfig = {
  auto: "auto",
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
};

export const placeContentConfig = {
  start: "start",
  end: "end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
};

export const placeItemsConfig = justifyItemsConfig;

export const placeSelfConfig = justifyItemsConfig;

export const insetConfig = {
  auto: "auto",
  ...spacingConfig,
  ...negativeSpacingConfig,
  ...fractionConfig,
};

export const objectFitConfig = {
  contain: "contain",
  cover: "cover",
  fill: "fill",
  none: "none",
  "scale-down": "scale-down",
};

export const positionConfig = {
  bottom: {
    DEFAULT: "bottom",
    left: "left bottom",
    right: "right bottom",
  },
  center: "center",
  left: {
    DEFAULT: "left",
    top: "left top",
    bottom: "left bottom",
  },
  right: {
    DEFAULT: "right",
    top: "right top",
    bottom: "right bottom",
  },
  top: {
    DEFAULT: "top",
    left: "left top",
    right: "right top",
  },
};

export const objectPositionConfig = positionConfig;

export const zIndexConfig = {
  auto: "auto",
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
};
