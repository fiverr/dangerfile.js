const {
    danger,
    warn,
    fail,
    schedule
} = require('danger');

const {
    git: {
        modified_files: modifiedFiles,
        fileMatch,
        diffForFile
    },
    github: {
        pr: {
            body
        }
    }
} = danger;

const bindingPry = require('./src/bindingPry');
const dangerousSetInnerHTMLWarn = require('./src/dangerousSetInnerHTMLWarn');
const descriptionPresenceFail = require('./src/descriptionPresenceFail');
const gemfileLockUpdateWarn = require('./src/gemfileLockUpdateWarn');
const packageLockUpdateWarn = require('./src/packageLockUpdateWarn');
const sizeDiffWarn = require('./src/sizeDiffWarn');
const unitTestsPresenceWarn = require('./src/unitTestsPresenceWarn');

schedule(bindingPry.run(modifiedFiles, diffForFile, fail));
schedule(dangerousSetInnerHTMLWarn.run(modifiedFiles, diffForFile, warn));
schedule(descriptionPresenceFail.run(body, fail));
schedule(gemfileLockUpdateWarn.run(fileMatch, warn));
schedule(packageLockUpdateWarn.run(fileMatch, warn));
schedule(sizeDiffWarn.run(modifiedFiles, diffForFile, warn));
schedule(unitTestsPresenceWarn.run(modifiedFiles, warn));
