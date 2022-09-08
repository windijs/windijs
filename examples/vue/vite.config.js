import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiConfig from './windi.config'
import windijs from "@windijs/plugin-utils/vite"

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig,
    }),
    vue()
  ]
})
