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
const rcPresenceFail = require('./src/rcPresenceFail');
const dangerousSetInnerHTMLWarn = require('./src/dangerousSetInnerHTMLWarn');
const descriptionPresenceFail = require('./src/descriptionPresenceFail');
const gemfileLockUpdateWarn = require('./src/gemfileLockUpdateWarn');
const packageLockUpdateWarn = require('./src/packageLockUpdateWarn');
const sizeDiffWarn = require('./src/sizeDiffWarn');
const unitTestsPresenceWarn = require('./src/unitTestsPresenceWarn');

schedule(bindingPryPresenceFail.run(changedFiles, diffForFile, fail));
schedule(rcPresenceFail.run(changedFiles, diffForFile, fail));
schedule(dangerousSetInnerHTMLWarn.run(changedFiles, diffForFile, warn));
schedule(descriptionPresenceFail.run(body, fail));
schedule(gemfileLockUpdateWarn.run(fileMatch, warn));
schedule(packageLockUpdateWarn.run(fileMatch, warn));
schedule(sizeDiffWarn.run(modifiedFiles, diffForFile, warn));
schedule(unitTestsPresenceWarn.run(changedFiles, warn));
