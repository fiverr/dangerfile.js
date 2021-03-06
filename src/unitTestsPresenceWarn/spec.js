const {
    MESSAGE,
    run
} = require('.');

describe('sizeDiffWarn', () => {
    describe('.run', () => {
        const warn = jest.fn();

        let files;

        afterEach(() => {
            warn.mockRestore();
        });

        describe('when files are undefined', () => {
            beforeEach(() => {
                files = undefined;
            });

            test('should resolve', () =>
                run(files, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call warn', () =>
                run(files, warn)
                    .then(() => {
                        expect(warn).not.toHaveBeenCalled();
                    })
            );
        });

        describe('when files are an empty array', () => {
            beforeEach(() => {
                files = [];
            });

            test('should resolve', () =>
                run(files, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call warn', () =>
                run(files, warn)
                    .then(() => {
                        expect(warn).not.toHaveBeenCalled();
                    })
            );
        });

        describe.each([
            [['blabla.js', 'blabla.spec.js']],
            [['blabla.ts', 'blabla.spec.ts']]
        ])('when test files have been found', (files) => {
            test('should resolve', () =>
                run(files, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call warn', () =>
                run(files, warn)
                    .then(() => {
                        expect(warn).not.toHaveBeenCalled();
                    })
            );
        });

        describe.each([
            [['blabla.js']],
            [['blabla.ts']]
        ])('when test files have not been found and source files were changed', (files) => {
            test('should resolve', () =>
                run(files, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should call warn with correct message', () =>
                run(files, warn)
                    .then(() => {
                        expect(warn).toHaveBeenCalledWith(MESSAGE);
                    })
            );
        });

        describe('when test files have not been found, but no js/ts files were changed', () => {
            beforeEach(() => {
                files = ['blabla.json'];
            });

            test('should resolve', () =>
                run(files, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call warn', () =>
                run(files, warn)
                    .then(() => {
                        expect(warn).not.toHaveBeenCalled();
                    })
            );
        });
    });
});
