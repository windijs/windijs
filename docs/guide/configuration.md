# Configuration

A guide to configuring and customizing your Windi JS experience.

**Note**: If you've ever used [Windi CSS](https://windicss.org/), the configuration of [Windi JS](https://github.com/windijs/windijs) is not exactly the same as that of [Windi CSS v3.x](https://windicss.org/). There are some differences and some are the same. Full compatibility will not be avaiable until the release of [Windi CSS v4.0](https://windicss.org/).

## Config File

The Windi JS configuration file is named `windi.config.js` or `windi.config.ts`, it should be placed in the root directory of your project and export a configuration object. Here’s an example:

```js
import { baseColors, bootstrapColors, colorHandler, configHandler, css, defineConfig, gradientConfig } from "windijs";

const colors = {
  ...baseColors,
  ...bootstrapColors
}

export default defineConfig({
  theme: {
    // overwrite theme
    colors,
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    // extend theme
    extend: {
      borderRadius: {
        xxl: '2rem',
      },
    }
  },
  utilities: {
    // overwrite utility
    bg: {
      DEFAULT: colorHandler(colors, "backgroundColor", "--w-bg-opacity")
    },
    // create new utilities
    myColor: {
      red: css({
        backgroundColor: "#FF2F41"
      })
    },
    gradient: {
      DEFAULT: configHandler(gradientConfig, "backgroundImage")
    }
  },
  variants: {
    // create new variant
    hocus: "&:hover, &:focus"
  }
})
```

Although you can also use object directly, like below.

```js
/** @type {import("windijs").Config} */
export default {
  /* configurations...  */
}
```

## Configuration Options

### Theme

The theme section is where you define your color palette, fonts, type scale, border sizes, breakpoints — anything related to the visual design of your site.

```js
export default defineConfig({
  theme: {
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      grayDark: '#273444',
      gray: '#8492a6',
      grayLight: '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      borderRadius: {
        xxl: '2rem',
      },
    }
  }
})
```

Learn more about the default theme and how to customize it in the [theme configuration guide](/customization/custom-theme).

### Utilities

The utlities of Windi JS are very easy to add and customize. Let's take official `border` as an example, which support [`border`, `border.solid`, `border.dashed`, ..., `border[0]`, `border[2]`, ..., `border.red[500]`, ..., `border.opacity[10]` ].

```js
import { borderStyleConfig, borderWidthConfig, opacityConfig, colorHandler, configHandler, meld, prop } from "windijs";
import { colors } from "@windijs/utilities";

export default defineConfig({
  utilities: {
    border: {
      DEFAULT: meld(
        configHandler(borderStyleConfig, "borderStyle"),
        configHandler(borderWidthConfig, "borderWidth"),
        colorHandler(colors, "borderColor", "--w-border-opacity"),
      ),
      opacity: configHandler(opacityConfig, prop`--w-border-opacity`)
    }
  }
})
```

[`borderStyleConfig`, `borderWidthConfig`, `opacityConfig`, `colors`] are normal JavaScript Objects, you can define them by yourself.

[`configHandler`, `colorHandler`] are interfaces provided by Windi JS to facilitate the use of config. Of course, you can also define it directly with `css` api, or mix them.

```js
import { css, prop } from "windijs";

export default defineConfig({
  utilities: {
    border: {
      DEFAULT: css({
        borderStyle: "solid",
        borderWidth: "1px"
      }),
      solid: css({
        borderStyle: "solid"
      }),
      dashed: css({
        borderStyle: "dashed"
      }),
      0: css({
        borderWidth: "0px"
      }),
      2: css({
        borderWidth: "2px"
      }),
      red: css({
        "--w-border-opacity": "1",
        borderColor: "rgba(29, 78, 216, var(--w-border-opacity))",
      }),
      opacity: {
        0: css({
          "--w-border-opacity": "0",
        }),
        10: css({
          "--w-border-opacity": ".1",
        }),
        25: css({
          "--w-border-opacity": ".25"
        })
      }
    }
  }
})

```

Learn more about the default utilities and how to create new utility in the [utility configuration guide](/customization/custom-utility).

### Variants

Like utilities, the variants of Windi JS are also simple to define.

```js
import { defineConfig } from "windijs";

export default defineConfig({
  variants: {
    sm: "@media (min-width: 640px)",
    hover: "&:hover",
    dark: "@media (prefers-color-scheme: dark)",
    hocus: "&:hover, &:focus",
    // TODO: support array variants
    smDark: ["@media (min-width: 640px)", "@media (prefers-color-scheme: dark)"],
    smDarkHover: ["@media (min-width: 640px)", "@media (prefers-color-scheme: dark)", "&:hover"],
  }
})
```

Learn more about the default variants and how to create new variant in the [variant configuration guide](/customization/custom-variant).

### DarkMode

By default, darkMode option value is `media`, which relying on the operating system perference.

```js
export default defineConfig({
  darkMode: "media",
})
```

generated css example:

```css
@media (perfer-color-scheme: dark) {
  .dark\:leading-none {
    line-height: 1;
  }
  .dark\:leading-tight {
    line-height: 1.25;
  }
}
```

If you want to support toggling dark mode manually, you can use the `class` strategy instead of the `media` strategy:

```js
export default defineConfig({
  darkMode: "class",
})
```

generated css example:

```css
.dark .leading-none {
  line-height: 1;
}
.dark .leading-tight {
  line-height: 1.25;
}
```

#### Customizing the class name

Some frameworks (like NativeScript) have their own approach to enabling dark mode and add a different class name when dark mode is active.

You can overwrite the dark mode variant in variants options.

```js
export default defineConfig({
  darkMode: false, // whatever
  variants: {
    dark: '[data-mode="dark"] &' // customize variants will overwrite the darkMode option
  }
})
```

### Important

The `important` option lets you control whether or not Windi’s utilities should be marked with `!important`. This can be really useful when using Windi JS with existing CSS that has high specificity selectors.

To generate utilities as `!important`, set the `important` key in your configuration options to `true`:

```js
// TODO: this configuration is not supported yet
export default defineConfig({
  important: true,
})
```

Now all of Windi’s utility classes will be generated as !important:

```css
.leading-none {
  line-height: 1 !important;
}
.leading-tight {
  line-height: 1.25 !important;
}
```

#### Selector strategy

Setting `important` to true can introduce some issues when incorporating third-party JS libraries that add inline styles to your elements. In those cases, Windi’s `!important` utilities defeat the inline styles, which can break your intended design.

To get around this, you can set `important` to an ID selector like `#app` instead:

```js
export default defineConfig({
  important: "#app",
})
```

This configuration will prefix all of your utilities with the given selector, effectively increasing their specificity without actually making them `!important`.

```css
#app.leading-none {
  line-height: 1;
}
#app.leading-tight {
  line-height: 1.25;
}
```
