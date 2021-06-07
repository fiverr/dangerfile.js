const {
    MESSAGE,
    run
} = require('.');

const DIFF_CONTAINS_FIT_ICONS = `
    import {l_comment} from '@fiverr-private/fit/icons';
    blabla
    blabla
`;

const DIFF_DOES_NOT_CONTAIN_FIT_ICONS = `
    import {Icon} from '@fiverr-private/fit';
    import {l_comment} from '@fiverr-private/icons';
    blabla
    blabla
`;

const files = ['a.js'];

describe('fitIconsUsageWarn', () => {
    let diffForFile = jest.fn();
    let warn = jest.fn();

    beforeEach(() => {
        diffForFile = jest.fn();
        warn = jest.fn();
    });

    it('should not warn when has no files', async() => {
        await run(undefined, diffForFile, warn)
            .then(() => {
                expect(warn).not.toHaveBeenCalled();
            });
    });

    it('should not warn when has no changes', async() => {
        setDiff(undefined);
        await run(files, diffForFile, warn)
            .then(() => {
                expect(warn).not.toHaveBeenCalled();
            });
    });

    it('should not warn when has no fit icons usage', async() => {
        setDiff(DIFF_DOES_NOT_CONTAIN_FIT_ICONS);
        await run(files, diffForFile, warn)
            .then(() => {
                expect(warn).not.toHaveBeenCalled();
            });
    });

    it('should warn when detected fit icons usage', async() => {
        setDiff(DIFF_CONTAINS_FIT_ICONS);
        await run(files, diffForFile, warn)
            .then(() => {
                expect(warn).toHaveBeenCalledWith(MESSAGE);
            });
    });

    function setDiff(after) {
        diffForFile.mockImplementation(() =>
            Promise.resolve({
                after
            })
        );
    }
});
