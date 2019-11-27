/**
 * Threshold additions to consider a PR is big.
 * @constant
 * @type {Number}
 * @default
 */
const THRESHOLD = 600;

/**
 * Irrelevant files for PR size diff validation.
 * @constant
 * @type {String[]}
 * @default
 */
const IRRELEVANT_FILES = [
    'package-lock.json',
    'Gemfile.lock'
];

/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Big PR!</b> - <i>
Pull Request size seems relatively large.
If the Pull Request contains multiple changes, consider splitting it into separate PRs to help with reviewing.
</i> 🤯`;

/**
 * Return added lines count in file.
 * @param {Function} diffForFile - danger diffForFile.
 * @param {String} file - file name.
 * @returns {Promise<Number>}
 */
const additionsForFile = (diffForFile, file) =>
    diffForFile(file)
        .then(({ added }) =>
            (added.match(/\+ {2}/g) || []).length
        )
        .catch(() => 0);

/**
 * Exclude files that are irrelevant when you check PR size.
 * @param {String[]} files
 * @returns {String[]}
 */
const excludeIrrelevantFiles = (files) =>
    files.filter((file) =>
        !IRRELEVANT_FILES.includes(file)
    );

/**
 * Warn if the PR is too BIG.
 * @param {String[]} files - list of modified files.
 * @param {Function} diffForFile - danger diffForFile.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(files, diffForFile, warn) => {
    if (!files) {
        return;
    }

    let additions = 0;

    for (const file of excludeIrrelevantFiles(files)) {
        additions += await additionsForFile(diffForFile, file);
    }

    if (additions > THRESHOLD) {
        warn(MESSAGE);
    }
};

module.exports = {
    MESSAGE,
    THRESHOLD,
    IRRELEVANT_FILES,
    run
};
