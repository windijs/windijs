module.exports = {
  transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  collectCoverageFrom: [
    "src/{!(tsconfig.json),}.ts",
    "src/**/*.ts",
  ],
};
