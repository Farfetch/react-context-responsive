import { getBreakpoints, getQueriesObjects } from '../src/utils';
import mockBreakpoints from './__fixtures__/mockBreakpoints';

describe('getBreakpoints()', () => {
    test('should return the correct breakpoint list, in order', () => {
        expect(getBreakpoints()).toEqual(mockBreakpoints);
    });
});

const mediaTypes = mockBreakpoints.map((breakpoint) => breakpoint.mediaType);

describe('getQueriesObjects()', () => {
    test.each(mediaTypes)(
        'should return the correct query object for the %s breakpoint',
        (mediaType) => {
            expect(
                getQueriesObjects(mediaType, mockBreakpoints)
            ).toMatchSnapshot();
        }
    );
    test('should return all the fields with empty objects in case of an invalid breakpoint', () => {
        expect(getQueriesObjects('ab', mockBreakpoints)).toEqual({
            is: {},
            greaterThan: {},
            lessThan: {},
        });
    });
});
