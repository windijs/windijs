import { checkSize, countCPU, fuzzyMatchTarget, getTargets, removeDir, runParallel } from "./utils";

import chalk from "chalk";
/* eslint-disable no-console */
import minimist from "minimist";
import path from "path";
import { spawn } from "child_process";

const args = minimist(process.argv.slice(2));
const targets = args._;
const formats = args.formats || args.f;
const devOnly = args.devOnly || args.d;
const prodOnly = !devOnly && (args.prodOnly || args.p);
const sourceMap = args.sourcemap || args.s;
const isRelease = args.release;
const isCheckSize = args.checkSize || args.c;
const buildTypes = args.t || args.types || isRelease;
const buildAllMatching = args.all || args.a;
const minify = args.minify || args.m;

async function build (target: string) {
  const pkgDir = path.resolve(`packages/${target}`);
  const pkg = require(`${pkgDir}/package.json`);

  // if this is a full build (no specific targets), ignore private packages
  if ((isRelease || !targets.length) && pkg.private) return;

  // if building a specific format, do not remove dist.
  if (!formats) removeDir(`${pkgDir}/dist`);

  const env = (pkg.buildOptions && pkg.buildOptions.env) || (devOnly ? "development" : "production");

  const rollup = spawn("rollup", ["-c", "--environment", [
    `NODE_ENV:${env}`,
    `TARGET:${target}`,
    formats ? `FORMATS:${formats}` : "",
    buildTypes ? "TYPES:true" : "",
    prodOnly ? "PROD_ONLY:true" : "",
    sourceMap ? "SOURCE_MAP:true" : "",
    minify ? "MINIFY:true" : "",
  ].filter(Boolean).join(",")]);

  if (isCheckSize) {
    rollup.on("close", (code) => {
      if (code === 0) formats.split(",").map(format => checkSize(target, format, minify));
    });
  } else {
    rollup.stderr.on("data", (data) => console.log(`${data}`));
  }
}

async function run (targets: string[]) {
  await runParallel(countCPU(), targets, build);
}

if (isCheckSize) console.log(`${chalk.bold(chalk.green(`Bundling Format [${formats.split(",").join(", ")}], Check Sizing...\n`))}`);

run(targets.length > 0 ? fuzzyMatchTarget(getTargets(), targets, buildAllMatching) : getTargets());
