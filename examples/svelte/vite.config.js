import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { vitePlugins } from "@windijs/plugin-utils"
import windiConfig from "./windi.config"

const { plugins, windijs } = vitePlugins.svelte({
  config: windiConfig
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...plugins,
    svelte({
      preprocess: [
        windijs()
      ]
    })
  ]
})
