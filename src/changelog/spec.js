const {
    MESSAGE,
    run
} = require('.');

const diffForFile = jest.fn();
const exist = jest.fn();
const warn = jest.fn();

describe('changelog', () => {
    afterEach(() => {
        diffForFile.mockImplementation(() => Promise.resolve({
            before: '{"version":"1.0.0"}',
            after: '{"version":"1.0.1"}'
        }));
        exist.mockImplementation(() => Promise.resolve(true));
        warn.mockRestore();
    });

    describe('files do not exist', () => {
        test('should pass', async() => {
            exist.mockImplementation(() => Promise.resolve(false));
            await run(diffForFile, exist, warn);
            expect(warn).not.toHaveBeenCalled();
        });
    });

    describe('no diff for package.json is available', () => {
        test('should pass', async() => {
            diffForFile.mockImplementation(() => Promise.resolve(null));
            await run(diffForFile, exist, warn);
            expect(warn).not.toHaveBeenCalled();
        });
    });

    describe('version was not changed', () => {
        test('should pass', async() => {
            diffForFile.mockImplementation(() => Promise.resolve({
                before: '{"version":"1.0.0"}',
                after: '{"version":"1.0.0"}'
            }));
            await run(diffForFile, exist, warn);
            expect(warn).not.toHaveBeenCalled();
        });
    });

    describe('changelog was changed', () => {
        test('should pass', async() => {
            diffForFile.mockImplementation((file) => Promise.resolve(
                file === 'package.json'
                    ? { before: '{"version":"1.0.0"}', after: '{"version":"1.0.1"}' }
                    : { before: null, after: null }
            ));
            await run(diffForFile, exist, warn);
            expect(warn).not.toHaveBeenCalled();
        });
    });
    describe('version was changed but not changelog', () => {
        test('should warn', async() => {
            exist.mockImplementation((file) => Promise.resolve(file === 'package.json'));
            diffForFile.mockImplementation((file) => Promise.resolve(
                file === 'package.json'
                    ? { before: '{"version":"1.0.0"}', after: '{"version":"1.0.1"}' }
                    : null
            ));
            await run(diffForFile, exist, warn);
            expect(warn).toHaveBeenCalledWith(MESSAGE);
        });
    });
});
