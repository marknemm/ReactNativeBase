module.exports = {
  parser: '@typescript-eslint/parser',  // Specify the ESLint parser for TypeScript
  parserOptions: {
    ecmaVersion: 2021,                  // Use the latest ECMAScript syntax
    sourceType: 'module',               // Allow the use of imports
    ecmaFeatures: {
      jsx: true,                        // Enable JSX parsing
    },
    project: './tsconfig.json',         // Specify the path to the TypeScript config file
  },
  env: {
    browser: true,                      // Enable browser global variables
    es2021: true,                       // Enable ES2021 global variables
    jest: true,                         // Enable Jest global variables
    node: true,                         // Enable Node.js global variables and Node.js scoping
  },
  globals: {
    'NodeJS': 'readonly',               // Define the NodeJS as a read-only global for Node.js
    'React': 'readonly',                // Define the React as a read-only global for cleaner typedef in jsdoc
    'ReactNavigation': 'readonly',      // Define the RootParamList as a read-only global for cleaner typedef in jsdoc
    'Types': 'readonly',                // Define the Types as a read-only global for cleaner typedef in jsdoc
    '__DEV__': 'readonly',              // Define the __DEV__ global for conditional development code
  },
  extends: [
    'eslint:recommended',                     // Use ESLint's recommended rules
    'plugin:@typescript-eslint/recommended',  // Use ESLint plugin for TypeScript's recommended rules
    'plugin:react/recommended',               // Use ESLint plugin for React's recommended rules
    'plugin:react-hooks/recommended',         // Use ESLint plugin for React hooks
    'airbnb',                                 // Use the AirBnB style guide
  ],
  plugins: [
    '@typescript-eslint',                     // Linting for TypeScript
    'import',                                 // Linting for ES2015+ (ES6+) import/export syntax and resolution
    'jsdoc',                                  // Linting for JSDoc comments
    'jsx-a11y',                               // Static AST checker for accessibility rules on JSX elements
    'no-floating-promise',                    // Linting for floating promises
    'prefer-arrow-functions',                 // Linting for arrow function expressions
    'react',                                  // Linting for React
    'react-hooks',                            // Linting for React hooks
    'react-refresh',                          // Linting for validating React components can be updated with Fast Refresh
  ],
  overrides: [
    {
			files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'], // Enable eslint-plugin-testing-library rules only for test files
			extends: ['plugin:testing-library/react'],
      rules: {}
		},
  ],
  ignorePatterns: [
    'node_modules/',                          // Ignore node_modules
    '.eslintrc.js',                           // Ignore the ESLint config file
    'babel.config.js',                        // Ignore the Babel config file
  ],
  rules: {                                                      // Add specific rules for your React project
    '@typescript-eslint/no-explicit-any': 'off',                // Disable the rule that disallows explicit any types
    '@typescript-eslint/no-unused-vars': ['warn', {             // Enable the warning about unused variables
      args: 'none',                                             // Do not check for unused function arguments
      caughtErrors: 'none',                                     // Do not check for unused caught errors
      varsIgnorePattern: '^[A-Z]|^_',                           // Ignore variables (type / class imports) that start with an uppercase letter or an underscore
    }],
    '@typescript-eslint/no-use-before-define': ['off', {       // Enable the warning about using variables before they are defined
      functions: false,                                         // Allow functions to be used before they are defined
      classes: false,                                           // Allow classes to be used before they are defined
      variables: false,                                         // Allow variables to be used before they are defined
    }],
    'arrow-body-style': 'warn',                                 // Enable the warning about using arrow functions
    'array-bracket-spacing': ['warn', 'never'],                 // Enable the warning about array bracket spacing
    'arrow-parens': 'warn',                                     // Enable the warning about arrow function parens
    'block-spacing': 'warn',                                    // Enable the warning about block spacing
    'brace-style': 'warn',                                      // Enable the warning about brace style
    'class-methods-use-this': 'off',                            // Disable the warning about using this in class methods
    'comma-dangle': ['warn', {                                  // Require trailing commas in object and array literals
      arrays: 'always-multiline',                               // Require trailing commas in arrays
      exports: 'never',                                         // Disallow trailing commas in exports
      functions: 'never',                                       // Require trailing commas in functions
      imports: 'never',                                         // Disallow trailing commas in imports
      objects: 'always-multiline',                              // Require trailing commas in objects
    }],
    'comma-spacing': 'warn',                                    // Enable the warning about comma spacing
    'comma-style': 'warn',                                      // Enable the warning about comma style
    'consistent-return': 'warn',                                // Enable the warning about consistent return statements
    'default-param-last': 'off',                                // Disable the rule that enforces default parameters to be at the end of the parameter list
    'eol-last': 'warn',                                         // Enable the warning about end of line characters
    'eqeqeq': 'warn',                                           // Enable the warning about using strict equality
    'function-call-argument-newline': 'off',                    // Disable the rule about function call argument newlines
    'function-paren-newline': 'off',                            // Disabled the rule about function paren newlines
    'indent': ['warn', 2],                                      // Enable the warning about indentation
    'implicit-arrow-linebreak': 'off',                          // Disable the rule that enforces a specific line break style for arrow functions
    'import/extensions': 'off',                                 // Disable the warning about import extensions
    'import/newline-after-import': 'warn',                      // Enable the warning about newlines after imports
    'import/no-duplicates': 'warn',                             // Enable the warning about duplicate imports
    'import/no-extraneous-dependencies': 'off',                 // Disable the rule that prevents extraneous dependencies and rely on checkJs instead
    'import/no-mutable-exports': 'warn',                        // Enable the warning that prevents mutable exports
    'import/no-unresolved': 'off',                              // Disable the rule that prevents unresolved imports and rely on checkJs instead
    'import/order': 'warn',                                     // Enable the warning about import order
    'import/prefer-default-export': 'off',                      // Disable the rule that prefers default exports
    'jsdoc/check-indentation': 'warn',                          // Enable the warning about JSDoc indentation
    'jsdoc/check-syntax': 'warn',                               // Enable the warning about JSDoc syntax
    'jsdoc/check-param-names': ['warn', {                       // Enable the warning about JSDoc param names
      checkDestructured: false,                                 // Do not check destructured parameters
    }],
    'jsdoc/no-blank-blocks': 'warn',                            // Enable the warning about blank JSDoc blocks
    'jsdoc/no-undefined-types': 'off',                          // Enable the warning about undefined JSDoc types
    'jsdoc/require-asterisk-prefix': 'warn',                    // Enable the warning about JSDoc asterisk prefixes
    'jsdoc/require-description': 'warn',                        // Enable the warning about JSDoc descriptions
    'jsdoc/require-hyphen-before-param-description': 'off',     // Disable the rule that requires a hyphen before JSDoc param descriptions
    'jsdoc/require-jsdoc': ['warn', {                           // Enable the warning about requiring JSDoc comments
      contexts: [
        'VariableDeclaration',                                  // Encourage documenting variables
        'TSTypeAliasDeclaration',                               // Encourage documenting TypeScript type aliases
        'TSPropertySignature',                                  // Encourage documenting React prop types
      ],
      enableFixer: true,
      publicOnly: true,
      require: {
        ArrowFunctionExpression: true,
        ClassDeclaration: true,
        ClassExpression: true,
        FunctionDeclaration: true,
        FunctionExpression: true,
        MethodDefinition: true,
      },
    }],
    'jsdoc/require-param': ['warn', {                           // Enable the warning about requiring JSDoc param tags
      checkDestructuredRoots: false,                            // Do not check destructured roots
    }],
    'jsdoc/require-param-description': 'warn',                  // Enable the warning about requiring JSDoc param descriptions,
    'jsdoc/require-param-name': 'warn',                         // Enable the warning about requiring JSDoc param names
    'jsdoc/require-param-type': 'off',                          // Disable the warning about requiring JSDoc param types
    'jsdoc/require-returns': ['warn', {                         // Enable the warning about requiring JSDoc return tags
      checkGetters: false,                                      // Do not check getters
    }],
    'jsdoc/require-returns-check': 'warn',                      // Enable the warning about requiring JSDoc return checks
    'jsdoc/require-returns-description': 'warn',                // Enable the warning about requiring JSDoc return descriptions
    'jsdoc/require-returns-type': 'off',                        // Disable the warning about requiring JSDoc return types
    'jsdoc/require-throws': 'warn',                             // Enable the warning about requiring JSDoc throw tags
    'jsdoc/sort-tags': 'warn',                                  // Enable the warning about sorting JSDoc tags
    'jsdoc/tag-lines': ['warn', 'never', {                      // Enable the warning about JSDoc tag lines
      startLines: 1,                                            // Require tags to be on the same line as the comment
    }],
    'jsx-a11y/anchor-is-valid': 'off',                          // Disable the rule that enforces valid <a> tag usage
    'jsx-quotes': ['warn', 'prefer-double'],                    // Enable the warning about using double quotes in JSX
    'key-spacing': 'warn',                                      // Enable the warning about key spacing
    'keyword-spacing': 'warn',                                  // Enable the warning about keyword spacing
    'lines-between-class-members': ['warn', 'always', {         // Enable the warning about lines between class members
      exceptAfterSingleLine: true,                              // Allow single-line class members to be grouped together
    }],
    'max-len': ['warn', {                                       // Enable the warning about line length
      code: 120,                                                // Set the maximum line length to 120 characters
      comments: 160,                                            // Set the maximum line length for comments to 160 characters
      ignoreComments: true,                                     // Ignore comments when checking line length
      ignorePattern: '^import\\s.+\\sfrom\\s.+;$',              // Ignore import statements when checking line length
      ignoreRegExpLiterals: true,                               // Ignore regular expressions when checking line length
      ignoreUrls: true,                                         // Ignore URLs when checking line length
    }],
    'multiline-ternary': ['warn', 'always-multiline'],          // Enable the warning about multiline ternary expressions
    'no-await-in-loop': 'off',                                  // Disable the rule that disallows using await inside of loops
    'no-else-return': 'warn',                                   // Enable the warning about using else return
    'no-empty': 'warn',                                         // Enable the warning about empty blocks
    'no-empty-function': 'warn',                                // Enable the warning about empty functions
    'no-extra-parens': ['warn', 'all', {                        // Enable the warning about extra parentheses
      conditionalAssign: false,                                 // Allow extra parentheses in conditional assignments
      enforceForArrowConditionals: false,                       // Allow extra parentheses in arrow function conditionals
      ignoreJSX: 'multi-line',                                  // Ignore JSX expressions that span multiple lines
      nestedBinaryExpressions: false,                           // Allow extra parentheses in nested binary expressions
      returnAssign: false,                                      // Allow extra parentheses in return assignments
      ternaryOperandBinaryExpressions: false,                   // Allow extra parentheses in ternary operand binary expressions
    }],
    'no-extra-semi': 'warn',                                    // Enable the warning about extra semicolons
    'no-floating-promise/no-floating-promise': 'warn',          // Enable the warning about floating promises
    'no-minusminus': 'off',                                     // Disable the rule that disallows unary operators
    'no-multi-spaces': 'off',                                   // Disable the rule that disallows multiple spaces
    'no-multiple-empty-lines': 'warn',                          // Enable the warning about multiple empty lines
    'no-nested-ternary': 'off',                                 // Disable the rule that disallows nested ternary expressions
    'no-param-reassign': 'off',                                 // Disable the rule that disallows reassigning function parameters
    'no-plusplus': 'off',                                       // Disable the rule that disallows unary operators
    'no-promise-executor-return': 'warn',                       // Enable the warning about returning values from promise executors
    'no-restricted-syntax': 'off',                              // Disable the rule that disallows specific syntax
    'no-trailing-spaces': 'warn',                               // Enable the warning about trailing spaces
    'no-underscore-dangle': 'off',                              // Disable the rule that disallows dangling underscores
    'no-unneeded-ternary': 'warn',                              // Enable the warning about unneeded ternary expressions
    'no-unreachable': 'warn',                                   // Enable the warning about unreachable code
    'no-unused-expressions': ['warn', {                         // Enable the warning about unused expressions
      allowTernary: true,                                       // Allow ternary expressions
    }],
    'no-unused-vars': 'off',                                    // Disable the rule that disallows unused variables (use TypeScript instead)
    'no-useless-constructor': 'off',                            // Enable the warning about useless constructors
    'no-useless-return': 'warn',                                // Enable the warning about useless return statements
    'no-use-before-define': 'off',                              // Disable the rule that disallows using variables before they are defined (use TypeScript instead)
    'object-curly-newline': ['warn', {                          // Enable the warning about object curly newlines
      consistent: true,                                         // Require consistent newlines in object literals
    }],
    'object-curly-spacing': ['warn', 'always'],                 // Enable the warning about object curly spacing
    'object-property-newline': 'warn',                          // Enable the warning about object property newlines
    'object-shorthand': 'warn',                                 // Enable the warning about object shorthand
    'one-var': ['warn', {                                       // Enable the warning about variable declarations
      initialized: 'never',                                     // Do not require variables to be initialized
      uninitialized: 'consecutive',                             // Require consecutive uninitialized variables
    }],
    'one-var-declaration-per-line': 'off',                      // Disable the rule that requires one variable declaration per line
    'operator-linebreak': ['warn', 'before'],                   // Enable the warning about operator line breaks
    'padded-blocks': ['warn', {                                 // Enable the warning about padding within blocks
      blocks: 'never',                                          // Do not require padding within blocks
      classes: 'always',                                        // Require padding within classes
      switches: 'never',                                        // Do not require padding within switch statements
    }],
    'prefer-arrow-callback': ['warn', {                         // Enable the warning about using arrow functions for callbacks
      allowNamedFunctions: true,                                // Allow named functions
    }],
    'prefer-arrow-functions/prefer-arrow-functions': ['warn', { // Enable the warning about using arrow functions
      allowNamedFunctions: true,                                // Allow named functions
      classPropertiesAllowed: false,                            // Allow arrow functions for class properties
      disallowPrototype: true,                                  // Disallow arrow functions for prototype methods
      returnStyle: 'unchanged',                                 // Do not enforce a specific return style
    }],
    'prefer-const': 'warn',                                     // Enable the warning about using const
    'prefer-destructuring': 'warn',                             // Enable the warning about using destructuring
    'prefer-template': 'warn',                                  // Enable the warning about using template literals
    'quotes': ['warn', 'single'],                               // Enable the warning about using single quotes
    'radix': 'warn',                                            // Enable the warning about using radix
    'react-hooks/exhaustive-deps': ['warn', {                   // Enable the warning about exhaustive dependencies
      additionalHooks: 'useThemedStyles',                       // Include additional custom hooks to check for dependencies
    }],
    'react/destructuring-assignment': 'warn',                   // Enable the warning about using destructuring assignment
    'react/function-component-definition': ['warn', {           // Enable the warning about function component definitions
      namedComponents: 'arrow-function',                        // Require function components to be arrow functions
      unnamedComponents: 'arrow-function',                      // Require function components to be arrow functions
    }],
    'react/jsx-boolean-value': 'warn',                          // Enable the warning about boolean values in JSX
    'react/jsx-closing-bracket-location': 'warn',               // Enable the warning about the location of closing brackets in JSX
    'react/jsx-closing-tag-location': 'warn',                   // Enable the warning about the location of closing tags in JSX
    'react/jsx-curly-newline': 'warn',                          // Enable the warning about curly newlines in JSX
    'react/jsx-curly-spacing': 'warn',                          // Enable the warning about curly spacing in JSX
    'react/jsx-filename-extension': ['warn', {                  // Enable the warning about JSX filename extensions
      extensions: ['.jsx', '.tsx'],                             // Specify the extensions to check for
    }],
    'react/jsx-first-prop-new-line': 'warn',                    // Enable the warning about the first prop new line in JSX
    'react/jsx-indent': 'warn',                                 // Enable the warning about indentation in JSX
    'react/jsx-indent-props': 'warn',                           // Enable the warning about prop indentation in JSX
    'react/jsx-max-props-per-line': 'warn',                     // Enable the warning about the maximum number of props per line in JSX
    'react/jsx-no-useless-fragment': 'warn',                    // Enable the warning about using useless fragments in JSX
    'react/jsx-one-expression-per-line': 'off',                 // Disable the rule that enforces one expression per line in JSX
    'react/jsx-props-no-multi-spaces': 'warn',                  // Enable the warning about prop spacing in JSX
    'react/jsx-props-no-spreading': 'off',                      // Disable the rule that prevents spreading props
    'react/jsx-tag-spacing': 'warn',                            // Enable the warning about tag spacing in JSX
    'react/jsx-wrap-multilines': 'warn',                        // Enable the warning about wrapping multiline JSX
    'react/no-unstable-nested-components': ['warn', {           // Enable the warning about using unstable nested components
      allowAsProps: true,                                       // Allow using unstable nested components as props
    }],
    'react/prop-types': 'off',                                  // Disable the rule that requires prop types
    'react/react-in-jsx-scope': 'off',                          // Disable the requirement to import React when using JSX
    'react/require-default-props': 'off',                       // Disable the rule that requires default props
    'react/self-closing-comp': 'warn',                          // Enable the warning about self-closing components
    'react-refresh/only-export-components': 'warn',             // Enable the warning about only exporting components from JSX files
    'semi': ['warn', 'always'],                                 // Enable the warning about using semicolons
    'space-before-blocks': 'warn',                              // Enable the warning about spacing before blocks
    'space-in-parens': 'warn',                                  // Enable the warning about spacing in parentheses
    'space-infix-ops': 'warn',                                  // Enable the warning about spacing in infix operators
    'spaced-comment': 'warn',                                   // Enable the warning about spacing in comments
  },
};
