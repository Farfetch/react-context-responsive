import React from 'react';
import getDisplayName from './util/getDisplayName';
import useIsMobile from './useIsMobile';

const withIsMobile = (Component) => {
    const Connect = (props) => {
        const { isMobile, isCalculated } = useIsMobile();

        return (
            <Component
                {...props}
                isMobile={isMobile}
                isCalculated={isCalculated}
            />
        );
    };

    Connect.displayName = getDisplayName('withIsMobile', Component);

    return Connect;
};

export default withIsMobile;
