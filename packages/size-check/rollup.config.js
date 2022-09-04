// @ts-check

import { existsSync, readdirSync, rmSync } from "fs";

import { defineConfig } from "rollup";
import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-typescript2";

const tsPlugin = ts({
  check: false,
  tsconfig: "../../tsconfig.json",
  tsconfigOverride: {
    compilerOptions: {
      target: "es2018",
      declaration: false,
      declarationMap: false,
    },
    exclude: ["node_modules/**", "**/tests"],
  },
});

const plugins = [
  tsPlugin,
  terser({
    compress: {
      ecma: 2015,
      pure_getters: true,
    },
    safari10: true,
  }),
];

if (existsSync("./dist")) rmSync("./dist", { recursive: true });

export default readdirSync("./src").map(i => defineConfig({
  input: ["src/" + i],
  output: {
    name: i.replace(".ts", ""),
    file: "./dist/" + i.replace(".ts", ".js"),
    format: "iife",
  },
  plugins,
  treeshake: {
    moduleSideEffects: false,
  },
}));
