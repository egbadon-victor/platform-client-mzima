module.exports = {
  extends: ['../../.eslintrc.js', "plugin:codelyzer/angular"],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['apps/web-mzima-client/tsconfig.json'],
        createDefaultProgram: true,
      },
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'mzimaClient',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'mzima-client',
            style: 'kebab-case',
          },
        ],
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
      },
      extends: ['plugin:@nx/angular', 'plugin:@angular-eslint/template/process-inline-templates'],
    },
    {
      files: ['*.html'],
      extends: ['plugin:@nx/angular-template'],
      rules: {},
    },
  ],
};
