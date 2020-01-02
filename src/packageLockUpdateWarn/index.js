const exist = require('@does/exist');

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
 * Warn in case package.json was modified and package-lock was not.
 * @param {Function} fileMatch - danger fileMatch.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(fileMatch, warn) => {
    const packageJsonFile = fileMatch('package.json');
    const packageLockFile = fileMatch('package-lock.json');
    const lockFileExists = await exist('package-lock.json');

    if (packageJsonFile.modified && !packageLockFile.modified && lockFileExists) {
        warn(MESSAGE);
    }
};

module.exports = {
    MESSAGE,
    run
};
