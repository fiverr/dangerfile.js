const {
    MESSAGE,
    run
} = require('.');

describe('descriptionPresenceFail', () => {
    describe('.run', () => {
        const fail = jest.fn();

        let body;

        afterEach(() => {
            fail.mockRestore();
        });

        describe('when body includes a description', () => {
            beforeEach(() => {
                body = `
                    ## Description
                    nice description!!
                `;
            });

            test('should resolve', () =>
                run(body, fail)
                    .then((data) => {
                        expect(data).toBe(undefined);
                    })
            );

            test('should not call fail', () =>
                run(body, fail)
                    .then(() => {
                        expect(fail).not.toHaveBeenCalled();
                    })
            );
        });

        describe('when body does not include a description', () => {
            describe('when body is undefined', () => {
                beforeEach(() => {
                    body = undefined;
                });

                test('should resolve', () =>
                    run(body, fail)
                        .then((data) => {
                            expect(data).toBe(undefined);
                        })
                );

                test('should call fail with correct message', () =>
                    run(body, fail)
                        .then(() => {
                            expect(fail).toHaveBeenCalledWith(MESSAGE);
                        })
                );
            });

            describe('when body does not include enough text', () => {
                beforeEach(() => {
                    body = '!';
                });

                test('should resolve', () =>
                    run(body, fail)
                        .then((data) => {
                            expect(data).toBe(undefined);
                        })
                );

                test('should call fail with correct message', () =>
                    run(body, fail)
                        .then(() => {
                            expect(fail).toHaveBeenCalledWith(MESSAGE);
                        })
                );
            });
        });
    });
});
