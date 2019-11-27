const {
    message,
    danger,
    warn,
    fail
} = require('danger');

const {
    git: {
        modified_files: modifiedFiles,
        diffForFile
    }
} = danger;

// Fails if a description section is missing.
const includesDescription =
    !danger.github.pr.body ||
    !danger.github.pr.body.includes('## Description');
if (!includesDescription) {
    const title = 'Missing Description?';
    const idea =`
        Please add a description. To do so, add a "## Description" section to your PR description.
        This is a good place to explain all your intentions.
    `;
    fail(`<b>${title}</b> - <i>${idea}</i> 🔅`);
}

// Warns if there are changes to package.json, and tags the team.
const packageJsonFile = danger.git.fileMatch('package.json');
const packageLockFile = danger.git.fileMatch('package-lock.json');
if (packageJsonFile.modified && !packageLockFile.modified) {
    const title = 'NPM warning';
    const idea = `
        Changes were made to \`package.json\` but not to \`package-lock.json\`.
        Did you forgot \`npm i\` before commit? 🔒
    `;
    warn(`<b>${title}</b> - <i>${idea}</i>`);
}

// Warns if there are no unit tests added
const hasTestChanges = modifiedFiles.filter((filepath) =>
    filepath.includes('spec|test'),
).length > 0;
if (!hasTestChanges) {
    const title = 'What about unit tests?';
    const idea = 'It seems you did some changes but you did not update/add any unit tests.';
    warn(`<b>${title}</b> - <i>${idea}</i> 🤔`);
}


// Warns in case of big PR.
const files = modifiedFiles.filter((modifiedFile) => !['package-lock.json'].includes(modifiedFile));
const buildScore = async(files) => {
    let score = 0;
    let file;
    let table = `
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Additions</th>
                    <th>Deletions</th>
                </tr>
            </thead>
            <tbody>`;

    for (file of files) {
        const { added, removed } = await diffForFile(file);
        const additionRegex = /\+ {2}/g;
        const deletionRegex = /- {2}/g;
        const additions = (added.match(additionRegex) || []).length;
        const deletions = (removed.match(deletionRegex) || []).length;
        table += `
                <tr>
                    <td><b>${file}</b></td>
                    <td>${'+'.repeat(additions)}</td>
                    <td>${'-'.repeat(deletions)}</td>
                </tr>`;

        score += additions;
    }

    table += `
            </tbody>
        </table>`;

    message(table);

    if (score > 3) {
        const title = 'Big PR!';
        const idea = `
            Pull Request size seems relatively large.
            If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.
        `;
        warn(`<b>${title}</b> - <i>${idea}</i> 🤯`);
    }
};

buildScore(files);
