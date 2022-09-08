import type { Config } from "@windijs/helpers";

export type Frameworks = "lit" | "preact" | "react" | "svelte" | "vanilla" | "vue";

export type EntryOptions = {
  lib?: string,
  module?: boolean,
  global?: boolean,
}

export type PluginOptions = {
  include?: string[],
  exclude?: string[],
  config?: Config,
  configPath?: string,
  env?: Partial<Record<"config" | "utilities" | "variants", EntryOptions>> & {
    nodeModulesPath?: string,
    globalPath?: string,
    modulePath?: string,
  }
};

export type ResolvedPluginOptions = Required<PluginOptions>;

export type VitePlugin = {
  name: string;
  api: {
    vuePreprocess: (code: string, setup?: boolean) => string;
    sveltePreprocess: (ts?: { script: Function } & object) => ({
      script: (options: object) => Promise<{ code: string }>;
    })
  };
  resolveId(id: string): string | undefined;
  load(id: string): string | undefined;
  transform: (code: string, id: string) => string;
}
