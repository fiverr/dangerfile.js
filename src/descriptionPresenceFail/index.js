/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Missing Description?</b> - <i>
Please add a description. To do so, add a "## Description" section to your PR description.
This is a good place to explain your intentions and show off screenshots/diagram of either new features, areas design that have changed.
</i> 🔅`;

/**
 * Return true if body contains a markdown description.
 * @param {String} body
 * @returns {Boolean}
 */
const includesMarkdownDescription = (body) =>
    body && body.includes('## Description');

/**
 * Check if there is a minimal PR description.
 * @param {String} body - main body of the PR.
 * @param {Funciton} fail - danger fail.
 * @returns {Promise<undefined>}
 */
const run = async(body, fail) => {
    if (!includesMarkdownDescription(body)) {
        fail(MESSAGE);
    }
};

module.exports = {
    MESSAGE,
    run
};
