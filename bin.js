#!/usr/bin/env node

const { join } = require('path');
const execute = require('async-execute');

const dangerfilePath = join(__dirname, 'dangerfile.js');
const dangerCommand = `npx danger ci -d ${dangerfilePath} -f --no-publish-check`;

execute(dangerCommand).catch((error) => {
    console.error(error);
    process.exit(1);
});
