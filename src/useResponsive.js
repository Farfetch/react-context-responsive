import { useContext } from 'react';
import ResponsiveContext from './ResponsiveContext';

const useResponsive = () => {
    const responsiveContext = useContext(ResponsiveContext);

    return responsiveContext;
};

export default useResponsive;
