/* eslint-disable no-console */
import chalk from "chalk";
import { readdirSync, copyFileSync } from "fs";
import { basename, relative, resolve } from "path";
import { getTargets } from "./utils";

const targets = getTargets();

// console.log(targets);

const runtimes: string[] = [];

for (const target of targets) {
  const p = resolve("packages", target, "dist");
  const r = readdirSync(p)
    .filter(i => /^windi.*\.runtime\.js/.test(i))
    .map(i => resolve(p, i));
  runtimes.push(...r);
}

for (const r of runtimes) {
  const target = resolve("docs/public/scripts", basename(r));
  copyFileSync(r, target);
  console.log(chalk.cyan(`Copying ${relative(".", r)} to ${relative(".", target)}`));
}

console.log(chalk.green("Done!"));
