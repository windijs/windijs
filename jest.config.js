/** @type { import("@jest/types").Config.InitialOptions } */
module.exports = {
  transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  moduleNameMapper: Object.fromEntries(require("fs").readdirSync("./packages").map(i => [[`^@windijs/${i}`], [`<rootDir>/packages/${i}/src`]])),
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "d.ts", "tsx", "json", "node"],
  collectCoverageFrom: [
    "packages/{!(tsconfig.json),}.ts",
    "packages/**/*.test.ts",
  ],
};
