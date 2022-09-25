---
outline: deep
---

<script setup lang="ts">
import Title from "@/Title.vue"
import { ref } from "vue"

const ts = ref(false)
</script>

<Title head="Handler" v-model:ts="ts" />

The handler refers to the function unit that **handles different props or cases**. We can create any utility by combining different handlers, like building blocks.

**Note**: Before going deep into these handlers, you should read the [Utility Customization Document](/customization/utility) first, make sure that you understand the structure of the API before continuing.

## Built-in Handlers

The following built-in handlers can used directly.

### configHandler

Based on the config object, generate css by css property or build function.

:::details Config Object
The config object refers to the object whose value is the css property value.

1. Normal object

```js
const borderStyleConfig = {
  solid: "solid",
  dashed: "dashed",
  dotted: "dotted",
  double: "double",
  none: "none",
};
// border.solid, boder.dashed, ...
```

2. With default value

```js
const borderWidthConfig = {
  DEFAULT: "1px",
  0: "0px",
  1: "1px",
  2: "2px",
  4: "4px",
  8: "8px",
};
// border, border[0], border[1], border[2], ...
```

3. Nested object

```js
const gradientDirectionConfig = {
  to: {
    t: "top",
    tr: "top right",
    r: "right",
    br: "bottom right",
    b: "bottom",
    bl: "bottom left",
    l: "left",
    tl: "top left",
  },
  deg: degreeConfig,
};
// gradient.to.t, gradient.to.tr, ..., gradient.deg[15], ...
```

:::

#### Type

```ts
function configHandler<T extends object>(config: T, property: StyleProperties | StyleProperties[]): StyleProxyHandler<T>;
function configHandler<T extends object, O extends object = {}>(
  config: T,
  build: (value: unknown) => StyleObject<O> | undefined
): Handler<NestedProxy<T, StyleObject<O>>>;
```

#### Example

1. With normal css property

```js
import { configHandler, borderWidthConfig } from "windijs";

configHandler(borderWidthConfig, "borderWidth");
```

2. With unusual css property

```js
import { configHandler, opacityConfig, prop } from "windijs";

configHandler(opacityConfig, prop`--w-border-opacity`);
```

3. With css properties

```js
import { configHandler, flexWrapConfig, prop } from "windijs";

configHandler(flexWrapConfig, [prop`-ms-flex-wrap`, prop`-webkit-flex-wrap`, "flexWrap"]);
```

4. With build function

```js
import { configHandler, blurConfig, css } from "windijs";

configHandler(blurConfig, v => css({ "--w-backdrop-blur": `blur(${v})` })
```

### colorHandler

Like [configHandler](#confighandler), but based on the color object, generate css by css property or build function.

:::details Color Object

The color object refers to the object whose value is the css color value.

1. Normal object

```js
const borderColorConfig = {
  red: "#FF0000",
  blue: "#006EFF",
};
// border.red, boder.blue, ...
```

2. With default value

```js
const borderColorConfig = {
  DEFAULT: "#1C1C1E",
  red: "#FF0000",
  blue: "#006EFF",
};
// border, border.red, border.blue, ...
```

3. Nested object

```js
const borderColorConfig = {
  DEFAULT: "#1C1C1E",
  red: {
    DEFAULT: "#FF0000",
    100: "#FF1111",
  },
  blue: {
    DEFAULT: "#006EFF",
    200: "#006FFF",
  },
};
// border, border.red, border.red[100], border.blue, border.blue[200], ...
```

4. Special values

```js
const borderColorConfig = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "black",
  rgb: "rgb(22, 13, 14)",
  rgba: "rgba(22, 13, 14, 0.5)",
  hsl: "hsl(360, 100%, 50%)",
  hsla: "hsla(360, 100%, 50%, 0.3)",
  hwb: "hwb(194 0% 0%)",
  hwba: "hwb(194 0% 0% / .5)",
};
// border.inherit, boder.current, ... border.rgb, border.rgba, ...
```

:::

#### Type

```ts
function colorHandler<T extends object>(colors: T, colorProperty: StyleProperties | StyleProperties[]): StyleProxyHandler<T>;
function colorHandler<T extends object, O extends object = {}>(
  colors: T,
  build: (value: unknown) => StyleObject<O> | undefined
): Handler<NestedProxy<T, StyleObject<O>>>;
function colorHandler<T extends object>(
  colors: T,
  colorPropertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc,
  colorOpacityProperty?: string
): StyleProxyHandler<T>;
```

#### Example

1. With normal css property

```js
import { colorHandler } from "windijs";
import { colors } from "@windijs/utilities";

colorHandler(colors, "borderColor");
```

2. With unusual css property

```js
import { colorHandler } from "windijs";
import { colors } from "@windijs/utilities";

colorHandler(colors, prop`--w-ring-color`);
```

3. with opacity name

If you specify an opacity name, besides the color value, an opacity property variable will generated. Then you can define the opacity `utility` to change the transparency.

```js
import { colorHandler } from "windijs";
import { colors } from "@windijs/utilities";

colorHandler(colors, prop`--w-ring-color`, "--w-ring-opacity");
```

Generated css example:

```css
.ring-gray {
  --w-ring-opacity: 1;
  --w-ring-color: rgba(22, 22, 22, var(--w-ring-opacity));
}
```

### cssHandler

Input a `CSSObject` or `StyleObject`, return a handler, usually used for handling default css.

#### Type

```ts
function cssHandler(cssOrStyle: StyleObject | CSSObject | CSSMap): Handler<StyleObject>;
```

#### Example

```js
const backdrop = createUtility("backdrop")
  .use(
    cssHandler({
      "--w-backdrop-blur": "var(--w-empty,/*!*/ /*!*/)",
      // ...
    })
  )
  .case(
    "blur",
    configHandler(blurConfig, v => css({ "--w-backdrop-blur": `blur(${v})` }))
  )
  // ...
  .init();
```

### numberHandler

Handles any number and return a `StyleObject`.

#### Type

```ts
function numberHandler<
  T extends object = {
    [key: number]: StyleObject;
  }
>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc, size: "" | CSSDimensionType = ""): Handler<T>;
```

#### Example

```js
const col = createUtility("col").use(numberHandler("gridColumn")).init();

// col[0], col[1], col[2], col[999], ...
```

Generated css example:

```css
.col-1 {
  grid-column: 1;
}
```

You can also pass in a dimension.

```js
const border = createUtility("border").use(numberHandler("borderWidth", "px")).init();

// border[0], border[1], border[2], border[999], ...
```

Generated css example:

```css
.border-1 {
  border-width: 1px;
}
```

### pxHandler

Handles any number and turn it into a `px` dimension, return a `StyleObject`.

#### Type

```ts
function pxHandler<
  T extends object = {
    [key: number]: StyleObject<{}>;
  }
>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc): Handler<T>;
```

#### Example

```js
const border = createUtility("border").use(pxHandler("borderWidth")).init();

// border[0], border[1], border[2], border[999], ...
```

Generated css example:

```css
.border-1 {
  border-width: 1px;
}
```

### remHandler

Handles any number and turn it into a `rem` dimension, return a `StyleObject`.

#### Type

```ts
function remHandler<
  T extends object = {
    [key: number]: StyleObject<{}>;
  }
>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc): Handler<T>;
```

#### Example

```js
const border = createUtility("border").use(pxHandler("borderWidth")).init();

// border[0], border[1], border[2], border[999], ...
```

Generated css example:

```css
.border-1 {
  border-width: 1rem;
}
```

### degHandler

Handles any number and turn it into a `deg` dimension, return a `StyleObject`.

#### Type

```ts
function degHandler<
  T extends object = {
    [key: number]: StyleObject<{}>;
  }
>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc): Handler<T>;
```

#### Example

```js
const rotate = createUtility("rotate").use(degHandler("rotate")).init();

// rotate[0], rotate[1], rotate[30], rotate[90], ...
```

Generated css example:

```css
.rotate-60 {
  rotate: 60deg;
}
```

### msHandler

Handles any number and turn it into a `ms` dimension, return a `StyleObject`.

#### Type

```ts
function msHandler<
  T extends object = {
    [key: number]: StyleObject<{}>;
  }
>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc): Handler<T>;
```

#### Example

```js
const delay = createUtility("delay")
  .use(msHandler([prop`-webkit-transition-delay`, prop`-o-transition-delay`, "transitionDelay"]))
  .init();

// delay[300], delay[1000], delay[1234], ...
```

Generated css example:

```css
.delay-300 {
  -webkit-transition-delay: 300ms;
  -o-transition-delay: 300ms;
  transition-delay: 300ms;
}
```

### spacingHandler

Handles any number and turn it into a `spacing` value (`${number}/4rem`), return a `StyleObject`.

#### Type

```ts
function spacingHandler<
  T extends object = {
    [key: number]: StyleObject<{}>;
  }
>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc): Handler<T>;
```

#### Example

```js
const p = createUtility("p").use(spacingHandler("padding")).init();

// p[0], p[1], p[2], p[4], ...
```

Generated css example:

```css
.p-4 {
  padding: 1rem;
}
```

### fractionHandler

Handles any fraction value and turn it into a `percentage` value, return a `StyleObject`.

#### Type

```ts
function fractionHandler<
  T extends object = {
    [key: number]: StyleObject<{}>;
  }
>(propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc): Handler<T>;
```

#### Example

```js
const w = createUtility("w").use(fractionHandler("width")).init();

// w["1/2"], p["3/4"], w["4/5"], ...
```

Generated css example:

```css
.w-3\/4 {
  width: 75%;
}
```

### callHandler

Make a prop callable, usually use within `case(...)`.

:::tip

If you want to make utility callable, you should pass the function into `init()` method.

```ts
const rgbFunc = (red: number, green: number, blue: number) => css({ backgroundColor: `rgb(${red}, ${green}, ${blue})` });

const bg = createUtility("bg").use(colorsHandler(colors, "backgroundColor")).init(rgbFunc);

// bg.red, bg.red[500], ...
// bg(22, 22, 22), ...
```

:::

#### Type

```ts
function callHandler<F extends Function, R extends object = {}>(call: F, plugin?: Handler<R>): Handler<F & R>;
```

#### Example

```ts
const rgbFunc = (red: number, green: number, blue: number) => css({ backgroundColor: `rgb(${red}, ${green}, ${blue})` });

const bg = createUtility("bg").case("rgb", callHandler(rgbFunc)).init();

// bg.rgb(22, 22, 22)
```

You can put in another handler, so that it can still handle other props.

```ts
const bg = createUtility("bg")
  .case("rgb", callHandler(rgbFunc, colorsHandler(colors, "backgroundColor")))
  .init();

// bg.rgb(22, 22, 22), bg.rgb.red, bg.rgb.red[500], ...
```

### setupHandler

Handles props with the utility configuration passed in. The value of utility configuration can be `StyleObject` or `Handler`, if there are multiple handlers, they should combined by [meld](#meld) method.

#### Type

```ts
function setupHandler<T extends object>(config: T): Handler<SetUp<T>>;
```

#### Example

```js
const bg = createUtility("bg")
  .use(
    setupHandler({
      red: css({ backgroundColor: "red" }),
      size: configHandler(backgroundSizeConfig, "backgroundSize"),
    })
  )
  .init();

// bg.red, bg.size.auto, ...
```

### genericHandler

Create a generic haandler by function, usually used to handle default cases.

#### Type

```ts
function genericHandler<
  R = {
    [key: string]: StyleObject<{}>;
  }
>(property: StyleProperties | StyleProperties[], handler: handleDynamicWithValue): Handler<R>;
function genericHandler<
  R = {
    [key: string]: StyleObject<{}>;
  }
>(handler: handleDynamic): Handler<R>;
function genericHandler<
  R = {
    [key: string]: StyleObject<{}>;
  }
>(handler: handleDynamic): Handler<R>;
```

#### Example

```ts
function backgroundGenericHandler() {
  return genericHandler<{ [key: string]: StyleObject }>("backgroundColor", prop => {
    if (isNumber(prop)) return "#" + (+prop).toString(16);

    return prop;
  });
}

const bg = createUtility("bg").use(backgroundGenericHandler()).init();

// bg[0x1c1c1e], bg[0xffffff], bg.currentColor, bg["rgba(22, 22, 22, 0.8)"] ...
```

## Handler Helpers

These are the common handler helpers that you need to master.

### css

Convert a `CSSObject` or `CSSMap` to a `StyleObject`.

#### Type

```ts
function css<D extends Record<string, unknown>>(css: CSSObject | CSSMap, data?: D, meta?: UtilityMeta): StyleObject<D>;
```

#### Example

1. Object

```js
css({
  fontSize: "13px",
  "&:hover": {
    fontSize: "14px",
  },
});
```

2. Map

```ts
const m = new Map() as CSSMap;
m.set("width", "100%");
m.set("marginLeft", "auto");
m.set("marginRight", "auto");

css(m);
```

:::tip
`CSSMap` will ensure the order of generated css. This is especially useful, for example, when using keyframes, you may want to keep the keyframes on top of the animation.
:::

### prop

Force a string to `StyleProperties` type, equal to `"some-prop" as StyleProperties`.

#### Type

```ts
function prop(strings: TemplateStringsArray, ...expr: string[]): StyleProperties;
```

#### Example

```js
prop`-webkit-backdrop-filter`;
```

### meld

Combine multiple handlers into one handler, using up to 26 handlers. It's usually used for using multiple handlers in a case.

#### Type

```ts
function meld(...handlers: Handler<unknown>[]): Handler<unknown>;
```

#### Example

```js
const space = createUtility("space")
  .case("x", meld(guard("reverse", spaceBetweenXReverseHandler()), configHandler(spaceBetweenConfig, buildSpaceBetweenX)))
  .case("y", meld(guard("reverse", spaceBetweenYReverseHandler()), configHandler(spaceBetweenConfig, buildSpaceBetweenY)))
  .init();

// space.x.reverse, space.x[2], space.x[4], ...
// space.y.reverse, space.y[2], space.y[4], ...
```

### guard

Add a match key to the handler, the function is like `case(key, ...)`, but it can nested inside case or meld.

#### Type

```ts
function guard<K extends string, R>(key: K, handler: Handler<R>): Handler<{ [P in K]: R }>;
```

#### Example

```js
const divide = createUtility("divide")
  .case("x", meld(guard("reverse", divideXReverseHandler()), configHandler(borderWidthConfig, buildDivideX)))
  .case("y", meld(guard("reverse", divideYReverseHandler()), configHandler(borderWidthConfig, buildDivideY)))
  .init();

// divide.x.reverse, divide.x[2], divide.x[4], ...
// divide.y.reverse, divide.y[2], divide.y[4], ...
```

### handler

Create a new custom handler.

#### Type

```ts
function handler<R>(type: string, get: (prop: string) => R, meta?: object): Handler<R>;
```

#### Example

```js
import { buildStatic, handler, isFraction, fracToPercent } from "windijs";

export function fractionHandler(propertyOrBuildFunc) {
  return handler("fraction", p => (isFraction(p) ? buildStatic(fracToPercent(p)) : undefined));
}
```

### isHandler

Check if something is a `Handler`.

#### Type

```ts
function isHandler<R>(i: unknown): i is Handler<R>;
```

#### Example

```js
isHanlder(configHandler(borderRadiusConfig, "borderRadius")); // true
```

## Custom Handler

You are able to customize handler by extending built-in handler or recreating a new handler.

### Extending built-in handler

You can extract the handler that you feel redundant into another independent handler. For example:

```js
configHandler(colors, "backgroundColor", "--w-bg-opacity");
```

can extracted into

```js
export function backgroundColorHandler() {
  return configHandler(colors, "backgroundColor", "--w-bg-opacity");
}
```

Another example, `configHandler` doesn't support handling Array by default, `fontFamilyHandler` convert Array to string first, then pass it to `configHandler`.

<template v-if="ts">

```ts
export function fontFamilyHandler<T extends object>(fonts: T) {
  const cssFonts = {} as { [key in keyof typeof fonts]: string };
  for (const [key, value] of Object.entries(fonts)) {
    cssFonts[key as keyof typeof fonts] = Array.isArray(value) ? value.join(",") : (value as string);
  }
  return configHandler(cssFonts as T, "fontFamily");
}
```

</template>

<template v-else>

```js
export function fontFamilyHandler(fonts) {
  const cssFonts = {};
  for (const [key, value] of Object.entries(fonts)) {
    cssFonts[key] = Array.isArray(value) ? value.join(",") : value;
  }
  return configHandler(cssFonts, "fontFamily");
}
```

</template>

One more example, when you use `genericHandler`, you usually want to extract it separately.
This example supports `bg[0x1c1c1e], bg[0xff0]`, ....

<template v-if="ts">

```ts
export function backgroundGenericHandler() {
  return genericHandler<{ [key: string]: StyleObject }>("backgroundColor", prop => {
    if (isNumber(prop)) {
      return "#" + (+prop).toString(16);
    }
    return prop;
  });
}
```

</template>

<template v-else>

```js
export function backgroundGenericHandler() {
  return genericHandler("backgroundColor", prop => {
    if (isNumber(prop)) {
      return "#" + (+prop).toString(16);
    }
    return prop;
  });
}
```

</template>

### Creating new handler

The built-in handlers is capable for most cases, but sometimes you may want to create your own handler. In this case, you should use [handler](#handler) api.

A handler in fact is a simple object that has 3 elements, `type`, `meta`, `get`.

- type
  - Explain: The type of the handler.
  - Type: `"number" | "color" | "config" | "css" | "style" | "call" | "spacing" | "fraction" | "generic" | "setup" | "guard" | "meld" | String`
- meta:
  - Explain: The meta data of the handler.
  - Type: `object | undefined`
- get:
  - Explain: The function that handles props.
  - Type: `(prop: string) => T`

Let's take [fractionHandler](#fractionhandler) as an example.

```js
import { buildStatic, handler, isFraction, fracToPercent } from "windijs";

export function fractionHandler(propertyOrBuildFunc) {
  // the build func, return StyleObject
  const build = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  return handler("fraction", p => (isFraction(p) ? build(fracToPercent(p)) : undefined));
}
```

And if you are using TypeScript, you can also use type assertion.

```ts
import { buildStatic, handler, isFraction, fracToPercent } from "windijs";
import type { StyleObject, StyleProperties, BuildFunc, Handler } from "windijs";

export function fractionHandler<T extends object = { [key: string]: StyleObject }>(
  propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc
) {
  // the build func, return StyleObject
  const build: BuildFunc = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  return {
    type: "fraction",
    get: p => (isFraction(p) ? build(fracToPercent(p)) : undefined),
  } as Handler<T>;
}
```
