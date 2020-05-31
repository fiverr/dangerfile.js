/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Ownership warning!</b> - <i>
Changes were made to \`config/chimera-worker.yml\` but not to \`.fiverr/OWNERSHIP\`.
Make sure updating the latter if any ownership changes were made.
E.g: Kafka topic was changed.
</i>`;

/**
 * Warn in case deplyoment files were modified and OWNERSHIP was not.
 * @param {Function} fileMatch - danger fileMatch.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(fileMatch, warn) => {
    const chimeraWorkerFile = fileMatch('config/chimera_worker.yml');
    const ownershipFile = fileMatch('.fiverr/OWNERSHIP');

    if (chimeraWorkerFile.modified && !ownershipFile.modified) {
        warn(MESSAGE);
    }
};

module.exports = {
    MESSAGE,
    run
};
