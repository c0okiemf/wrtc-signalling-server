module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // As we used TSLint before, we have a lot of interfaces starting with I
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'max-len': ['error', { code: 120 }],
    '@typescript-eslint/no-explicit-any': 0,
  },
};
