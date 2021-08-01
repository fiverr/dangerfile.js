const { istanbulCoverage } = require('danger-plugin-istanbul-coverage');

const ISTANBUL_COVERAGE_REPORT_PATH = './coverage/coverage-summary.json';

const run = async(exist) => {
    const hasCoverageSummary = await exist(ISTANBUL_COVERAGE_REPORT_PATH);

    if (!hasCoverageSummary) {
        return Promise.resolve;
    }

    return await istanbulCoverage({
        entrySortMethod: 'least-coverage',
        numberOfEntries: 20,
        coveragePath: ISTANBUL_COVERAGE_REPORT_PATH,
        reportFileSet: 'createdOrModified',
        reportMode: 'warn',
        threshold: {
            functions: 100,
            statements: 100,
            branches: 100
        }
    });
};

module.exports = {
    run
};
