import { useEffect } from 'react';

const useDebugResponsive = (contextObject, currentMediaType) => {
    useEffect(() => {
        if (
            typeof process !== 'undefined' &&
            process.env &&
            process.env.NODE_ENV === 'development'
        ) {
            /* eslint-disable no-console */
            console.group(
                '%c @farfetch/react-context-responsive updated!',
                'color:#c4aa84; font-weight:bold;'
            );
            console.log(
                '%c Current media type:',
                'font-weight:bold;',
                currentMediaType
            );
            console.log('%c Context:', 'font-weight:bold;', contextObject);
            console.groupEnd();
            /* eslint-enable no-console */
        }
    }, [contextObject, currentMediaType]);
};

export default useDebugResponsive;
