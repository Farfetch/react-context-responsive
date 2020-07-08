import { createContext } from 'react';

const ResponsiveContext = createContext({
    isCalculated: false,
    mediaType: 'xs',
    lessThan: {},
    greaterThan: {},
    is: {},
    orientation: null,
});

export default ResponsiveContext;
