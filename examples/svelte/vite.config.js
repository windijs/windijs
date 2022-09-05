import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import windiConfig from "./windi.config"
import windijs from "@windijs/plugin-utils/vite"

const windi = windijs({
  exts: [".svelte"],
  config: windiConfig
})

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
