import { ResponsiveProvider, useIsMobile } from '../src';
import { cleanup, render } from '@testing-library/react';
import {
    mockMatchMedia,
    unmockMatchMedia,
} from './__fixtures__/mockMatchMedia';
import React from 'react';

const MockComponent = ({ children }) => {
    const responsive = useIsMobile();

    return children(responsive);
};

const mockRenderProp = jest.fn(() => null);

describe('useResponsive()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockMatchMedia();
    });

    afterEach(() => {
        cleanup();
        unmockMatchMedia();
    });

    test('should return the values from the hook correctly, if is not mobile', () => {
        window.resizeTo(1024, 768);

        render(
            <ResponsiveProvider>
                <MockComponent>{mockRenderProp}</MockComponent>
            </ResponsiveProvider>
        );

        expect(mockRenderProp).toHaveBeenCalledTimes(2);
        expect(mockRenderProp).toHaveBeenLastCalledWith({
            isMobile: false,
            isCalculated: true,
        });
    });

    test('should return the values from the hook correctly, if is mobile', () => {
        window.resizeTo(375, 812);

        render(
            <ResponsiveProvider>
                <MockComponent>{mockRenderProp}</MockComponent>
            </ResponsiveProvider>
        );

        expect(mockRenderProp).toHaveBeenCalledTimes(2);
        expect(mockRenderProp).toHaveBeenLastCalledWith({
            isMobile: true,
            isCalculated: true,
        });
    });
});
