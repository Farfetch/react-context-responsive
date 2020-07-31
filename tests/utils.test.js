import {
    breakpoints,
    breakpointsMax,
    fixture,
} from './__fixtures__/mockBreakpoints';
import {
    getBreakpoints,
    getMediaqueries,
    getQueriesObjects,
} from '../src/utils';

const breakpointNames = ['_initial', ...Object.keys(breakpoints)];
const mediaQueries = getMediaqueries(
    { ...breakpoints, _initial: '0px' },
    { ...breakpointsMax, _initial: '319px' },
    breakpointNames
);

describe('getBreakpoints()', () => {
    test('should return the correct breakpoint list, in order', () => {
        expect(getBreakpoints(mediaQueries, breakpointNames)).toEqual(fixture);
    });
});

const mediaTypes = fixture.map((breakpoint) => breakpoint.mediaType);

describe('getQueriesObjects()', () => {
    test.each(mediaTypes)(
        'should return the correct query object for the %s breakpoint',
        (mediaType) => {
            expect(getQueriesObjects(mediaType, fixture)).toMatchSnapshot();
        }
    );
    test('should return all the fields with empty objects in case of an invalid breakpoint', () => {
        expect(getQueriesObjects('ab', fixture)).toEqual({
            is: {},
            greaterThan: {},
            lessThan: {},
        });
    });
});
