// @ts-check

import commonjs from "@rollup/plugin-commonjs";
import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
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
const isProduction = process.env.NODE_ENV === "production";
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(",");
const packageFormats = inlineFormats || buildOptions.formats || defaultFormats;
const resolve = (/** @type {string} */ p) => path.join(packageDir, p);

// ensure TS checks only once for each build
let hasTSChecked = false;

function createTS(format) {
  const plugin = isProduction
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
 * @param {string} name
 * @returns
 */
function createOutput(format, name) {
  return {
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
    runtime: {
      file: resolve(`dist/${name}.runtime.js`),
      format: "iife",
      globals: {
        "@windijs/core": "windijsCore",
        "@windijs/config": "windijsConfig",
        "@windijs/colors": "windijsColors",
        "@windijs/shared": "windijsShared",
        "@windijs/style": "windijsStyle",
        "@windijs/utilities": "windijsUtilities",
        "@windijs/variants": "windijsVariants",
        "@windijs/helpers": "windijsHelpers",
      },
    },
  }[format];
}

/**
 *
 * @param {string} format
 * @param {string} name
 * @param {string} entry
 * @param {import("rollup").OutputOptions} output
 * @returns {import("rollup").RollupOptions}
 */
function createConfig(format, name, entry = "index.ts", output = createOutput(format, name)) {
  if (!output) {
    // eslint-disable-next-line no-console
    console.log(require("chalk").yellow(`invalid format: "${format}"`));
    process.exit(1);
  }

  output.exports = "named";
  if (format === "mjs" && name === "utilities") output.generatedCode = { constBindings: true };
  output.sourcemap = !!process.env.SOURCE_MAP;
  output.externalLiveBindings = false;

  if (format === "iife" || format === "runtime") output.name = buildOptions.name;

  const plugins = [createTS(format), commonjs(), nodeResolve()];

  if (process.env.MINIFY || (format === "runtime" && isProduction))
    plugins.push(
      terser({
        module: format === "esm",
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
        safari10: true,
      })
    );

  return defineConfig({
    input: resolve("src/" + entry),
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins,
    output,
    treeshake: {
      moduleSideEffects: false,
    },
  });
}

const options = packageFormats.map(format => createConfig(format, name));

if (name === "windijsUtilities")
  // build es modules, good for tree-shaking.
  options.push(
    createConfig("es", name, undefined, {
      dir: resolve("dist/es"),
      format: "esm",
      preserveModules: true,
    })
  );

if (name === "plugin-utils") options.push(...packageFormats.map(format => createConfig(format, "vite", "vite.ts")));

export default options;
