const { spawnSync } = require('child_process');
const { normalize } = require('path');
const { lines } = require('mrm-core');

const initGit = () => {
    if (lines(normalize('.git/config')).exists()) {
        return;
    }
    spawnSync('git', ['init']);
};

const configureGitAttributes = () => {
    const file = lines('.gitattributes');
    file.add(['* text=auto eol=lf']);
    file.save();
};

const configureGitIgnore = () => {
    const file = lines('.gitignore');
    file.add(['node_modules/']);
    file.save();
};

const task = () => {
    initGit();
    configureGitAttributes();
    configureGitIgnore();
    // TODO: Update package.json repository attribute
};

task.description = 'Configure Git';

module.exports = task;
