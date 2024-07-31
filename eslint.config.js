const prettier_plugin = require('eslint-plugin-prettier');

module.exports = [
  prettier_plugin.configs.recommended,
  {
    plugins: ['prettier'],
    ignores: ['dist/'],
    rules: {
      'prettier/prettier': 'error',
      'block-scoped-var': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eol-last': 'error',
      'prefer-arrow-callback': 'error',
      'no-trailing-spaces': 'error',
      quotes: [
        'warn',
        'single',
        {
          avoidEscape: true,
        },
      ],
      'no-restricted-properties': [
        'error',
        {
          object: 'describe',
          property: 'only',
        },
        {
          object: 'it',
          property: 'only',
        },
      ],
      'node/no-unpublished-require': 'off',
    },
  },
];
