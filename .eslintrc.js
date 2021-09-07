module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: `${__dirname}/tsconfig.eslint.json`
  },
  plugins: [
    'babel',
    'react',
    'jsx-a11y',
    'react-hooks',
    'promise',
    'security',
    'prettier',
    '@typescript-eslint',
    'graphql'
  ],
  root: true,
  env: {
    node: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: '17'
    },
    'import/resolver': {
      node: {
        paths: ['.'],
        extensions: ['.ts', '.tsx']
      }
    }
  },
  rules: {
    /* security */
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'error',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-object-injection': 'off',
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-pseudoRandomBytes': 'error',

    /* promises */
    'promise/always-return': 'error',
    'promise/catch-or-return': 'error',
    'promise/param-names': 'error',
    'promise/no-return-wrap': 'error',

    /* nest js */
    'nestjs/use-validation-pipe': 0,

    /* typescript */
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': false
      }
    ],
    '@typescript-eslint/no-use-before-define': ['error', { classes: false }],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-inferrable-types': [
      'error',
      { ignoreProperties: true }
    ],

    /* prettier */
    'prettier/prettier': ['error'],

    'import/prefer-default-export': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': 0,
    'lines-between-class-members': ['error', 'always'],

    /* typescript */
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'warn',
    '@typescript-eslint/no-implied-eval': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true }
    ],

    /* react */
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  },

  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['**/modules/**/*.resolver.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['warn']
      }
    }
  ]
};
