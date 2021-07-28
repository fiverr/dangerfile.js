const {
    MESSAGE,
    run
} = require('.');

const DIFF_CONTAINS_RC= `
    blabla
    +  "text-transform: capitalize"
    blabla
    blabla
`;

describe('textCapitalizationFail', () => {
    describe('.run', () => {
        const diffForFile = jest.fn();
        const fail = jest.fn();

        let files;

        afterEach(() => {
            fail.mockRestore();
        });

        describe('when files are undefined', () => {
            beforeEach(() => {
                files = undefined;
            });

            test('should resolve', () =>
                run(files, diffForFile, fail)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call fail', () =>
                run(files, diffForFile, fail)
                    .then(() => {
                        expect(fail).not.toHaveBeenCalled();
                    })
            );
        });

        describe('when files are an empty array', () => {
            beforeEach(() => {
                files = [];
            });

            test('should resolve', () =>
                run(files, diffForFile, fail)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call fail', () =>
                run(files, diffForFile, fail)
                    .then(() => {
                        expect(fail).not.toHaveBeenCalled();
                    })
            );
        });

        describe('when js file contains "text-transform: capitalize"', () => {
            beforeEach(() => {
                files = ['a.js', 'package.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_RC
                    })
                );
            });

            test('should resolve', () =>
                run(files, diffForFile, fail)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should call fail with correct message', () =>
                run(files, diffForFile, fail)
                    .then(() => {
                        expect(fail).toHaveBeenCalledWith(MESSAGE);
                    })
            );
        });

        describe('when ts file contains "text-transform: capitalize"', () => {
            beforeEach(() => {
                files = ['a.ts', 'package.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_RC
                    })
                );
            });

            test('should resolve', () =>
                run(files, diffForFile, fail)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should call fail with correct message', () =>
                run(files, diffForFile, fail)
                    .then(() => {
                        expect(fail).toHaveBeenCalledWith(MESSAGE);
                    })
            );
        });

        describe('when css file contains "text-transform: capitalize"', () => {
            beforeEach(() => {
                files = ['a.css', 'package.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_RC
                    })
                );
            });

            test('should resolve', () =>
                run(files, diffForFile, fail)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should call fail with correct message', () =>
                run(files, diffForFile, fail)
                    .then(() => {
                        expect(fail).toHaveBeenCalledWith(MESSAGE);
                    })
            );
        });

        describe('when scss file contains "text-transform: capitalize"', () => {
            beforeEach(() => {
                files = ['a.scss', 'package.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_RC
                    })
                );
            });

            test('should resolve', () =>
                run(files, diffForFile, fail)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should call fail with correct message', () =>
                run(files, diffForFile, fail)
                    .then(() => {
                        expect(fail).toHaveBeenCalledWith(MESSAGE);
                    })
            );
        });

        describe('when spec file contains "text-transform: capitalize"', () => {
            beforeEach(() => {
                files = ['spec.js'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_RC
                    })
                );
            });

            test('should resolve', () =>
                run(files, diffForFile, fail)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call fail', () =>
                run(files, diffForFile, fail)
                    .then(() => {
                        expect(fail).not.toHaveBeenCalled();
                    })
            );
        });

        describe('when another file contains "text-transform: capitalize"', () => {
            beforeEach(() => {
                files = ['a.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_RC
                    })
                );
            });

            test('should resolve', () =>
                run(files, diffForFile, fail)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call fail', () =>
                run(files, diffForFile, fail)
                    .then(() => {
                        expect(fail).not.toHaveBeenCalled();
                    })
            );
        });
    });
});
