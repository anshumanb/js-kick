const { copyFileSync } = require('fs');
const path = require('path');
const { lines, json, packageJson } = require('mrm-core');
const { normalize } = require('path');

const exists = (filepath) => lines(normalize(filepath)).exists();

module.exports = {
    exists,
    isInstalled: (pkg) => {
        const pkgJson = packageJson();
        return !!(
            pkgJson.get(`devDependencies.${pkg}`) ||
            pkgJson.get(`dependencies.${pkg}`)
        );
    },
    copyFile: (source, dest, { overwrite = false } = {}) => {
        const destPath = path.resolve(dest);
        if (!overwrite && exists(destPath)) {
            return;
        }
        copyFileSync(source, destPath);
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
