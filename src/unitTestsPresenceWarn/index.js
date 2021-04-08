/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>What about unit tests?</b> - <i>
It seems like you made some changes, but you did not update/add any tests.
</i> 🤔`;

/**
 * Return true if test file found.
 * @param {String[]} files - list of files.
 * @returns {Boolean}
 */
const testsFileFound = (files) =>
    files.some((file) =>
        /(test|spec)/g.test(file)
    );

/**
 * Return true if .mjs/.js/.ts files found.
 * @param {String[]} files - list of files.
 * @returns {Boolean}
 */
const sourceFilesFound = (files) =>
    files.some((file) =>
        /\.((m?js)|ts)$/g.test(file)
    );

/**
 * Warn in case no unit tests added/updated.
 * @param {String[]} files - list of modified files.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(files, warn) => {
    if (!files) {
        return;
    }

    if (!Array.isArray(files)) {
        return;
    }

    if (files.length === 0) {
        return;
    }

    if (!testsFileFound(files) && sourceFilesFound(files)) {
        warn(MESSAGE);
    }
};

module.exports = {
    MESSAGE,
    run
};
