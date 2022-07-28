import { defineConfig } from "rollup";
import fs from "fs";
import path from "path";
import typescript from "@rollup/plugin-typescript";

const outDir = "./dist";

const tsPlugin = typescript({
  target: "es6",
  include: "src/**",
  outDir,
  typescript: require("typescript"),
});

const dump = (file) => path.join(outDir, file);

const copy = (files) => files.forEach((file) => fs.copyFileSync(file, dump(file)));

const rmdir = (dir) => fs.existsSync(dir) && fs.statSync(dir).isDirectory() && fs.rmdirSync(dir, { recursive: true });

const mkdir = (dir) => !(fs.existsSync(dir) && fs.statSync(dir).isDirectory()) && fs.mkdirSync(dir);

const types = (dest = "index.d.ts") => {
  return {
    writeBundle () {
      fs.writeFileSync(dump(dest), "export * from \"./types\";");
    },
  };
};

export default defineConfig([{
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
    types("index.d.ts", "./types/lib", "{ Processor as default }"),
  ],
}]);
