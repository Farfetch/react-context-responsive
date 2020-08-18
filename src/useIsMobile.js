import { useMemo } from 'react';
import useResponsive from './useResponsive';

const useIsMobile = () => {
    const { isCalculated, lessThan, mobileBreakpoint } = useResponsive();
    const isMobile = lessThan[mobileBreakpoint];

    return useMemo(() => ({ isMobile, isCalculated }), [
        isMobile,
        isCalculated,
    ]);
};

export default useIsMobile;
