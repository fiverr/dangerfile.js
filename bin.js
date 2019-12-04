#!/usr/bin/env node

const { join } = require('path');
const execute = require('async-execute');

const dangerfilePath = join(__dirname, 'dangerfile.js');
const dangerCommand = `npx danger ci -d ${dangerfilePath} -f ${process.argv.slice(2).join( ' ')}`;

execute(dangerCommand).catch((error) => {
    console.log(error);
    process.exit(1);
});
