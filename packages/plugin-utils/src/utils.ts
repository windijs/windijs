import { PluginOptions, ResolvedPluginOptions } from "./types";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";

import { resolve } from "path";

export const DefaultOptions: ResolvedPluginOptions = {
  include: ["./src/**/*.{vue,jsx,tsx}"],
  exclude: ["**/node_modules"],
  config: {},
  configPath: resolve("./windi.config"),
  env: {
    nodeModulesPath: "./node_modules",
    globalPath: "./src/windi-global.d.ts",
    modulePath: "./src/windi-module.d.ts",
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
      module: true,
    },
  },
};

export const configPath = resolve("./windi.config");

export const isProduction = process.env.NODE_ENV === "production";

export const replaceEntry = (input: string) => input.replace(/@windijs\/(core|colors|helpers|config|shared)/g, "windijs");

export const filterConflict = (src: string, entries: string[]) => entries.filter(i => !src.match(new RegExp(`(const|let|var)\\s+${i}\\s*=`)));

export const injectImports = (code: string, imports: Record<string, string[]>) => Object.entries(imports).map(([k, v]) => `import { ${v.join(", ")} } from '${k}';\n`).join("") + code;

export const injectConfig = (code: string) => `import windiUserConfig from '${configPath}';\n` + code;

export const injectHelper = (code: string, helper: string, pkg: string) => code.includes(helper) ? code : injectImports(code, { [isProduction ? pkg : "windijs"]: [helper] });

export const requireImports = (code: string, imports: Record<string, string[]>) => code.replace("var ", Object.entries(imports).map(([k, v]) => `var { ${v.join(", ")} } = require('${k}');\n`).join("") + "var ");

export const requireConfig = (code: string) => code.replace("var ", `var windiUserConfig = require('${configPath}');\nvar `);

export const requireHelper = (code: string, helper: string, pkg: string) => code.includes(helper) ? code : requireImports(code, { [isProduction ? pkg : "windijs"]: [helper] });

export function injectStyleLoader (code: string) {
  code = injectHelper(code, "useStyleLoader", "@windijs/helpers");
  const start = code.match(/(const|let|var|function|export)\s+/)?.index ?? 0;
  code = code.slice(0, start) + "useStyleLoader(windiUserConfig.styleLoader);\n" + code.slice(start);
  return code;
}

export const declModule = (name: string, contents: string | string[]) => `declare module '${name}' {\n` + (Array.isArray(contents) ? contents.map(i => "  " + i + ";\n").join("") : contents) + "}\n";

export const writeFile = (path: string, content: string | undefined) => {
  if (content) writeFileSync(path, "// This file was auto generated by windijs, you can put it into your `.gitignore`, please do not edit it directly.\n" + content);
  else if (existsSync(path)) rmSync(path);
};

export function readPackage (name: string) {
  return JSON.parse(readFileSync(`./node_modules/${name}/package.json`).toString()) as { types?: string, module?: string, main?: string, exports?: Record<string, string | { require?: string, import?: string, types?: string }> };
}

export function readModule (name: string, module?: string) {
  const pkg = readPackage(name);
  const dts = readFileSync(`./node_modules/${name}/${pkg.types}`).toString();
  const mjs = readFileSync(`./node_modules/${name}/${module ?? pkg.module}`).toString();
  return { pkg, dts, mjs };
}

export function resolveOptions (options: PluginOptions): ResolvedPluginOptions {
  const resolvedOptions: ResolvedPluginOptions = { ...DefaultOptions, ...options };
  // convert relative path to absolute path
  resolvedOptions.include = resolvedOptions.include.map(i => resolve(i));
  resolvedOptions.exclude = resolvedOptions.exclude.map(i => resolve(i));
  if (options.env) resolvedOptions.env = { ...DefaultOptions.env, ...options.env };
  return resolvedOptions;
}

export function refreshDir (dir: string) {
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir);
  return dir;
}
