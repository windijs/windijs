import { Config } from "@windijs/config";

export type Frameworks = "lit" | "preact" | "react" | "svelte" | "vanilla" | "vue";

export type EntryOptions = {
  lib?: string,
  module?: boolean,
  global?: boolean,
}

export type PluginOptions = {
  exts?: string[],
  config?: Config,
  configPath?: string,
  env?: Partial<Record<"config" | "utilities" | "variants", EntryOptions>> & {
    globalPath?: string,
    modulePath?: string,
  }
};

export type VitePlugin = {
  name: string;
  api: {
    vuePreprocess: (code: string) => string;
    sveltePreprocess: (ts?: { script: Function } & object) => ({
      script: (options: object) => Promise<any>;
    })
  };
  resolveId(id: string): string | undefined;
  load(id: string): string | undefined;
  transform: (code: string, id: string) => string;
}
