import { colorHandler, createUtility, windiColors } from "windijs";

export const bg = createUtility("bg")
  .use(colorHandler(windiColors, "backgroundColor", "--w-bg-color"))
  .init();

interface Plugins {
  bg: typeof bg
}

declare global {
  const bg: Plugins["bg"]
}
