const { packageJson, install, lines, json, uninstall } = require('mrm-core');
const { isInstalled } = require('../utils');

const task = () => {
    // Most likely the default extends will have to replaced based on the
    // project so don't try to "set" it
    json('.eslintrc.json', {
        root: true,
        extends: ['@bhadurian/eslint-config'],
    }).save();

    lines('.gitignore').add('.eslintcache').save();

    uninstall([
        'eslint-plugin-import',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-config-airbnb-typescript',
        'eslint-config-prettier',
        'eslint',
    ]);

    install({
        eslint: '^7',
        '@bhadurian/eslint-config': '*',
    });

    if (!isInstalled('eslint-config-airbnb')) {
        install({ 'eslint-config-airbnb-base': '^14.2.1' });
    }

    packageJson().setScript('lint', 'eslint --cache .').save();
};

task.description = 'Configure Prettier';

module.exports = task;
