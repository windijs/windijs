import { defineConfig } from "rollup";
import fs from "fs";
import path from "path";
import pluginTS from "@rollup/plugin-typescript";
import typescript from "typescript";

const outDir = "./dist";

const tsPlugin = pluginTS({
  target: "es6",
  include: "src/**",
  outDir,
  typescript,
});

const dump = (file) => path.join(outDir, file);

const copy = (files) => files.forEach((file) => fs.copyFileSync(file, dump(file)));

const rmdir = (dir) => fs.existsSync(dir) && fs.statSync(dir).isDirectory() && fs.rmSync(dir, { recursive: true });

const mkdir = (dir) => !(fs.existsSync(dir) && fs.statSync(dir).isDirectory()) && fs.mkdirSync(dir);

const types = (dest = "index", subdir = "") => {
  if (dest !== "index" && subdir === "") subdir = "/" + dest;

  return {
    writeBundle () {
      fs.writeFileSync(dump(dest + ".d.ts"), `export * from "${"./types" + subdir}";`);
    },
  };
};

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        file: dump("index.js"),
        format: "cjs",
        paths: (id) => `./${path.relative("./src", id)}/index.js`,
      },
      {
        file: dump("index.mjs"),
        format: "esm",
        paths: (id) => `./${path.relative("./src", id)}/index.mjs`,
      },
    ],
    plugins: [
      tsPlugin,
      rmdir(outDir),
      mkdir(outDir),
      copy(["package.json"]), //, "README.md", "LICENSE"]),
      types(),
    ],
  },
  {
    input: "src/utilities/index.ts",
    output: [
      {
        file: dump("utilities.js"),
        format: "cjs",
        paths: (id) => `./${path.relative("./src", id)}/index.js`,
      },
      {
        file: dump("utilities.mjs"),
        format: "esm",
        paths: (id) => `./${path.relative("./src", id)}/index.mjs`,
      },
    ],
    plugins: [
      tsPlugin,
      types("utilities"),
      types("global", "/types/global"),
    ],
  },
  {
    input: "src/variants/index.ts",
    output: [
      {
        file: dump("variants.js"),
        format: "cjs",
        paths: (id) => `./${path.relative("./src", id)}/index.js`,
      },
      {
        file: dump("variants.mjs"),
        format: "esm",
        paths: (id) => `./${path.relative("./src", id)}/index.mjs`,
      },
    ],
    plugins: [
      tsPlugin,
      types("variants"),
      types("global", "/types/global"),
    ],
  },
]);
