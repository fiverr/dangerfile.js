const { join } = require('path');
const { existsSync } = require('fs');

/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>NPM warning!</b> - <i>
Changes were made to \`package.json\` but not to \`package-lock.json\`.
Did you forget to do \`npm i\` before commit?
</i> 🔒`;

/**
 * The package's lockfile file name.
 * @constant
 * @type {String}
 */
const LOCKFILE_NAME = 'package-lock.json';

const packageRoot = process.cwd();
const lockfilePath = join(packageRoot, LOCKFILE_NAME);

/**
 * Warn in case package.json was modified and package-lock was not.
 * @param {Function} fileMatch - danger fileMatch.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(fileMatch, warn) => {
    const packageJsonFile = fileMatch('package.json');
    const packageLockFile = fileMatch(LOCKFILE_NAME);

    if (!existsSync(lockfilePath)) {
        return;
    }

    if (packageJsonFile.modified && !packageLockFile.modified) {
        warn(MESSAGE);
    }
};

module.exports = {
    MESSAGE,
    run
};
