const { install, lines } = require('mrm-core');
const { json } = require('../utils');

const task = () => {
    json('tsconfig.json')
        .setIfUnset('extends', '@bhadurian/tsconfig/node-lts.json')
        .save();

    install({
        '@bhadurian/tsconfig': '*',
        typescript: '>=4.4.3',
        // FIXME: Should default to latest lts and be in sync with nvmrc
        '@types/node': '^14',
    });

    lines('.gitignore').add('dist/').save();
};

task.description = 'Configure TypeScript';

module.exports = task;
