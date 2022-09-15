import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import windijs from "@windijs/plugin-utils/vite";

import windiConfig from "./windi.config";

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig,
    }),
    vue(),
  ],
});
