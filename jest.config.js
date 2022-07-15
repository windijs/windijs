module.exports = {
  transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "d.ts", "tsx", "json", "node"],
  collectCoverageFrom: [
    "src/{!(tsconfig.json),}.ts",
    "src/**/*.ts",
  ],
};
