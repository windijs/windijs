/** @type { import("eslint-config-standard") } */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "arrow-spacing": 2,
    camelcase: 1,
    "comma-dangle": [2, "only-multiline"],
    "comma-spacing": 2,
    eqeqeq: [2, "allow-null"],
    curly: [2, "multi"],
    "no-console": 1,
    "no-constant-condition": 1,
    "no-template-curly-in-string": 0,
    "no-trailing-spaces": 2,
    "object-curly-spacing": [2, "always"],
    quotes: [2, "double", { avoidEscape: true }],
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: false,
      },
    ],
    "@typescript-eslint/ban-types": [
      2,
      {
        types: {
          Function: false,
          "{}": false,
        },
      },
    ],
    semi: [2, "always"],
  },
};
