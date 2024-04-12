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
    'arrow-body-style': 'warn',                               // Require braces around arrow function bodies
    'block-spacing': 'warn',                                  // Require spaces inside of block statements
    'class-methods-use-this': 'warn',                         // Require class methods to use 'this'
    'array-bracket-spacing': ['warn', 'never'],               // Disallow spaces inside of array brackets
    'comma-dangle': ['warn', {                                // Require trailing commas in object and array literals
      arrays: 'always-multiline',                             // Require trailing commas in arrays
      exports: 'never',                                       // Disallow trailing commas in exports
      functions: 'never',                                     // Require trailing commas in functions
      imports: 'never',                                       // Disallow trailing commas in imports
      objects: 'always-multiline',                            // Require trailing commas in objects
    }],
    'comma-spacing': 'warn',                                  // Require spaces after commas and disallow spaces before commas
    'consistent-return': 'warn',                              // Require consistent return behavior
    'eol-last': 'warn',                                       // Require newlines at the end of files
    'function-paren-newline': 'off',                          // Disallow newlines inside of function parentheses
    'indent': ['warn', 2],                                    // Require 2-space indentation
    'implicit-arrow-linebreak': 'off',                        // Disallow implicit line breaks in arrow functions
    'key-spacing': 'warn',                                    // Require spaces around object keys
    'lines-between-class-members': ['warn', 'always', {       // Require blank lines between class members
      exceptAfterSingleLine: true,                            // Allow no blank lines after single-line class members
    }],
    'max-len': ['warn', {                                     // Set the maximum line length to 120 characters
      code: 120,                                              // Set the maximum line length to 120 characters
      comments: 160,                                          // Set the maximum line length for comments to 160 characters
      ignoreComments: true,                                   // Ignore comments when checking line length
      ignorePattern: '^import\\s.+\\sfrom\\s.+;$',            // Ignore import statements when checking line length
      ignoreRegExpLiterals: true,                             // Ignore regular expressions when checking line length
      ignoreUrls: true,                                       // Ignore URLs when checking line length
    }],
    'no-await-in-loop': 'off',                                // Disallow await inside of loops
    'no-console': 'warn',                                     // Disallow console statements
    'no-else-return': 'warn',                                 // Disallow else blocks that return
    'no-empty': 'warn',                                       // Disallow empty blocks
    'no-empty-function': 'warn',                              // Disallow empty functions
    'no-extra-parens': 'warn',                                // Disallow unnecessary parentheses
    'no-extra-semi': 'warn',                                  // Disallow unnecessary semicolons
    'no-multi-spaces': 'off',                                 // Disallow multiple spaces
    'no-multiple-empty-lines': 'warn',                        // Disallow multiple empty lines
    'no-param-reassign': 'off',                               // Disallow reassigning function parameters
    'no-restricted-globals': ['warn', 'name', 'length'],      // Disallow certain global variables
    'no-restricted-syntax': 'off',                            // Disallow certain syntax
    'no-trailing-spaces': 'warn',                             // Disallow trailing spaces
    'no-underscore-dangle': 'off',                            // Disallow dangling underscores
    'no-unused-expressions': ['warn', {                       // Enable the warning about unused expressions
      allowTernary: true,                                     // Allow ternary expressions
    }],
    'no-unused-vars': 'warn',                                 // Disallow unused variables
    'no-useless-constructor': 'off',                          // Enable the warning about useless constructors
    'no-useless-return': 'warn',                              // Enable the warning about useless return statements
    'no-use-before-define': ['warn', {                        // Enable the warning about using variables before they are defined
      functions: false,                                       // Allow functions to be used before they are defined
      classes: false,                                         // Allow classes to be used before they are defined
    }],
    'object-curly-newline': ['warn', {                        // Require newlines inside of object curly braces
      consistent: true,                                       // Require consistent newlines inside of object curly braces
    }],
    'object-curly-spacing': ['warn', 'always'],               // Require spaces inside of object curly braces
    'operator-linebreak': ['warn', 'before'],                 // Require line breaks before operators
    'padded-blocks': ['warn', {                               // Enable the warning about padding within blocks
      blocks: 'never',                                        // Do not require padding within blocks
      classes: 'always',                                      // Require padding within classes
      switches: 'never',                                      // Do not require padding within switch statements
    }],
    'prefer-arrow-callback': 'warn',                          // Prefer arrow callbacks
    'prefer-const': 'warn',                                   // Prefer const over let
    'quotes': ['warn', 'single', {                            // Require single quotes
      allowTemplateLiterals: true,                            // Allow template literals
    }],
    'radix': 'warn',                                          // Require radix
    'quote-props': ['warn', 'consistent'],                    // Require consistent quote styles
    'semi': 'warn',                                           // Require semicolons
    'space-infix-ops': 'warn',                                // Require spaces around infix operators
    'spaced-comment': 'warn',                                 // Require spaces after comments
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
