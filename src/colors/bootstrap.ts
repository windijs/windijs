export type BootstrapColors = keyof typeof bootstrapColors;

export type BootstrapThemeColors = keyof typeof bootstrapThemeColors;

export const bootstrapBlue = {
  DEFAULT: "#007bff",
  active: "#0062cc",
  100: "#cfe2ff",
  200: "#9ec5fe",
  300: "#6ea8fe",
  400: "#3d8bfd",
  500: "#0d6efd",
  600: "#0a58ca",
  700: "#084298",
  800: "#052c65",
  900: "#031633",
};

export const bootstrapIndigo = {
  DEFAULT: "#6610f2",
  active: "#510bc4",
  100: "#e0cffc",
  200: "#c29ffa",
  300: "#a370f7",
  400: "#8540f5",
  500: "#6610f2",
  600: "#520dc2",
  700: "#3d0a91",
  800: "#290661",
  900: "#140330",
};

export const bootstrapPurple = {
  DEFAULT: "#6f42c1",
  active: "#59339d",
  100: "#e2d9f3",
  200: "#c5b3e6",
  300: "#a98eda",
  400: "#8c68cd",
  500: "#6f42c1",
  600: "#59359a",
  700: "#432874",
  800: "#2c1a4d",
  900: "#160d27",
};

export const bootstrapPink = {
  DEFAULT: "#d63384",
  active: "#b2246b",
  100: "#f7d6e6",
  200: "#efadce",
  300: "#e685b5",
  400: "#de5c9d",
  500: "#d63384",
  600: "#ab296a",
  700: "#801f4f",
  800: "#561435",
  900: "#2b0a1a",
};

export const bootstrapRed = {
  DEFAULT: "#dc3545",
  active: "#bd2130",
  100: "#f8d7da",
  200: "#f1aeb5",
  300: "#ea868f",
  400: "#e35d6a",
  500: "#dc3545",
  600: "#b02a37",
  700: "#842029",
  800: "#58151c",
  900: "#2c0b0e",
};

export const bootstrapOrange = {
  DEFAULT: "#fd7e14",
  active: "#dc6502",
  100: "#ffe5d0",
  200: "#fecba1",
  300: "#feb272",
  400: "#fd9843",
  500: "#fd7e14",
  600: "#ca6510",
  700: "#984c0c",
  800: "#653208",
  900: "#331904",
};

export const bootstrapYellow = {
  DEFAULT: "#ffc107",
  active: "#d39e00",
  100: "#fff3cd",
  200: "#ffe69c",
  300: "#ffda6a",
  400: "#ffcd39",
  500: "#ffc107",
  600: "#cc9a06",
  700: "#997404",
  800: "#664d03",
  900: "#332701",
};

export const bootstrapGreen = {
  DEFAULT: "#28a745",
  active: "#1e7e34",
  100: "#d1e7dd",
  200: "#a3cfbb",
  300: "#75b798",
  400: "#479f76",
  500: "#198754",
  600: "#146c43",
  700: "#0f5132",
  800: "#0a3622",
  900: "#051b11",
};

export const bootstrapTeal = {
  DEFAULT: "#20c997",
  active: "#199d76",
  100: "#d2f4ea",
  200: "#a6e9d5",
  300: "#79dfc1",
  400: "#4dd4ac",
  500: "#20c997",
  600: "#1aa179",
  700: "#13795b",
  800: "#0d503c",
  900: "#06281e",
};

export const bootstrapCyan = {
  DEFAULT: "#17a2b8",
  active: "#117a8b",
  100: "#cff4fc",
  200: "#9eeaf9",
  300: "#6edff6",
  400: "#3dd5f3",
  500: "#0dcaf0",
  600: "#0aa2c0",
  700: "#087990",
  800: "#055160",
  900: "#032830",
};

export const bootstrapGray = {
  DEFAULT: "#6c757d",
  active: "#343a40",
  100: "#f8f9fa",
  200: "#e9ecef",
  300: "#dee2e6",
  400: "#ced4da",
  500: "#adb5bd",
  600: "#6c757d",
  700: "#495057",
  800: "#343a40",
  900: "#212529",
};

export const bootstrapLight = {
  DEFAULT: "#f8f9fa",
  active: "#dae0e5",
};

export const bootstrapDark = {
  DEFAULT: "#343a40",
  active: "#1d2124",
};

export const bootstrapThemeBaseColors = {
  primary: "#0d6efd", // blue[500]
  secondary: "#6c757d", // gray[600],
  success: "#198754", // green[500],
  info: "#0dcaf0", // cyan[500],
  warning: "#ffc107", // yellow[500],
  danger: "#dc3545", // red[500],
  light: "#f8f9fa", // gray[100],
  dark: "#212529", // gray[900]
};

export const bootstrapShade500 = {
  blue: "#0d6efd", // blue[500]
  indigo: "#6610f2", // indigo[500],
  purple: "#6f42c1", // purple[500],
  pink: "#d63384", // pink[500],
  red: "#dc3545", // red[500],
  orange: "#fd7e14", // orange[500],
  yellow: "#ffc107", // yellow[500],
  green: "#198754", // green[500],
  teal: "#20c997", // teal[500],
  cyan: "#0dcaf0", // cyan[500],
  gray: "#adb5bd", // gray[500],
  white: "#fff",
  black: "#000",
};

export const bootstrapColors = {
  blue: bootstrapBlue,
  indigo: bootstrapIndigo,
  purple: bootstrapPurple,
  pink: bootstrapPink,
  red: bootstrapRed,
  orange: bootstrapOrange,
  yellow: bootstrapYellow,
  green: bootstrapGreen,
  teal: bootstrapTeal,
  cyan: bootstrapCyan,
  gray: bootstrapGray,
};

export const bootstrapThemeColors = {
  primary: bootstrapBlue,
  secondary: bootstrapGray,
  success: bootstrapGreen,
  info: bootstrapCyan,
  warning: bootstrapYellow,
  danger: bootstrapRed,
  light: bootstrapLight,
  dark: bootstrapDark,
};
