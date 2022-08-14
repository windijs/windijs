import { rotateConfig, scaleConfig } from "./transform";

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

export const brightnessConfig = scaleConfig;

export const contrastConfig = scaleConfig;

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

export const hueRotateConfig = rotateConfig;

export const invertConfig = grayscaleConfig;

export const saturateConfig = {
  DEFAULT: "0",
  ...scaleConfig,
};

export const sepiaConfig = grayscaleConfig;
