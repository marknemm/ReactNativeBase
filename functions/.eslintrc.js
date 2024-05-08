const { rules } = require('../.eslintrc');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'google',
  ],
  ignorePatterns: [
    "/lib/**/*",        // Ignore built files.
    "/generated/**/*",  // Ignore generated files.
  ],
  rules: {
    ...Object.keys(rules) // Merge in the rules from the root .eslintrc.js
        // Filter out rules that are not applicable to this project
        .filter((key) => !key.match(/(^import\/.*|.*jsx.*|.*react.*)/))
        .reduce((obj, key) => {
          obj[key] = rules[key];
          return obj;
        }, {}),
    'import/no-import-module-exports': 'off', // Disallow import declarations from import call arguments
    'valid-jsdoc': 'off',                     // Use inherited jsdoc rules instead
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
