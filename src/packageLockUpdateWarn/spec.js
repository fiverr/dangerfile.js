let MESSAGE;
let run;

describe('packageLockUpdateWarn', () => {
    describe('.run', () => {
        const fileMatch = jest.fn();
        const warn = jest.fn();

        beforeAll(() => {
            jest.mock('@does/exist', () => jest.fn(() => true));
            ({ MESSAGE, run } = require('.'));
        });
        afterEach(() => {
            fileMatch.mockRestore();
            warn.mockRestore();
            jest.clearAllMocks();
        });
        afterAll(() => {
            jest.unmock('@does/exist');
        });

        describe('when package.json is modified', () => {
            describe('when package-lock.json is modified', () => {
                beforeEach(() => {
                    fileMatch
                        .mockImplementationOnce(() => ({ modified: true }))
                        .mockImplementationOnce(() => ({ modified: true }));
                });

                test('should resolve', () =>
                    run(fileMatch, warn)
                        .then((data) => {
                            expect(data).toBe(undefined);
                        })
                );

                test('should not call warn', () =>
                    run(fileMatch, warn)
                        .then(() => {
                            expect(warn).not.toHaveBeenCalled();
                        })
                );
            });

            describe('when package-lock.json is not modified', () => {
                beforeEach(() => {
                    fileMatch
                        .mockImplementationOnce(() => ({ modified: true }))
                        .mockImplementationOnce(() => ({ modified: false }));
                });

                test('should resolve', () =>
                    run(fileMatch, warn)
                        .then((data) => {
                            expect(data).toBe(undefined);
                        })
                );

                test('should call warn with correct message', () =>
                    run(fileMatch, warn)
                        .then(() => {
                            expect(warn).toHaveBeenCalledWith(MESSAGE);
                        })
                );

                test('should not call warn when package-lock does not exist', () => {
                    require('@does/exist').mockImplementationOnce(jest.fn(() => false));
                    run(fileMatch, warn)
                        .then(() => {
                            expect(warn).not.toHaveBeenCalled();
                        });
                });
            });
        });

        describe('when package.json is not modified', () => {
            beforeEach(() => {
                fileMatch
                    .mockImplementationOnce(() => ({ modified: false }))
                    .mockImplementationOnce(() => ({ modified: false }));
            });

            test('should resolve', () =>
                run(fileMatch, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call warn', () =>
                run(fileMatch, warn)
                    .then(() => {
                        expect(warn).not.toHaveBeenCalled();
                    })
            );
        });
    });
});
