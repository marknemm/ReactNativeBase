const { rules } = require('../.eslintrc');

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  plugins: [
    'jsdoc',                  // Linting for JSDoc comments
    'no-floating-promise',    // Linting for floating promises
    'prefer-arrow-functions', // Linting for arrow function expressions
  ],
  rules: {
    ...Object.keys(rules) // Merge in the rules from the root .eslintrc.js
        // Filter out rules that are not applicable to this project
        .filter((key) => !key.match(/(^import\/.*|.*jsx.*|.*react.*)/))
        .reduce((obj, key) => {
          obj[key] = rules[key];
          return obj;
        }, {}),
    'valid-jsdoc': 'off', // Require valid JSDoc comments
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
