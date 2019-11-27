#!/usr/bin/env node

const execute = require('async-execute');

execute('./node_modules/.bin/danger ci', { pipe: true });
