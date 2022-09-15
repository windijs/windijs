/* eslint-disable @typescript-eslint/no-var-requires */
/** A monorepo manger, It's not used for now, leave for future reference */

import chalk from "chalk";
import { spawn } from "child_process";
import { prompt } from "enquirer";
import fs from "fs";
import path from "path";
import semver, { ReleaseType } from "semver";

/* eslint-disable no-console */
import type { Pkg } from "./types";
import { getTargets, handleError, hash } from "./utils";

const targets = getTargets();
let hashes: Record<string, string> = require("../.hashes.json");
const versionIncrements = ["patch", "minor", "major", "prepatch", "preminor", "premajor", "prerelease"];

function getConfigRoot(target: string): string {
  return path.resolve(`packages/${target}`);
}

/** Get package.json path of target */
function getConfigPath(target: string): string {
  return path.resolve(`packages/${target}/package.json`);
}

/** Get config instance of target */
function getConfig(target: string): Pkg {
  return JSON.parse(fs.readFileSync(getConfigPath(target), "utf-8")) as Pkg;
}

/** Write new config to target */
function writeConfig(target: string, pkg: Pkg) {
  console.log(chalk.green(`Update packages/${target}/package.json ...`));
  fs.writeFileSync(getConfigPath(target), JSON.stringify(pkg, undefined, 2) + "\n");
}

function relatedPackages(target: string) {
  const name = getConfig(target).name;

  const pkgs = targets.filter(i => i !== target).map(i => [i, getConfig(i)] as [string, Pkg]);

  const related: string[] = [];
  const devRelated: string[] = [];
  const peerRelated: string[] = [];

  for (const [target, pkg] of pkgs) {
    if (pkg.dependencies && name in pkg.dependencies) related.push(target);

    if (pkg.devDependencies && name in pkg.devDependencies) devRelated.push(target);

    if (pkg.peerDependencies && name in pkg.peerDependencies) peerRelated.push(target);
  }

  if (related.length === 0 && devRelated.length === 0 && peerRelated.length === 0) console.log(target + " has no related pacakges");
  else console.log(target + " related packaged:");

  if (related.length > 0) console.log("- dependencies related " + "[" + related.join(", ") + "]");

  if (devRelated.length > 0) console.log("- devDependencies related " + "[" + devRelated.join(", ") + "]");

  if (peerRelated.length > 0) console.log("- peerDependencies related " + "[" + peerRelated.join(", ") + "]");
}

function getAllRelated(selected: string[]): string[] {
  const selectedPkgs = selected.map(i => [i, getConfig(i)] as [string, Pkg]);
  const pkgs = targets.filter(i => !selected.includes(i)).map(i => [i, getConfig(i)] as [string, Pkg]);

  const related: string[] = [];

  for (const [target, pkg] of pkgs)
    for (const item of selectedPkgs)
      if (pkg.dependencies && item[1].name in pkg.dependencies) {
        related.push(target);
        break;
      }

  return related;
}

/** Update package related packege's version */
function updateRelatedPackage(target: string, version: string) {
  const name = getConfig(target).name;

  const pkgs = targets.filter(i => i !== target).map(i => [i, getConfig(i)] as [string, Pkg]);

  let changed = false;

  for (const [target, pkg] of pkgs) {
    changed = false;
    if (pkg.dependencies && name in pkg.dependencies) {
      pkg.dependencies[name] = version;
      changed = true;
    }

    if (pkg.devDependencies && name in pkg.devDependencies) {
      pkg.devDependencies[name] = version;
      changed = true;
    }

    if (pkg.peerDependencies && name in pkg.peerDependencies) {
      pkg.peerDependencies[name] = version;
      changed = true;
    }

    if (changed) writeConfig(target, pkg);
  }
}

async function publishPackage(target: string, dryRun = true) {
  const pkg = getConfig(target);
  const version = pkg.version;

  let releaseTag: string | undefined;
  if (version.includes("alpha")) releaseTag = "alpha";
  else if (version.includes("beta")) releaseTag = "beta";
  else if (version.includes("rc")) releaseTag = "rc";

  console.log(chalk.cyan(`Publishing ${pkg.name}...`));
  const npm = await spawn("npm", ["publish", ...(dryRun ? ["--dry-run"] : []), ...(releaseTag ? ["--tag", releaseTag] : []), "--access", "public"], {
    cwd: getConfigRoot(target),
  });

  npm.stdout.on("data", data => process.stdout.write(data));

  npm.stderr.on("data", data => process.stderr.write(data));

  npm.on("close", code => {
    if (code === 0) console.log(chalk.green(`Successfully published ${pkg.name}@${version}`));
    else throw new Error(`child process exited with code ${code}`);
  });
}

/** Update package version and its related package's version */
function updatePackage(target: string, version: string) {
  const pkg = getConfig(target);
  pkg.version = version;
  writeConfig(target, pkg);
  updateRelatedPackage(target, version);
}

/** Get file paths of dir */
function getFiles(dir: string) {
  return fs
    .readdirSync(dir, { encoding: "utf-8" })
    .filter(i => !i.startsWith(".") && fs.statSync(path.join(dir, i)).isFile())
    .map(i => path.join(dir, i));
}

/** Generate a hash for package release, then we compare this hash with previous hash, if it not changed, then package version wouldn't be updated. */
function generateHash(target: string) {
  const base = path.resolve(`packages/${target}`);
  const content = [...getFiles(base), ...getFiles(path.join(base, "dist"))].map(i => fs.readFileSync(i)).join();

  return hash(content);
}

/** Generate packages hashes object */
function generateHashes(packages: string[]) {
  return Object.fromEntries(packages.map(i => [i, generateHash(i)]));
}

/** Update packages hashes cache */
function updateHashes(published: string[] | undefined = undefined) {
  console.log(chalk.cyan("Writing new hashes to .hashes.json ..."));
  if (published == null) hashes = generateHashes(targets);
  else for (const target of published) hashes[target] = generateHash(target);

  fs.writeFileSync(".hashes.json", JSON.stringify(hashes, undefined, 2) + "\n");
}

function trackChanges(packages: string[]) {
  const newHashes = generateHashes(packages);
  const added = Object.keys(newHashes).filter(i => !(i in hashes));
  const changed = Object.entries(newHashes)
    .filter(([k, v]) => k in hashes && hashes[k] !== v)
    .map(([k]) => k);
  const removed = Object.keys(hashes).filter(i => !(i in newHashes));

  return { added, changed, removed };
}

/** Filter changed packages based on hashes cache */
function logChanges(added: string[], changed: string[], removed: string[]) {
  if (added.length > 0) console.log(chalk.green(`- ${added.length} package${added.length === 1 ? "" : "s"} added [${added.join(", ")}]`));

  if (changed.length > 0) console.log(chalk.blue(`- ${changed.length} package${changed.length === 1 ? "" : "s"} changed [${changed.join(", ")}]`));

  if (removed.length > 0) console.log(chalk.red(`- ${removed.length} package${removed.length === 1 ? "" : "s"} removed [${removed.join(", ")}]`));

  if (added.length === 0 && changed.length === 0 && removed.length === 0) console.log(chalk.blue("No changes found."));

  console.log();
}

async function selectVersion(target: string) {
  const config = getConfig(target);
  const currentVersion = config.version;
  const preId = (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)?.[0]) || "beta";
  let targetVersion: string;

  const { release } = (await prompt({
    type: "select",
    name: "release",
    message: `Select new version for ${config.name}, current version ${chalk.green(config.version)}`,
    choices: versionIncrements
      .map(i => `${i} (${semver.inc(currentVersion, i as ReleaseType, preId)})`)
      .concat([`leave as-is (${currentVersion})`, "custom..."]),
  })) as { release: string };

  if (release === "custom...")
    targetVersion = (
      (await prompt({
        type: "input",
        name: "version",
        message: "Input custom version",
        initial: currentVersion,
      })) as { version: string }
    ).version;
  else targetVersion = release.match(/\((.*)\)/)?.[1] ?? "1.0.0";

  if (!semver.valid(targetVersion)) throw new Error(`invalid target version: ${targetVersion}`);

  return targetVersion;
}

async function selectPackage() {
  const response = (await prompt({
    type: "select",
    name: "package",
    message: "Please select package",
    choices: [...targets],
  })) as { package: string };

  return response.package;
}

async function selectPackages(choices = [...targets], message = "Please select packages") {
  const { packages } = (await prompt({
    type: "MultiSelect",
    name: "packages",
    message,
    choices,
  } as Parameters<typeof prompt>[0])) as { packages: string[] };

  return packages;
}

async function confirm(message: string) {
  const { yes } = (await prompt({
    type: "confirm",
    name: "yes",
    message,
  })) as { yes: boolean };

  return yes;
}

async function main(dryRun = true) {
  console.log(chalk.cyan("Tracking package changes since last release..."));
  const changes = trackChanges(targets);
  logChanges(changes.added, changes.changed, changes.removed);

  const { operation } = (await prompt({
    type: "select",
    name: "operation",
    message: "Please select operation type",
    choices: [
      { name: "release", message: `[${chalk.blue("release")}] release current changed packages and their dependencies related packages` },
      { name: "updateVersion", message: `[${chalk.blue("updateVersion")}] update target package version and related package's dependencies version` },
      { name: "checkRelated", message: `[${chalk.green("checkRelated")}] check packages related to target package` },
      { name: "publishPackage", message: `[${chalk.yellow("publishPackage")}] publish selected package, in most cases, you should use release!` },
      { name: "updateCache", message: `[${chalk.yellow("updateCache")}] update hashes cache based on current build` },
    ],
  })) as { operation: string };

  let yes: boolean, target: string, selected: string[], related: string[], newSelected: string[], published: string[] | undefined, version: string;

  switch (operation) {
    case "release":
      selected = [...changes.added, ...changes.changed];
      if (selected.length === 0) {
        console.log("No packages need to be released");
        return;
      }
      yes = await confirm(`These changed packages(${selected}) need to be released, confirm?`);
      if (yes) {
        for (const target of selected) {
          version = await selectVersion(target);
          updatePackage(target, version);
        }

        related = getAllRelated(selected);
        if (related.length > 0) {
          newSelected = await selectPackages(related, `These packages depends on [${selected.join(", ")}], select packges you want to release.`);
          selected.push(...newSelected);
          for (const target of newSelected) {
            version = await selectVersion(target);
            updatePackage(target, version);
          }
        }

        yes = await confirm("All changes has been made, publish?");
        if (yes) {
          published = [];
          for (const target of selected) {
            await publishPackage(target, dryRun);
            published.push(target);
          }
        }
        updateHashes(published);
      }
      break;
    case "publishPackage":
      target = await selectPackage();
      version = await selectVersion(target);
      updatePackage(target, version);
      await publishPackage(target, dryRun);
      updateHashes([target]);
      break;
    case "updateCache":
      yes = await confirm("Update all hashes?");
      if (yes) updateHashes();
      break;
    case "updateVersion":
      target = await selectPackage();
      version = await selectVersion(target);
      updatePackage(target, version);
      break;
    case "checkRelated":
      selected = await selectPackages();
      selected.forEach(i => {
        relatedPackages(i);
        console.log();
      });
      break;
  }
}

main().catch(err => {
  handleError(err);
});
