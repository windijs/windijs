import { backgroundColor, colors, createUtility, cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

useArrayHelper();
useStyleLoader(cssInJsLoader);

export const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .init();
