/* eslint-disable no-console, @typescript-eslint/no-var-requires */

import chalk from "chalk";
import { spawn } from "child_process";
import chokidar from "chokidar";
import minimist from "minimist";
import path from "path";
import { CompilerOptions, factory, ModuleKind, ScriptTarget, sys } from "typescript";

import { bundleDts } from "./bundle";
import { checkFileSize, countCPU, fuzzyMatchTarget, getTargets, removeDir, runParallel } from "./utils";

import {
  importTypesTransformer,
  injectTransformer,
  intersectionTransformer,
  omitTransformer,
  updateVariableType,
  utilityTransformer,
} from "../packages/transformer/src";

const args = minimist(process.argv.slice(2));
const targets: string[] = args._;
const formats: string | undefined = args.formats || args.f;

const isDev: boolean | string | undefined = args.dev || args.d;
if (typeof isDev === "string") targets.push(isDev); // fix pnpm dev ...
const isRelease: boolean | undefined = args.release;
const isWatch: boolean = args.watch || args.w;
const isCheckSize: boolean | undefined = args.checkSize || args.c;

const minify: boolean = args.minify || args.m;
const buildTypes = args.t || args.types || isRelease;
const sourceMap: boolean | undefined = args.sourcemap || args.s;
const buildAllMatching: boolean | undefined = args.all || args.a;

const dtsConfig: CompilerOptions = {
  target: ScriptTarget.ESNext,
  module: ModuleKind.ESNext,
  paths: {
    "@windijs/*": ["packages/*/src/index.ts"],
  },
  stripInternal: true,
};

function buildDts(target: string) {
  const pkgDir = `packages/${target}`;
  const pkg = require(`${path.resolve(pkgDir)}/package.json`);
  const entries = [
    {
      input: path.join(pkgDir, "src/index.ts"),
      output: path.join(pkgDir, `dist/${pkg.buildOptions?.name ?? target}.d.ts`),
    },
  ];
  if (target === "utilities")
    return bundleDts(
      entries,
      dtsConfig,
      {
        afterDeclarations: [
          importTypesTransformer,
          omitTransformer,
          intersectionTransformer,
          injectTransformer,
          updateVariableType({
            animate: node =>
              factory.createTypeReferenceNode("Inject", [
                node,
                factory.createLiteralTypeNode(factory.createStringLiteral("$windi.config.animationConfig.proxy")),
              ]),
            colors: node =>
              factory.createTypeReferenceNode("Inject", [
                node,
                factory.createLiteralTypeNode(factory.createStringLiteral("$windi.config.colorsConfig")),
              ]),
          }),
        ],
      },
      [utilityTransformer]
    );

  if (target === "plugin-utils")
    entries.push({
      input: path.join(pkgDir, "src/vite.ts"),
      output: path.join(pkgDir, "dist/vite.d.ts"),
    });

  return bundleDts(entries, dtsConfig);
}

async function build(target: string) {
  const pkgDir = `packages/${target}`;
  const pkg = require(`${path.resolve(pkgDir)}/package.json`);

  // build dts only
  if (formats === "dts") return buildDts(target);

  // if this is a full build (no specific targets), ignore private packages
  if ((isRelease && pkg.private) || pkg.buildOptions?.prod === false) return;

  // if building a specific format, do not remove dist.
  if (!formats) removeDir(`${pkgDir}/dist`);

  const env = (pkg.buildOptions && pkg.buildOptions.env) || (isDev ? "development" : "production");

  const rollup = await spawn("rollup", [
    "-c",
    "--environment",
    [
      `NODE_ENV:${env}`,
      `TARGET:${target}`,
      minify ? "MINIFY:true" : "",
      formats ? `FORMATS:${formats}` : "",
      buildTypes ? "TYPES:true" : "",
      sourceMap ? "SOURCE_MAP:true" : "",
    ]
      .filter(Boolean)
      .join(","),
  ]);

  !isCheckSize &&
    rollup.stderr.on("data", data => {
      process.stdout.write(data);
    });

  rollup.on("close", code => {
    if (code !== 0) sys.exit(1);
    if ((buildTypes || formats?.includes("dts")) && pkg.types) {
      console.log();
      buildDts(target);
    }
    if (isCheckSize) checkFileSize(path.join(pkgDir, `dist/${target}.${formats}.js`), minify);
  });
}

async function run(targets: string[]) {
  runParallel(countCPU(), targets, build);

  if (isWatch) {
    const watcher = chokidar.watch(
      targets.map(i => `packages/${i}`),
      {
        ignored: /.*(node_modules|dist|tests|README|LICENSE|package.json|DS_Store)/,
      }
    );

    watcher
      .on("change", p => {
        console.log(chalk.blueBright(`\nchanged ${chalk.bold(p)}`));
        const target = p.split("/")[1];
        build(target);
      })
      .on("ready", () => {
        console.log(chalk.blue("start watching..."));
      });
  }
}

run(targets.length > 0 ? fuzzyMatchTarget(getTargets(), targets, buildAllMatching ?? false) : getTargets());
