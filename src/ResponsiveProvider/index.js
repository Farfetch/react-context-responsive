import { getBreakpoints, getMediaqueries, getQueriesObjects } from '../utils';
import PropTypes from 'prop-types';
import React, { useMemo, useRef } from 'react';
import ResponsiveContext from '../ResponsiveContext';
import useDebugResponsive from './useDebugResponsive';
import useMediaType from './useMediaType';
import useOrientation from './useOrientation';

const ResponsiveProvider = ({
    initialMediaType,
    defaultOrientation,
    children,
    breakpoints,
    breakpointsMax,
    mediaQueries,
    mobileBreakpoint,
}) => {
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

    const { currentMediaType, isCalculated } = useMediaType(
        breakpointsRef,
        initialMediaType
    );

    const queriesObjects = useMemo(
        () => getQueriesObjects(currentMediaType, breakpointsRef.current),
        [currentMediaType, breakpointsRef]
    );

    const currentOrientation = useOrientation(defaultOrientation);

    const contextObject = useMemo(
        () => ({
            mediaType: currentMediaType,
            orientation: currentOrientation,
            isCalculated,
            mobileBreakpoint,
            ...queriesObjects,
        }),
        [
            currentMediaType,
            currentOrientation,
            isCalculated,
            mobileBreakpoint,
            queriesObjects,
        ]
    );

    useDebugResponsive(contextObject, currentMediaType);

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
    mobileBreakpoint: 'md',
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
    mobileBreakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

export default ResponsiveProvider;
