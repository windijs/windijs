import { fractionConfig, negativeSpacingConfig, spacingConfig } from "./spacing";

import { positionConfig } from "./positioning";
import { tShirtScale } from "./sizing";

export const degreeConfig = {
  0: "0deg",
  1: "1deg",
  2: "2deg",
  3: "3deg",
  6: "6deg",
  12: "12deg",
  15: "15deg",
  30: "30deg",
  45: "45deg",
  60: "60deg",
  90: "90deg",
  120: "120deg",
  145: "145deg",
  160: "160deg",
  180: "180deg",
};

export const rotateConfig = {
  ...degreeConfig,
  "-180": "-180deg",
  "-160": "-160deg",
  "-145": "-145deg",
  "-120": "-120deg",
  "-90": "-90deg",
  "-60": "-60deg",
  "-45": "-45deg",
  "-30": "-30deg",
  "-15": "-15deg",
  "-12": "-12deg",
  "-6": "-6deg",
  "-3": "-3deg",
  "-2": "-2deg",
  "-1": "-1deg",
};

export const scaleConfig = {
  0: "0",
  30: ".3",
  45: ".45",
  50: ".5",
  60: ".6",
  75: ".75",
  90: ".9",
  95: ".95",
  100: "1",
  105: "1.05",
  110: "1.1",
  125: "1.25",
  150: "1.5",
};

export const skewConfig = rotateConfig;

export const translateConfig = {
  ...spacingConfig,
  ...negativeSpacingConfig,
  ...fractionConfig,
};

export const transformOriginConfig = positionConfig;

export const transformStyleConfig = {
  flat: "flat",
  box: "preserve-3d",
};

export const perspectiveConfig = {
  none: "none",
  ...tShirtScale,
  ...spacingConfig,
};

export const perspectiveOriginConfig = positionConfig;
