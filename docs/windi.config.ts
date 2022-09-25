import { css, defineConfig } from "windijs";

export default defineConfig({
  darkMode: "class",
  utilities: {
    layout: {
      hstack: css({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }),
      vstack: css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }),
    },
    cursor: {
      pointer: css({
        cursor: "pointer",
      }),
    },
  },
});
