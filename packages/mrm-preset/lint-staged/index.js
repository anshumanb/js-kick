const { normalize } = require('path');
const lintStaged = require('mrm-task-lint-staged');
const { lines } = require('mrm-core');

const task = () => {
    // For every run of lint-staged, it appends "npx lint-staged" to pre-commit.
    // This needs to happen only once and on subsequent runs the file should
    // remain untouched
    const preCommit = lines(normalize('.husky/pre-commit'));
    if (preCommit.exists()) {
        preCommit.remove('npx lint-staged').save();
    }

    lintStaged({
        lintStagedRules: {
            prettier: {
                extensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'html', 'css'],
            },
            eslint: {
                extensions: ['js', 'jsx', 'ts', 'tsx'],
            },
        },
    });
};

task.description = 'Configure lint-staged';

module.exports = task;
