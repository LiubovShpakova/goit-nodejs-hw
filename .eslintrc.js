module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
  },
};
