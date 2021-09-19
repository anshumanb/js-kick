const { install, json } = require('mrm-core');

const types = {
    web: {
        configName: 'web',
        packages: {
            '@bhadurian/tsconfig': '*',
            typescript: '^4.4.3',
        },
    },
    node: {
        configName: 'node-lts',
        packages: {
            '@bhadurian/tsconfig': '*',
            typescript: '^4.4.3',
            // FIXME: Should default to latest lts and be in sync with nvmrc
            '@types/node': '^14',
        },
    },
};

const task = ({ type }) => {
    const projType = types[type];

    const file = json('tsconfig.json');
    file.set('extends', `@bhadurian/tsconfig/${projType.configName}.json`);
    file.save();

    install(projType.packages);
};

task.description = 'Configure TypeScript';
task.parameters = {
    type: {
        default: 'web',
        choices: Object.keys(types),
        message: 'What type of project?',
        type: 'list',
    },
};

module.exports = task;
