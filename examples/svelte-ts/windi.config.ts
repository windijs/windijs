import { baseColors, bootstrapColors, colorHandler, css, defineConfig } from "windijs";

const colors = {
  ...baseColors,
  ...bootstrapColors
}

export default defineConfig({
  theme: {
    // test overwrite theme
    colors
  },
  utilities: {
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
