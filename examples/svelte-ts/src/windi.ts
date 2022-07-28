import { backgroundColor, colors, createUtility, cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

import type { StyleObject } from "windijs";

useArrayHelper();
useStyleLoader(cssInJsLoader);

export const bg = createUtility("bg")
  .use(backgroundColor(colors))
  .init();

export function w (node: HTMLElement, utilities: (StyleObject | StyleObject[])[]) {
  const apply = (a: (StyleObject | StyleObject[])[]) => a.flat().map(i => i.toString());
  let classes = apply(utilities);
  node.classList.add(...classes);
  return {
    update (utilities: (StyleObject | StyleObject[])[]) {
      node.classList.remove(...classes);
      classes = apply(utilities);
      node.classList.add(...classes);
    },

    destroy () {},
  };
}
