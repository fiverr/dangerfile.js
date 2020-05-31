/**
 * Danger message warning.
 * @constant
 * @type {String}
 * @default
 */
const MESSAGE = `<b>Ownership warning!</b> - <i>
Changes were made to \`config/chimera-connector.yml\` but not to \`.fiverr/OWNERSHIP\`.
Make sure updating the latter if any ownership changes were made.
E.g: Rabbit queue was changed.
</i>`;

/**
 * Warn in case deplyoment files were modified and OWNERSHIP was not.
 * @param {Function} fileMatch - danger fileMatch.
 * @param {Function} warn - danger warn.
 * @returns {Promise<undefined>}
 */
const run = async(fileMatch, warn) => {
    const chimeraConnectorFile = fileMatch('config/chimera_connector.yml');
    const ownershipFile = fileMatch('.fiverr/OWNERSHIP');

    if (chimeraConnectorFile.modified && !ownershipFile.modified) {
        warn(MESSAGE);
    }
};

module.exports = {
    MESSAGE,
    run
};
