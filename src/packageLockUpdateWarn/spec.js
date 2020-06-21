const fs = require('fs');

jest.mock('fs');

const {
    MESSAGE,
    run
} = require('.');

describe('packageLockUpdateWarn', () => {
    describe('.run', () => {
        const fileMatch = jest.fn();
        const warn = jest.fn();

        afterEach(() => {
            fileMatch.mockRestore();
            warn.mockRestore();
        });

        describe('when package.json is modified', () => {
            describe('when package-lock.json is modified', () => {
                beforeEach(() => {
                    fileMatch
                        .mockImplementationOnce(() => ({ modified: true }))
                        .mockImplementationOnce(() => ({ modified: true }));

                    fs.existsSync.mockReturnValue(true);
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

            describe('when package-lock.json doesn\'t exist', () => {
                beforeEach(() => {
                    fileMatch
                        .mockImplementationOnce(() => ({ modified: true }))
                        .mockImplementationOnce(() => ({ modified: false }));

                    fs.existsSync.mockReturnValue(false);
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

                    fs.existsSync.mockReturnValue(true);
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
