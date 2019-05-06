const count = (string, substring) => (string.match(new RegExp(substring, 'g')) || []).length;

const {
    github: {
        pr: {
            body,
            base: {
                ref,
            },
        },
    },
    git: {
        modified_files,
        diffForFile,
    },
} = danger;

function noPRDescription(callback = message) {
    if (!body || body.trim().length < 2) {
        callback('Please add a description to the pull request.');
    }
}

function baseNotMaster(callback = message) {
    if (ref !== 'master') {
        callback(`The base branch for this PR is \`${ref}\`. Are you sure you want to target something other than the \`master\` branch?`);
    }
}

async function dangerouslySetInnerHTML(callback = message) {
// React dangerouslySetInnerHTML and user generated content
    let file;

    for (file of modified_files) {
        const diff = await diffForFile(file);

        if (!diff) {
            continue;
        }

        const {before, after} = diff;
        if (count(after, 'dangerouslySetInnerHTML') > count(before, 'dangerouslySetInnerHTML')) {

            // TODO: Add an informative link to UGC security concern
            callback(`Please make sure you do not introduce and user generated content using dangerouslySetInnerHTML (\`${file}\`).`);
        }
    }
}


(async() => {
    noPRDescription(fail);
    baseNotMaster(warn);
    await dangerouslySetInnerHTML(warn);
})();
