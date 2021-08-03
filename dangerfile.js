const {
    danger,
    warn,
    fail,
    schedule
} = require('danger');
const exist = require('@does/exist');

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
        },
        utils: {
            fileContents
        }
    }
} = danger;

const changedFiles = [...addedFiles, ...modifiedFiles];

const bindingPryPresenceFail = require('./src/bindingPryPresenceFail');
const changelog = require('./src/changelog');
const rcPresenceFail = require('./src/rcPresenceFail');
const dangerousSetInnerHTMLWarn = require('./src/dangerousSetInnerHTMLWarn');
const descriptionPresenceFail = require('./src/descriptionPresenceFail');
const gemfileLockUpdateWarn = require('./src/gemfileLockUpdateWarn');
const packageLockUpdateWarn = require('./src/packageLockUpdateWarn');
const sizeDiffWarn = require('./src/sizeDiffWarn');
const unitTestsPresenceWarn = require('./src/unitTestsPresenceWarn');
const versionBumpWarn = require('./src/versionBumpWarn');
const fitIconsUsageWarn = require('./src/fitIconsUsageWarn');
const textCapitalizationFail = require('./src/textCapitalizationFail');
const textCapitalizationWarn = require('./src/textCapitalizationWarn');

schedule(bindingPryPresenceFail.run(changedFiles, diffForFile, fail));
schedule(changelog.run(diffForFile, exist, warn));
schedule(rcPresenceFail.run(changedFiles, diffForFile, fail));
schedule(textCapitalizationFail.run(changedFiles, diffForFile, fail));
schedule(textCapitalizationWarn.run(changedFiles, diffForFile, warn));
schedule(dangerousSetInnerHTMLWarn.run(changedFiles, diffForFile, warn));
schedule(descriptionPresenceFail.run(body, fail));
schedule(gemfileLockUpdateWarn.run(fileMatch, warn));
schedule(packageLockUpdateWarn.run(fileMatch, warn));
schedule(sizeDiffWarn.run(modifiedFiles, diffForFile, warn));
schedule(unitTestsPresenceWarn.run(changedFiles, warn));
schedule(versionBumpWarn.run(fileContents, diffForFile, exist, warn));
schedule(fitIconsUsageWarn.run(changedFiles, diffForFile, warn));
