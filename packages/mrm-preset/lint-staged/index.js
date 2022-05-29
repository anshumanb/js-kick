const { resolve } = require('path');
const { spawnSync } = require('child_process');
const { lines, install, json, packageJson } = require('mrm-core');

const task = () => {
    install({ husky: '>=7', 'lint-staged': '>=11' });

    spawnSync('npx', ['husky', 'install']);

    packageJson().setScript('prepare', 'husky install').save();

    const preCommitPath = resolve('.husky/pre-commit');
    const hasLintStaged = lines(preCommitPath)
        .get()
        .includes('npx lint-staged');

    if (!hasLintStaged) {
        spawnSync('npx', ['husky', 'add', preCommitPath, 'npx lint-staged']);
    }

    json('.lintstagedrc.json', {
        '*.{js,jsx,ts,tsx,mjs}': ['eslint --cache --fix', 'prettier --write'],
        '*': 'prettier --ignore-unknown --write',
    }).save();

    packageJson().unset('lint-staged').save();
};

task.description = 'Configure lint-staged';

module.exports = task;
