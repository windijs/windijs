import { colorHandler, configHandler, createUtility, cssInJsLoader, gradientConfig, useStyleLoader, windiColors } from "windijs";

useStyleLoader(cssInJsLoader);

export const bg = createUtility("bg")
  .use(colorHandler(windiColors, "backgroundColor"))
  .init();

export const gradient = createUtility("gradient").use(configHandler(gradientConfig, "backgroundImage")).init();
