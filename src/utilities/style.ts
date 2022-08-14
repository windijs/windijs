import { createUtility } from "core/base";
import { stylePropertyHandler } from "core/handler";

export const style = createUtility("style").use(stylePropertyHandler()).init();
