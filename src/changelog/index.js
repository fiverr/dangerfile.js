/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>CHANGELOG!</b> - <i>
Update changelog file with changes made in the version update.
</i> ⛔️`;

/**
 * Warn if version changed w/o updating the changelog
 * @param {Function} diffForFile - danger diffForFile.
 * @param {Function} exist - check if file exists.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(diffForFile, exist, warn) => {
    const condition = await exist('package.json') && await exist('CHANGELOG.md');
    if (!condition) {
    // Required files do not exist
        return;
    }

    const diff = await diffForFile('package.json');

    if (!diff) {
    // No diff for package.json
        return;
    }

    if (JSON.parse(diff.before).version === JSON.parse(diff.after).version) {
    // Version was not changed
        return;
    }

    if (await diffForFile('CHANGELOG.md')) {
    // CHANGELOG has diff
        return;
    }

    warn(MESSAGE);
};

module.exports = {
    run,
    MESSAGE
};
