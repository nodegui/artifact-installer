module.exports = {
  extends: ['plugin:prettier/recommended'],
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
      rules: {
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
};
