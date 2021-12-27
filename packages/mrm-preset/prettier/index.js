const { lines, install, json, packageJson } = require('mrm-core');
const { exists } = require('../utils');

const task = () => {
    // TODO: Just always write JS config
    if (!exists('.prettierrc.js')) {
        // Default config has not been extended so we have the liberty to blow
        // things away
        json('.prettierrc.json').set('@bhadurian/prettier-config').save();
    }

    lines('.prettierignore').delete();

    packageJson()
        .removeScript('prettier')
        .setScript('format', 'prettier --write .')
        .save();

    install({ prettier: '>=2.4', '@bhadurian/prettier-config': '*' });
};

task.description = 'Configure Prettier';

module.exports = task;
