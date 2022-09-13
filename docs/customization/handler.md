---
outline: deep
---

<script setup lang="ts">
import Title from "@/Title.vue"
import { ref } from "vue"

const ts = ref(false)
</script>

<Title head="Handler" v-model:ts="ts" />

The handler refers to the function unit that **handles different props or cases**. We can create any utility by combining different handlers, just like building blocks.

**Note**: Before going deep into these handlers, you should read the [Utility Customization Document](/customization/utility) first, make sure that you understand the structure of the API before continuing.

## Built-in Handlers

### configHandler

### colorHandler

### cssHandler

### numberHandler

### pxHandler

### remHandler

### degHandler

### msHandler

### spacingHandler

### fractionHandler

### callHandler

### setupHandler

### genericHandler

## Handler Helpers

### css

### prop

### meld

### guard

### handler

### isHandler

## Custom Handler

You are able to customize handler by extending built-in handler or recreating a new handler.

### Extending built-in handler

You can extract the handler that you feel redundant into another independent handler. For example:

```js
configHandler(colors, "backgroundColor", "--w-bg-opacity")
```

can be extracted into

```js
export function backgroundColorHandler () {
  return configHandler(colors, "backgroundColor", "--w-bg-opacity")
}
```

Another example, `configHandler` doesn't support handling Array by default, `fontFamilyHandler` convert Array to string first, then pass it to `configHandler`.

<template v-if="ts">

```ts
export function fontFamilyHandler<T extends object> (fonts: T) {
  const cssFonts = {} as {[key in keyof typeof fonts]: string};
  for (const [key, value] of Object.entries(fonts)) {
    cssFonts[key as keyof typeof fonts] = Array.isArray(value) ? value.join(",") : value as string;
  }
  return configHandler(cssFonts as T, "fontFamily");
}
```

</template>

<template v-else>

```js
export function fontFamilyHandler (fonts) {
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
export function backgroundGenericHandler () {
  return genericHandler<{ [key: string]: StyleObject }>("backgroundColor", (prop) => {
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
export function backgroundGenericHandler () {
  return genericHandler("backgroundColor", (prop) => {
    if (isNumber(prop)) {
      return "#" + (+prop).toString(16);
    }
    return prop;
  });
}
```

</template>

### Creating new handler

Basically, the built-in handlers is capable for most cases, but sometimes you may want to create your own handler. In this case, you should use [handler](#handler) api.

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
import { buildStatic, handler, isFraction, fracToPercent } from "windijs" 

export function fractionHandler (propertyOrBuildFunc) {
  // the build func, return StyleObject
  const build = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  return handler("fraction", p => isFraction(p) ? build(fracToPercent(p)) : undefined)
}
```

And if you are using TypeScript, you can also use type assertion.

```ts
import { buildStatic, handler, isFraction, fracToPercent } from "windijs" 
import type { StyleObject, StyleProperties, BuildFunc, Handler } from "windijs"

export function fractionHandler<T extends object = { [key:string]: StyleObject }> (propertyOrBuildFunc: StyleProperties | StyleProperties[] | BuildFunc) {
  // the build func, return StyleObject
  const build: BuildFunc = typeof propertyOrBuildFunc === "function" ? propertyOrBuildFunc : value => buildStatic(propertyOrBuildFunc, value);
  return {
    type: "fraction",
    get: p => isFraction(p) ? build(fracToPercent(p)) : undefined,
  } as Handler<T>;
}
```