/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Version Bump!</b> - <i>Do you want to publish a new version of this package after merging this PR?
Don't forget to bump the version in \`package.json\` before merging to the master.
</i> 📦`;

/**
 * Warn if there wasn't a version bump for the package
 * @param {Function} fileContents - danger fileContents.
 * @param {Function} diffForFile - danger diffForFile.
 * @param {Function} exist - check if file exists.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(fileContents, diffForFile, exist, warn) => {
    const condition = await exist('package.json');
    if (!condition) {
    // Required files do not exist
        return;
    }

    const packageJsonContent = await fileContents('package.json');
    if (JSON.parse(packageJsonContent).private === true) {
        // Will not be published anyway / not a package
        return;
    }

    const diff = await diffForFile('package.json');
    if (diff && JSON.parse(diff.before).version !== JSON.parse(diff.after).version) {
    // Version was changed
        return;
    }

    warn(MESSAGE);
};

module.exports = {
    run,
    MESSAGE
};
