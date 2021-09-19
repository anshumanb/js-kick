const { install, json } = require('mrm-core');

const packages = {
    eslint: '^7',
    'eslint-config-airbnb-base': '^14.2.1',
    'eslint-plugin-import': '^2.24.2',
    '@typescript-eslint/eslint-plugin': '^4.30.0',
    '@typescript-eslint/parser': '^4.30.0',
    'eslint-config-airbnb-typescript': '^14.0.0',
    'eslint-config-prettier': '^8.3.0',
    '@bhadurian/eslint-config': '*',
};

const defaultExtends = ['@bhadurian/eslint-config'];

const task = () => {
    const file = json('.eslintrc.json', {
        root: true,
        extends: defaultExtends,
    });

    const extensions = [].concat(file.get('extends'));
    if (!extensions.includes(defaultExtends[0])) {
        file.set('extends', defaultExtends.concat(extensions));
    }

    file.save();

    install(packages);
};

task.description = 'Configure Prettier';

module.exports = task;
