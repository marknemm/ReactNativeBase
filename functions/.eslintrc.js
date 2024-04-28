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
