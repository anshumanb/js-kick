const { name, email } = require('user-meta');
const { spawnSync } = require('child_process');
const path = require('path');
const { writeFileSync } = require('fs');
const { packageJson } = require('mrm-core');
const sortPackageJson = require('sort-package-json');
const { exists } = require('../utils');

const REMOTE = 'origin';

const getGitRepo = (pkgName) => {
    const out = spawnSync('git', ['remote', 'get-url', '--push', REMOTE]);
    if (!out.error) {
        const url = out.stdout.toString();
        if (url.startsWith('git@')) {
            return /:(.*).git/.exec(url)?.[1];
        }
        // Prob starts with https
        return /github.com\/(.*).git/.exec(url)?.[1];
    }
    return pkgName.startsWith('@')
        ? pkgName.replace('@bhadurian', 'anshumanb').replace('@', '')
        : `anshumanb/${pkgName}`;
};

const getRelative = (...args) => {
    const relPath = path.relative(path.resolve(...args), process.cwd());
    // Force forward slashes
    return relPath.split(path.sep).join(path.posix.sep);
};

// Only looks one and two levels up for .git/config and no further
const getDirectory = () => {
    if (exists('.git/config')) {
        return null;
    }
    if (exists('../.git/config')) {
        return getRelative('..');
    }
    if (exists('../../.git/config')) {
        return getRelative('..', '..');
    }
    return null;
};

const getMainBranch = () => {
    const out = spawnSync('git', ['branch', '-r', '-q']);
    if (!out.error) {
        const branch = out.stdout.toString();
        return new RegExp(`${REMOTE}/(.*)`).exec(branch)?.[1] ?? 'main';
    }
    // Probably a new repo
    return 'main';
};

// Assumes Github
const task = () => {
    const pkg = packageJson();
    const repo = getGitRepo(pkg.get('name'));
    const directory = getDirectory();

    pkg.merge({
        author: {
            name,
            email,
        },
        engines: { node: '>=16', npm: '>=8' },
        ...(repo && {
            repository: {
                type: 'git',
                url: `https://github.com/${repo}.git`,
                ...(directory && { directory }),
            },
            bugs: { url: `https://github.com/${repo}/issues` },
            homepage: directory
                ? `https://github.com/${repo}/tree/${getMainBranch()}/${directory}#readme`
                : `https://github.com/${repo}#readme`,
        }),
    });

    pkg.save();

    // Sort keys
    writeFileSync(
        'package.json',
        `${JSON.stringify(sortPackageJson(pkg.get()), null, 2)}\n`,
        'utf-8',
    );
};

task.description = 'Configure package.json';

module.exports = task;
