const { normalize } = require('path');
const lintStaged = require('mrm-task-lint-staged');
const { lines, install } = require('mrm-core');

const task = () => {
    // For every run of lint-staged, it appends "npx lint-staged" to pre-commit.
    // This needs to happen only once and on subsequent runs the file should
    // remain untouched
    const preCommit = lines(normalize('.husky/pre-commit'));
    if (preCommit.exists()) {
        preCommit.remove('npx lint-staged').save();
    }

    install({ husky: '>=7', 'lint-staged': '>=11' });

    // FIXME: This still needed some manual intervention to tidy config for
    // get_transations
    lintStaged({
        lintStagedRules: {
            prettier: {
                extensions: [
                    'js',
                    'jsx',
                    'ts',
                    'tsx',
                    'md',
                    'html',
                    'css',
                    'scss',
                    'json',
                    'yaml',
                    'yml',
                ],
            },
            eslint: {
                extensions: ['js', 'jsx', 'ts', 'tsx'],
            },
        },
    });
};

task.description = 'Configure lint-staged';

module.exports = task;
