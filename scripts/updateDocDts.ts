/* eslint-disable no-console */
import chalk from "chalk";
import { readdirSync, copyFileSync } from "fs";
import { basename, relative, resolve } from "path";
import { getTargets } from "./utils";

const targets = getTargets().filter(i => i !== "windicss");

const types: string[] = [];

for (const target of targets) {
  const p = resolve("packages", target, "dist");
  const r = readdirSync(p)
    .filter(i => /^windi.*\.d\.ts/.test(i))
    .map(i => resolve(p, i));
  types.push(...r);
}

for (const r of types) {
  const target = resolve("docs/.vitepress/monaco/types", basename(r));
  copyFileSync(r, target);
  console.log(chalk.cyan(`Copying ${relative(".", r)} to ${relative(".", target)}`));
}

console.log(chalk.green("Done!"));
