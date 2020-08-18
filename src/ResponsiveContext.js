import { createContext } from 'react';

const ResponsiveContext = createContext({
    isCalculated: false,
    mediaType: 'xs',
    lessThan: {},
    greaterThan: {},
    is: {},
    orientation: null,
    mobileBreakpoint: 'md',
});

export default ResponsiveContext;
