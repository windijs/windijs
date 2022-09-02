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
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  "1/12": "8.333333%",
  "2/12": "16.666667%",
  "3/12": "25%",
  "4/12": "33.333333%",
  "5/12": "41.666667%",
  "6/12": "50%",
  "7/12": "58.333333%",
  "8/12": "66.666667%",
  "9/12": "75%",
  "10/12": "83.333333%",
  "11/12": "91.666667%",
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
