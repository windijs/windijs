import type { Config } from "@windijs/helpers";

export type Frameworks = "lit" | "preact" | "react" | "svelte" | "vanilla" | "vue";

export type EntryOptions = {
  lib?: string;
  module?: boolean;
  global?: boolean;
};

export type BaseEnv = {
  rootEntry?: string;
  nodeModulesEntry?: string;
  globalEntry?: string | false;
  moduleEntry?: string | false;
  configEntry?: string | false;
};

export type PluginEnv = Partial<Record<"config" | "utilities" | "variants", EntryOptions>> & BaseEnv;

export type PluginOptions = {
  // TODO: support function as alias
  // TODO: new config skip for skiping entries
  alias?: { [k: string]: string };
  include?: string[];
  exclude?: string[];
  config?: Config;
  env?: PluginEnv;
};

export type ResolvedPluginEnv = Record<"config" | "utilities" | "variants", Required<EntryOptions>> & Required<BaseEnv>;

export type ResolvedPluginOptions = Omit<Required<PluginOptions>, "env"> & {
  env: ResolvedPluginEnv;
};

export type VitePlugin = {
  name: string;
  api: {
    vuePreprocess: (code: string, setup?: boolean) => string;
    sveltePreprocess: (ts?: { script: Function } & object) => {
      script: (options: object) => Promise<{ code: string }>;
    };
  };
  resolveId(id: string): string | undefined;
  load(id: string): string | undefined;
  transform: (code: string, id: string) => string;
};
