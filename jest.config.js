module.exports = {
  transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  moduleNameMapper: Object.fromEntries(["core", "colors", "config", "helpers", "shared", "preflight", "types", "utilities", "variants"].map(i => [[`^@windi/${i}((/.*)|$)`], [`<rootDir>/packages/${i}$1/src/index`]])),
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "d.ts", "tsx", "json", "node"],
  collectCoverageFrom: [
    "packages/{!(tsconfig.json),}.ts",
    "packages/**/*.test.ts",
  ],
};
