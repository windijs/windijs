# Getting Started

This section will help you understand how to use windijs from scratch. If you already have an existing project and would like to keep going, start from Step 2.

::: warning
Windi JS is still undergoing rapid release iterations, the API and config may still change between minor releases. You should consider using it in a production environment before the official release of v1.2.
:::

## Step. 1: Create a new project

Create and change into a new directory.

```sh
mkdir windijs-starter && cd windijs-starter
```

Then, initialize with your preferred package manager.

```sh
npm init
```

## Step. 2: Install Windi JS

Add Windi JS as dev dependencies for the project.

```sh
npm install --save-dev windijs
```

Then, you should be able to use all the APIs of Windi JS.

For example, you can use `style` to generate css.

```js
import { style } from "windijs";

console.log(style.backgroundColor.red.css);
```

Or use it for CSS-in-JS

```js
import { style, useStyleLoader, useArrayHelper, cssInJsLoader } from "windijs";

useStyleLoader(cssInJsLoader);
useArrayHelper();

document.getElementById("app").innerHTML = `<div class=${[
  style.backgroundColor.blue,
  style.fontSize.px[12],
  style.padding.rem[1],
]}>Hello World</div>`;
```

You can also use the windijs API to do things like convert light colors to dark colors.

```js
import { Color, getDarkColor } from "windijs";

getDarkColor(Color.hex("#485fc7")).hex; // "#384fb8"
```

## Step. 3: Install Utilities Lib (Optional)

After installing `windijs`, you can create **utilities** through its API. The **utilities**, which you can understand as a combination of styles, are shorter and more powerful at the same time.

```js
import { createUtility, configHandler, borderRadiusConfig } from "windijs";

const rounded = createUtility("rounded").use(configHandler(borderRadiusConfig, "borderRadius")).init();
```

The `rounded` is a utility, and you can use `rounded.sm`, `rounded.lg`, ... The effect is equal to using `style.borderRadius.rem[0.25]`, `style.borderRadius.rem[0.5]`.

Windi JS includes many powerful built-in utilities, to use them, please install [@windijs/utilities](https://www.npmjs.com/package/@windijs/utilities).

```sh
npm install --save-dev @windijs/utilities
```

## Step. 4: Install Variants Lib (Optional)

You can also create `variants` via API. With `variants` you can manipulate the state of css, such as [media-query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries), [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), etc.

```js
import { createVariant } from "windijs";

const sm = createVariant("@media (min-width: 640px)");
const hover = createVariant("&:hover");
```

After creating the `variants`, you use it like a function.

```js
hover(style.borderRadius.rem[0.25], style.backgroundColor.blue);
```

You can also nest different variants and utilities.

```js
sm(style.backgroundColor.blue, hover(style.backgroundColor.red));
```

Windi JS includes almost all common variants for responsive design, system appearance, etc. To use them, please install [@windijs/variants](https://www.npmjs.com/package/@windijs/variants).

```sh
npm install --save-dev @windijs/variants
```

## Step. 5: Setup Dev Plugin (Optional)

In practice, you may need a lot of utilities, variants, and it may be an annoying job to import them all the time. Meanwhile, windijs does not natively support configuration and theme, to change the config, you have to recreate new utilities.

To solve the above two problems, you need to install [@windijs/plugin-utils](https://www.npmjs.com/package/@windijs/plugin-utils).

```sh
npm install --save-dev @windijs/plugin-utils
```

This package provides plugins for bundlers ([vite](https://vitejs.dev/), [rollup](https://rollupjs.org/guide/en/), [webpack](https://webpack.js.org/), ...), it will automatically inject utilities and variants for you at packaging time, and it supports loading the config file [windi.config.js](http://localhost:5173/guide/configuration).

It will define new utilities for you whenever you change the config, and it also generates dts files if you are using TypeScript.

Don't worry, all this happens in the background, it's fully automated, and you'll get a clean and tidy development experience.

:::tip
To learn about the configuration for different JavaScript Frameworks, please refer to [here](http://localhost:5173/integrations/vite).
:::

## What's next?

By now, you should have tried some of windijs utilities, you may want to change the colors, customize your own theme. Head to [configuration guide](/guide/configuration) to learn how to configure Windi JS.

Learn how to use the built-in utilities and variants:

- [Utility](/customization/utility)
- [Variant](/customization/variant)

Learn more about the API:

- [API Overview](/integrations/api)
- <a href="/api.html" target="_blank">API Documentation</a>

For further customization:

- [Theme](/customization/theme)
- [Handler](/customization/handler)
- [Loader](/customization/loader)
- [Namer](/customization/namer)
- [Plugins](/customization/plugins)

If you're interested in the implementation and future of Windi JS:

- [How Windi JS Works?](/posts/how-windijs-works)
- [Ways of Using Windi JS](/posts/ways-of-using-windijs)
