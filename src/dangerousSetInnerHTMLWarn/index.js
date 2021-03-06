/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Security! (XSS)</b><br><i>
Please make sure that any user generated content has been sanitized by using Futile's <a href="https://docs.fiverr-gw.com/@fiverr-private/futile/function/index.html#static-function-createSanitizedMarkup" target="_blank">createSanitizedMarkup</a> method <b>before</b> using dangerouslySetInnerHTML.
</i> ⛔️`;

/**
 * Return true if "dangerouslySetInnerHTML" is in string and "createSanitizedMarkup" isn't.
 * @param {String} str
 * @returns {Boolean}
 */
const dangerouslySetInnerHTMLDetected = (str) =>
    str && str.includes('dangerouslySetInnerHTML') && !str.includes('createSanitizedMarkup(');

/**
 * Warn if detect "dangerouslySetInnerHTML" added.
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

        if (dangerouslySetInnerHTMLDetected(after)) {
            warn(MESSAGE);
            return;
        }
    }
};

module.exports = {
    MESSAGE,
    run
};
