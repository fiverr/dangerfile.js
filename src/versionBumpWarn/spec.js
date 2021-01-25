const {
    MESSAGE,
    run
} = require('.');

const fileContents = jest.fn();
const diffForFile = jest.fn();
const exist = jest.fn();
const warn = jest.fn();

describe('versionBumpWarn', () => {
    afterEach(() =>
        jest.clearAllMocks()
    );

    describe('package.json does not exist at all', () => {
        test('should pass', async() => {
            exist.mockImplementation(() => Promise.resolve(false));
            await run(fileContents, diffForFile, exist, warn);
            expect(warn).not.toHaveBeenCalled();
        });
    });

    describe('package.json exists', () => {
        beforeEach(() =>
            exist.mockImplementation(() => Promise.resolve(true))
        );

        describe('package.json includes private attribute set to true', () => {
            test('should pass', async() => {
                fileContents.mockImplementation(() => Promise.resolve('{"version":"1.0.0","private":true}'));
                await run(fileContents, diffForFile, exist, warn);
                expect(warn).not.toHaveBeenCalled();
            });
        });

        describe.each([
            '{"version":"1.0.0"}',
            '{"version":"1.0.0","private":false}'
        ])('package is not private', (mockPackageJsonContent) => {
            beforeEach(() =>
                fileContents.mockImplementation(() => Promise.resolve(mockPackageJsonContent))
            );

            describe('version has been modified in package.json', () => {
                test.each([
                    {
                        before: '{"version":"1.0.0"}',
                        after: '{"version":"1.0.1"}'
                    },
                    {
                        before: '{"version":"1.0.0"}',
                        after: '{"version":"1.1.0"}'
                    },
                    {
                        before: '{"version":"1.0.0"}',
                        after: '{"version":"2.0.0"}'
                    }
                ])('should pass', async(diffWithVersionBump) => {
                    diffForFile.mockImplementation(() => Promise.resolve(diffWithVersionBump));
                    await run(fileContents, diffForFile, exist, warn);
                    expect(warn).not.toHaveBeenCalled();
                });
            });

            describe('no diff for package.json is available', () => {
                test('should warn', async() => {
                    diffForFile.mockImplementation(() => Promise.resolve(null));
                    await run(fileContents, diffForFile, exist, warn);
                    expect(warn).toHaveBeenCalledWith(MESSAGE);
                });
            });

            describe('package.json has been modified, but not the version', () => {
                test.each([
                    {
                        before: '{"version":"1.0.0"}',
                        after: '{"version":"1.0.0","description":"test"}'
                    },
                    {
                        before: '{"author":"test1","version":"1.0.0"}',
                        after: '{"author":"test2","version":"1.0.0"}'
                    },
                    {
                        before: '{"version":"1.0.0","keywords":["test", "version bump"]}',
                        after: '{"version":"1.0.0"}'
                    }
                ])('should warn', async(diffWithoutVersionBump) => {
                    diffForFile.mockImplementation(() => Promise.resolve(diffWithoutVersionBump));
                    await run(fileContents, diffForFile, exist, warn);
                    expect(warn).toHaveBeenCalledWith(MESSAGE);
                });
            });
        });
    });
});
