import {
  applyVariant,
  baseStyleHandler,
  baseStyleTarget,
  buildRules,
  createRules,
  hashNamer,
  injectCSS,
  nameStyle,
  useNamer,
  useStyleLoader,
} from "windijs";

import type { StyleLoader, StyleObject } from "windijs";

const CSS_LIST: string[] = [];
const CLASS_LIST: string[] = [];

export function mountCSS() {
  return injectCSS(CSS_LIST.join("\n"));
}

export const ssrLoader: StyleLoader = (css, meta, data) => {
  const baseStyle = baseStyleTarget(css, meta, data) as StyleObject;
  const className = nameStyle(baseStyle);
  const inject = (v: unknown) => {
    if (!CLASS_LIST.includes(className)) {
      CLASS_LIST.push(className);
      CSS_LIST.push(buildRules(createRules(applyVariant(baseStyle), "." + className)));
    }
    return v;
  };

  return new Proxy(
    {
      [className]: true,
      ...baseStyle,
    },
    {
      get(target, prop, receiver) {
        // for react, svelte...
        if (prop === "toString") return () => inject(Object.keys(target).join(" "));
        // for vue
        if (prop in target) return inject(Reflect.get(target, prop, receiver));
        return baseStyleHandler(target, prop, receiver);
      },
    }
  );
};

useNamer(hashNamer);
useStyleLoader(ssrLoader);
