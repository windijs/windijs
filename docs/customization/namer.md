---
outline: deep
---

<script setup lang="ts">
import Title from "@/Title.vue"
import { ref } from "vue"

const ts = ref(false)
</script>

<Title head="Namer" v-model:ts="ts" />

The job of namer is to tell windi how to name the generated css.

## Built-in Namers

At present([windijs@1.1.4](https://github.com/windijs/windijs/tree/windijs%401.1.4)), windi includes the following three built-in namers.
The source code can found [here](https://github.com/windijs/windijs/blob/windijs%401.1.4/packages/helpers/src/namer.ts).

### Alpha Namer

Alpha Namer will name the generated css one by one in the order of `.a, .b, .c, ..., .a0, .a1, ...`. The advantage of this method is that it is **simple** and **clean**, works well in SPA. But, because this method depends on **the order of generated css**, if your site uses SSR architecture, there may be a problem of losing style due to repeated naming in separate pages.

The default namer of Windi JS is the Alpha Namer. You don't need to specify it yourself. The following is an example, which you can do when you encounter some special situations.

```js
import { alphaNamer, useNamer } from "windijs";

useNamer(alphaNamer);
```

### Hash Namer

Hash Namer names css by calculating the **hash value** of the **metadata** of each css [StyleObject](https://github.com/windijs/windijs/blob/windijs%401.1.4/packages/helpers/src/types.ts#L71). For Example, `.w-1r1q5pt .w-qawtuy .w-1d7u671 ...`. The advantage is that it always generates same name when meta is same. So it's works perfect for SSR architecture, the disadvantage is that it may not as concise as alpha namer.

```js
import { hashNamer, useNamer } from "windijs";

useNamer(hashNamer);
```

### Atomic Namer

Atomic namer will keep the **original props** for naming css. For example, when you call `rounded.lg`, the generated css will be named as `.rounded\.lg`, and `hover(rounded.lg, font.bold)` will be named as `hover\:rounded\.lg hover\:font\.bold`. This namer is more suitable **for development**, because it can see which utility generates what css, but it is not recommended for production.

```js
import { atomicNamer, useNamer } from "windijs";

useNamer(atomicNamer);
```

## Custom Namer

You can create your own namer, such as using different hash algorithms.

<template v-if="ts">

```ts
import { useNamer, getStyleIdent } from "windijs";
import type { StyleObject } from "windijs";

function myNamer(style: StyleObject): string {
  return "_" + myHash(getStyleIdent(style));
}

useNamer(myNamer);
```

</template>

<template v-else>

```js
import { useNamer, getStyleIdent } from "windijs";

function myNamer(style) {
  return "_" + myHash(getStyleIdent(style));
}

useNamer(myNamer);
```

</template>

[getStyleIdent](https://github.com/windijs/windijs/blob/windijs%401.1.4/packages/helpers/src/common.ts#L28) will generate a unique identifier for [StyleObject](https://github.com/windijs/windijs/blob/windijs%401.1.4/packages/helpers/src/types.ts#L71). You can also use attributes like `style.meta`, `style.css` to generate hash.

<template v-if="ts">

```ts
import { useNamer, hash } from "windijs";
import type { StyleObject } from "windijs";

function myNamer(style: StyleObject): string {
  return "_" + hash(JSON.stringify(style.css));
}

useNamer(myNamer);
```

</template>

<template v-else>

```js
import { useNamer, hash } from "windijs";

function myNamer(style) {
  return "_" + hash(JSON.stringify(style.css));
}

useNamer(myNamer);
```

</template>

**Note**: If your class name contains characters that need to be escaped, such as `@`, `:`, `.`, you can use the built-in [escapeCSS](https://github.com/windijs/windijs/blob/windijs%401.1.4/packages/helpers/src/escape.ts) method to escape them.

<template v-if="ts">

```ts
import { useNamer, escapeCSS, getStyleIdent } from "windijs";
import type { StyleObject } from "windijs";

export function myNamer(style: StyleObject): string {
  return escapeCSS(getStyleIndent(style));
}

useNamer(myNamer);
```

</template>

<template v-else>

```js
import { useNamer, escapeCSS, getStyleIdent } from "windijs";

export function myNamer(style) {
  return escapeCSS(getStyleIndent(style));
}

useNamer(myNamer);
```

</template>
