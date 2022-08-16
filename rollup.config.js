// @ts-check

import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import path from "path";
// @ts-ignore
import sucrase from "@rollup/plugin-sucrase";
import ts from "rollup-plugin-typescript2";

if (!process.env.TARGET) throw new Error("TARGET package must be specified via --environment flag.");

const packagesDir = path.resolve(__dirname, "packages");
const packageDir = path.resolve(packagesDir, process.env.TARGET);
const resolve = p => path.resolve(packageDir, p);
const pkg = require(resolve("package.json"));
const packageOptions = pkg.buildOptions || {};
const name = packageOptions.filename || path.basename(packageDir);

// ensure TS checks only once for each build
let hasTSChecked = false;

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
  dts: {
    file: resolve(`dist/${name}.d.ts`),
    format: "es",
  },
};

function createConfig (format, output, plugins = []) {
  if (!output) {
    // eslint-disable-next-line no-console
    console.log(require("chalk").yellow(`invalid format: "${format}"`));
    process.exit(1);
  }

  output.exports = "named";
  output.sourcemap = !!process.env.SOURCE_MAP;
  output.externalLiveBindings = false;

  if (format === "iife") output.name = packageOptions.name;

  const tsPlugin = process.env.NODE_ENV === "production"
    ? ts({
      check: process.env.NODE_ENV === "production" && !hasTSChecked,
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      cacheRoot: path.resolve(__dirname, "node_modules/.rts2_cache"),
      tsconfigOverride: {
        compilerOptions: {
          target: format === "cjs" ? "es2019" : "es2015",
          sourceMap: output.sourcemap,
          declaration: false,
          declarationMap: false,
        },
        exclude: ["**/tests"],
      },
    })
    : sucrase({
      exclude: ["node_modules/**", "tests/**"],
      transforms: ["typescript"],
    });

  hasTSChecked = true;

  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];

  return defineConfig({
    input: resolve("src/index.ts"),
    external,
    plugins: format === "dts" ? [dts()] : [tsPlugin, ...plugins],
    output,
    treeshake: {
      moduleSideEffects: false,
    },
  });
}

function createMinifiedConfig (format) {
  const { terser } = require("rollup-plugin-terser");
  return createConfig(
    format,
    {
      file: outputConfigs[format].file.replace(/\.js$/, ".min.js").replace(/\.mjs$/, ".min.mjs"),
      format: outputConfigs[format].format,
    },
    [
      terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
        safari10: true,
      }),
    ],
  );
}

const defaultFormats = ["cjs", "mjs"];
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(",");
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats;

if (process.env.TYPES && !packageFormats.includes("dts")) packageFormats.push("dts");

const packageConfigs = process.env.PROD_ONLY ? [] : packageFormats.map(format => createConfig(format, outputConfigs[format]));

if (process.env.NODE_ENV === "production") {
  packageFormats.forEach(format => {
    if (packageOptions.prod === false) return;
    if (process.env.MINIFY) packageConfigs.push(createMinifiedConfig(format));
  });
}

export default packageConfigs;
