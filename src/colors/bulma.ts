export type BulmaColors = keyof typeof bulmaColors;

export type BulmaThemeColors = keyof typeof bulmaThemeColors;

// Generated colors
// DEFAULT: color
// active: darken(color, 10)
// light: getLightColor(color)
// lightActive: darken(getLightColor(color), 10)
// dark: getDarkColor(color)
// darkActive: lighten(getDarkColor(color), 10)

export const bulmaBlack = {
  DEFAULT: "#0a0a0a",
  invert: "#fff",
  bis: "#121212",
  ter: "#242424",
  active: "#000",
};

export const bulmaGrey = {
  DEFAULT: "#7a7a7a",
  darker: "#363636",
  dark: "#4a4a4a",
  light: "#b5b5b5",
  lighter: "#dbdbdb",
  lightest: "#ededed",
};

export const bulmaWhite = {
  DEFAULT: "#fff",
  invert: "#0a0a0a",
  ter: "#f5f5f5",
  bis: "#fafafa",
  active: "#e6e6e6",
};

export const bulmaOrange = {
  DEFAULT: "#ff470f",
  invert: "#fff",
  active: "#db3300",
  light: {
    DEFAULT: "#ffefeb",
    active: "#ffc6b8",
  },
  dark: {
    DEFAULT: "#d63200",
    active: "#ff430a",
  },
};

export const bulmaYellow = {
  DEFAULT: "#ffe08a",
  invert: "rgba(0, 0, 0, 0.7)",
  active: "#ffd257",
  light: {
    DEFAULT: "#fffaeb",
    active: "#ffecb8",
  },
  dark: {
    DEFAULT: "#946c00",
    active: "#c79200",
  },
};

export const bulmaGreen = {
  DEFAULT: "#48c78e",
  invert: "#fff",
  active: "#34a873",
  light: {
    DEFAULT: "#effaf5",
    active: "#c8eedd",
  },
  dark: {
    DEFAULT: "#257953",
    active: "#31a06e",
  },
};

export const bulmaTurquoise = {
  DEFAULT: "#00d1b2",
  invert: "#fff",
  active: "#009e86",
  light: {
    DEFAULT: "#ebfffc",
    active: "#b8fff4",
  },
  dark: {
    DEFAULT: "#00947e",
    active: "#00c7a9",
  },
};

export const bulmaCyan = {
  DEFAULT: "#3e8ed0",
  invert: "#fff",
  active: "#2b74b1",
  light: {
    DEFAULT: "#eff5fb",
    active: "#c6ddf1",
  },
  dark: {
    DEFAULT: "#296fa8",
    active: "#368ace",
  },
};

export const bulmaBlue = {
  DEFAULT: "#485fc7",
  invert: "#fff",
  active: "#3449a8",
  light: {
    DEFAULT: "#eff1fa",
    active: "#c8cfee",
  },
  dark: {
    DEFAULT: "#3850b7",
    active: "#576dcb",
  },
};

export const bulmaPurple = {
  DEFAULT: "#b86bff",
  invert: "#fff",
  active: "#a038ff",
  light: {
    DEFAULT: "#f5ebff",
    active: "#ddb8ff",
  },
  dark: {
    DEFAULT: "#6700c7",
    active: "#8200fa",
  },
};

export const bulmaRed = {
  DEFAULT: "#f14668",
  invert: "#fff",
  active: "#ee1742",
  light: {
    DEFAULT: "#feecf0",
    active: "#fabdc9",
  },
  dark: {
    DEFAULT: "#cc0f35",
    active: "#ee2049",
  },
};

export const bulmaLight = {
  DEFAULT: "#f5f5f5", // white-ter
  invert: "#363636", // grey-darker
  active: "#dbdbdb",
};

export const bulmaDark = {
  DEFAULT: "#363636", // grey-darker
  invert: "#f5f5f5", // white-ter
  active: "#1c1c1c",
};

export const bulmaColors = {
  black: bulmaBlack,
  grey: bulmaGrey,
  white: bulmaWhite,
  orange: bulmaOrange,
  yellow: bulmaYellow,
  green: bulmaGreen,
  turquoise: bulmaTurquoise,
  cyan: bulmaCyan,
  blue: bulmaBlue,
  purple: bulmaPurple,
  red: bulmaRed,
};

export const bulmaThemeColors = {
  primary: bulmaTurquoise,
  info: bulmaCyan,
  success: bulmaGreen,
  warning: bulmaYellow,
  danger: bulmaRed,
  link: bulmaBlue,
  light: bulmaLight,
  dark: bulmaDark,
};
