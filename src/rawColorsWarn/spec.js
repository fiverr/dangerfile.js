const {
    MESSAGE,
    run
} = require('.');

const DIFF_RAW_COLOR_HASH = `
    const myColor = #cccddd;
`;

const DIFF_RAW_COLOR_RGB = `
    const myColor = "rgb(1, 2, 3)";
`;

const DIFF_VARIABLE_COLOR = `
    import { blue_500 } from '@fiverr-private/sass/helpers/index';

    const myColor = blue_500;
`;

const FILES_TO_SKIP = ['story.js'];
const FILES = ['myfile.js'];

describe('rawColorsWarn', () => {
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
        await run(FILES, diffForFile, warn)
            .then(() => {
                expect(warn).not.toHaveBeenCalled();
            });
    });

    it('should not warn when file is skippable', async() => {
        setDiff(DIFF_RAW_COLOR_HASH);
        await run(FILES_TO_SKIP, diffForFile, warn)
            .then(() => {
                expect(warn).not.toHaveBeenCalled();
            });
    });

    it('should warn when using hash colors', async() => {
        setDiff(DIFF_RAW_COLOR_HASH);
        await run(FILES, diffForFile, warn)
            .then(() => {
                expect(warn).toHaveBeenCalledWith(MESSAGE);
            });
    });

    it('should warn when using RGB colors', async() => {
        setDiff(DIFF_RAW_COLOR_RGB);
        await run(FILES, diffForFile, warn)
            .then(() => {
                expect(warn).toHaveBeenCalledWith(MESSAGE);
            });
    });

    it('should not warn when using variable colors', async() => {
        setDiff(DIFF_VARIABLE_COLOR);
        await run(FILES, diffForFile, warn)
            .then(() => {
                expect(warn).not.toHaveBeenCalled();
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
