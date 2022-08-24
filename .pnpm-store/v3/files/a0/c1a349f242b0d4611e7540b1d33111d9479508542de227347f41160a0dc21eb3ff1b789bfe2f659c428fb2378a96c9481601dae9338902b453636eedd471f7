import {
  ProgressEvent,
  __toESM,
  init_esm_shims,
  isReleaseType,
  require_log_symbols,
  versionBump
} from "../chunk-DW6HTJ47.mjs";

// src/cli/index.ts
init_esm_shims();
var import_log_symbols = __toESM(require_log_symbols());

// package.json
var version = "8.2.1";

// src/cli/exit-code.ts
init_esm_shims();
var ExitCode = /* @__PURE__ */ ((ExitCode2) => {
  ExitCode2[ExitCode2["Success"] = 0] = "Success";
  ExitCode2[ExitCode2["FatalError"] = 1] = "FatalError";
  ExitCode2[ExitCode2["InvalidArgument"] = 9] = "InvalidArgument";
  return ExitCode2;
})(ExitCode || {});

// src/cli/parse-args.ts
init_esm_shims();
import { valid as isValidVersion } from "semver";
import cac from "cac";
function parseArgs() {
  try {
    const cli = cac("bumpp");
    cli.version(version).usage("[...files]").option("--preid <preid>", "ID for prerelease").option("--all", "Include all files").option("-c, --commit [msg]", "Commit message", { default: true }).option("-t, --tag [tag]", "Tag name", { default: true }).option("-p, --push", "Push to remote", { default: true }).option("-y, --yes", "Skip confirmation").option("--no-verify", "Skip git verification").option("--ignore-scripts", "Ignore scripts", { default: false }).option("-q, --quiet", "Quiet mode").option("-v, --version <version>", "Tagert version").option("-x, --execute <command>", "Commands to execute after version bumps").help();
    const result = cli.parse();
    const args = result.options;
    const parsedArgs = {
      help: args.help,
      version: args.version,
      quiet: args.quiet,
      options: {
        preid: args.preid,
        commit: args.commit,
        tag: args.tag,
        push: args.push,
        all: args.all,
        confirm: !args.yes,
        noVerify: !args.verify,
        files: [...args["--"] || [], ...result.args],
        ignoreScripts: args.ignoreScripts,
        execute: args.execute
      }
    };
    if (parsedArgs.options.files && parsedArgs.options.files.length > 0) {
      const firstArg = parsedArgs.options.files[0];
      if (firstArg === "prompt" || isReleaseType(firstArg) || isValidVersion(firstArg)) {
        parsedArgs.options.release = firstArg;
        parsedArgs.options.files.shift();
      }
    }
    return parsedArgs;
  } catch (error) {
    return errorHandler(error);
  }
}
function errorHandler(error) {
  console.error(error.message);
  return process.exit(9 /* InvalidArgument */);
}

// src/cli/index.ts
async function main() {
  try {
    process.on("uncaughtException", errorHandler2);
    process.on("unhandledRejection", errorHandler2);
    const { help, version: version2, quiet, options } = parseArgs();
    if (help) {
      process.exit(0 /* Success */);
    } else if (version2) {
      console.log(version);
      process.exit(0 /* Success */);
    } else {
      if (!quiet)
        options.progress = progress;
      await versionBump(options);
    }
  } catch (error) {
    errorHandler2(error);
  }
}
function progress({ event, script, updatedFiles, skippedFiles, newVersion }) {
  switch (event) {
    case "file updated" /* FileUpdated */:
      console.log(import_log_symbols.success, `Updated ${updatedFiles.pop()} to ${newVersion}`);
      break;
    case "file skipped" /* FileSkipped */:
      console.log(import_log_symbols.info, `${skippedFiles.pop()} did not need to be updated`);
      break;
    case "git commit" /* GitCommit */:
      console.log(import_log_symbols.success, "Git commit");
      break;
    case "git tag" /* GitTag */:
      console.log(import_log_symbols.success, "Git tag");
      break;
    case "git push" /* GitPush */:
      console.log(import_log_symbols.success, "Git push");
      break;
    case "npm script" /* NpmScript */:
      console.log(import_log_symbols.success, `Npm run ${script}`);
      break;
  }
}
function errorHandler2(error) {
  let message = error.message || String(error);
  if (process.env.DEBUG || process.env.NODE_ENV === "development")
    message = error.stack || message;
  console.error(message);
  process.exit(1 /* FatalError */);
}
export {
  main
};
