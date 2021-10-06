const meta = require('user-meta');
const { packageJson, template } = require('mrm-core');
const path = require('path');

// Inspired by mrm-task-license
const task = () => {
    const license = packageJson().get('license', 'MIT');
    const templateFile = path.join(__dirname, `${license}.template`);

    template('LICENSE', templateFile)
        .apply({
            name: meta.name,
            year: new Date().getFullYear(),
        })
        .save();

    packageJson().set('license', license).save();
};

task.description = 'Add LICENSE file';

module.exports = task;
