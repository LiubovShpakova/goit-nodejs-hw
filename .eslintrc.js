module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'eslint no-extra-semi': 'off',
  },
};
