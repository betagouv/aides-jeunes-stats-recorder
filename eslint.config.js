import js from "@eslint/js"
import { defineConfig } from "eslint/config"
import prettier from "eslint-plugin-prettier"
import { fixupConfigRules } from "@eslint/compat"
import globals from "globals"
import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    extends: fixupConfigRules(compat.extends("eslint:recommended")),
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-irregular-whitespace": "off",
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
])
