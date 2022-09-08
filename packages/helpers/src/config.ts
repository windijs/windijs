import { Handler, StyleLoader, StyleObject } from "./types";

import { Theme } from "@windijs/config";

export type DarkModeConfig = "class" | "media" | false;

export type UtilitiesConfig = { [key: string]: Handler<unknown> | Array<Handler<unknown>> | StyleObject | UtilitiesConfig };

export type VariantsConfig = { [key: string]: string | string[] };

export interface Config<T extends object = Theme> {
  // presets?: Config[];
  // prefixer?: boolean;
  // attributify?: boolean | {
  //   prefix?: string
  //   separator?: string
  //   disable?: string[]
  // }
  separator?: string;
  important?: boolean | string;
  darkMode?: DarkModeConfig;
  theme?: T;
  // variantOrder?: string[];
  // plugins?: Plugin[];
  // handlers?: Handlers;
  // corePlugins?: (keyof BaseTheme)[] | string[] | { [ T in keyof BaseTheme ] : boolean } | { [ key:string ] : boolean };
  // prefix?: string;
  // exclude?: RegExp[];
  // alias?: { [key:string]: string };
  // shortcuts?: { [key:string]: Shortcut };
  // purge?: unknown;
  utilities?: UtilitiesConfig;
  variants?: VariantsConfig;
  styleLoader?: StyleLoader;
  [key:string]: any;
}

export function defineConfig (config: Config) {
  return config;
}
