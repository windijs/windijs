import { EntryOptions, PluginEnv, PluginOptions, ResolvedPluginEnv, ResolvedPluginOptions } from "./types";
import { basename, join, resolve } from "path";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";

export const DefaultOptions: ResolvedPluginOptions = {
  include: ["./src/**/*.{vue,jsx,tsx}"],
  exclude: ["**/node_modules"],
  config: {},
  env: {
    rootEntry: "./",
    configEntry: "./windi.config",
    nodeModulesEntry: "./node_modules",
    globalEntry: "./src/windi-global.d.ts",
    moduleEntry: "./src/windi-module.d.ts",
    variants: {
      lib: "@windijs/variants",
      module: true,
      global: true,
    },
    utilities: {
      lib: "@windijs/utilities",
      module: true,
      global: true,
    },
    config: {
      lib: "windijs",
      module: true,
      global: false,
    },
  },
};

export const isProduction = process.env.NODE_ENV === "production";

export const replaceEntry = (input: string) => input.replace(/@windijs\/(core|colors|helpers|config|shared)/g, "windijs");

export const filterConflict = (src: string, entries: string[]) => entries.filter(i => !src.match(new RegExp(`(const|let|var)\\s+${i}\\s*=`)));

export const injectImports = (code: string, imports: Record<string, string[]>) => Object.entries(imports).map(([k, v]) => `import { ${v.join(", ")} } from '${k}';\n`).join("") + code;

export const injectConfig = (code: string, path: string | false) => path ? `import windiUserConfig from '${path}';\n` + code : code;

export const injectHelper = (code: string, helper: string, pkg: string) => injectImports(code, { [isProduction ? pkg : "windijs"]: [helper] });

export const requireImports = (code: string, imports: Record<string, string[]>) => code.replace("var ", Object.entries(imports).map(([k, v]) => `var { ${v.join(", ")} } = require('${k}');\n`).join("") + "var ");

export const requireConfig = (code: string, path: string | false) => path ? code.replace("var ", `var windiUserConfig = require('${path}');\nvar `) : code;

export const requireHelper = (code: string, helper: string, pkg: string) => code.includes(helper) ? code : requireImports(code, { [isProduction ? pkg : "windijs"]: [helper] });

export function injectStyleLoader (code: string) {
  code = injectHelper(code, "useStyleLoader", "@windijs/helpers");
  const start = code.match(/(const|let|var|function|export)\s+/)?.index ?? 0;
  code = code.slice(0, start) + "useStyleLoader(windiUserConfig.styleLoader);\n" + code.slice(start);
  return code;
}

export const declModule = (name: string, contents: string | string[]) => `declare module '${name}' {\n` + (Array.isArray(contents) ? contents.map(i => "  " + i + ";\n").join("") : contents) + "}\n";

export const updateEnv = (entry: string | false, content: string | undefined) => {
  if (!entry) return;
  if (content) writeFileSync(entry, "// This file was auto generated by windijs, you can put it into your `.gitignore`, please do not edit it directly.\n" + content);
  else if (existsSync(entry)) rmSync(entry);
};

export function readPackage (dir: string) {
  return JSON.parse(readFileSync(join(dir, "package.json")).toString()) as { types?: string, module?: string, main?: string, exports?: Record<string, string | { require?: string, import?: string, types?: string }> };
}

export function readModule (dir: string, module?: string) {
  const pkg = readPackage(dir);
  const mod = module ?? pkg.module;
  if (!mod) throw new Error(`Couldn't find module entry for '${basename(dir)}'`);
  if (!pkg.types) throw new Error(`Counln't find types tentry for '${basename(dir)}'`);
  const dts = readFileSync(join(dir, pkg.types)).toString();
  const mjs = readFileSync(join(dir, mod)).toString();
  return { pkg, dts, mjs };
}

export function resolveEntry (options: EntryOptions, defaultValue: Required<EntryOptions>): Required<EntryOptions> {
  const resolvedEntry = defaultValue;
  if (options.global != null) resolvedEntry.global = options.global;
  if (options.lib != null) resolvedEntry.lib = options.lib;
  if (options.module != null) resolvedEntry.module = options.module;
  return resolvedEntry;
}

export function resolveEnv (env: PluginEnv = {}): ResolvedPluginEnv {
  const resolvedEnv = DefaultOptions.env;
  for (const [k, v] of Object.entries(env)) {
    if (typeof v !== "object") {
      // @ts-ignore
      resolvedEnv[k] = v;
    }
  }
  if (resolvedEnv.configEntry) resolvedEnv.configEntry = resolve(resolvedEnv.rootEntry, resolvedEnv.configEntry);
  if (env.rootEntry) {
    resolvedEnv.nodeModulesEntry = resolve(env.rootEntry, resolvedEnv.nodeModulesEntry);
    if (resolvedEnv.globalEntry) resolvedEnv.globalEntry = resolve(env.rootEntry, resolvedEnv.globalEntry);
    if (resolvedEnv.moduleEntry) resolvedEnv.moduleEntry = resolve(env.rootEntry, resolvedEnv.moduleEntry);
  }
  if (env.config) resolvedEnv.config = resolveEntry(env.config, resolvedEnv.config);
  if (env.utilities) resolvedEnv.utilities = resolveEntry(env.utilities, resolvedEnv.utilities);
  if (env.variants) resolvedEnv.variants = resolveEntry(env.variants, resolvedEnv.variants);

  return resolvedEnv;
}

function testConfigEntry (entry: string | false) {
  return entry ? (existsSync(entry) || existsSync(entry + ".ts") || existsSync(entry + ".js")) : false;
}

export function resolveOptions (options: PluginOptions): ResolvedPluginOptions {
  const resolvedOptions: ResolvedPluginOptions = { ...DefaultOptions, ...options, env: resolveEnv(options.env) };
  if ((options.config == null || !testConfigEntry(resolvedOptions.env.configEntry))) resolvedOptions.env.configEntry = false; // didn't set config, disable config entry.
  // convert relative path to absolute path
  resolvedOptions.include = resolvedOptions.include.map(i => resolve(resolvedOptions.env.rootEntry, i));
  resolvedOptions.exclude = resolvedOptions.exclude.map(i => resolve(resolvedOptions.env.rootEntry, i));
  return resolvedOptions;
}

export function refreshDir (dir: string) {
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir);
  return dir;
}
