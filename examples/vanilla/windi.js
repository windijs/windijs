// @ts-check

import { cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

useArrayHelper();
useStyleLoader(cssInJsLoader);

export * from "windijs";
