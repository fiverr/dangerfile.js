const {
    MESSAGE,
    THRESHOLD,
    IRRELEVANT_FILES,
    run
} = require('.');

const BIGGER_THAN_THRESHOLD_ADDITIONS = THRESHOLD + 10;
const DIFF_BIGGER_THAN_THRESHOLD_ADDITIONS = `
    blabla
    ${'+  addition\n'.repeat(BIGGER_THAN_THRESHOLD_ADDITIONS)}
    -  blabla
    blabla
    blabla
`;

const TYNIER_THAN_THRESHOLD_ADDITIONS = THRESHOLD - 10;
const DIFF_TYNIER_THAN_THRESHOLD_ADDITIONS = `
    blabla
    ${'+  addition\n'.repeat(TYNIER_THAN_THRESHOLD_ADDITIONS)}
    -  blabla
    blabla
    blabla
`;

describe('sizeDiffWarn', () => {
    describe('.run', () => {
        const diffForFile = jest.fn();
        const warn = jest.fn();

        let files;

        afterEach(() => {
            diffForFile.mockRestore();
            warn.mockRestore();
        });

        describe('when files are undefined', () => {
            beforeEach(() => {
                files = undefined;
            });

            test('should resolve', () =>
                run(files, diffForFile, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call warn', () =>
                run(files, diffForFile, warn)
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
                run(files, diffForFile, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call warn', () =>
                run(files, diffForFile, warn)
                    .then(() => {
                        expect(warn).not.toHaveBeenCalled();
                    })
            );
        });

        IRRELEVANT_FILES.forEach((file) => {
            describe(`when files contain "${file}" with ${BIGGER_THAN_THRESHOLD_ADDITIONS} additions`, () => {
                beforeEach(() => {
                    files = [file];

                    diffForFile.mockImplementationOnce(() =>
                        Promise.resolve({ added: DIFF_BIGGER_THAN_THRESHOLD_ADDITIONS })
                    );
                });

                test('should resolve', () =>
                    run(files, diffForFile, warn)
                        .then((data) => {
                            expect(data).toBe(undefined);
                        })
                );

                test('should not call warn', () =>
                    run(files, diffForFile, warn)
                        .then(() => {
                            expect(warn).not.toHaveBeenCalled();
                        })
                );
            });
        });

        describe(`when files contain "a_modified_file.rb" with ${BIGGER_THAN_THRESHOLD_ADDITIONS} additions`, () => {
            beforeEach(() => {
                files = ['superbigfile.rb'];

                diffForFile.mockImplementationOnce(() =>
                    Promise.resolve({ added: DIFF_BIGGER_THAN_THRESHOLD_ADDITIONS })
                );
            });

            test('should resolve', () =>
                run(files, diffForFile, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should call warn with correct message', () =>
                run(files, diffForFile, warn)
                    .then(() => {
                        expect(warn).toHaveBeenCalledWith(MESSAGE);
                    })
            );
        });

        describe(`when sum of additions higher than ${THRESHOLD}`, () => {
            beforeEach(() => {
                files = ['a.rb', 'b.js'];

                diffForFile.mockImplementation(() =>
                    Promise.resolve({ added: DIFF_TYNIER_THAN_THRESHOLD_ADDITIONS })
                );
            });

            test('should resolve', () =>
                run(files, diffForFile, warn)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should call warn with correct message', () =>
                run(files, diffForFile, warn)
                    .then(() => {
                        expect(warn).toHaveBeenCalledWith(MESSAGE);
                    })
            );
        });
    });
});
