---
outline: deep
---

# Utility

In general, we call a css unit a utility. For example, `rounded.lg` would generate `border-radius: 0.5rem`, so we may call `rounded.lg` as a utility. However, in Windi JS, we slightly modified this definition. We call **a set of css units with similar functions** as a utility, so we should call `rounded` utility, and `rounded.lg` actually should be called as **utility instance**. You can understand this as the relationship between class and instance.

## Built-in utilities

All built-in utilities are defined in [@windijs/utilities](https://github.com/windijs/windijs/tree/main/packages/utilities).



Learn more about built-in utilities, read the utilities api documents <a href="/modules/_windijs_utilities.html" target="_blank">here</a>.

## Create Utility Via API

You can freely create utilities by using Windi APIs. Before going deep into these APIs, first let's take an example to understand the construction of the API. 

```js
import { configHandler, createUtility, borderRadiusConfig } from "windijs";

export const rounded = createUtility("rounded")
  .use(configHandler(borderRadiusConfig, "borderRadius"))
  .init();
```

Yeah, that's it, that's how we create built-in `rounded` utility. The source code can be found [here](https://github.com/windijs/windijs/blob/main/packages/utilities/src/rounded.ts).

Let's take a closer look.

- `createUtility(...)`
    - create a utility, identifier is "rounded".
    - The identifier should always consistent with the variable name you defined. 

- `use(...)`
    - use a handler, handle some cases.

- `configHandler(...)`
    - the configHandler, accpet `borderRadiusConfig` object, and camelCased css property `borderRadius`

- `init(...)`
    - initialize the utility

Let's find a more complex example. The `bg` utility, which can handle `bg.blue[500], bg.fixed, bg.clip.border, bg.origin.top, bg.opacity[10], bg.gradient.to.r`...

```js
import { createUtility, meld, prop, colors, buildLinearGradient, configHandler, colorHandler, callHandler, backgroundAttachmentConfig, backgroundPositionConfig, backgroundRepeatConfig, backgroundSizeConfig, backgroundImageConfig, backgroundClipConfig, blendModeConfig, backgroundOriginConfig, opacityConfig, gradientDirectionConfig, buildGradientDirection, gradientConfig } from "windijs"

export const bg = createUtility("bg")
  .use(colorHandler(colors, "backgroundColor", "--w-bg-opacity"))
  .use(configHandler(backgroundAttachmentConfig, "backgroundAttachment"))
  .use(configHandler(backgroundPositionConfig, "backgroundPosition"))
  .use(configHandler(backgroundRepeatConfig, "backgroundRepeat"))
  .use(configHandler(backgroundSizeConfig, "backgroundSize"))
  .use(configHandler(backgroundImageConfig, "backgroundImage"))
  .case("clip", configHandler(backgroundClipConfig, ["backgroundClip", prop`-webkit-background-clip`]))
  .case("blend", configHandler(blendModeConfig, "backgroundBlendMode"))
  .case("origin", configHandler(backgroundOriginConfig, "backgroundOrigin"))
  .case("opacity", configHandler(opacityConfig, prop`--w-bg-opacity`))
  .case("gradient", callHandler(buildLinearGradient, meld(
    configHandler(gradientDirectionConfig, buildGradientDirection),
    configHandler(gradientConfig, "backgroundImage"),
  )))
  .init();
```

Newly added:

- `colorHandler(...)`
    - similar to configHandler, but special for colors.
- `callHandler(...)`
    - allow using a function call.
- `meld(...)`
    - merge different handlers.
- `case(...)`
    - when match target prop, apply the handler.
- prop\`...\`
    - specify a string as css property.

Now you should have a general understanding of the structure of utility API. **A utility is usually composed of different handlers**. The handler refers to the function unit that **handles different props or cases**. We can create any utility by combining different handlers, just like building blocks.

Learn more about the built-in handlers and how to customize it in the [handler configuration guide](/customization/handler).

### createUtility

#### use(...)

#### case(...)

#### init(...)

### setupUtility

## Create Utility Via Config

If you have created the configuration file of windi, `windi.config.js` or `windi.config.ts`. You can define or overwrite variants in your config file.

```js windi.config.js
import { defineConfig, configHandler, colorHandler, meld, prop, borderStyleConfig, borderWidthConfig, opacityConfig } from "windijs"
import { colors } from "@windijs/utilities"

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

or if you want to use css directly.

```js windi.config.js
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

Then you can import them from `virtual:utilities` or just use global define if you enabled the automatic import of windi plugin. For more configuration, please refer to [Vite Plugin](/integrations/vite).

```js
import { border } from "virtual:utilities"

const btnStyle = [border[2], border.red, border.opacity[25]]
```

**Note**: The configuration file can only work when you install the [@windijs/plugin-utils](https://github.com/windijs/windijs/tree/main/packages/plugin-utils).

## Using Utilities

use