const js = require("@eslint/js")
const globals = require("globals")

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
      },
    },
    rules: {
      "no-irregular-whitespace": 0,
      "no-param-reassign": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]
