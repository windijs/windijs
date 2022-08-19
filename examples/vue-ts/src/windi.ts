import { configHandler, createUtility, cssInJsLoader, gradientConfig, useStyleLoader } from "windijs";

useStyleLoader(cssInJsLoader);

export const gradient = createUtility("gradient").use(configHandler(gradientConfig, "backgroundImage")).init();

export * from "windijs";
