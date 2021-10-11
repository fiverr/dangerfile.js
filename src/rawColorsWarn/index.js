/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Raw Colors Detected</b><br><i>
 Please do not use raw colors directly (#XXX or rgb(X, X, X)).
 Instead, import colors from '@fiverr-private/sass'.

 In scss: 
    @import '~@fiverr-private/sass/helpers/index'; 
    ...
    h1 {
        color: color($blue, 500);
    }

 In JS/TS:
    import { blue_500 } from '@fiverr-private/sass/helpers/index';
 </i> ⛔️`;

/**
  * Warn if detect "@fiverr-private/fit/icons" added.
  * @param {String[]} files - list of modified files.
  * @param {Function} diffForFile - danger diffForFile.
  * @param {Function} warn - danger warn.
  * @returns {Promise<undefined>}
  */
const run = async(files, diffForFile, warn) => {
    for (const file of files || []) {
        if (shouldSkipFile(file)) {
            continue;
        }
        const { after } = await diffForFile(file);

        if (rawColorsDetected(after)) {
            warn(MESSAGE);
            return;
        }
    }
};

/**
  * Determines if the current file should be skipped, allowing raw colors in it.
  * @param {string} file
  * @returns {Boolean}
  */
const shouldSkipFile = (file) =>
    (file || '').match(/story|stories|doc|.md|spec|test/);

/**
  * Detects whether the diff has any raw colros.
  * @param {String} str
  * @returns {Boolean}
  */
const rawColorsDetected = (str) =>
    (str || '').match(/#[a-zA-Z0-9]{3,6}|rgba?\([0-9, ]+?\)/);

module.exports = {
    MESSAGE,
    run
};
