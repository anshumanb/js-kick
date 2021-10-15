#!/usr/bin/env node

const path = require('path');
const { writeFileSync } = require('fs');

const writeJson = (filePath, data) =>
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

const main = (name, isPublic) => {
    writeJson(path.resolve('./package.json'), {
        name,
        version: '1.0.0',
        scripts: {
            mrm: 'mrm --preset=@bhadurian/mrm-preset',
        },
        ...(isPublic
            ? { publishConfig: { access: 'public' } }
            : { private: true }),
    });
};

if (require.main === module) {
    const args = process.argv.slice(2);
    const positional = args.filter((arg) => !arg.startsWith('-'));
    const options = args.filter((arg) => arg.startsWith('-'));
    const isPublic = options.includes('--public');

    if (positional.length === 1 && (!options.length || isPublic)) {
        main(positional[0], isPublic);
    } else {
        // eslint-disable-next-line no-console
        console.error('Usage: npm init @bhadurian/create <name> [--public]');
        process.exitCode = 1;
    }
}

module.exports = main;
