const { lines } = require('mrm-core');

const configureGitAttributes = () => {
    const file = lines('.gitattributes');
    file.add(['* text=auto eol=lf']);
    file.save();
};

const configureGitIgnore = () => {
    const file = lines('.gitignore');
    file.add([
        'node_modules/',
        'coverage/',
        'dist/',
        'build/',
        'out/',
        '.next/',
    ]);
    file.save();
};

const task = () => {
    // do git init as well?
    configureGitAttributes();
    configureGitIgnore();
};

task.description = 'Configure Git';

module.exports = task;
