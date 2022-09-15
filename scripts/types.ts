export type BuildFormat = "cjs" | "mjs" | "esm" | "iife" | "dts";

export type Pkg = {
  name: string;
  version: string;
  types?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  exports?: Record<
    string,
    {
      import?: string;
      require?: string;
      types?: string;
      node?: string;
      default?: string;
    }
  >;
  buildOptions?: {
    name?: string;
    formats?: BuildFormat[];
    prod?: boolean;
  };
  private?: boolean;
};
