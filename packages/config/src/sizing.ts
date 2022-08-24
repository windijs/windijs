import { fractions } from "@windijs/shared";
import { spacingConfig } from "./spacing";

export const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1536px",
};

export const orientations = {
  portrait: "portrait",
  landscape: "landscape",
};

export const motions = {
  motionSafe: "no-preference",
  motionReduce: "reduce",
};

export const tShirtScale = {
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
};

const spaceCommonConfig = {
  ...spacingConfig,
  ...tShirtScale,
  ...fractions(2, 7),
  ...fractions(12, 13),
  full: "100%",
  content: {
    min: "min-content",
    max: "max-content",
  },
  prose: "65ch",
};

export const widthConfig = {
  auto: "auto",
  ...spaceCommonConfig,
  screen: {
    DEFAULT: "100vw",
    ...screens,
  },
};

export const heightConfig = {
  none: "none",
  ...spaceCommonConfig,
  screen: {
    DEFAULT: "100vh",
    ...screens,
  },
};
