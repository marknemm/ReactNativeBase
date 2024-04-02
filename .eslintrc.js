/* eslint-disable quote-props */

module.exports = {
  parser: '@babel/eslint-parser', // Specify the ESLint parser - babel enables latest/experimental ECMAScript features
  parserOptions: {
    ecmaVersion: 2021,    // Use the latest ECMAScript syntax
    sourceType: 'module', // Allow the use of imports
    ecmaFeatures: {
      jsx: true // Enable JSX parsing
    }
  },
  env: {
    browser: true,  // Enable browser global variables
    es2021: true,   // Enable ES2021 global variables
    node: true,     // Enable Node.js global variables and Node.js scoping
  },
  globals: {
    'React': 'readonly', // Define the React as a read-only global for cleaner typedef in jsdoc
  },
  extends: [
    'eslint:recommended',             // Use ESLint's recommended rules
    'plugin:react/recommended',       // Use ESLint plugin for React's recommended rules
    'plugin:react-hooks/recommended', // Use ESLint plugin for React hooks
    'airbnb',                         // Use the AirBnB style guide
  ],
  plugins: [
    'import',                         // Linting for ES2015+ (ES6+) import/export syntax and resolution
    'jsdoc',                          // Linting for JSDoc comments
    'jsx-a11y',                       // Static AST checker for accessibility rules on JSX elements
    'prefer-arrow-functions',         // Linting for arrow function expressions
    'react',                          // Linting for React
    'react-hooks',                    // Linting for React hooks
    'react-refresh',                  // Linting for validating React components can be updated with Fast Refresh
  ],
  rules: {                                                      // Add specific rules for your React project
    'arrow-body-style': 'warn',                                 // Enable the warning about using arrow functions
    'comma-dangle': 'off',                                      // Disable the rule that requires trailing commas
    'eol-last': 'warn',                                         // Enable the warning about end of line characters
    'function-paren-newline': 'warn',                           // Enable the warning about function paren newlines
    'indent': 'warn',                                           // Enable the warning about indentation
    'implicit-arrow-linebreak': 'off',                          // Disable the rule that enforces a specific line break style for arrow functions
    'import/no-unresolved': 'off',                              // Disable the rule that prevents unresolved imports and rely on checkJs instead
    'import/order': 'warn',                                     // Enable the warning about import order
    'import/prefer-default-export': 'off',                      // Disable the rule that prefers default exports
    'jsdoc/check-indentation': 'warn',                          // Enable the warning about JSDoc indentation
    'jsdoc/check-syntax': 'warn',                               // Enable the warning about JSDoc syntax
    'jsdoc/check-param-names': 'warn',                          // Enable the warning about JSDoc param names
    'jsdoc/no-blank-blocks': 'warn',                            // Enable the warning about blank JSDoc blocks
    'jsdoc/no-undefined-types': 'warn',                         // Enable the warning about undefined JSDoc types
    'jsdoc/require-asterisk-prefix': 'warn',                    // Enable the warning about JSDoc asterisk prefixes
    'jsdoc/require-description': 'warn',                        // Enable the warning about JSDoc descriptions
    'jsdoc/require-hyphen-before-param-description': 'off',     // Disable the rule that requires a hyphen before JSDoc param descriptions
    'jsdoc/require-jsdoc': ['warn', {                           // Enable the warning about requiring JSDoc comments
      contexts: [
        'VariableDeclaration',    // Encourage documenting variables
        'TSTypeAliasDeclaration', // Encourage documenting TypeScript type aliases
        'TSPropertySignature',    // Encourage documenting React prop types
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
      checkDestructuredRoots: false                             // Do not check destructured roots
    }],
    'jsdoc/require-param-description': 'warn',                  // Enable the warning about requiring JSDoc param descriptions,
    'jsdoc/require-param-name': 'warn',                         // Enable the warning about requiring JSDoc param names
    'jsdoc/require-param-type': 'warn',                         // Enable the warning about requiring JSDoc param types
    'jsdoc/require-returns': 'warn',                            // Enable the warning about requiring JSDoc return tags
    'jsdoc/require-returns-check': 'warn',                      // Enable the warning about requiring JSDoc return checks
    'jsdoc/require-returns-description': 'warn',                // Enable the warning about requiring JSDoc return descriptions
    'jsdoc/require-returns-type': 'warn',                       // Enable the warning about requiring JSDoc return types
    'jsdoc/require-throws': 'warn',                             // Enable the warning about requiring JSDoc throw tags
    'jsdoc/sort-tags': 'warn',                                  // Enable the warning about sorting JSDoc tags
    'jsdoc/tag-lines': ['warn', 'never', {                      // Enable the warning about JSDoc tag lines
      startLines: 1                                             // Require tags to be on the same line as the comment
    }],
    'jsx-a11y/anchor-is-valid': 'off',                          // Disable the rule that enforces valid <a> tag usage
    'lines-between-class-members': ['warn', 'always', {         // Enable the warning about lines between class members
      exceptAfterSingleLine: true                               // Allow single-line class members to be grouped together
    }],
    'max-len': ['warn', {                                       // Enable the warning about line length
      code: 120,                                                // Set the maximum line length to 80 characters
      ignoreComments: true,                                     // Ignore comments when checking line length
    }],
    'no-await-in-loop': 'off',                                  // Disable the rule that disallows using await inside of loops
    'no-multi-spaces': 'off',                                   // Disable the rule that disallows multiple spaces
    'no-multiple-empty-lines': 'warn',                          // Enable the warning about multiple empty lines
    'no-param-reassign': 'off',                                 // Disable the rule that disallows reassigning function parameters
    'no-trailing-spaces': 'warn',                               // Enable the warning about trailing spaces
    'no-unused-vars': 'warn',                                   // Enable the warning about unused variables
    'no-unused-expressions': ['warn', {                         // Enable the warning about unused expressions
      allowTernary: true,                                       // Allow ternary expressions
    }],
    'no-use-before-define': ['warn', {                          // Enable the warning about using variables before they are defined
      functions: false,                                         // Allow functions to be used before they are defined
      classes: false,                                           // Allow classes to be used before they are defined
    }],
    'object-curly-newline': ['warn', {                          // Enable the warning about object curly newlines
      consistent: true,                                         // Require consistent newlines in object literals
    }],
    'object-curly-spacing': ['warn', 'always'],                 // Enable the warning about object curly spacing
    'padded-blocks': ['warn', {                                 // Enable the warning about padding within blocks
      blocks: 'never',                                          // Do not require padding within blocks
      classes: 'always',                                        // Require padding within classes
      switches: 'never',                                        // Do not require padding within switch statements
    }],
    'prefer-arrow-functions/prefer-arrow-functions': ['warn', { // Enable the warning about using arrow functions
      allowNamedFunctions: true,                                // Allow named functions
      classPropertiesAllowed: true,                             // Allow arrow functions for class properties
      disallowPrototype: true,                                  // Disallow arrow functions for prototype methods
      returnStyle: 'unchanged',                                 // Do not enforce a specific return style
    }],
    'prefer-arrow-callback': ['warn', {                         // Enable the warning about using arrow functions for callbacks
      allowNamedFunctions: true,                                // Allow named functions
    }],
    'quotes': ['warn', 'single'],                               // Enable the warning about using single quotes
    'react/jsx-closing-bracket-location': 'warn',               // Enable the warning about the location of closing brackets in JSX
    'react/jsx-curly-spacing': 'warn',                          // Enable the warning about curly spacing in JSX
    'react/jsx-first-prop-new-line': 'warn',                    // Enable the warning about the first prop new line in JSX
    'react/jsx-indent': 'warn',                                 // Enable the warning about indentation in JSX
    'react/jsx-indent-props': 'warn',                           // Enable the warning about prop indentation in JSX
    'react/jsx-max-props-per-line': 'warn',                     // Enable the warning about the maximum number of props per line in JSX
    'react/jsx-one-expression-per-line': 'off',                 // Disable the rule that enforces one expression per line in JSX
    'react/jsx-tag-spacing': 'warn',                            // Enable the warning about tag spacing in JSX
    'react/prop-types': ['warn', {                              // Enable the warning about using prop types
      ignore: ['children', 'className', 'style'],               // Ignore the children, className, and style props
    }],
    'react/react-in-jsx-scope': 'off',                          // Disable the requirement to import React when using JSX
    'react/require-default-props': 'off',                       // Disable the rule that requires default props
    'react-refresh/only-export-components': 'warn',             // Enable the warning about only exporting components from JSX files
    'semi': ['warn', 'always'],                                 // Enable the warning about using semicolons
  }
};
