module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-console': 'off',
    'no-prototype-builtins': 'error',
    'no-multiple-empty-lines': 'error',
    'no-multi-spaces': 'off',
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    'indent': ['error', 2],
    'prefer-const': 'error',
    'array-bracket-spacing': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
  }
};
