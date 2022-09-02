import { defineConfig } from 'vite'
import { vitePlugins } from "@windijs/plugin-utils"
import vue from '@vitejs/plugin-vue'
import windiConfig from './windi.config'

const { plugins, windijs } = vitePlugins.vue({
  config: windiConfig
});

export default defineConfig({
  plugins: [
    ...plugins,
    windijs(),
    vue()
  ]
})
