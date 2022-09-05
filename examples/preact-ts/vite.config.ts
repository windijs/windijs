import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import windiConfig from './windi.config'
import windijs from "@windijs/plugin-utils/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    windijs({
      exts: [".tsx"],
      config: windiConfig
    }),
    preact()
  ]
})
