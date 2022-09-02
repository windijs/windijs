import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePlugins } from "@windijs/plugin-utils"
import windiConfig from './windi.config'

const { plugins, windijs } = vitePlugins.vanilla({
  config: windiConfig
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...plugins,
    windijs([".jsx"]),
    react()
  ]
})
