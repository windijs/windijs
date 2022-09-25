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
npm install --save-dev windijs @windijs/utilities @windijs/variants @windijs/plugin-utils
```

## Setup

### Configure Vite

First, add windijs plugin to your vite plugins.

:::tip

1. Read [Configuration Guide](/guide/configuration) for the configuration of Windi JS.
2. Refer to [Options Section](#options) for the configuration of the plugin.
   :::

<template v-if="ts && lang === 'vanilla'">

```ts vite.config.ts
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";
import windiConfig from "./windi.config"; // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
  ],
});
```

</template>

<template v-else-if="lang === 'vanilla'">

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";
import windiConfig from "./windi.config"; // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
  ],
});
```

</template>

<template v-else-if="ts && lang === 'preact'">

```ts vite.config.ts
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import windijs from "@windijs/plugin-utils/vite";
import windiConfig from "./windi.config"; // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    preact(),
  ],
});
```

</template>

<template v-else-if="lang === 'preact'">

```js vite.config.js
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import windijs from "@windijs/plugin-utils/vite";
import windiConfig from "./windi.config"; // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    preact(),
  ],
});
```

</template>

<template v-else-if="ts && lang === 'react'">

```ts vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import windijs from "@windijs/plugin-utils/vite";
import windiConfig from "./windi.config"; // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    react(),
  ],
});
```

</template>

<template v-else-if="lang === 'react'">

```js vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import windijs from "@windijs/plugin-utils/vite";
import windiConfig from "./windi.config"; // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    react(),
  ],
});
```

</template>

<template v-else-if="ts && lang === 'svelte'">

```ts vite.config.ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import windiConfig from "./windi.config";
import windijs from "@windijs/plugin-utils/vite";

// @ts-ignore
const ts = preprocess.typescript();
const windi = windijs({
  alias: {
    p: "_p", // p is conflict in svelte, rename it to _p
  },
  config: windiConfig, // optional
});

export default defineConfig({
  plugins: [
    windi,
    svelte({
      preprocess: [
        windi.api.sveltePreprocess(ts), // preprocess ts first
      ],
    }),
  ],
});
```

</template>

<template v-else-if="lang === 'svelte'">

```js vite.config.js
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import windiConfig from "./windi.config";
import windijs from "@windijs/plugin-utils/vite";

const windi = windijs({
  alias: {
    p: "_p", // p is conflict in svelte, rename it to _p
  },
  config: windiConfig, // optional
});

export default defineConfig({
  plugins: [
    windi,
    svelte({
      preprocess: [windi.api.sveltePreprocess()],
    }),
  ],
});
```

</template>

<template v-else-if="ts && lang === 'vue'">

```ts vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import windijs from "@windijs/plugin-utils/vite";
import windiConfig from "./windi.config"; // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    vue(),
  ],
});
```

</template>

<template v-else-if="lang === 'vue'">

```js vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import windijs from "@windijs/plugin-utils/vite";
import windiConfig from "./windi.config"; // optional

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig, // optional
    }),
    vue(),
  ],
});
```

</template>

### Configure {{capitalize(lang)}}

<template v-if="lang === 'vue'">

Setup our [Loader](/customization/loader), in this case, the [cssInJsLoader](/customization/loader#css-in-js-loader).

</template>

<template v-else>

In this step, you need to set [cssInJsLoader](/customization/loader#css-in-js-loader), and import `useArrayHelper` to support inline utilities.

</template>

<template v-if="lang === 'vanilla' && ts">

```ts main.ts
import { cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

useArrayHelper();
useStyleLoader(cssInJsLoader);

document.querySelector("#app").innerHTML = `<div>Hello World</div>`;
```

</template>

<template v-else-if="lang === 'vanilla'">

```js main.js
import { cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

useArrayHelper();
useStyleLoader(cssInJsLoader);

document.querySelector("#app").innerHTML = `<div>Hello World</div>`;
```

</template>

<template v-else-if="lang === 'preact' && ts">

```tsx main.tsx
import "./index.css";
import { App } from "./app";
import { render } from "preact";
import { cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

useArrayHelper();
useStyleLoader(cssInJsLoader);

render(<App />, document.getElementById("app") as HTMLElement);
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
import "./index.css";

import { cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

useArrayHelper();
useStyleLoader(cssInJsLoader);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

</template>

<template v-else-if="lang === 'react'">

```jsx main.jsx
import "./index.css";

import { cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

useArrayHelper();
useStyleLoader(cssInJsLoader);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

</template>

<template v-else-if="lang === 'svelte' && ts">

```ts main.ts
import "./app.css";
import App from "./App.svelte";
import { cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

useArrayHelper(); // overwrite Array.toString
useStyleLoader(cssInJsLoader); // use css-in-js loader

const app = new App({
  target: document.getElementById("app"),
});

export default app;
```

</template>

<template v-else-if="lang === 'svelte'">

```js main.js
import "./app.css";
import App from "./App.svelte";
import { cssInJsLoader, useArrayHelper, useStyleLoader } from "windijs";

useArrayHelper(); // overwrite Array.toString
useStyleLoader(cssInJsLoader); // use CSS-in-JS loader

const app = new App({
  target: document.getElementById("app"),
});

export default app;
```

</template>

<template v-else-if="lang === 'vue' && ts">

```ts main.ts
import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";
import { cssInJsLoader, useStyleLoader } from "windijs";

useStyleLoader(cssInJsLoader); // setup CSS-in-JS loader

createApp(App).mount("#app");
```

</template>

<template v-else-if="lang === 'vue'">

```js main.js
import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";
import { cssInJsLoader, useStyleLoader } from "windijs";

useStyleLoader(cssInJsLoader); // setup CSS-in-JS loader

createApp(App).mount("#app");
```

</template>

<template v-if="ts">

### Configure TypeScript

If you use the config file `windi.config.ts`, make sure it's included in your TypeScript config file.

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

<span :class="[text.xs]">Note: If you don't have a file called `tsconfig.node.json`, add it to `tsconfig.json` should also work.</span>

</template>

## Try it

Now you can try some utilities and variants to see if this plugin works.

<template v-if="lang==='vanilla' && ts">

```ts main.ts
const logo = [bg.blue[400].opacity(30), lg(bg.green[400].opacity(40))];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo ${bg.indigo[500].opacity(50)}" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img class="logo vanilla ${logo}" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
  </div>
`;
```

</template>

<template v-else-if="lang==='vanilla'">

```js main.js
const logo = [bg.blue[400].opacity(30), lg(bg.green[400].opacity(40))];

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo ${bg.indigo[500].opacity(50)}" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img class="logo vanilla ${logo}" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
  </div>
`;
```

</template>

<template v-else-if="lang.endsWith('react') && ts">

```tsx App.tsx
return <p className={[bg.blue[500], rounded.lg]}>Hello World</p>;
```

</template>

<template v-else-if="lang.endsWith('react')">

```jsx App.jsx
return <p className={[bg.blue[500], rounded.lg]}>Hello World</p>;
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

## Options

The following is the type reference of plugin options.

```ts
type PluginOptions = {
  alias?: Record<string, string>;
  config?: Config;
  env?: {
    config?: EntryOptions;
    utilities?: EntryOptions;
    variants?: EntryOptions;
    rootEntry?: string;
    nodeModulesEntry?: string;
    globalEntry?: string | false;
    moduleEntry?: string | false;
    configEntry?: string | false;
  };
  include?: string[];
  exclude?: string[];
};

type EntryOptions = {
  lib?: string;
  module?: boolean;
  global?: boolean;
};
```

### `alias`

Define alias for imports (utilities / variants), default is `{}`.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      alias: {
        p: "_p", // rename utility `p` to `_p`,
        text: "t", // rename utility `text` to `t`
        dark: "onDark", // rename variant `dark` to `onDark`
        hover: "hv": // rename variant `hover` to `hv`
      },
    })
  ]
})
```

### `config`

Customize windi configuration, default is `{}`.

#### With Config Object

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      config: {
        theme: {
          colors: {
            red: "#f00",
            blue: "#00f"
          }
        }
      },
    }
  ]
})
```

#### With Config File

```js vite.config.js
import { defineConfig } from "vite";
import windiConfig from "./windi.config";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig,
    }
  ]
})
```

### `env`

Define plugin environment, defaults are as follows:

```ts
const DefaultEnv = {
  rootEntry: "./",
  configEntry: "./windi.config",
  globalEntry: "./src/windi-global.d.ts",
  moduleEntry: "./src/windi-module.d.ts",
  nodeModulesEntry: "./node_modules",
  config: {
    lib: "windijs",
    module: true,
    global: false,
  },
  utilities: {
    lib: "@windijs/utilities",
    module: true,
    global: true,
  },
  variants: {
    lib: "@windijs/variants",
    module: true,
    global: true,
  },
};
```

#### `rootEntry`

The root entry of this plugin. If specified, the value of `configEntry`, `globalEntry`, `moduleEntry`, `nodeModulesEntry` will be resolved relative to this directory.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      env: {
        rootEntry: "./packages/frontend",

        // The path of `configEntry` would be `path.resolve("./packages/frontend", "./windi.config")`
        // The path of `globalEntry` would be `path.resolve("./packages/frontend", "./src/windi-global.d.ts")`,
        // The path of `moduleEntry` would be `path.resolve("./packages/frontend", "./src/windi-module.d.ts")`,
        // The path of `nodeModulesEntry` would be `path.resolve("./packages/frontend", "./node_modules")`,

      }
    }
  ]
})
```

#### `configEntry`

The config entry of this plugin, priority is lower than [rootEntry](#rootentry).

:::tip
The path should not include file extension. For example, `./src/windi.config.js` should be written as `./src/windi.config`.
:::

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      env: {
        configEntry: "./src/windi.config",
      }
    }
  ]
})
```

#### `globalEntry`

File path for writing global types, priority is lower than [rootEntry](#rootentry). If the value is `false`, no global types will be generated.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      env: {
        globalEntry: "./src/types/windi-global.d.ts",
      }
    }
  ]
})
```

#### `moduleEntry`

File path for writing virtual module types, priority is lower than [rootEntry](#rootentry). If the value is `false`, no virtual module types will be generated.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      env: {
        globalEntry: "./src/types/windi-module.d.ts",
      }
    }
  ]
})
```

#### `nodeModulesEntry`

The node_modules entry of this plugin, priority is lower than [rootEntry](#rootentry). We need this option to find the location of the `utilities` or `variants` lib you installed.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      env: {
        nodeModulesEntry: "./packages/frontend/node_modules",
      }
    }
  ]
})
```

#### `utilities`

Define the `utilities` environment.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      env: {
        lib: "@windijs/utilities", // package name of utilities lib, default is `@windijs/utilities`.
        module: true, // enable virtual module type generation for utilities, default is `true`.
        global: false, // enable global type generation for utilities, default is `true`.
      }
    }
  ]
})
```

#### `variants`

Define the `variants` environment.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      env: {
        lib: "@windijs/variants", // package name of variants lib, default is `@windijs/variants`.
        module: true, // enable virtual module type generation for variants, default is `true`.
        global: false, // enable global type generation for variants, default is `true`.
      }
    }
  ]
})
```

#### `config`

Define the `config` environment.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      env: {
        lib: "windijs", // package name of config lib, default is `windijs`.
        module: true, // enable virtual module type generation for configurations, default is `true`.
        global: false, // enable global type generation for configurations, default is `false`.
      }
    }
  ]
})
```

### `include`

[Glob patterns](https://www.npmjs.com/package/picomatch#globbing-features) for including files that should be matched, default is `["./src/**/*.{vue,jsx,tsx}"]`.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      include: ["./src/**/*.{js,ts}"]
    }
  ]
})
```

### `exclude`

[Glob patterns](https://www.npmjs.com/package/picomatch#globbing-features) for excluding files that should not be matched, default is `["**/node_modules"]`.

```js vite.config.js
import { defineConfig } from "vite";
import windijs from "@windijs/plugin-utils/vite";

export default defineConfig({
  plugins: [
    windijs({
      exclude: ["./frontend/node_modules"]
    }
  ]
})
```
