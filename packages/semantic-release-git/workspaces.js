const path = require('path');
const {
    verifyConditions,
    prepare: gitPrepare,
} = require('@semantic-release/git');

const defaultCommitMessage =
    // eslint-disable-next-line no-template-curly-in-string
    'chore(${workspace}): release ${nextRelease.version} [skip ci]\n';

// Prevent having to configure each package in a monorepo to have its own
// semantic-release config file and duplicating plugin config, just to have a
// scope included in the release commit message which reflects the package being
// released.
const prepare = (pluginConfig, context) => {
    const { cwd } = context;
    const { message } = pluginConfig;

    const commitScope = path.basename(cwd);

    const config = {
        ...pluginConfig,
        message: (message || defaultCommitMessage).replace(
            // eslint-disable-next-line no-template-curly-in-string
            '${workspace}',
            commitScope,
        ),
    };

    return gitPrepare(config, context);
};

module.exports = { verifyConditions, prepare };
