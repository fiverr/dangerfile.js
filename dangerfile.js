const {
    danger,
    warn,
    fail,
    schedule
} = require('danger');

const {
    git: {
        modified_files: modifiedFiles = [],
        added_files: addedFiles = [],
        fileMatch,
        diffForFile
    },
    github: {
        pr: {
            body
        }
    }
} = danger;

const changedFiles = [...addedFiles, ...modifiedFiles];

const bindingPryPresenceFail = require('./src/bindingPryPresenceFail');
const dangerousSetInnerHTMLWarn = require('./src/dangerousSetInnerHTMLWarn');
const descriptionPresenceFail = require('./src/descriptionPresenceFail');
const gemfileLockUpdateWarn = require('./src/gemfileLockUpdateWarn');
const packageLockUpdateWarn = require('./src/packageLockUpdateWarn');
const sizeDiffWarn = require('./src/sizeDiffWarn');
const unitTestsPresenceWarn = require('./src/unitTestsPresenceWarn');
const deploymentUpdateWarn = require('./src/deploymentUpdateWarn');
const chimeraConnectorUpdateWarn = require('./src/chimeraConnectorUpdateWarn');
const chimeraWorkerUpdateWarn = require('./src/chimeraWorkerUpdateWarn');

schedule(bindingPryPresenceFail.run(changedFiles, diffForFile, fail));
schedule(dangerousSetInnerHTMLWarn.run(changedFiles, diffForFile, warn));
schedule(descriptionPresenceFail.run(body, fail));
schedule(gemfileLockUpdateWarn.run(fileMatch, warn));
schedule(packageLockUpdateWarn.run(fileMatch, warn));
schedule(sizeDiffWarn.run(modifiedFiles, diffForFile, warn));
schedule(unitTestsPresenceWarn.run(changedFiles, warn));
schedule(deploymentUpdateWarn.run(fileMatch, warn));
schedule(chimeraConnectorUpdateWarn.run(fileMatch, warn));
schedule(chimeraWorkerUpdateWarn.run(fileMatch, warn));