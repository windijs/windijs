import { range, spacings } from "@windijs/shared";

export const fontFamilyConfig = {
  sans: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "\"Segoe UI\"",
    "Roboto",
    "\"Helvetica Neue\"",
    "Arial",
    "\"Noto Sans\"",
    "sans-serif",
    "\"Apple Color Emoji\"",
    "\"Segoe UI Emoji\"",
    "\"Segoe UI Symbol\"",
    "\"Noto Color Emoji\"",
  ],
  serif: [
    "ui-serif",
    "Georgia",
    "Cambria",
    "\"Times New Roman\"",
    "Times",
    "serif",
  ],
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "\"Liberation Mono\"",
    "\"Courier New\"",
    "monospace",
  ],
};

export const fontStyleConfig = {
  italic: "italic",
  normal: "normal",
};

export const fontSizeConfig = {
  xs: ["0.75rem", { lineHeight: "1rem" }],
  sm: ["0.875rem", { lineHeight: "1.25rem" }],
  base: ["1rem", { lineHeight: "1.5rem" }],
  lg: ["1.125rem", { lineHeight: "1.75rem" }],
  xl: ["1.25rem", { lineHeight: "1.75rem" }],
  "2xl": ["1.5rem", { lineHeight: "2rem" }],
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
  "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
  "5xl": ["3rem", { lineHeight: "1" }],
  "6xl": ["3.75rem", { lineHeight: "1" }],
  "7xl": ["4.5rem", { lineHeight: "1" }],
  "8xl": ["6rem", { lineHeight: "1" }],
  "9xl": ["8rem", { lineHeight: "1" }],
};

export const fontWeightConfig = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

export const hyphensConfig = {
  auto: "auto",
  manual: "manual",
  none: "none",
};

export const letterSpacingConfig = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

export const lineHeightConfig = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
  ...spacings(range(3, 11)),
};

export const tabSizeConfig = {
  DEFAULT: "4",
  0: "0",
  2: "2",
  4: "4",
  8: "8",
};

export const textAlignConfig = {
  left: "left",
  center: "center",
  right: "right",
  justify: "justify",
};

export const verticalAlignConfig = {
  baseline: "baseline",
  top: "top",
  middle: "middle",
  bottom: "bottom",
  textTop: "text-top",
  textBottom: "text-bottom",
};

export const fontVariantNumericConfig = {
  nums: {
    normal: "normal",
    ordinal: "ordinal",
    slashedZero: "slashed-zero",
    lining: "lining-nums",
    oldstyle: "oldstyle-nums",
    proportional: "proportional-nums",
    tabular: "tabular-nums",
  },
  fractions: {
    diagonal: "diagonal-fractions",
    stacked: "stacked-fractions",
  },
};

export const textDecorationTypeConfig = {
  underline: "underline",
  overline: "overline",
  linethrough: "line-through",
  none: "none",
};

export const textDecorationStyleConfig = {
  solid: "solid",
  double: "double",
  dotted: "dotted",
  dashed: "dashed",
  wavy: "wavy",
};

export const textDecorationThicknessConfig = {
  auto: "auto",
  0: "0px",
  1: "1px",
  2: "2px",
  3: "3px",
  4: "4px",
  5: "5px",
  6: "6px",
  7: "7px",
  8: "8px",
};

export const textDecorationOffsetConfig = textDecorationThicknessConfig;

export const textIndentConfig = {
  DEFAULT: "1.5rem",
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "2.5rem",
  xxl: "3rem",
  xxxxl: "4rem",
};

export const textStrokeWidthConfig = {
  DEFAULT: "medium",
  none: "0",
  sm: "thin",
  md: "medium",
  lg: "thick",
};

export const textShadowConfig = {
  DEFAULT: "0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)",
  sm: "1px 1px 3px rgb(36 37 47 / 25%)",
  md: "0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)",
  lg: "3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)",
  xl: "1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)",
  none: "none",
};

export const textTransformConfig = {
  normal: "none",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

export const whiteSpaceConfig = {
  normal: "normal",
  nowrap: "nowrap",
  pre: {
    DEFAULT: "pre",
    line: "pre-line",
    wrap: "pre-wrap",
  },
};

export const writingModeConfig = {
  normal: "horizontal-tb",
  vertical: {
    right: "vertical-rl",
    left: "vertical-lr",
  },
};

export const writingOrientationConfig = {
  mixed: "mixed",
  upright: "upright",
  sideways: "sideways",
};
