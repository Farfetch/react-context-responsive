import { useContext, useMemo } from 'react';
import ResponsiveContext from './ResponsiveContext';

const useIsMobile = () => {
    const { isCalculated, lessThan } = useContext(ResponsiveContext);
    const isMobile = lessThan.md;

    return useMemo(() => ({ isMobile, isCalculated }), [
        isMobile,
        isCalculated,
    ]);
};

export default useIsMobile;
