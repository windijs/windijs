import { colorHandler, createUtility } from "@windijs/core";

import colors from "./colors";

export default createUtility("fill")
  .use(colorHandler({ none: "none", ...colors }, "fill"))
  .init();
