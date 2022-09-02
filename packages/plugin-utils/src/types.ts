import { Config } from "@windijs/config";

export type Frameworks = "lit" | "preact" | "react" | "svelte" | "vanilla" | "vue";

export type EntryOptions = {
  lib?: string,
  module?: boolean,
  global?: boolean,
}

export type PluginOptions = {
  config?: Config,
  configPath?: string,
  env?: Partial<Record<"config" | "utilities" | "variants", EntryOptions>> & {
    globalPath?: string,
    modulePath?: string,
  }
};

export type VirtualPlugins = {
  name: string;
  resolveId(id: string): string | undefined;
}[];

export type VitePlugins = {
  plugins: VirtualPlugins,
  windijs: (exts?: string[]) => ({
    name: string;
    transform(code: string, id: string): string;
  })
}
export type SvelteVitePlugins = {
  plugins: VirtualPlugins,
  windijs: (ts?: { script: Function } & object) => ({
    script: (options: object) => Promise<any>;
  })
}
