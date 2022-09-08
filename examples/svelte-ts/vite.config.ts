import { defineConfig } from 'vite'
import preprocess from "svelte-preprocess"
import { svelte } from '@sveltejs/vite-plugin-svelte'
import windiConfig from "./windi.config"
import windijs from "@windijs/plugin-utils/vite"

// @ts-ignore
const ts = preprocess.typescript();
const windi = windijs({
  config: windiConfig,
});

export default defineConfig({
  plugins: [
    windi,
    svelte({
      preprocess: [
        windi.api.sveltePreprocess(ts)
      ]
    })
  ]
})
