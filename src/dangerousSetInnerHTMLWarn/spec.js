const {
    MESSAGE,
    run
} = require('.');

const DIFF_CONTAINS_DANGEROUSLY_SET_INNER_HTML= `
    blabla
    +  dangerouslySetInnerHTML
    blabla
    blabla
`;

describe('dangerousSetInnerHTMLWarn', () => {
    describe('.run', () => {
        const diffForFile = jest.fn();
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

        describe('when a file contain "dangerouslySetInnerHTML"', () => {
            beforeEach(() => {
                files = ['a.js'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_DANGEROUSLY_SET_INNER_HTML
                    })
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
