import { baseColors, bootstrapColors, colorHandler, css, defineConfig } from "windijs";

const colors = {
  ...baseColors,
  ...bootstrapColors
}

export default defineConfig({
  theme: {
    // test overwrite theme
    // colors,
    fontWeight: {
      bold: 600,
    },
    // test extend theme
    extend: {
      colors: {
        red: {
          125: "#ff0"
        },
        dim: "#1c1c1e"
      },
      fontWeight: {
        x: "900",
      },
      borderStyle: {
        dot: "dotted"
      }
    }
  },
  utilities: {
    // TODO: maybe support theme(colors) ??
    // test overwrite utility
    bg: {
      DEFAULT: colorHandler(colors, "backgroundColor")
    },
    // test create new utility
    myColor: {
      red: css({
        backgroundColor: "#FF2F41"
      })
    }
  },
  variants: {
    // test create new variant
    hocus: "&:hover, &:focus"
  }
})
