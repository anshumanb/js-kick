const path = require('path');
const { packageJson, lines, ini } = require('mrm-core');

const types = {
    library: {
        publishConfig: {
            access: 'public',
        },
    },
    application: {
        private: true,
    },
    workspace: {
        private: true,
    },
};

const configureNvmRc = () => {
    const file = lines('.nvmrc');
    file.add(['lts/*']);
    file.save();
};

const configureEditorConfig = () => {
    const file = ini('.editorconfig');
    if (file.exists()) {
        return;
    }
    file.set('_global', { root: true })
        .set('*', {
            end_of_line: 'lf',
            insert_final_newline: true,
        })
        .save();
};

const configurePackageJson = ({ type, description }) => {
    const pkgName = path.basename(process.cwd());
    const pkgFile = packageJson({
        name: pkgName,
        version: '0.1.0',
    });

    pkgFile.merge({
        description,
        ...types[type],
    });

    pkgFile.save();
};

const task = (args) => {
    configureNvmRc();
    // MRM itself uses .editorconfig for new files
    configureEditorConfig();
    configurePackageJson(args);
};

task.description = 'Bootstrap a new project';
task.parameters = {
    type: {
        default: 'library',
        choices: Object.keys(types),
        message: 'What type of package?',
        type: 'list',
    },
    description: {
        message: 'Description?',
        default: '',
        type: 'input',
    },
};

module.exports = task;
