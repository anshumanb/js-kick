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

const removeHook = (hook) => {
    if (!isInstalled('husky')) {
        return;
    }

    const hookPath = normalize(`.husky/${hook}`);
    lines(hookPath).delete();
};

// TODO: Run commitlint on CI
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

    // We don't want the commitizen prompt appearing when committing during
    // builds so only show prompt when we run 'npm run commit'
    packageJson().removeScript('cz').setScript('commit', 'cz').save();
    removeHook('prepare-commit-msg');

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
