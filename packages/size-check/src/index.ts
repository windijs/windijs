import { colorHandler, configHandler, createUtility } from "@windijs/core";

export const p = createUtility("p").use(configHandler({}, "padding")).case("t", colorHandler({}, "paddingTop")).init();
