#!/usr/bin/env node

const path = require('path');
const { spawnSync } = require('child_process');
const { writeFileSync } = require('fs');

const writeFile = (filePath, data) =>
    writeFileSync(filePath, `${data}\n`, 'utf-8');

const writeJson = (filePath, data) =>
    writeFile(filePath, JSON.stringify(data, null, 2));

const editorConfigContents = `root = true

[*]
end_of_line = lf
insert_final_newline = true`;

const main = (name, { isPublic = false, isRoot = false }) => {
    writeJson(path.resolve('package.json'), {
        name,
        version: '1.0.0',
        scripts: {
            mrm: 'mrm --preset=@bhadurian/mrm-preset',
        },
        ...(isPublic
            ? { publishConfig: { access: 'public' } }
            : { private: true }),
    });

    if (isRoot) {
        writeFile('.nvmrc', 'lts/*');
        // MRM itself uses .editorconfig for new files
        writeFile('.editorconfig', editorConfigContents);
        // Install mrm so subsequent mrm runs won't download the package. Also
        // updates to config will not requires mrm downloads this way
        // eslint-disable-next-line no-console
        console.log('Installing mrm...');
        spawnSync('npm', ['install', '--save-dev', 'mrm']);
    }
};

const availableOptions = {
    '--public': 'isPublic',
    '--root': 'isRoot',
};

if (require.main === module) {
    const args = process.argv.slice(2);

    // Parse command line args without a library to keep this package dependency-free
    const positional = args.filter((arg) => !arg.startsWith('-'));
    const hasValidPositional = positional.length === 1 && !!positional[0];

    const options = args.filter((arg) => arg.startsWith('-'));
    const validOptions = Object.keys(availableOptions);
    const hasValidOptions = options.every((option) =>
        validOptions.includes(option),
    );

    if (hasValidPositional && hasValidOptions) {
        const optionsObj = options.reduce((acc, option) => {
            acc[availableOptions[option]] = true;
            return acc;
        }, {});
        main(positional[0], optionsObj);
    } else {
        // eslint-disable-next-line no-console
        console.error(
            'Usage: npm init @bhadurian/create <name> [[--public] [--root]]',
        );
        process.exitCode = 1;
    }
}

module.exports = main;
