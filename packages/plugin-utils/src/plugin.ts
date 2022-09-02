import { PluginOptions, SvelteVitePlugins, VitePlugins } from "./types";
import { configPath, declModule, filterConflict, injectConfig, injectHelper, injectImports, readModule, replaceEntry, writeFile } from "./utils";
import { dtsSetup, genUtilitiesDts, genUtilitiesJs } from "@windijs/helpers";

import { resolve } from "path";

export const DefaultOptions: PluginOptions = {
  configPath: resolve("./windi.config"),
  env: {
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

export function genVariants (options: PluginOptions) {
  const userVariants = options.config?.variants ?? {};
  const { mjs, dts } = readModule(options.env?.variants?.lib ?? "@windijs/variants");
  let code = injectHelper(injectConfig(replaceEntry(mjs)), "setupVariant");

  const defaults = dts.match(/[\w_$]+(?=:\s*VariantBuilder)/g) ?? [];
  const keys = Object.keys(userVariants);
  const items = defaults.concat(keys.filter(i => !defaults.includes(i)));

  const loaded = keys.filter(k => defaults.includes(k));
  const added = keys.filter(k => !defaults.includes(k));

  code = loaded.reduce((prev, k) => prev.replace(new RegExp(`[^;]*const\\s*${k}\\s*=[^;]*;`), ""), code);

  if (options.config?.variants) {
    code = code.replace(/(?=export\s\{[\s\S]*};?\s*$)/, `const { ${keys.join(", ")} } = setupVariant(windiUserConfig.variants);\n` + (added.length > 0 ? `export { ${added.join(", ")} };\n` : ""));
  }

  return {
    code,
    items,
  };
}

export function genRuntime (options: PluginOptions) {
  const config = options.config ?? {};
  const variants = genVariants(options);

  let { mjs, dts } = readModule(options.env?.utilities?.lib ?? "@windijs/utilities");
  let code = genUtilitiesJs(injectHelper(injectConfig(replaceEntry(mjs)), "setupUtility"), config);

  const env = options.env ?? {};
  const defaults = ["colors", ...(code.match(/(?<=createUtility\(")[\w_$-]+/g) ?? [])];
  const items = defaults;

  dts = replaceEntry(genUtilitiesDts(dts, config));

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

  const variantsGlobal = env.variants?.global ? (variants.items.map(i => `const ${i}: VariantBuilder;`).join("\n") + "\n") : undefined;
  let global = env.utilities?.global ? (dts.replace(/export\s+declare\s+/g, "").replace("type", "declare global {\n" + (variantsGlobal ?? "") + "type") + "}\n") : variantsGlobal ? ("declare global {\n" + variantsGlobal + "}\n") : undefined;
  if (global && env.variants?.global) global = injectImports(global, { windijs: ["VariantBuilder"] });

  const modules: string[] = [];
  if (env.config?.module) modules.push(declModule("virtual:config", ["export default (await import(\"../windi.config\")).default"]));
  if (env.variants?.module) modules.push(declModule("virtual:variants", ["import { VariantBuilder } from \"windijs\"", ...variants.items.map(i => `export declare const ${i}: VariantBuilder`)]));
  if (env.utilities?.module) modules.push(declModule("virtual:utilities", dts));

  return {
    global,
    module: modules.length > 0 ? modules.join("") : undefined,
    utilities: {
      code,
      items,
    },
    variants,
  };
}

export function virtualUtilities (utilities: string) {
  const virtualModuleId = "virtual:utilities";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "virtual-utilities",
    resolveId (id: string) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load (id: string) {
      if (id === resolvedVirtualModuleId) return utilities;
    },
  };
}

export function virtualVariants (variants: string) {
  const virtualModuleId = "virtual:variants";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "virtual-variants",
    resolveId (id: string) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load (id: string) {
      if (id === resolvedVirtualModuleId) return variants;
    },
  };
}

export function virtualConfig () {
  const virtualModuleId = "virtual:config";

  return {
    name: "virtual-config",
    resolveId (id: string) {
      if (id === virtualModuleId) return configPath;
    },
  };
}

export function createRuntime (options: PluginOptions = {}) {
  options = Object.assign(DefaultOptions, options);
  const { global, module, utilities, variants } = genRuntime(options);

  writeFile(options.env?.globalPath ?? "./src/windi-global.d.ts", global);
  writeFile(options.env?.modulePath ?? "./src/windi-module.d.ts", module);

  function preprocess (code: string) {
  // TODO: fix: The $ prefix is reserved, and cannot be used for variable and import names
    return injectImports(code, {
      "virtual:utilities": filterConflict(code, utilities.items).filter(i => i !== "p"),
      "virtual:variants": filterConflict(code, variants.items).filter(i => !i.startsWith("$")),
    });
  }

  return { utilities: utilities.code, variants: variants.code, preprocess };
}

export const vitePlugins = new Proxy({}, {
  get (target, p) {
    return (options: PluginOptions = {}) => {
      const { utilities, variants, preprocess } = createRuntime(options);
      const basePlugins = [
        virtualConfig(),
        virtualUtilities(utilities),
        virtualVariants(variants),
      ];

      function vanillaPreprocess (exts = [".js", ".ts"]) {
        return {
          name: "vanilla-preprocess-windijs",
          transform (code: string, id: string) {
            if (exts.find(i => id.endsWith(i))) {
              return preprocess(code);
            }
            return code;
          },
        };
      }

      if (p === "vanilla") {
        return {
          plugins: basePlugins,
          windijs: vanillaPreprocess,
        };
      }

      if (p === "vue") {
        function vuePreprocess (exts = [".vue"]) {
          return {
            name: "vue-preprocess-windijs",
            transform (code: string, id: string) {
              if (id.endsWith(".vue")) {
                const regex = /<script.*>/;
                const match = regex.exec(code);
                if (!match) { return `<script>\n${preprocess("")}</script>` + code; }
                const start = regex.lastIndex + match[0].length;
                return code.slice(0, start) + "\n" + preprocess(code.slice(start));
              }
              return vanillaPreprocess(exts);
            },
          };
        }

        return {
          plugins: basePlugins,
          windijs: vuePreprocess,
        };
      };

      if (p === "svelte") {
        function sveltePreprocess (ts: { script: Function } & object) {
          return {
            script: async (options: object) => {
              // @ts-ignore
              if (options.attributes?.lang !== "ts") return { code: preprocess(options.content) };
              const res = await ts.script(options);
              res.code = preprocess(res.code);
              return res;
            },
          };
        }

        return {
          plugins: basePlugins,
          windijs: sveltePreprocess,
        };
      }
    };
  },
}) as {
  vue: (options: PluginOptions) => VitePlugins,
  vanilla: (options: PluginOptions) => VitePlugins,
  svelte: (options: PluginOptions) => SvelteVitePlugins
};