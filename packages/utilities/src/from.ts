import { buildGradientFrom, colorHandler, createUtility } from "@windijs/core";

import colors from "./colors";

export default createUtility("from").use(colorHandler(colors, buildGradientFrom)).init();
