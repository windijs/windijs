import { baseColors, bootstrapColors, colorHandler, configHandler, css, defineConfig, gradientConfig } from "windijs";

const colors = {
  ...baseColors,
  ...bootstrapColors,
};

export default defineConfig({
  theme: {
    // test overwrite theme
    colors,
  },
  utilities: {
    // test overwrite utility
    bg: {
      DEFAULT: colorHandler(colors, "backgroundColor", "--w-bg-opacity"),
    },
    // test create new utility
    myColor: {
      red: css({
        backgroundColor: "#FF2F41",
      }),
    },
    gradient: {
      DEFAULT: configHandler(gradientConfig, "backgroundImage"),
    },
  },
  variants: {
    // test create new variant
    hocus: "&:hover, &:focus",
  },
});
