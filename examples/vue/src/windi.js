// @ts-check

import { backgroundColor, colors, createUtility, cssInJsLoader, useStyleLoader } from "windijs";

useStyleLoader(cssInJsLoader);

export const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .init();
