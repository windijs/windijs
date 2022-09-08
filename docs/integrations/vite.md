<script setup lang="ts">
    import Switch from "../.vitepress/components/Switch.vue"
</script>

# Integration for Vite

<Switch></Switch>

## Install

Install the package:

```bash
npm i -D windijs @windijs/utilities @windijs/variants @windijs/plugin-utils
```

## Setup

Install the plugin in your Vite configuration:

### Vue

#### Configure Vite

```js vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windijs from "@windijs/plugin-utils/vite"

export default defineConfig({
  plugins: [
    windijs(),
    vue()
  ]
})
```

#### Configure Vue

```js main.js
import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import { cssInJsLoader, useStyleLoader } from 'windijs'

useStyleLoader(cssInJsLoader) // setup css-in-js loader

createApp(App).mount('#app')
```

#### Try it

```vue App.vue
<template>
  <p :class="[bg.blue[500], rounded.lg]">Hello World</p>
</template>
```

### Lit

TODO

### React/Preact

#### JavaScript

##### Configure Vite

```js vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windijs from "@windijs/plugin-utils/vite"

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig,
    }),
    react()
  ]
})
```

#### Configure React/Preact

<template v-if="true">

```jsx [main.jsx]
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

<template v-else>

```tsx [main.tsx]
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

#### Try it

```tsx [App.tsx]
return (
    <p className={[bg.blue[500], rounded.lg]}>Hello World</p>
)
```

##### TypeScript

```ts vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windijs from "@windijs/plugin-utils/vite"

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig,
    }),
    react()
  ]
})
```

### Svelte

### Vue


## Advance

### Configure TypeScript

### Configure Windi JS

### Configure Plugin
