import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
    {
        ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...vue.configs['flat/recommended'],
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'unused-imports': unusedImports,
        },
        rules: {
            'no-unused-vars': 'off',
            'no-console': 'warn',
            'no-debugger': 'error',
            'prefer-const': 'error',
            eqeqeq: ['error', 'smart'],
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
        },
    },
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                ecmaVersion: 'latest',
                sourceType: 'module',
                extraFileExtensions: ['.vue'],
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    prettier,
];
