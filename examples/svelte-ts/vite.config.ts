import preprocess from "svelte-preprocess";
import { defineConfig } from "vite";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import windijs from "@windijs/plugin-utils/vite";

import windiConfig from "./windi.config";

// @ts-ignore
const ts = preprocess.typescript();
const windi = windijs({
  alias: {
    p: "_p",
  },
  config: windiConfig,
});

export default defineConfig({
  plugins: [
    windi,
    svelte({
      preprocess: [windi.api.sveltePreprocess(ts)],
    }),
  ],
});
