import { getBreakpoints, getMediaqueries, getQueriesObjects } from './utils';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import React, { useMemo, useRef, useState } from 'react';
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

    const breakpointsWithInitialValue = {
        _initial: '0em',
        ...breakpoints,
    };

    const breakpointNames = Object.keys(
        mediaQueries || breakpointsWithInitialValue
    );

    if (!mediaQueries) {
        mediaQueries = getMediaqueries(
            breakpointsWithInitialValue,
            breakpointsMax,
            breakpointNames
        );
    }

    const breakpointsRef = useRef(
        getBreakpoints(mediaQueries, breakpointNames)
    );

    const queriesObjects = useMemo(
        () => getQueriesObjects(currentBreakpoint, breakpointsRef.current),
        [currentBreakpoint, breakpointsRef]
    );

    // Add event listener for breakpoints
    useEffect(() => {
        const breakpoints = breakpointsRef.current;
        const localMediaQueries = breakpoints.map(
            (breakpoint) => breakpoint.mediaQuery
        );
        const mediaQueryListsAndListeners = localMediaQueries.map(
            (mediaQuery, index) => {
                const mediaQueryList = window.matchMedia(mediaQuery);

                if (mediaQueryList.matches) {
                    setCurrentBreakpoint(breakpoints[index].mediaType);
                    setIsCalculated(true);
                }

                const listener = (event) => {
                    event.matches &&
                        setCurrentBreakpoint(breakpoints[index].mediaType);
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
    }, [breakpointsRef]);

    // Add orientation media query
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

    useEffect(() => {
        if (process && process.env && process.env.NODE_ENV === 'development') {
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
        }
    }, [contextObject, currentBreakpoint]);

    return (
        <ResponsiveContext.Provider value={contextObject}>
            {children}
        </ResponsiveContext.Provider>
    );
};

const breakpointsPropTypes = {
    xs: PropTypes.string,
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
    xl: PropTypes.string,
};

ResponsiveProvider.defaultProps = {
    initialMediaType: 'xs',
    defaultOrientation: null,
};

ResponsiveProvider.propTypes = {
    initialMediaType: PropTypes.oneOf([
        '_initial',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
    ]),
    defaultOrientation: PropTypes.oneOf(['landscape', 'portrait']),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    breakpoints: PropTypes.exact(breakpointsPropTypes),
    breakpointsMax: PropTypes.exact(breakpointsPropTypes),
    mediaQueries: PropTypes.exact({
        ...breakpointsPropTypes,
        _initial: PropTypes.string,
    }),
};

export default ResponsiveProvider;
