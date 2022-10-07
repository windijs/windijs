import type { Utilities, StyleObject } from "@windijs/helpers";

export function w(node: HTMLElement, utilities: Utilities[]) {
  const apply = (a: Utilities[]) => (a.flat().filter(i => i != null) as StyleObject[]).map(i => i.toString());
  let classes = apply(utilities);
  node.classList.add(...classes);
  return {
    update(utilities: Utilities[]) {
      node.classList.remove(...classes);
      classes = apply(utilities);
      node.classList.add(...classes);
    },

    destroy() {
      return;
    },
  };
}
