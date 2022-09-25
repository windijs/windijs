---
outline: deep
---

# Utility

In general, we call a css unit a utility. For example, `rounded.lg` would generate `border-radius: 0.5rem`, so we may call `rounded.lg` as a utility. Yet, in Windi JS, we modified this definition. We call **a set of css units with similar functions** as a utility, so we should call `rounded` utility, and `rounded.lg` actually should call as **utility instance**. You can understand this as the relationship between class and instance.

## Built-in utilities

All built-in utilities defined in [@windijs/utilities](https://github.com/windijs/windijs/tree/main/packages/utilities).

:::tip
More detailed utility introductions and examples will come soon. At present, you can try them in [Repl](/repl).
:::

To learn more about built-in utilities, read the utilities API documents <a href="/modules/_windijs_utilities.html" target="_blank">here</a>.

## Create Utility Via API

You can freely create utilities by using Windi APIs. Before going deep into these APIs, first let's take an example to understand the construction of the API.

```js
import { configHandler, createUtility, borderRadiusConfig } from "windijs";

export const rounded = createUtility("rounded").use(configHandler(borderRadiusConfig, "borderRadius")).init();
```

Yeah, that's it, that's how we create built-in `rounded` utility. The source code can found [here](https://github.com/windijs/windijs/blob/main/packages/utilities/src/rounded.ts).

Let's take a closer look.

- `createUtility(...)`

  - create a utility, identifier is "rounded".
  - The identifier should always consistent with the variable name you defined.

- `use(...)`

  - use a handler, handle some cases.

- `configHandler(...)`

  - the configHandler, accept `borderRadiusConfig` object, and camel cased css property `borderRadius`.

- `init(...)`
  - initialize the utility.

Let's find a more complex example. The `bg` utility, which can handle `bg.blue[500], bg.fixed, bg.clip.border, bg.origin.top, bg.opacity[10], bg.gradient.to.r`...

```js
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
  .case(
    "gradient",
    callHandler(
      buildLinearGradient,
      meld(configHandler(gradientDirectionConfig, buildGradientDirection), configHandler(gradientConfig, "backgroundImage"))
    )
  )
  .init();
```

Newly added:

- `colorHandler(...)`
  - like `configHandler`, but special for colors.
- `callHandler(...)`
  - allow using a function call.
- `meld(...)`
  - merge different handlers.
- `case(...)`
  - when match target prop, apply the handler.
- <code>prop\`...`</code>
  - specify a string as css property.

Now you should have a general understanding of the structure of utility API. **A utility is usually composed of different handlers**. The handler refers to the function unit that **handles different props or cases**. We can create any utility by combining different handlers, just like building blocks.

Learn more about the built-in handlers and how to customize it in the [handler configuration guide](/customization/handler).

### createUtility

Create a new utility, the uid should always consistent with the variable name you defined.

```ts
function createUtility(uid: string): Utility<{}>;
```

#### use(...)

Use a handler, handle some cases.

```ts
class Utility<T extends object = {}> implements ProxyHandler<T> {
  public use<U>(handler: Handler<U>): Utility<T & U>;
}
```

#### case(...)

When the trigger key matched, apply the handler.

```ts
class Utility<T extends object = {}> implements ProxyHandler<T> {
  public case<K extends string, U>(trigger: K, handler: Handler<U>): Utility<T & { [P in K]: U }>;
}
```

#### init(...)

Initialize the utility. You can pass in a function so that the utility you created can also call as a function.

```ts
class Utility<T extends object = {}> implements ProxyHandler<T> {
  public init(): T;
  public init<F extends Function | object>(target: F): F & T;
  public init<F extends Function | object>(target: F, handler: ProxyHandler<F>): F & T;
}
```

### setupUtility

Create a utility by user utility config. The API is mainly for [windi bundler plugin](/integrations/vite) and used to support the config file.

```ts
export function setupUtility<U>(uid: string, handler: Handler<U>): U;
export function setupUtility<T extends StyleObject>(uid: string, css: T): T;
export function setupUtility<T extends object>(uid: string, config: T): SetUp<T>;
```

#### With a handler

```ts
const bg = setupUtility("bg", configHandler(backgroundRepeatConfig, "backgroundRepeat"));

// bg.repeat, bg.noRepeat, bg.repeat.x, ...
```

#### With a StyleObject

```ts
const btn = setupUtility("red", css({ backgroundColor: "red", borderRadius: "4px", padding: "1rem" }));

// btn
```

#### With a utility config

```ts
const overflow = setupUtility("overflow", {
  DEFAULT: meld(configHandler(overflowConfig, "overflow"), configHandler(backgroundClipConfig, "overflow")),
  ellpsis: css({ "-o-text-overflow": "ellipsis", textOverflow: "ellipsis" }),
  x: configHandler(overflowConfig, "overflowX"),
  multi: meld(configHandler(justifyItemsConfig, "justifyItems"), configHandler(fontStyleConfig, "fontStyle")),
  nested: {
    blue: css({ backgroundColor: "blue" }),
    opacity: {
      10: css({ backgroundColor: "aqua" }),
    },
    size: configHandler(backgroundSizeConfig, "backgroundSize"),
  },
});

// overflow.border, overflow.clip, overflow.ellpsis, overflow.x.clip, overflow.multi.center, overflow.multi.italic, overflow.nested.blue, overflow.nested.opacity[10], overflow.nested.size.contain, ...
```

## Create Utility Via Config

If you have created the configuration file of windi, `windi.config.js` or `windi.config.ts`. You can define or overwrite variants in your config file.

```js windi.config.js
import { defineConfig, configHandler, colorHandler, meld, prop, borderStyleConfig, borderWidthConfig, opacityConfig } from "windijs";
import { colors } from "@windijs/utilities";

export default defineConfig({
  utilities: {
    border: {
      DEFAULT: meld(
        configHandler(borderStyleConfig, "borderStyle"),
        configHandler(borderWidthConfig, "borderWidth"),
        colorHandler(colors, "borderColor", "--w-border-opacity")
      ),
      opacity: configHandler(opacityConfig, prop`--w-border-opacity`),
    },
  },
});
```

Or if you want to use css object directly.

```js windi.config.js
import { css, prop } from "windijs";

export default defineConfig({
  utilities: {
    border: {
      DEFAULT: css({
        borderStyle: "solid",
        borderWidth: "1px",
      }),
      solid: css({
        borderStyle: "solid",
      }),
      dashed: css({
        borderStyle: "dashed",
      }),
      0: css({
        borderWidth: "0px",
      }),
      2: css({
        borderWidth: "2px",
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
          "--w-border-opacity": ".25",
        }),
      },
    },
  },
});
```

Then you can import them from `virtual:utilities` or use global define if you enabled the automatic import of windi plugin. For more configuration, please refer to [Vite Plugin](/integrations/vite).

```js
import { border } from "virtual:utilities";

const btnStyle = [border[2], border.red, border.opacity[25]];
```

**Note**: The configuration file can only work when you install the [@windijs/plugin-utils](https://github.com/windijs/windijs/tree/main/packages/plugin-utils).

## Using Utilities

If you only want to apply windi to one module, and you only want to use one handler. In such cases, the `use` API can help you simplify your code.

### use

Use a single handler.

```ts
function use<U>(uid: string, plugin: Handler<U>): U;
```

For example, if you only want to use `colorHandler`:

```jsx
import { use, colorHandler } from "windijs";
import { colors } from "@windijs/utilities";
import { dark } from "@windijs/variants";

function MyComponent() {
  const bg = use("bg", colorHandler(colors, "backgroundColor"));
  // const bg = createUtility("bg").use(colorHandler(colors, "backgroundColor")).init();

  const myColors = ["red", "blue", "green", "yellow", "teal"];

  return <div className={(bg[myColors][500], dark(bg[myColors][400]))}>Hello World</div>;
}
```
