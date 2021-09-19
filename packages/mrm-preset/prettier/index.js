const { lines, install, json, packageJson } = require('mrm-core');

const task = () => {
    const jsConf = lines('.prettierrc.js');
    if (!jsConf.exists()) {
        // Default config has not been extended so we have the liberty to blow
        // things away
        json('.prettierrc.json').set('@bhadurian/prettier-config').save();
    }

    lines('.prettierignore').add(['node_modules/']).save();

    packageJson().setScript('format', 'prettier --write .').save();

    install({ prettier: '^2', '@bhadurian/prettier-config': '*' });
};

task.description = 'Configure Prettier';

module.exports = task;
