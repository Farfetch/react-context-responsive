export const breakpointsMax = {
    xs: '319px',
    sm: '575px',
    md: '959px',
    lg: '1279px',
    xl: '1799px',
};

export const breakpoints = {
    xs: '320px',
    sm: '576px',
    md: '960px',
    lg: '1280px',
    xl: '1800px',
};

export const fixture = [
    {
        mediaType: '_initial',
        mediaQuery: `(min-width: 0px) and (max-width: ${breakpointsMax.xs})`,
        greaterThan: [],
        lessThan: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
        mediaType: 'xs',
        mediaQuery: `(min-width: ${breakpoints.xs}) and (max-width: ${breakpointsMax.sm})`,
        greaterThan: ['_initial'],
        lessThan: ['sm', 'md', 'lg', 'xl'],
    },
    {
        mediaType: 'sm',
        mediaQuery: `(min-width: ${breakpoints.sm}) and (max-width: ${breakpointsMax.md})`,
        greaterThan: ['_initial', 'xs'],
        lessThan: ['md', 'lg', 'xl'],
    },
    {
        mediaType: 'md',
        mediaQuery: `(min-width: ${breakpoints.md}) and (max-width: ${breakpointsMax.lg})`,
        greaterThan: ['_initial', 'xs', 'sm'],
        lessThan: ['lg', 'xl'],
    },
    {
        mediaType: 'lg',
        mediaQuery: `(min-width: ${breakpoints.lg}) and (max-width: ${breakpointsMax.xl})`,
        greaterThan: ['_initial', 'xs', 'sm', 'md'],
        lessThan: ['xl'],
    },
    {
        mediaType: 'xl',
        mediaQuery: `(min-width: ${breakpoints.xl})`,
        greaterThan: ['_initial', 'xs', 'sm', 'md', 'lg'],
        lessThan: [],
    },
];
