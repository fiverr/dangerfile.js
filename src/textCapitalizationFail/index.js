/**
 * Danger message failure.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Cannot merge release candidate!</b> - <i>
Please do not use "text-transform: capitalize" because this violates localization rules.
</i> 🌐`;

/**
 * Return true if .css/.scss/.js/.ts files found and it's not a test
 * @param {String} file - modified file.
 * @returns {Boolean}
 */
const isEligibleFile = (file) => (/\.(js|ts|scss|css)$/g.test(file) && !/(test|spec)/g.test(file));

/**
 * Return true if detect "text-transform: capitalize" in the modified files.
 * @param {String} str
 * @returns {Boolean}
 */
const textCapitalizationDetected = (str) =>
    str && /text-transform:\s+capitalize/.test(str);

/**
 * Fail if detect "text-transform: capitalize" added to a modified file.
 * @param {String[]} files - list of modified files.
 * @param {Function} diffForFile - danger diffForFile.
 * @param {Function} fail - danger fail.
 * @returns {Promise<undefined>}
 */
const run = async(files = [], diffForFile, fail) => {
    for (const file of files) {
        if (isEligibleFile(file)) {
            const { after } = await diffForFile(file);

            if (textCapitalizationDetected(after)) {
                fail(MESSAGE);
                return;
            }
        }
    }
};

module.exports = {
    MESSAGE,
    run
};
