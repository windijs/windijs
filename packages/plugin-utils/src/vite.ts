import { PluginOptions, ResolvedPluginEnv, ResolvedPluginOptions, VitePlugin } from "./types";
import { configPath, declModule, filterConflict, injectConfig, injectHelper, injectImports, injectStyleLoader, isProduction, readModule, refreshDir, replaceEntry, requireConfig, requireHelper, resolveOptions, updateEnv } from "./utils";
import { dirname, join, resolve } from "path";
import { dtsSetup, dtsUtilities } from "./gen";
import { readFileSync, readdirSync, writeFileSync } from "fs";

import type { Config } from "@windijs/helpers";
import pm from "picomatch";

export function injectTheme (code: string, config: Config, require = false) {
  const theme = config.theme ?? {};

  if (config.styleLoader) code = injectStyleLoader(code);

  if (theme.colors) code = code.replace(/(const|let|var)\s+colors\s*=[\s\S]+?;/, (require ? "var" : "const") + " colors = windiUserConfig.theme.colors;"); // replace colors

  for (const k in theme) {
    const regex = new RegExp(`(?<=configHandler\\().*?${k}Config`, "g");
    const matched = code.match(regex);
    if (matched) {
      code = code.replace(regex, "windiUserConfig.theme." + k);
    }
  }

  return code;
}

export function genVariants (options: ResolvedPluginOptions) {
  const userVariants = options.config.variants ?? {};
  const { mjs, dts } = readModule(resolve(options.env.nodeModulesEntry, options.env.variants.lib));
  let code = injectHelper(injectConfig(replaceEntry(mjs)), "setupVariant", "windijs");

  const defaults = dts.match(/[\w_$]+(?=:\s*VariantBuilder)/g) ?? [];
  const keys = Object.keys(userVariants);
  const items = defaults.concat(keys.filter(i => !defaults.includes(i)));

  const loaded = keys.filter(k => defaults.includes(k));
  const added = keys.filter(k => !defaults.includes(k));

  code = loaded.reduce((prev, k) => prev.replace(new RegExp(`[^;]*const\\s*${k}\\s*=[^;]*;`), ""), code);

  if (options.config.variants) {
    code = code.replace(/(?=export\s\{[\s\S]*};?\s*$)/, `const { ${keys.join(", ")} } = setupVariant(windiUserConfig.variants);\n` + (added.length > 0 ? `export { ${added.join(", ")} };\n` : ""));
  }

  return {
    code,
    items,
  };
}

function genGlobalEnv (env: ResolvedPluginEnv, variants: string[], dts: string) {
  let global: string | undefined;

  if (env.globalEntry) {
    const variantsGlobal = env.variants.global ? (variants.map(i => `const ${i}: VariantBuilder;`).join("\n") + "\n") : undefined;
    global = env.utilities.global ? (dts.replace(/export\s+declare\s+/g, "").replace("type", "declare global {\n" + (variantsGlobal ?? "") + "type") + "}\n") : variantsGlobal ? ("declare global {\n" + variantsGlobal + "}\n") : undefined;
    if (global && env.variants.global) global = injectImports(global, { windijs: ["VariantBuilder"] });
  }

  return global;
}

function genModuleEnv (env: ResolvedPluginEnv, variants: string[], dts: string) {
  const modules: string[] = [];
  if (env.moduleEntry) {
    if (env.config.module) modules.push(declModule("virtual:config", ["export default (await import(\"../windi.config\")).default"]));
    if (env.variants.module) modules.push(declModule("virtual:variants", ["import { VariantBuilder } from \"windijs\"", ...variants.map(i => `export declare const ${i}: VariantBuilder`)]));
    if (env.utilities.module) modules.push(declModule("virtual:utilities", dts));
  }
  return modules.length > 0 ? modules.join("") : undefined;
}

export function genRequire (path: string, config: Config) {
  let code = readFileSync(path).toString();

  const defaults = ["colors", ...(code.match(/(?<=createUtility\(")[\w_$-]+/g) ?? [])];

  code = injectTheme(requireHelper(requireConfig(code), "setupUtility", "@windijs/core"), config, true);

  for (const k in config.utilities ?? {}) {
    const u = `var ${k} = setupUtility('${k}', windiUserConfig.utilities.${k})`;
    if (defaults.includes(k)) {
      // replace old utility type
      code = code.replace(new RegExp(`(const|let|var)\\s*${k}\\s*=[^;]*`), u);
    } else {
      // add new utility type
      code = code.replace("exports.", `${u};\n\nexports.${k} = ${k};\nexports.`);
    }
  }

  return code;
}

export function genProduction (options: ResolvedPluginOptions) {
  const env = options.env;
  const config = options.config;
  const variants = genVariants(options);
  const utilitiesPath = resolve(env.nodeModulesEntry, env.utilities.lib);

  let { pkg, mjs, dts } = readModule(utilitiesPath);

  let code = mjs;

  const defaults = code.match(/(?<=\s+as\s+)\S+/g) ?? [];

  // copy es folder and replace changed config
  pkg.exports!["./proxy"] = {
    import: "./dist/proxy/es/index.js",
    require: "./dist/proxy/utilities.js",
    types: "./dist/proxy/utilities.d.ts",
  };
  writeFileSync(join(utilitiesPath, "package.json"), JSON.stringify(pkg, undefined, 2) + "\n");
  const esdir = join(utilitiesPath, dirname(pkg.module!));
  const pdir = refreshDir(join(utilitiesPath, "dist/proxy"));
  const pesdir = refreshDir(join(utilitiesPath, "dist/proxy/es"));
  readdirSync(esdir).forEach(i => {
    const raw = readFileSync(resolve(esdir, i)).toString();
    writeFileSync(resolve(pesdir, i), injectConfig(injectTheme(raw, config)));
  });

  const items = defaults;

  dts = dtsUtilities(dts, config);
  let entry: string | undefined;

  for (const [k, v] of Object.entries(config.utilities ?? {})) {
    const t = `export declare const ${k}: ` + dtsSetup(v) + ";";
    const u = `const ${k} = setupUtility('${k}', windiUserConfig.utilities.${k})`;
    if (defaults.includes(k)) {
      // replace old utility type
      dts = dts.replace(new RegExp(`(export\\s+declare\\s+const|var|let)\\s${k}:[\\s\\S]*?;(?=(\\s*export\\s+declare\\s+(const|var|let)\\s[_$\\w])|(\\s*\\}\\s*$))`), t);
      entry = code.match(new RegExp(`(?<=export\\s*{[^}]*\\s+${k}\\s*}\\s*from\\s*['"])[^'"]+`))?.[0];
    } else {
      // add new utility type
      items.push(k);
      dts = dts + t + "\n";
      entry = undefined;
    }

    if (!entry) code += `export { default as ${k} } from './${k}.js';\n`;
    writeFileSync(resolve(pesdir, entry ?? (k + ".js")), injectConfig(`import { setupUtility } from "@windijs/core";\n${u};\nexport { ${k} as default };\n`));
  }

  writeFileSync(resolve(pesdir, "index.js"), code);
  writeFileSync(resolve(pdir, "utilities.d.ts"), dts);
  writeFileSync(resolve(pdir, "utilities.js"), genRequire(join(utilitiesPath, "dist/utilities.js"), config));

  dts = replaceEntry(dts);

  return {
    utilities: {
      dts,
      code,
      items,
    },
    variants,
  };
}

export function genRuntime (options: ResolvedPluginOptions) {
  const env = options.env;
  const config = options.config;
  const variants = genVariants(options);

  let { mjs, dts } = readModule(resolve(env.nodeModulesEntry, env.utilities.lib), "dist/utilities.mjs"); // TODO: this entry is hard coded for now, maybe change to package exports later.

  const defaults = ["colors", ...(mjs.match(/(?<=createUtility\(")[\w_$-]+/g) ?? [])];
  const items = defaults;

  let code = injectTheme(injectHelper(injectConfig(replaceEntry(mjs)), "setupUtility", "@windijs/core"), config);
  dts = replaceEntry(dtsUtilities(dts, config));

  for (const [k, v] of Object.entries(config.utilities ?? {})) {
    const t = `export declare const ${k}: ` + dtsSetup(v) + ";";
    const u = `const ${k} = setupUtility('${k}', windiUserConfig.utilities.${k})`;
    if (defaults.includes(k)) {
      // replace old utility type
      dts = dts.replace(new RegExp(`(export\\s+declare\\s+const|var|let)\\s${k}:[\\s\\S]*?;(?=(\\s*export\\s+declare\\s+(const|var|let)\\s[_$\\w])|(\\s*\\}\\s*$))`), t);
      code = code.replace(new RegExp(`(const|let|var)\\s*${k}\\s*=[^;]*`), u);
    } else {
      // add new utility type
      items.push(k);
      dts = dts + t + "\n";
      code = code.replace(/(?=export\s\{[\s\S]*};?\s*$)/, "export " + u + ";\n");
    }
  }

  return {
    utilities: {
      dts,
      code,
      items,
    },
    variants,
  };
}

export function virtualPlugin (utilities: string, variants: string) {
  const virtualConfigId = "virtual:config";
  const virtualUtilitiesId = "virtual:utilities";
  const resolvedVirtualUtilitiesId = "\0" + virtualUtilitiesId;
  const virtualVariantsId = "virtual:variants";
  const resolvedVirtualVariantsId = "\0" + virtualVariantsId;

  return {
    name: "virtual-plugin-windijs",
    resolveId (id: string) {
      if (id === virtualConfigId) return configPath;
      if (id === virtualUtilitiesId) return resolvedVirtualUtilitiesId;
      if (id === virtualVariantsId) return resolvedVirtualVariantsId;
    },
    load (id: string) {
      if (id === resolvedVirtualUtilitiesId) return utilities;
      if (id === resolvedVirtualVariantsId) return variants;
    },
  };
}

export function createRuntime (options: ResolvedPluginOptions) {
  const { utilities, variants } = isProduction ? genProduction(options) : genRuntime(options);

  updateEnv(options.env.globalEntry, genGlobalEnv(options.env, variants.items, utilities.dts));
  updateEnv(options.env.moduleEntry, genModuleEnv(options.env, variants.items, utilities.dts));

  function preprocess (code: string) {
  // TODO: fix: The $ prefix is reserved, and cannot be used for variable and import names
    return injectImports(code, {
      [isProduction ? "@windijs/utilities/proxy" : "virtual:utilities"]: filterConflict(code, utilities.items),
      "virtual:variants": filterConflict(code, variants.items).filter(i => !i.startsWith("$")),
    });
  }

  return { utilities: utilities.code, variants: variants.code, preprocess };
}

export default function vitePlugin (options: PluginOptions = {}) {
  const resolvedOptions = resolveOptions(options);
  const isMatch = pm(resolvedOptions.include, { ignore: resolvedOptions.exclude });
  const { utilities, variants, preprocess } = createRuntime(resolvedOptions);
  const plugin = virtualPlugin(utilities, variants);

  function vuePreprocess (code: string, setup = true) {
    const regex = /<script.*>/;
    const match = regex.exec(code);
    if (!match) { return `${"<script" + (setup ? " setup" : "") + ">"}\n${preprocess("")}</script>\n` + code; }
    const start = regex.lastIndex + match[0].length;
    return code.slice(0, start) + "\n" + preprocess(code.slice(start));
  }

  function sveltePreprocess (ts?: { script: Function } & object) {
    return {
      script: async (options: object) => {
        // @ts-ignore
        if (!ts || options.attributes?.lang !== "ts") return { code: preprocess(options.content) };
        const res = await ts.script(options);
        res.code = preprocess(res.code);
        return res;
      },
    };
  }

  function transform (code: string, id: string) {
    if (isMatch(id)) {
      if (id.endsWith(".vue")) return vuePreprocess(code);
      return preprocess(code);
    }
    return code;
  }

  return {
    ...plugin,
    transform,
    api: {
      vuePreprocess,
      sveltePreprocess,
    },
  } as VitePlugin;
}
