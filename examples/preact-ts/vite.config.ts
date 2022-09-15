import { defineConfig } from "vite";

import preact from "@preact/preset-vite";
import windijs from "@windijs/plugin-utils/vite";

import windiConfig from "./windi.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig,
    }),
    preact(),
  ],
});
