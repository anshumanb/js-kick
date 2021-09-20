const { spawnSync } = require('child_process');
const { normalize } = require('path');
const { install, lines, json, packageJson } = require('mrm-core');

const setHook = (hook, script) => {
    const isHuskyInstalled = !!packageJson().get('devDependencies.husky');

    if (!isHuskyInstalled) {
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
    const packages = {
        '@commitlint/config-conventional': '^13',
        '@commitlint/cli': '^13',
    };

    json('.commitlintrc.json', {
        extends: ['@commitlint/config-conventional'],
    }).save();

    setHook('commit-msg', 'npx --no-install commitlint --edit');

    install(packages);
};

const configureCommitizen = () => {
    const packages = {
        commitizen: '^4',
        '@commitlint/cz-commitlint': '^13',
    };

    json('.czrc', {
        path: '@commitlint/cz-commitlint',
    }).save();

    packageJson().setScript('cz', 'cz').save();

    // So commitizen runs on git commit
    setHook(
        'prepare-commit-msg',
        'exec < /dev/tty && node_modules/.bin/cz --hook || true',
    );

    install(packages);
};

const task = () => {
    configureCommitlint();
    configureCommitizen();
};

task.description = 'Configure Commitlint';

module.exports = task;
