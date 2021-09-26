const { lines, json, packageJson } = require('mrm-core');
const { normalize } = require('path');

module.exports = {
    exists: (filepath) => lines(normalize(filepath)).exists(),
    isInstalled: (pkg) => {
        const pkgJson = packageJson();
        return !!(
            pkgJson.get(`devDependencies.${pkg}`) ||
            pkgJson.get(`dependencies.${pkg}`)
        );
    },
    json: (...args) => {
        const file = json(...args);
        return {
            ...file,
            setIfUnset: (address, value) => {
                const orig = file.get(address);
                return file.set(address, orig ?? value);
            },

            // Only handles string | string[]
            prepend: (key, delta, matchers = []) => {
                const orig = [].concat(file.get(key), null).filter(Boolean);

                if (orig.includes(delta)) {
                    return file;
                }

                const index = orig.findIndex((val) =>
                    matchers.some((matcher) => val === matcher),
                );

                if (index !== -1) {
                    orig[index] = delta;
                    file.set(key, orig);
                } else {
                    file.set(key, [delta].concat(orig));
                }

                return file;
            },
        };
    },
};
