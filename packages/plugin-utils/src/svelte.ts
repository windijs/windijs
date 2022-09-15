import { StyleObject } from "@windijs/helpers";

export function w(node: HTMLElement, utilities: (StyleObject | StyleObject[])[]) {
  const apply = (a: (StyleObject | StyleObject[])[]) => a.flat().map(i => i.toString());
  let classes = apply(utilities);
  node.classList.add(...classes);
  return {
    update(utilities: (StyleObject | StyleObject[])[]) {
      node.classList.remove(...classes);
      classes = apply(utilities);
      node.classList.add(...classes);
    },

    destroy() {
      return;
    },
  };
}
