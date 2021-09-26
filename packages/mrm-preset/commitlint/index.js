const { spawnSync } = require('child_process');
const { normalize } = require('path');
const { install, lines, packageJson } = require('mrm-core');
const { isInstalled, json } = require('../utils');

const setHook = (hook, script) => {
    // FIXME: Dependency on Husky
    if (!isInstalled('husky')) {
        return;
    }

    const hookPath = normalize(`.husky/${hook}`);
    const hookFile = lines(hookPath);

    if (hookFile.exists()) {
        hookFile.add(script).save();
    } else {
        spawnSync('npx', ['husky', 'add', hookPath, script]);
    }
};

const configureCommitlint = () => {
    json('.commitlintrc.json')
        .prepend('extends', '@commitlint/config-conventional')
        .save();

    setHook('commit-msg', 'npx --no-install commitlint --edit');

    install({
        '@commitlint/config-conventional': '^13',
        '@commitlint/cli': '^13',
    });
};

const configureCommitizen = () => {
    json('.czrc').setIfUnset('path', '@commitlint/cz-commitlint').save();

    packageJson().setScript('cz', 'cz').save();

    // So commitizen runs on git commit
    setHook(
        'prepare-commit-msg',
        'exec < /dev/tty && node_modules/.bin/cz --hook || true',
    );

    install({
        commitizen: '^4',
        '@commitlint/cz-commitlint': '^13',
    });
};

const task = () => {
    configureCommitlint();
    configureCommitizen();
};

task.description = 'Configure Commitlint';

module.exports = task;
