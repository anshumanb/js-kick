const { spawnSync } = require('child_process');
const { lines } = require('mrm-core');
const { exists } = require('../utils');

const task = () => {
    if (!exists('.git/config')) {
        spawnSync('git', ['init']);
    }

    lines('.gitattributes').add(['* text=auto eol=lf']).save();

    lines('.gitignore').remove('node_modules').add('node_modules/').save();
    // TODO: Update package.json repository attribute
};

task.description = 'Configure Git';

module.exports = task;
