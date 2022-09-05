import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import windiConfig from './windi.config'
import windijs from "@windijs/plugin-utils/vite"

export default defineConfig({
  plugins: [
    windijs({
      exts: [".jsx"],
      config: windiConfig
    }),
    preact()
  ]
})
