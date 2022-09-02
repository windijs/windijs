import { defineConfig } from 'vite'
import preprocess from "svelte-preprocess"
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { vitePlugins } from "@windijs/plugin-utils"
import windiConfig from "./windi.config"

// @ts-ignore
const ts = preprocess.typescript();
const { plugins, windijs } = vitePlugins.svelte({
  config: windiConfig
});

export default defineConfig({
  plugins: [
    ...plugins,
    svelte({
      preprocess: [
        windijs(ts)
      ]
    })
  ]
})
