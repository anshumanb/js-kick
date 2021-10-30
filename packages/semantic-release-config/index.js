const base = require('./base');

const { plugins } = base;

module.exports = {
    ...base,
    plugins: [...plugins, '@bhadurian/semantic-release-git'],
};
