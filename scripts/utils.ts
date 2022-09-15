/* eslint-disable no-console */

import chalk from "chalk";
import { compress } from "brotli";
import { existsSync, readdirSync, readFileSync, rmSync, statSync } from "fs";
import { cpus } from "os";
import { basename } from "path";
import { gzipSync } from "zlib";

export function removeDir(name: string) {
  if (existsSync(name)) rmSync(name, { recursive: true });
}

export function checkFileSize(filePath: string, minify = false) {
  if (!existsSync(filePath)) return;
  const file = readFileSync(filePath);
  const minSize = (file.length / 1024).toFixed(2) + "kb";
  const gzipped = gzipSync(file);
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + "kb";
  const compressed = compress(file);
  const compressedSize = !compressed ? NaN : (compressed.length / 1024).toFixed(2) + "kb";
  console.log(`${chalk.blue(chalk.bold(basename(filePath)))} ${minify ? "min" : "raw"}:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`);
}

export function getTargets() {
  return readdirSync("./packages").filter(f => {
    if (!statSync(`packages/${f}`).isDirectory() || !existsSync(`packages/${f}/package.json`)) return false;
    const pkg = require(`../packages/${f}/package.json`);
    return !pkg.private;
  });
}

export const fuzzyMatchTarget = (globalTargets: string[], partialTargets: string[], includeAllMatching: boolean) => {
  const matched: string[] = [];
  partialTargets.forEach(partialTarget => {
    for (const target of globalTargets)
      if (target.match(partialTarget)) {
        matched.push(target);
        if (!includeAllMatching) break;
      }
  });
  if (matched.length) return matched;
  console.log();
  console.error(`  ${chalk.bgRed.white(" ERROR ")} ${chalk.red(`Target ${chalk.underline(partialTargets)} not found!`)}`);
  console.log();

  process.exit(1);
};

export function countCPU() {
  return cpus().length;
}

export async function runParallel<T>(maxConcurrency: number, source: T[], iteratorFn: (target: T, source: T[]) => void) {
  const ret: Promise<void>[] = [];
  const executing: void[] = [];
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source));
    ret.push(p);

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= maxConcurrency) await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}

export function handleError<T>(err: T | null) {
  if (err) console.error(`${chalk.red(err)}`);
}

export function hash(str: string): string {
  str = str.replace(/\r/g, "");
  let hash = 5381;
  let i = str.length;

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
  return (hash >>> 0).toString(36);
}
