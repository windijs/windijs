<script setup lang="ts">
  import Title from "@/Title.vue"
  import LangSwitch from "@/LangSwitch.vue"

  import { ref } from "vue"
  
  const ts = ref(false)
  const lang = ref("vanilla")

  const capitalize = (s: string) => s.replace(/^\w/, c => c.toUpperCase());
</script>

<Title head="Integration for Vite" v-model:ts="ts" ></Title>

<LangSwitch v-model:lang="lang" :ts="ts"></LangSwitch>

## Install

Install the package:

```bash
npm i -D windijs @windijs/utilities @windijs/variants @windijs/plugin-utils
```

## Setup

### Configure Vite

<template v-if="ts && lang === 'preact'">

```ts vite.config.ts
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import windijs from "@windijs/plugin-utils/vite"
import windiConfig from './windi.config' // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    preact()
  ]
})
```
</template>

<template v-else-if="lang === 'preact'">

```js vite.config.js
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import windijs from "@windijs/plugin-utils/vite"
import windiConfig from './windi.config' // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    preact()
  ]
})

```
</template>

<template v-else-if="ts && lang === 'react'">

```ts vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windijs from "@windijs/plugin-utils/vite"
import windiConfig from './windi.config' // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    react()
  ]
})
```
</template>

<template v-else-if="lang === 'react'">

```js vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windijs from "@windijs/plugin-utils/vite"
import windiConfig from './windi.config' // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    react()
  ]
})

```
</template>

<template v-if="ts && lang === 'svelte'">

```ts vite.config.ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import preprocess from "svelte-preprocess"
import windiConfig from "./windi.config"
import windijs from "@windijs/plugin-utils/vite"

// @ts-ignore
const ts = preprocess.typescript();
const windi = windijs({
  alias: {
    p: "_p" // p is conflict in svelte, rename it to _p
  },
  config: windiConfig, // optional
});

export default defineConfig({
  plugins: [
    windi,
    svelte({
      preprocess: [
        windi.api.sveltePreprocess(ts) // preprocess ts first
      ]
    })
  ]
})
```
</template>

<template v-else-if="lang === 'svelte'">

```js vite.config.js
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import windiConfig from "./windi.config"
import windijs from "@windijs/plugin-utils/vite"

const windi = windijs({
  alias: {
    p: "_p" // p is conflict in svelte, rename it to _p
  },
  config: windiConfig, // optional
});

export default defineConfig({
  plugins: [
    windi,
    svelte({
      preprocess: [
        windi.api.sveltePreprocess()
      ]
    })
  ]
})
```
</template>

<template v-if="ts && lang === 'vue'">

```ts vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windijs from "@windijs/plugin-utils/vite"
import windiConfig from './windi.config' // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    vue()
  ]
})
```
</template>

<template v-else-if="lang === 'vue'">

```js vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windijs from "@windijs/plugin-utils/vite"
import windiConfig from './windi.config' // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    vue()
  ]
})
```
</template>

### Configure {{capitalize(lang)}}

<template v-if="lang === 'vanilla' && ts">

</template>

<template v-else-if="lang === 'vanilla'">

</template>

<template v-else-if="lang === 'preact' && ts">

```tsx main.tsx
import './index.css'
import { App } from './app'
import { render } from 'preact'
import { cssInJsLoader, useArrayHelper, useStyleLoader } from 'windijs'

useArrayHelper()
useStyleLoader(cssInJsLoader)

render(<App />, document.getElementById('app') as HTMLElement)
```
</template>

<template v-else-if="lang === 'preact'">

```jsx main.jsx
import './index.css'
import { App } from './app'
import { render } from 'preact'
import { cssInJsLoader, useArrayHelper, useStyleLoader } from 'windijs'

useArrayHelper()
useStyleLoader(cssInJsLoader)

render(<App />, document.getElementById('app') as HTMLElement)
```
</template>

<template v-else-if="lang === 'react' && ts">

```tsx main.tsx
import './index.css'

import { cssInJsLoader, useArrayHelper, useStyleLoader } from 'windijs'

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'

useArrayHelper()
useStyleLoader(cssInJsLoader)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```
</template>

<template v-else-if="lang === 'react'">

```jsx main.jsx
import './index.css'

import { cssInJsLoader, useArrayHelper, useStyleLoader } from 'windijs'

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'

useArrayHelper()
useStyleLoader(cssInJsLoader)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```
</template>

<template v-else-if="lang === 'svelte' && ts">

```ts main.ts
import './app.css'
import App from './App.svelte'
import { cssInJsLoader, useArrayHelper, useStyleLoader } from 'windijs'

useArrayHelper(); // overwrite Array.toString
useStyleLoader(cssInJsLoader); // use css-in-js loader

const app = new App({
  target: document.getElementById('app')
})

export default app
```
</template>

<template v-else-if="lang === 'svelte'">

```js main.js
import './app.css'
import App from './App.svelte'
import { cssInJsLoader, useArrayHelper, useStyleLoader } from 'windijs'

useArrayHelper(); // overwrite Array.toString
useStyleLoader(cssInJsLoader); // use css-in-js loader

const app = new App({
  target: document.getElementById('app')
})

export default app
```

</template>

<template v-else-if="lang === 'vue' && ts">

```ts main.ts
import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import { cssInJsLoader, useStyleLoader } from 'windijs'

useStyleLoader(cssInJsLoader) // setup css-in-js loader

createApp(App).mount('#app')
```

</template>

<template v-else-if="lang === 'vue'">

```js main.js
import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import { cssInJsLoader, useStyleLoader } from 'windijs'

useStyleLoader(cssInJsLoader) // setup css-in-js loader

createApp(App).mount('#app')
```

</template>

<template v-if="ts">

### Configure TypeScript

```json tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "windi.config.ts"] // include windi config file
}
```

<span :class="[text.xs]">Note: If you don't have a file called `tsconfig.node.json`, just add it to `tsconfig.json` should also works.</span>

</template>

## Try it

<template v-if="lang==='vanilla' && ts">

```ts main.ts
const logo = [ bg.blue[400].opacity(30), lg(bg.green[400].opacity(40)) ]

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo ${bg.indigo[500].opacity(50)}" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img class="logo vanilla ${logo}" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
  </div>
`
```

</template>

<template v-else-if="lang==='vanilla'">

</template>

<template v-else-if="lang.endsWith('react') && ts">

```tsx App.tsx
return (
  <p className={[bg.blue[500], rounded.lg]}>Hello World</p>
)
```
</template>

<template v-else-if="lang.endsWith('react')">

```jsx App.jsx
return (
  <p className={[bg.blue[500], rounded.lg]}>Hello World</p>
)
```
</template>

<template v-else-if="lang==='svelte'">

```svelte App.svelte
<p class={[bg.blue[500], rounded.lg].toString()}>Hello World</p>
```
</template>

<template v-else-if="lang==='vue'">

```vue App.vue
<template>
  <p :class="[bg.blue[500], rounded.lg]">Hello World</p>
</template>
```
</template>

## Advanced Options

