module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    ignorePatterns: [
        // kcd-scripts
        'node_modules/',
        'coverage/',
        'dist/',
        'build/',
        'out/',
        '.next/',
    ],
    extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
};
