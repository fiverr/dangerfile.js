const {github: {pr: {body, base}}} = danger;

if (!body || body.length < 2) {
    fail('Please add a description to the pull request.');
}

if (base.ref !== 'master') {
    warn(`The base branch for this PR is \`${base.ref}\`. Are you sure you want to target something other than the \`master\` branch?`);
}
