/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["@vtiuse/eslint-config/nest.js"],
  parserOptions: {
    project: true,
  },
};
