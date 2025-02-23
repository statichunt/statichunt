module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "next/core-web-vitals",
  ],
  rules: {
    "no-unused-vars": "off",
    "no-undef": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/no-unescaped-entities": "off",
    "no-useless-escape": "off",
    "no-unsafe-optional-chaining": "off",
    "no-case-declarations": "off",
    "@next/next/no-img-element": "off",
    "@next/next/no-before-interactive-script-outside-document": "off",
  },
};
