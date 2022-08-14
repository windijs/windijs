module.exports = {
  transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  moduleNameMapper: Object.fromEntries(["index", "colors", "config", "helpers", "plugins", "preflight", "types", "utilities", "variants", "utils"].map(i => [[`^${i}((/.*)|$)`], [`<rootDir>/src/${i}$1`]])),
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "d.ts", "tsx", "json", "node"],
  collectCoverageFrom: [
    "src/{!(tsconfig.json),}.ts",
    "src/**/*.ts",
  ],
};
