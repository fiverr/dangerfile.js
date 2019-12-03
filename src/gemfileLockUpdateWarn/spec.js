const {
    MESSAGE,
    run
} = require('.');

describe('gemfileLockUpdateWarn', () => {
    describe('.run', () => {
        const fileMatch = jest.fn();
        const warn = jest.fn();

        afterEach(() => {
            fileMatch.mockRestore();
            warn.mockRestore();
        });

        describe('when Gemfile is modified', () => {
            describe('when Gemfile.lock is modified', () => {
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

            describe('when Gemfile.lock is not modified', () => {
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
            });
        });

        describe('when Gemfile is not modified', () => {
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
