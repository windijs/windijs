---
outline: deep
---

# Loader

The Loader is to tell windi how to handle and load the generated css.

## Built-in Loaders

### CSS-in-JS Loader

The most common pattern is of course the CSS-in-JS pattern, where we generate css on the client side and insert it into DOM. A simple usage example like below, we register the `cssInJsLoader` in the main entry, and then we can use utilities and variants.

```js
import { useStyleLoader, cssInJsLoader } from "windijs";

useStyleLoader(cssInJsLoader);
```

### SSR Loader

Another common pattern is the SSR pattern, where we render the css and class name of the corresponding page on the server side. And then return the css to the client side, inject it into DOM. Then we should also switch to CSS-in-JS mode on the client side, so we can complete the after dynamic generation of css.

```js
import { useStyleLoader, ssrLoader, mountCSS, cssInJsLoader } from "windijs";

useStyleLoader(ssrLoader);

onMount(() => {
  mountCSS();
  useStyleLoader(cssInJsLoader);
});
```

### SSG Loader

:::warning
The SSG Loader is still in the testing phase and some are still conceived, so please do not use it.
:::

SSG pattern means we generate all the css on the client side and then return the generated css file to the client side instead of inserting it into the DOM. Of course, you can still switch to CSS-In-JS mode after delivery to the client.

```js
import { useStyleLoader, ssgLoader, cssInJsLoader } from "windijs";

useStyleLoader(ssgLoader);

onMount(() => {
  useStyleLoader(cssInJsLoader);
});
```

## Custom Loader

We can create custom loader in two ways, one simple, the other complex, but more powerful.

### `createStyleLoader` API

Creating a loader via the `createStyleLoader` API is the easiest way.

#### Type

```ts
function createStyleLoader(inject: (className: string, style: StyleObject) => void): StyleLoader;
```

#### Example

For example, the built-in `cssInJsLoader` looks like this.

```ts
import { createStyleLoader, injectCSS, buildStyle } from "windijs";

const BUILDED_CLASSES: string[] = [];

export const cssInJsLoader = createStyleLoader((className, style) => {
  if (!BUILDED_CLASSES.includes(className)) {
    BUILDED_CLASSES.push(className);
    injectCSS(buildStyle(className, style));
  }
});
```

### Native StyleLoader

The Native `StyleLoader` type is as follows.

```ts
type StyleLoader = (css: CSSObject | CSSMap, meta: UtilityMeta, data?: Record<string, unknown>) => StyleObject;
```

So in fact you can use any function that matches the type as a loader. Here is the implementation of `createStyleLoader`, which can be a reference for you.

```ts
export function createStyleLoader(inject: (className: string, style: StyleObject) => void): StyleLoader {
  return (css, meta, data) => {
    const baseStyle = baseStyleTarget(css, meta, data) as StyleObject;
    const className = nameStyle(baseStyle); // name the

    return new Proxy(
      {
        [className]: true,
        ...baseStyle,
      },
      {
        get(target, prop, receiver) {
          // for react, svelte...
          if (prop === "toString")
            return () => {
              inject(className, baseStyle);
              return Object.keys(target).join(" ");
            };

          // for vue
          if (prop === className) {
            inject(className, baseStyle);
            return Reflect.get(target, prop, receiver);
          }
          return baseStyleHandler(target, prop, receiver);
        },
      }
    );
  };
}
```

For more details, please refer to [the source code](https://github.com/windijs/windijs/blob/main/packages/helpers/src/css.ts) of Windi JS.
