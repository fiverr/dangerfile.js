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

if (!body || body.trim().length < 2) {
    fail('Please add a description to the pull request.');
}

if (ref !== 'master') {
    warn(`The base branch for this PR is \`${ref}\`. Are you sure you want to target something other than the \`master\` branch?`);
}

// React dangerouslySetInnerHTML and user generated content
(async() => {
    let file;
    for (file in modified_files) {
        const diff = await diffForFile(file);
        if (diff && diff.includes('dangerouslySetInnerHTML')) {

            // TODO: Add an informative link to UGC security concern
            warn(`Please make sure you do not introduce and user generated content using dangerouslySetInnerHTML (${file}).`);
        }
    }
})();
