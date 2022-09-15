import { buildGradientVia, colorHandler, createUtility } from "@windijs/core";

import colors from "./colors";

export default createUtility("via").use(colorHandler(colors, buildGradientVia)).init();
