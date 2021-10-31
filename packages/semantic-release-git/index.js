const path = require('path');
const { spawnSync } = require('child_process');
const findUp = require('find-up');
const {
    verifyConditions,
    prepare: gitPrepare,
} = require('@semantic-release/git');

const getRoot = () =>
    spawnSync('git', ['rev-parse', '--show-top-level']).stdout;

const defaultWorkspacesCommitMsg =
    // eslint-disable-next-line no-template-curly-in-string
    'chore(${workspace}): release ${nextRelease.version} [skip ci]\n';

// When using workspaces, it is assumed the root of the workspace isn't
// published but packages within it are
const isUsingWorkspaces = (root, cwd) => {
    // Short circuit to save time
    if (root === cwd) {
        return false;
    }

    return !!(
        findUp.sync('package.json', { cwd, stopAt: root }) &&
        findUp.sync('package.json', {
            cwd: path.normalize(cwd, '..'),
            stopAt: root,
        })
    );
};

// Prevent having to configure each package in a monorepo to have its own
// semantic-release config file and duplicating plugin config, just to have a
// scope included in the release commit message which reflects the package being
// released.
const prepare = (pluginConfig, context) => {
    const { cwd } = context;
    const { message } = pluginConfig;
    const hasWorkspaces = isUsingWorkspaces(getRoot(), cwd);

    if (!hasWorkspaces) {
        return gitPrepare(pluginConfig, context);
    }

    const commitScope = path.basename(cwd);
    const config = {
        ...pluginConfig,
        message: (message || defaultWorkspacesCommitMsg).replace(
            // eslint-disable-next-line no-template-curly-in-string
            '${workspace}',
            commitScope,
        ),
    };

    return gitPrepare(config, context);
};

module.exports = { verifyConditions, prepare };
