const path = require('path');
const { install, packageJson, makeDirs } = require('mrm-core');
const { copyFile } = require('../utils');

const task = () => {
    makeDirs('.storybook');

    copyFile(path.join(__dirname, 'main.template.js'), '.storybook/main.js');

    copyFile(
        path.join(__dirname, 'preview.template.js'),
        '.storybook/preview.js',
    );

    packageJson()
        .setScript('storybook', 'start-storybook -p 6006')
        .setScript('build-storybook', 'build-storybook')
        .save();

    install({
        '@babel/core': '^7',
        'babel-loader': '^8',
        '@storybook/react': '^6',
        '@storybook/addon-essentials': '^6',
    });
};

task.description = 'Configure TypeScript';

module.exports = task;
