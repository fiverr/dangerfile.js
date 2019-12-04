/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Security! (XSS)</b> - <i>
Please make sure you do not introduce any user generated content using *dangerouslySetInnerHTML*.
</i> ⛔️`;

/**
 * Return true if detect "dangerouslySetInnerHTML" in str.
 * @param {String} str
 * @returns {Boolean}
 */
const dangerouslySetInnerHTMLDetected = (str) =>
    str && str.includes('dangerouslySetInnerHTML');

/**
 * Warn if detect "dangerouslySetInnerHTML" added.
 * @param {String[]} files - list of modified files.
 * @param {Function} diffForFile - danger diffForFile.
 * @param {Function} fail - danger fail.
 * @returns {Promise<undefined>}
 */
const run = async(files, diffForFile, fail) => {
    if (!files) {
        return;
    }

    for (const file of files) {
        const { after } = await diffForFile(file);

        if (dangerouslySetInnerHTMLDetected(after)) {
            fail(MESSAGE);
            return;
        }
    }
};

module.exports = {
    MESSAGE,
    run
};
