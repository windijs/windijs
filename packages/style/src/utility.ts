import { createUtility } from "@windi/core";
import { stylePropertyHandler } from "./handler";

export const style = createUtility("style").use(stylePropertyHandler()).init();
