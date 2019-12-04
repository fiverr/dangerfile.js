/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Performance!</b> - <i>
"binding.pry" will cause performance hits on production environments.
Please remove debugging tools from your code.
</i> ⛔️`;

/**
 * Return true if detect "binding.pry" in str.
 * @param {String} str
 * @returns {Boolean}
 */
const bindingPryDetected = (str) =>
    str && str.includes('binding.pry');

/**
 * Warn if detect "binding.pry" added.
 * @param {String[]} files - list of modified files.
 * @param {Function} diffForFile - danger diffForFile.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(files, diffForFile, warn) => {
    if (!files) {
        return;
    }

    for (const file of files) {
        const { after } = await diffForFile(file);

        if (bindingPryDetected(after)) {
            warn(MESSAGE);
            return;
        }
    }
};

module.exports = {
    MESSAGE,
    run
};
