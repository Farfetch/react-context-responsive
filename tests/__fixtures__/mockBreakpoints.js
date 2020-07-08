const mediaqueries = {};

export default [
    {
        mediaType: '_initial',
        mediaQuery: `(min-width: 0em) and ${mediaqueries['max-xs']}`,
        greaterThan: [],
        lessThan: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
        mediaType: 'xs',
        mediaQuery: `${mediaqueries['xs']} and ${mediaqueries['max-sm']}`,
        greaterThan: ['_initial'],
        lessThan: ['sm', 'md', 'lg', 'xl'],
    },
    {
        mediaType: 'sm',
        mediaQuery: `${mediaqueries['sm']} and ${mediaqueries['max-md']}`,
        greaterThan: ['_initial', 'xs'],
        lessThan: ['md', 'lg', 'xl'],
    },
    {
        mediaType: 'md',
        mediaQuery: `${mediaqueries['md']} and ${mediaqueries['max-lg']}`,
        greaterThan: ['_initial', 'xs', 'sm'],
        lessThan: ['lg', 'xl'],
    },
    {
        mediaType: 'lg',
        mediaQuery: `${mediaqueries['lg']} and ${mediaqueries['max-xl']}`,
        greaterThan: ['_initial', 'xs', 'sm', 'md'],
        lessThan: ['xl'],
    },
    {
        mediaType: 'xl',
        mediaQuery: mediaqueries['xl'],
        greaterThan: ['_initial', 'xs', 'sm', 'md', 'lg'],
        lessThan: [],
    },
];
