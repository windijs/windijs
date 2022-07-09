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
    "no-unused-vars": 1,
    "object-curly-spacing": [2, "always"],
    quotes: [2, "double"],
    semi: [2, "always"],
  },
};
