/* eslint-disable no-template-curly-in-string */
module.exports = {
    tagFormat: '${version}',
    branches: [
        {
            name: 'rc/+([0-9])?(.{+([0-9]),x}).x',
            channel: "${name.replace(/^rc\\//, '')}-beta",
            prerelease: 'rc',
        },
        '+([0-9])?(.{+([0-9]),x}).x',
        { name: 'rc/main', channel: 'beta', prerelease: 'beta' },
        'main',
        { name: 'next', prerelease: true },
        { name: 'future', prerelease: true },
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
            },
        ],
        '@semantic-release/npm',
        '@bhadurian/semantic-release-git',
    ],
};
