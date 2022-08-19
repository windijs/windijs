/* eslint-disable no-console */

import { InputOptions, OutputOptions, rollup, watch } from "rollup";
import { checkFileSize, countCPU, fuzzyMatchTarget, getTargets, removeDir, runParallel } from "./utils";
import { fixHelperStyle, importsTransformer, intersectionTransformer, useTransformer, utilityTransformer } from "../packages/transformer/src";

import { ScriptTarget } from "typescript";
import chalk from "chalk";
import minimist from "minimist";
import path from "path";
import rollupTs from "rollup-plugin-ts";
import sucrase from "@rollup/plugin-sucrase";
import { terser } from "rollup-plugin-terser";

type BuildFormat = "cjs" | "mjs" | "esm" | "iife" | "dts" | "proxy";

type Pkg = {
  dependencies?: Record<string, string>,
  devDependencies?: Record<string, string>,
  peerDependencies: Record<string, string>,
  buildOptions?: { name?: string, formats?: BuildFormat[], prod?: boolean }
  private?: boolean
};

const args = minimist(process.argv.slice(2));
const targets: string[] = args._;
const formats: string | undefined = args.formats || args.f;

const isDev: boolean | undefined = args.dev || args.d;
const isRelease: boolean | undefined = args.release;
const isWatch: boolean = args.watch || args.w;
const isCheckSize: boolean | undefined = args.checkSize || args.c;

const minify: boolean = args.minify || args.m;
const production = !isDev || isRelease;
const sourceMap: boolean | undefined = args.sourcemap || args.s;
const buildAllMatching: boolean | undefined = args.all || args.a;

const defaultFormats = ["cjs", "mjs"];

let start = Date.now();

class Builder {
  target: string;
  pkg: Pkg;

  constructor (target: string) {
    this.target = target;
    this.pkg = require(`${this.path}/package.json`) as Pkg;
  }

  get path () {
    return path.resolve(`packages/${this.target}`);
  }

  get dist () {
    return this.resolve("dist");
  }

  resolve (p: string) {
    return path.join(this.path, p);
  }

  relative (p: string) {
    return path.relative(".", p);
  }

  createTSPlugin (format: BuildFormat) {
    // TODO: Maybe we need to create our own dts bundler, api-extractor doesn't support ignore external. rollup-plugin-dts bundle is messy and doesn't support multi entry. rollup-plugin-ts ignore type generic default value and also slow.

    const afterDeclarations = [
      importsTransformer, intersectionTransformer,
    ];

    if (this.target === "helpers") afterDeclarations.push(fixHelperStyle);

    return production || format === "dts"
      ? rollupTs({
        tsconfig: {
          fileName: path.resolve("tsconfig.json"),
          hook: resolvedConfig => ({
            ...resolvedConfig,
            declaration: format !== "mjs", // don't generate .d.mts file
            target: format === "cjs" ? ScriptTarget.ES2019 : ScriptTarget.ES2015,
            sourceMap,
            emitDeclarationOnly: true,
          }),
        },
        transformers: {
          afterDeclarations,
        },
      })
      : sucrase({
        exclude: ["node_modules/**", "tests/**"],
        transforms: ["typescript"],
      });
  }

  createInput (format: BuildFormat): InputOptions & { input: string } {
    const external = [
      ...Object.keys(this.pkg.dependencies || {}),
      ...Object.keys(this.pkg.peerDependencies || {}),
    ];

    const plugins = [this.createTSPlugin(format)];

    if (this.target === "utilities" && format === "proxy") {
      plugins.unshift({
        name: "proxyUtilities",
        transform (code) {
          return useTransformer(code, utilityTransformer);
        },
      });
    }

    if (minify) {
      plugins.push(terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
        safari10: true,
      }));
    }

    return {
      input: this.resolve("src/index.ts"),
      external,
      plugins,
      treeshake: {
        moduleSideEffects: false,
      },
    };
  }

  createOutput (format: BuildFormat): OutputOptions & { file: string } {
    const ext = { cjs: "js", mjs: "mjs", esm: "esm.js", iife: "iife.js", dts: "d.ts", proxy: "d.ts" }[format];
    let file = path.join(this.dist, (format === "proxy" ? format : this.target) + "." + ext);
    if (minify) file = file.replace(/\.js$/, ".min.js").replace(/\.mjs$/, ".min.mjs");
    return {
      file,
      name: this.pkg.buildOptions?.name || this.target,
      format: format === "cjs" || format === "iife" ? format : "es",
      exports: "named",
      externalLiveBindings: false,
    };
  }

  async buildFormat (format: BuildFormat) {
    const inputOptions = this.createInput(format);
    const outputOptions = this.createOutput(format);
    console.log(chalk.bold(chalk.cyan(`${this.relative(inputOptions.input)} → ${this.relative(outputOptions.file)}`)));

    rollup(inputOptions).then((bundle) => {
      console.log(chalk.bold(chalk.green(`${this.relative(inputOptions.input)} → ${this.relative(outputOptions.file)} [${(Date.now() - start) / 1000 + "s"}]`)));
      start = Date.now();

      bundle.write(this.createOutput(format)).then(() => {
        if (isCheckSize) checkFileSize(outputOptions.file, minify);
      });
    });
  }

  async build () {
    // if this is a full build (no specific targets), ignore private packages
    if ((isRelease && this.pkg.private) || this.pkg.buildOptions?.prod === false) return;

    // if building a specific format, do not remove dist.
    if (!formats) removeDir(this.dist);

    const inlineFormats = formats && formats.split(",");

    const packageFormats = (inlineFormats || this.pkg.buildOptions?.formats || defaultFormats) as BuildFormat[];

    runParallel(countCPU(), packageFormats, async (format) => this.buildFormat(format));

    if (isWatch) {
      for (const format of packageFormats) {
        const inputOptions = this.createInput(format);

        watch(inputOptions).addListener("change", (id, change) => {
          console.log(chalk.bold(chalk.blue(`[${change.event}]: ${this.relative(id)}`)));
          this.buildFormat(format);
        });
      }
    }
  }
}

async function run (targets: string[]) {
  runParallel(countCPU(), targets, (target) => new Builder(target).build());
}

run(targets.length > 0 ? fuzzyMatchTarget(getTargets(), targets, buildAllMatching ?? false) : getTargets());
