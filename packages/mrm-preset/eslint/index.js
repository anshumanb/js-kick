const { install, lines, json } = require('mrm-core');
const { isInstalled } = require('../utils');

const task = () => {
    // Most likely the default extends will have to replaced based on the
    // project so don't try to "set" it
    json('.eslintrc.json', {
        root: true,
        extends: ['@bhadurian/eslint-config'],
    }).save();

    lines('.gitignore').add('.eslintcache').save();

    install({
        eslint: '^7',
        'eslint-plugin-import': '^2.24.2',
        '@typescript-eslint/eslint-plugin': '^4.30.0',
        '@typescript-eslint/parser': '^4.30.0',
        'eslint-config-airbnb-typescript': '^14.0.0',
        'eslint-config-prettier': '^8.3.0',
        '@bhadurian/eslint-config': '*',
    });

    if (!isInstalled('eslint-config-airbnb')) {
        install({ 'eslint-config-airbnb-base': '^14.2.1' });
    }
};

task.description = 'Configure Prettier';

module.exports = task;
