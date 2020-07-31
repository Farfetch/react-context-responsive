export const getQueriesObjects = (currentBreakpointName, breakpoints) => {
    const currentBreakpoint = breakpoints.find(
        (breakpoint) => breakpoint.mediaType === currentBreakpointName
    );

    const defaultQueryObject = {
        is: {},
        greaterThan: {},
        lessThan: {},
    };

    if (!currentBreakpoint) {
        return defaultQueryObject;
    }

    return breakpoints.reduce((memo, breakpoint) => {
        const breakpointName = breakpoint.mediaType;
        return {
            is: {
                ...memo.is,
                [breakpointName]:
                    breakpointName === currentBreakpoint.mediaType,
            },
            greaterThan: {
                ...memo.greaterThan,
                [breakpointName]: currentBreakpoint.greaterThan.includes(
                    breakpointName
                ),
            },
            lessThan: {
                ...memo.lessThan,
                [breakpointName]: currentBreakpoint.lessThan.includes(
                    breakpointName
                ),
            },
        };
    }, defaultQueryObject);
};

export const getBreakpoints = (mediaQueries, breakpointNames) => {
    return breakpointNames.map((breakpointName, index) => {
        return {
            mediaType: breakpointName,
            mediaQuery: mediaQueries[breakpointName],
            greaterThan: breakpointNames.filter(
                (_gtName, gtIndex) => gtIndex < index
            ),
            lessThan: breakpointNames.filter(
                (_ltName, ltIndex) => ltIndex > index
            ),
        };
    }, {});
};

export const getMediaqueries = (breakpoints, breakpointsMax, breakpointNames) =>
    breakpointNames.reduce(
        (acc, breakpointName, index) => {
            const nextBreakpointName = breakpointNames[index + 1];

            return {
                ...acc,
                [breakpointName]: `(min-width: ${breakpoints[breakpointName]})${
                    nextBreakpointName
                        ? ` and (max-width: ${breakpointsMax[nextBreakpointName]})`
                        : ''
                }`,
            };
        },
        { _initial: '(min-width: 0em)' }
    );
