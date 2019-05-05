#!/usr/bin/env node

const { readFile, writeFile, access, F_OK } = require('fs').promises;
const { join } = require('path');
const execute = require('async-execute');
const FILENAME = 'dangerfile.js';

(async() => {
    const target = join(process.cwd(), FILENAME);

    if (await access(target, F_OK)) {
        console.warn('Dangerfile already exists');
        return;
    }

    const source = join(__dirname, FILENAME);

    const content = await readFile(source);

    writeFile(target, content.toString());

    await execute('npx danger ci', { pipe: true });
})();
