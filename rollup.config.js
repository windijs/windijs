// @ts-check

import { defineConfig } from "rollup";
import path from "path";
import sucrase from "@rollup/plugin-sucrase";
import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-typescript2";

if (!process.env.TARGET) throw new Error("TARGET package must be specified via --environment flag.");

const packageDir = path.join("packages", process.env.TARGET);
/** @type { import("./scripts/types").Pkg } */
const pkg = require(path.resolve(packageDir, "package.json"));
const buildOptions = pkg.buildOptions || {};
const name = buildOptions.name || path.basename(packageDir);
const sourceMap = !!process.env.SOURCE_MAP;
const defaultFormats = ["cjs", "mjs"];
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(",");
const packageFormats = inlineFormats || buildOptions.formats || defaultFormats;
const resolve = (/** @type {string} */ p) => path.join(packageDir, p);

const outputConfigs = {
  cjs: {
    file: resolve(`dist/${name}.js`),
    format: "cjs",
  },
  mjs: {
    file: resolve(`dist/${name}.mjs`),
    format: "es",
  },
  esm: {
    file: resolve(`dist/${name}.esm.js`),
    format: "es",
  },
  iife: {
    file: resolve(`dist/${name}.iife.js`),
    format: "iife",
  },
};

// ensure TS checks only once for each build
let hasTSChecked = false;

function createTS (format) {
  const plugin = process.env.NODE_ENV === "production"
    ? ts({
      check: !hasTSChecked,
      tsconfig: "tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          target: format === "cjs" ? "es2020" : "es2018",
          sourceMap,
          declaration: false,
          declarationMap: false,
        },
        exclude: ["node_modules/**", "**/tests"],
      },
    })
    : sucrase({
      exclude: ["node_modules/**", "**/tests"],
      transforms: ["typescript"],
    });

  hasTSChecked = true;
  return plugin;
}

/**
 *
 * @param {string} format
 * @param {import("rollup").OutputOptions} output
 * @returns {import("rollup").RollupOptions}
 */
function createConfig (format, output) {
  if (!output) {
    // eslint-disable-next-line no-console
    console.log(require("chalk").yellow(`invalid format: "${format}"`));
    process.exit(1);
  }

  output.exports = "named";
  output.sourcemap = !!process.env.SOURCE_MAP;
  output.externalLiveBindings = false;

  if (format === "iife") output.name = buildOptions.name;

  const plugins = [createTS(format)];

  if (process.env.MINIFY) {
    plugins.push(terser({
      module: format === "esm",
      compress: {
        ecma: 2015,
        pure_getters: true,
      },
      safari10: true,
    }));
  }

  return defineConfig({
    input: resolve("src/index.ts"),
    external: [
      "path",
      "fs",
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins,
    output,
    treeshake: {
      moduleSideEffects: false,
    },
  });
}

export default packageFormats.map(format => createConfig(format, outputConfigs[format]));
