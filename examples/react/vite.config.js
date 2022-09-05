import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windiConfig from './windi.config'
import windijs from "@windijs/plugin-utils/vite"

export default defineConfig({
  plugins: [
    windijs({
      exts: [".jsx"],
      config: windiConfig,
    }),
    react()
  ]
})
