/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@vtiuse/eslint-config/web.js"],
  parser: "@typescript-eslint/parser",
  extends: [".eslintrc-auto-import.json"],
  parserOptions: {
    project: true,
  },
};
