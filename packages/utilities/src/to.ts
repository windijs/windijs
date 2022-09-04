import { buildGradientTo, colorHandler, createUtility } from "@windijs/core";

import colors from "./colors";

export default createUtility("to")
  .use(colorHandler(colors, buildGradientTo))
  .init();
