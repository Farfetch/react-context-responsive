import React from 'react';
import getDisplayName from './util/getDisplayName';
import useResponsive from './useResponsive';

const withResponsive = (Component) => {
    const Connect = (props) => {
        const responsiveObject = useResponsive();

        return <Component {...props} responsive={responsiveObject} />;
    };

    Connect.displayName = getDisplayName('withResponsive', Component);

    return Connect;
};

export default withResponsive;
