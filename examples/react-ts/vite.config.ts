import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import windijs from "@windijs/plugin-utils/vite";

import windiConfig from "./windi.config";

export default defineConfig({
  plugins: [
    windijs({
      config: windiConfig,
      exts: [".tsx"],
    }),
    react(),
  ],
});
