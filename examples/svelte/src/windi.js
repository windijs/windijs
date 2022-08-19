// @ts-check

import { cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

useArrayHelper();
useStyleLoader(cssInJsLoader);

/**
 * @typedef {import("windijs").StyleObject} StyleObject
 * @param {HTMLElement} node
 * @param {(StyleObject | StyleObject[])[]} utilities
 * @returns
 */
export function w (node, utilities) {
  const apply = (/** @type {(StyleObject | StyleObject[])[]} */ a) => a.flat().map(i => i.toString());
  let classes = apply(utilities);
  node.classList.add(...classes);
  return {
    update (/** @type {(StyleObject | StyleObject[])[]} */ utilities) {
      node.classList.remove(...classes);
      classes = apply(utilities);
      node.classList.add(...classes);
    },

    destroy () {
    },
  };
}

export * from "windijs";
