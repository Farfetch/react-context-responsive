import { useEffect, useState } from 'react';

const useOrientation = (defaultOrientation) => {
    const [currentOrientation, setCurrentOrientation] = useState(
        defaultOrientation
    );

    useEffect(() => {
        const setMatchedOrientation = (matches) => {
            setCurrentOrientation(matches ? 'portrait' : 'landscape');
        };

        const orientationMediaQueryList = window.matchMedia(
            '(orientation: portrait)'
        );

        setMatchedOrientation(orientationMediaQueryList.matches);

        const listener = (event) => {
            setMatchedOrientation(event.matches);
        };

        orientationMediaQueryList.addListener(listener);

        return () => {
            orientationMediaQueryList.removeListener(listener);
        };
    }, []);

    return currentOrientation;
};

export default useOrientation;
