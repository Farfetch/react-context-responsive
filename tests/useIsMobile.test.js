import { ResponsiveProvider, useIsMobile } from '../src';
import { breakpoints, breakpointsMax } from './__fixtures__/mockBreakpoints';
import { cleanup, render } from '@testing-library/react';
import {
    mockMatchMedia,
    unmockMatchMedia,
} from './__fixtures__/mockMatchMedia';
import React from 'react';

const props = { breakpoints, breakpointsMax };

const MockComponent = ({ children }) => {
    const responsive = useIsMobile();

    return children(responsive);
};

const mockRenderProp = jest.fn(() => null);

describe('useIsMobile()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockMatchMedia();
    });

    afterEach(() => {
        cleanup();
        unmockMatchMedia();
    });

    test('should return not isMobile when window size md and mobile breakpoint md', () => {
        const windowSizeMd = 960;
        window.resizeTo(windowSizeMd, 768);

        render(
            <ResponsiveProvider {...props} mobileBreakpoint="md">
                <MockComponent>{mockRenderProp}</MockComponent>
            </ResponsiveProvider>
        );

        expect(mockRenderProp).toHaveBeenCalledTimes(2);
        expect(mockRenderProp).toHaveBeenLastCalledWith({
            isMobile: false,
            isCalculated: true,
        });
    });

    test('should return isMobile when window size sm and mobile breakpoint md', () => {
        const windowSizeSm = 576;
        window.resizeTo(windowSizeSm, 768);

        render(
            <ResponsiveProvider {...props} mobileBreakpoint="md">
                <MockComponent>{mockRenderProp}</MockComponent>
            </ResponsiveProvider>
        );

        expect(mockRenderProp).toHaveBeenCalledTimes(2);
        expect(mockRenderProp).toHaveBeenLastCalledWith({
            isMobile: true,
            isCalculated: true,
        });
    });

    test('should return not isMobile when window size sm and mobile breakpoint sm', () => {
        const windowSizeSm = 576;
        window.resizeTo(windowSizeSm, 768);

        render(
            <ResponsiveProvider {...props} mobileBreakpoint="sm">
                <MockComponent>{mockRenderProp}</MockComponent>
            </ResponsiveProvider>
        );

        expect(mockRenderProp).toHaveBeenCalledTimes(2);
        expect(mockRenderProp).toHaveBeenLastCalledWith({
            isMobile: false,
            isCalculated: true,
        });
    });

    test('should return isMobile when window size sm and mobile breakpoint sm', () => {
        const windowSizeXs = 320;
        window.resizeTo(windowSizeXs, 768);

        render(
            <ResponsiveProvider {...props} mobileBreakpoint="sm">
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
