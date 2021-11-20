const { mkdirSync } = require('fs');
const { spawnSync } = require('child_process');
const { normalize, resolve } = require('path');
const { install, lines, packageJson, uninstall, yaml } = require('mrm-core');
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

const configureSemanticRelease = () => {
    const pkg = packageJson();

    const isUsingWorkspaces = !!pkg.get('workspaces', []).length;

    if (isUsingWorkspaces) {
        pkg.setScript(
            'release',
            'multi-semantic-release --deps.bump=inherit',
        ).save();
        uninstall('semantic-release');
        install({ 'multi-semantic-release': '>=2.9' });
    } else {
        pkg.setScript('release', 'semantic-release').save();
        uninstall('multi-semantic-release');
        install({ 'semantic-release': '>=18' });
    }

    json('.releaserc.json')
        .setIfUnset('extends', ['@bhadurian/semantic-release-config'])
        .save();

    install({
        '@bhadurian/semantic-release-config': '>=2',
    });
};

const configureActions = () => {
    mkdirSync(resolve('.github/workflows'), { recursive: true });

    yaml(
        resolve('.github/workflows/release.yml'),
        yaml(resolve(__dirname, 'release.yml')).get(),
    ).save();
};

const task = () => {
    configureCommitlint();
    configureCommitizen();
    configureSemanticRelease();
    configureActions();
};

task.description = 'Configure Commitlint';

module.exports = task;
