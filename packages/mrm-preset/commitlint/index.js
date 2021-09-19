const { spawnSync } = require('child_process');
const { install, lines, json, packageJson } = require('mrm-core');

const packages = {
    '@commitlint/config-conventional': '^13',
    '@commitlint/cli': '^13',
};

const task = () => {
    json('.commitlintrc.json', {
        extends: ['@commitlint/config-conventional'],
    }).save();

    const isHuskyInstalled = !!packageJson().get('devDependencies.husky');
    if (isHuskyInstalled) {
        const hook = lines('.husky/commit-msg');
        const hookScript = 'npx --no-install commitlint --edit';

        if (hook.exists()) {
            hook.add(hookScript).save();
        } else {
            spawnSync('npx', ['husky', 'add', '.husky/commit-msg', hookScript]);
        }
    }

    install(packages);
};

task.description = 'Configure Commitlint';

module.exports = task;
