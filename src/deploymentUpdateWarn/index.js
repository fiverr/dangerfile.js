/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Ownership warning!</b> - <i>
Changes were made to \`Deployment files\` but not to \`.fiverr/OWNERSHIP\`.
Make sure updating the latter if any ownership changes were made.
E.g: Introduced a change in the \`team\` or \`group\` labels.
</i>`;

/**
 * Warn in case deplyoment files were modified and OWNERSHIP was not.
 * @param {Function} fileMatch - danger fileMatch.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(fileMatch, warn) => {
    const deploymentFiles = fileMatch('kube/core/deployment.*');
    const ownershipFile = fileMatch('.fiverr/OWNERSHIP');

    if (deploymentFiles.modified && !ownershipFile.modified) {
        warn(MESSAGE);
    }
};

module.exports = {
    MESSAGE,
    run
};
