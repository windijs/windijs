// @ts-check

import { defineConfig } from "rollup";
import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-typescript2";

const tsPlugin = ts({
  check: false,
  tsconfig: "../../tsconfig.json",
  tsconfigOverride: {
    compilerOptions: {
      target: "es2015",
      declaration: false,
      declarationMap: false,
    },
    exclude: ["node_modules/**", "**/tests"],
  },
});

export default defineConfig({
  input: ["src/index.ts"],
  output: {
    name: "SizeCheck",
    file: "./dist/index.js",
    format: "iife",
  },
  plugins: [
    tsPlugin,
    terser({
      compress: {
        ecma: 2015,
        pure_getters: true,
      },
      safari10: true,
    }),
  ],
});
