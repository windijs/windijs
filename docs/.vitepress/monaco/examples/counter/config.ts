import { css, baseColors, materialColors, tailwindStone, defineConfig } from "windijs";

export default defineConfig({
  darkMode: "class",
  theme: {
    colors: {
      stone: tailwindStone,
      ...baseColors,
      ...materialColors,
    },
    borderRadius: {
      lg: "8px",
    },
  },
  utilities: {
    layout: {
      hstack: css({
        display: "flex",
        justifyContent: "center",
      }),
      vstack: css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }),
    },
    myBtn: css({
      borderStyle: "none",
      cursor: "pointer",
      userSelect: "none",
      borderRadius: "9999px",
      padding: "0.5rem",
      "&:focus": {
        outline: "none",
      },
    }),
  },
  variants: {
    hocus: "&:hover, &:focus",
  },
});
