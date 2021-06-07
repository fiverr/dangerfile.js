/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Incorrect Usage of Icons</b><br><i>
 The icons have been moved to <a href="https://github.com/fiverr/blocks/tree/master/packages/icons" target="_blank">their own package</a>, please install the "@fiverr-private/icons" package, and replace "@fiverr-private/fit/icons" imports with "@fiverr-private/icons".
 </i> ⛔️`;

/**
  * Detects whether the diff has any usage of "@fiverr-private/fit/icons".
  * @param {String} str
  * @returns {Boolean}
  */
const fitIconsUsageDetected = (str) =>
    (str || '').includes('@fiverr-private/fit/icons');

/**
  * Warn if detect "@fiverr-private/fit/icons" added.
  * @param {String[]} files - list of modified files.
  * @param {Function} diffForFile - danger diffForFile.
  * @param {Function} warn - danger warn.
  * @returns {Promise<undefined>}
  */
const run = async(files, diffForFile, warn) => {
    for (const file of files || []) {
        const { after } = await diffForFile(file);

        if (fitIconsUsageDetected(after)) {
            warn(MESSAGE);
            return;
        }
    }
};

module.exports = {
    MESSAGE,
    run
};
