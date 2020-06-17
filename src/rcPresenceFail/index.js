/**
 * Danger message failure.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Cannot merge release candidate!</b> - <i>
Please remove "-rc" from your package.json file before merging to master.
</i> 🧐`;

/**
 * Return true if detect "-rc" in package.json.
 * @param {String} str
 * @returns {Boolean}
 */
const rcDetected = (str) =>
    str && /version(.*)-rc/.test(str);

/**
 * Fail if detect "-rc" added to package.json.
 * @param {String[]} files - list of modified files.
 * @param {Function} diffForFile - danger diffForFile.
 * @param {Function} fail - danger fail.
 * @returns {Promise<undefined>}
 */
const run = async(files = [], diffForFile, fail) => {
    for (const file of files) {
        if (file.includes('package.json')) {
            const { after } = await diffForFile(file);

            if (rcDetected(after)) {
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
