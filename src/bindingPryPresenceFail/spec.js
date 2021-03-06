const {
    MESSAGE,
    run
} = require('.');

const DIFF_CONTAINS_BINDING_PRY= `
    blabla
    +  binding.pry
    blabla
    blabla
`;

describe('bindingPryPresenceFail', () => {
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

        describe('when a file contains "binding.pry"', () => {
            beforeEach(() => {
                files = ['a.js'];
                diffForFile.mockImplementation(() =>
                    Promise.resolve({
                        after: DIFF_CONTAINS_BINDING_PRY
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
    });
});
