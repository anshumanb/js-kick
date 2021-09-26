const {
    MrmError,
    packageJson,
    lines,
    install,
    uninstall,
    makeDirs,
} = require('mrm-core');
const { json, exists, isInstalled } = require('../utils');

const packages = {
    prod: {
        react: '^17',
        'react-dom': '^17',
        next: '^11',
    },
    dev: {
        '@types/react': '^17',
        typescript: '*',
    },
};

const configureEsLint = () => {
    if (!(exists('.eslintrc.json') && isInstalled('eslint'))) {
        throw new MrmError('Run eslint task first');
    }

    json('.eslintrc.json')
        .prepend('extends', '@bhadurian/eslint-config/next', [
            '@bhadurian/eslint-config',
        ])
        .save();

    uninstall('eslint-config-airbnb-base');
    install({
        'eslint-config-airbnb': '*',
        'eslint-plugin-react': '*',
        'eslint-plugin-react-hooks': '*',
        'eslint-plugin-jsx-a11y': '*',
        '@next/eslint-plugin-next': '*',
    });
};

const task = () => {
    lines('.gitignore').add('/.next/').save();

    json('tsconfig.json')
        .set('include', ['next-env.d.ts', '**/*.ts', '**/*.tsx'])
        .set('exclude', ['node_modules'])
        .save();

    configureEsLint();

    json('tsconfig.json')
        .set('extends', '@bhadurian/tsconfig/next.json')
        .save();

    lines('next.config.js', [
        "/** @type {import('next').NextConfig} */",
        'module.exports = {',
        '  reactStrictMode: true,',
        '  trailingSlash: true,',
        '}',
    ]).save();

    lines('next-env.d.ts', [
        '/// <reference types="next" />',
        '/// <reference types="next/types/global" />',
        '/// <reference types="next/image-types/global" />',

        '// NOTE: This file should not be edited',
        '// see https://nextjs.org/docs/basic-features/typescript for more information.',
    ]).save();

    makeDirs('src/pages');

    packageJson()
        .setScript('build', 'next build')
        .setScript('dev', 'next dev')
        .setScript('lint', 'next lint')
        .setScript('start', 'next start')
        .save();

    install(packages.dev);
    install(packages.prod, { dev: false });
};

task.description = 'Configure Next';

module.exports = task;
