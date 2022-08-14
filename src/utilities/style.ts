import { createUtility, stylePropertyHandler } from "core";

export const style = createUtility("style").use(stylePropertyHandler()).init();
