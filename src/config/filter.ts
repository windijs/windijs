import { opacityConfig } from "./opacity";

export const blurConfig = {
  DEFAULT: "8px",
  0: "0",
  sm: "4px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px",
};

export const brightnessConfig = {
  0: "0",
  50: ".5",
  75: ".75",
  90: ".9",
  95: ".95",
  100: "1",
  105: "1.05",
  110: "1.1",
  125: "1.25",
  150: "1.5",
  200: "2",
};

export const contrastConfig = brightnessConfig;

export const dropShadowConfig = {
  DEFAULT: ["0 1px 2px rgba(0, 0, 0, 0.1)", "0 1px 1px rgba(0, 0, 0, 0.06)"],
  sm: "0 1px 1px rgba(0, 0, 0, 0.05)",
  md: ["0 4px 3px rgba(0, 0, 0, 0.07)", "0 2px 2px rgba(0, 0, 0, 0.06)"],
  lg: ["0 10px 8px rgba(0, 0, 0, 0.04)", "0 4px 3px rgba(0, 0, 0, 0.1)"],
  xl: ["0 20px 13px rgba(0, 0, 0, 0.03)", "0 8px 5px rgba(0, 0, 0, 0.08)"],
  "2xl": "0 25px 25px rgba(0, 0, 0, 0.15)",
  none: "0 0 #0000",
};

export const grayscaleConfig = {
  DEFAULT: "100%",
  ...opacityConfig,
};

export const hueRotateConfig = {
  "-180": "-180deg",
  "-90": "-90deg",
  "-60": "-60deg",
  "-30": "-30deg",
  "-15": "-15deg",
  0: "0deg",
  15: "15deg",
  30: "30deg",
  60: "60deg",
  90: "90deg",
  180: "180deg",
};

export const invertConfig = grayscaleConfig;

export const saturateConfig = {
  DEFAULT: "0",
  ...brightnessConfig,
};

export const sepiaConfig = grayscaleConfig;
