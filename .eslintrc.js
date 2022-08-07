/** @type { import("eslint-config-standard") } */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "standard",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "arrow-spacing": 2,
    camelcase: 1,
    "comma-dangle": [2, "always-multiline"],
    "comma-spacing": 2,
    eqeqeq: [2, "allow-null"],
    indent: [2, 2],
    "no-console": 1,
    "no-constant-condition": 1,
    "no-template-curly-in-string": 0,
    "no-trailing-spaces": 2,
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "no-redeclare": 0,
    "@typescript-eslint/no-redeclare": 1,
    "no-dupe-class-members": 0,
    "@typescript-eslint/no-dupe-class-members": 2,
    "no-use-before-define": 0,
    "@typescript-eslint/no-use-before-define": 1,
    "object-curly-spacing": [2, "always"],
    quotes: [2, "double"],
    semi: [2, "always"],
  },
};
