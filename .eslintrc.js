module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    //"plugin:vue/essential",
    "prettier",
  ],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "no-irregular-whitespace": 0,
    "no-param-reassign": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
}
