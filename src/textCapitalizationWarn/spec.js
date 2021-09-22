const {
    MESSAGE,
    run
} = require('.');

const DIFF_CONTAINS_FUTILE_CAPITALIZE = `
    blabla
    +  "import { capitalize } from '@fiverr-private/futile'"
    blabla
    blabla
`;

const DIFF_CONTAINS_LODASH_CAPITALIZE = `
    blabla
    +  "import { capitalize } from 'lodash'"
    blabla
    blabla
`;

describe('textCapitalizationWarn', () => {
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

        describe('when js file contains consumption of futile capitalize', () => {
            beforeEach(() => {
                files = ['a.js', 'package.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_FUTILE_CAPITALIZE
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

        describe('when ts file contains consumption of futile capitalize', () => {
            beforeEach(() => {
                files = ['a.ts', 'package.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_FUTILE_CAPITALIZE
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

        describe('when js file contains consumption of lodash capitalize', () => {
            beforeEach(() => {
                files = ['a.js', 'package.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_LODASH_CAPITALIZE
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

        describe('when ts file contains consumption of lodash capitalize', () => {
            beforeEach(() => {
                files = ['a.ts', 'package.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_LODASH_CAPITALIZE
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

        describe('when spec file contains consumption of futile capitalize', () => {
            beforeEach(() => {
                files = ['spec.js'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_FUTILE_CAPITALIZE
                    })
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

        describe('when another file contains consumption of lodash capitalize', () => {
            beforeEach(() => {
                files = ['a.json'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_LODASH_CAPITALIZE
                    })
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
});
