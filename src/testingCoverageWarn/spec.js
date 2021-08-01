const { istanbulCoverage } = require('danger-plugin-istanbul-coverage');
const { run } = require('.');

const exist = jest.fn();

jest.mock('danger-plugin-istanbul-coverage', () => ({
    istanbulCoverage: jest.fn()
}));

describe('testingCoverageWarn', () => {
    afterEach(() => {
        exist.mockImplementation(() => Promise.resolve(true));
    });

    describe('testing summary file does not exist', () => {
        beforeEach(() => {
            exist.mockImplementation(() => Promise.resolve(false));
        });

        test('should pass without running istanbulCoverage', async() => {
            await run(exist);
            expect(istanbulCoverage).not.toHaveBeenCalled();
        });
    });

    describe('testing summary file exist', () => {
        const expectedResponse = Symbol();

        beforeEach(() => {
            exist.mockImplementation(() => Promise.resolve(true));
            istanbulCoverage.mockResolvedValue(expectedResponse);
        });

        test('should return istanbulCoverage result', async() => {
            const result = await run(exist);
            expect(istanbulCoverage).toHaveBeenCalledTimes(1);
            expect(result).toEqual(expectedResponse);
        });
    });
});
