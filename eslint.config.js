const { defineConfig } = require("eslint/config")

const globals = require("globals")
const prettier = require("eslint-plugin-prettier")
const js = require("@eslint/js")

const { FlatCompat } = require("@eslint/eslintrc")

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },

      ecmaVersion: 2018,
      sourceType: "module",
      parserOptions: {},
    },

    extends: compat.extends("eslint:recommended", "prettier"),

    plugins: {
      prettier,
    },

    rules: {
      "prettier/prettier": "error",
      "no-irregular-whitespace": 0,
      "no-param-reassign": "off",

      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "next",
        },
      ],
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
])
