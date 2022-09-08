import { defineConfig } from "vite";
import { resolve } from "path";
import windiConfig from "./windi.config";
import windijs from "@windijs/plugin-utils/vite";

const windi = windijs({
  include: [
    "./.vitepress/**/*.vue",
  ],
  env: {
    rootEntry: __dirname,
    moduleEntry: false,
    globalEntry: "./.vitepress/windi-global.d.ts",
  },
  config: windiConfig,
});

export default defineConfig({
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, ".vitepress/components")}/`,
    },
  },
  plugins: [
    windi,
    {
      name: "windi-markdown-transform",
      transform (code, id) {
        if (id.endsWith(".md")) return windi.api.vuePreprocess(code);
        return code;
      },
    },
  ],
  server: {
    fs: {
      allow: [".."],
    },
  },
});
