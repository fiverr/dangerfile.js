/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Capitalize method</b> - <i>
Please make sure you are not violating any localization rule when consuming "capitalize" method from "futile" or "lodash".
</i> 🌐`;

/**
 * Return true if .css/.scss/.js/.ts files found and it's not a test
 * @param {String} file - modified file.
 * @returns {Boolean}
 */
const isEligibleFile = (file) => (/\.(js|ts)$/g.test(file) && !/(test|spec)/g.test(file));

/**
 * Return true if detect consumption of capitalize from futile or lodash in the modified files.
 * @param {String} str
 * @returns {Boolean}
 */
const capitalizeMethodDetected = (str) =>
    str && (/capitalize.+(futile|lodash)/.test(str));

/**
 * Warn if detect consumption of "capitalize" from futile or lodash added to a modified file.
 * @param {String[]} files - list of modified files.
 * @param {Function} diffForFile - danger diffForFile.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(files = [], diffForFile, warn) => {
    for (const file of files) {
        if (isEligibleFile(file)) {
            const { after } = await diffForFile(file);

            if (capitalizeMethodDetected(after)) {
                warn(MESSAGE);
                return;
            }
        }
    }
};

module.exports = {
    MESSAGE,
    run
};
