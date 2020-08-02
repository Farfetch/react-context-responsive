import { getBreakpoints, getMediaqueries, getQueriesObjects } from './utils';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import ResponsiveContext from './ResponsiveContext';

const ResponsiveProvider = ({
    initialMediaType,
    defaultOrientation,
    children,
    breakpoints,
    breakpointsMax,
    mediaQueries,
}) => {
    const [isCalculated, setIsCalculated] = useState(false);
    const [currentBreakpoint, setCurrentBreakpoint] = useState(
        initialMediaType
    );
    const [currentOrientation, setCurrentOrientation] = useState(
        defaultOrientation
    );

    const _breakpoints = { ...breakpoints };
    if (!_breakpoints._initial) {
        _breakpoints._initial = '0em';
    }

    const breakpointNames = Object.keys(mediaQueries || _breakpoints);

    if (!mediaQueries) {
        mediaQueries = useMemo(
            getMediaqueries(_breakpoints, breakpointsMax, breakpointNames),
            [breakpointNames, breakpointsMax, _breakpoints]
        );
    }

    const breakpointsApi = useMemo(
        getBreakpoints(mediaQueries, breakpointNames),
        [mediaQueries, _breakpoints]
    );

    const queriesObjects = useMemo(
        () => getQueriesObjects(currentBreakpoint, breakpointsApi),
        [currentBreakpoint, breakpointsApi]
    );

    // Breakpoint event listener
    useEffect(() => {
        const localMediaQueries = breakpointsApi.map(
            (breakpoint) => breakpoint.mediaQuery
        );
        const mediaQueryListsAndListeners = localMediaQueries.map(
            (mediaQuery, index) => {
                const mediaQueryList = window.matchMedia(mediaQuery);

                if (mediaQueryList.matches) {
                    setCurrentBreakpoint(breakpointsApi[index].mediaType);
                    setIsCalculated(true);
                }

                const listener = (event) => {
                    event.matches &&
                        setCurrentBreakpoint(breakpointsApi[index].mediaType);
                };

                mediaQueryList.addListener(listener);

                return [mediaQueryList, listener];
            }
        );

        return () => {
            mediaQueryListsAndListeners.forEach(
                ([mediaQueryList, listener]) => {
                    mediaQueryList.removeListener(listener);
                }
            );
        };
    }, [breakpointsApi]);

    // Orientation event listener
    useEffect(() => {
        const setMatchedOrientation = (matches) => {
            setCurrentOrientation(matches ? 'portrait' : 'landscape');
        };

        const orientationMediaQueryList = window.matchMedia(
            '(orientation: portrait)'
        );

        setMatchedOrientation(orientationMediaQueryList.matches);

        const listener = (event) => {
            setMatchedOrientation(event.matches);
        };

        orientationMediaQueryList.addListener(listener);

        return () => {
            orientationMediaQueryList.removeListener(listener);
        };
    }, []);

    const contextObject = useMemo(
        () => ({
            mediaType: currentBreakpoint,
            orientation: currentOrientation,
            isCalculated,
            ...queriesObjects,
        }),
        [currentBreakpoint, currentOrientation, isCalculated, queriesObjects]
    );

    if (process && process.env && process.env.NODE_ENV !== 'production') {
        useEffect(() => {
            /* eslint-disable no-console */
            console.group(
                '%c @farfetch/react-context-responsive updated!',
                'color:#c4aa84; font-weight:bold;'
            );
            console.log(
                '%c Current breakpoint:',
                'font-weight:bold;',
                currentBreakpoint
            );
            console.log('%c Context:', 'font-weight:bold;', contextObject);
            console.groupEnd();
            /* eslint-enable no-console */
        }, [contextObject, currentBreakpoint]);
    }

    return (
        <ResponsiveContext.Provider value={contextObject}>
            {children}
        </ResponsiveContext.Provider>
    );
};

ResponsiveProvider.defaultProps = {
    initialMediaType: 'xs',
    defaultOrientation: null,
};

ResponsiveProvider.propTypes = {
    initialMediaType: PropTypes.string,
    defaultOrientation: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    breakpoints: PropTypes.arrayOf(
        PropTypes.shape({
            mediaQuery: PropTypes.string,
            mediaType: PropTypes.string,
        })
    ),
    // eslint-disable-next-line react/forbid-prop-types
    mediaQueries: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    breakpointsMax: PropTypes.any,
};

export default ResponsiveProvider;
