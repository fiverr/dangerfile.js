/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>RVM warning!</b> - <i>
Changes were made to \`Gemfile\` but not to \`Gemfile.lock\`.
Did you forget to run \`bundle\` before commit?
</i> 🔒`;

/**
 * Warn in case package.json was modified and package-lock was not.
 * @param {Function} fileMatch - danger fileMatch.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(fileMatch, warn) => {
    const gemfileFile = fileMatch('Gemfile');
    const gemfileLockFile = fileMatch('Gemfile.lock');

    if (gemfileFile.modified && !gemfileLockFile.modified) {
        warn(MESSAGE);
    }
};

module.exports = {
    MESSAGE,
    run
};
