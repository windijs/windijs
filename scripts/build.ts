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

type BuildFormat = "cjs" | "mjs" | "esm" | "iife" | "dts";

type Pkg = {
  dependencies?: Record<string, string>,
  devDependencies?: Record<string, string>,
  peerDependencies?: Record<string, string>,
  exports?: Record<string, {
    import?: string,
    require?: string
    types?: string
    node?: string
    default?: string
  }>
  buildOptions?: {
    name?: string,
    formats?: BuildFormat[],
    prod?: boolean
  }
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

  ext (format: BuildFormat): string {
    return "." + { cjs: "js", mjs: "mjs", esm: "esm.js", iife: "iife.js", dts: "d.ts" }[format];
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

  createInput (inputEntry: string, format: BuildFormat): InputOptions & { input: string } {
    const external = [
      ...Object.keys(this.pkg.dependencies || {}),
      ...Object.keys(this.pkg.peerDependencies || {}),
    ];

    const plugins = [this.createTSPlugin(format)];

    if (this.target === "utilities" && inputEntry.includes("proxy")) {
      plugins.unshift({
        name: "proxyUtilities",
        transform (code) {
          return useTransformer(code, utilityTransformer);
        },
      });
    }

    if (this.target === "style" && inputEntry.includes("global")) external.push("./utility");

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
      input: path.join(this.path, "src", inputEntry),
      external,
      plugins,
      treeshake: {
        moduleSideEffects: false,
      },
    };
  }

  createOutput (outputEntry: string, format: BuildFormat): OutputOptions & { file: string } {
    if (minify) outputEntry = outputEntry.replace(/\.js$/, ".min.js").replace(/\.mjs$/, ".min.mjs");
    return {
      file: this.resolve(outputEntry),
      name: this.pkg.buildOptions?.name || this.target,
      format: format === "cjs" || format === "iife" ? format : "es",
      exports: "named",
      externalLiveBindings: false,
    };
  }

  async rollup (inputEntry: string, outputEntry: string, format: BuildFormat) {
    const inputOptions = this.createInput(inputEntry, format);
    const outputOptions = this.createOutput(outputEntry, format);
    console.log(chalk.bold(chalk.cyan(`${this.relative(inputOptions.input)} → ${this.relative(outputOptions.file)}`)));

    rollup(inputOptions).then((bundle) => {
      console.log(chalk.bold(chalk.green(`${this.relative(inputOptions.input)} → ${this.relative(outputOptions.file)} [${(Date.now() - start) / 1000 + "s"}]`)));
      start = Date.now();

      bundle.write(this.createOutput(outputEntry, format)).then(() => {
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

    const tasks: {
      input: string;
      output: string;
      format: BuildFormat;
    }[] = [];

    for (const [k, v] of Object.entries(this.pkg.exports ?? { ".": {} })) {
      if (Object.keys(v).length === 0) {
        for (const format of packageFormats) {
          tasks.push({
            input: "./index.ts",
            output: "./dist/" + this.target + this.ext(format),
            format,
          });
        }
        continue;
      }
      for (const [t, p] of Object.entries(v)) {
        if (t === "types" && "require" in v) continue;
        tasks.push({
          input: k === "." ? "./index.ts" : k + ".ts",
          output: p,
          format: t === "import" ? "mjs" : t === "types" ? "dts" : "cjs",
        });
      }
    }

    runParallel(countCPU(), tasks, async (task) => this.rollup(task.input, task.output, task.format));

    if (isWatch) {
      for (const task of tasks) {
        const inputOptions = this.createInput(task.input, task.format);

        watch(inputOptions).addListener("change", (id, change) => {
          console.log(chalk.bold(chalk.blue(`[${change.event}]: ${this.relative(id)}`)));
          this.rollup(task.input, task.output, task.format);
        });
      }
    }
  }
}

async function run (targets: string[]) {
  runParallel(countCPU(), targets, (target) => new Builder(target).build());
}

run(targets.length > 0 ? fuzzyMatchTarget(getTargets(), targets, buildAllMatching ?? false) : getTargets());
