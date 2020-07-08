import { ResponsiveProvider, useResponsive } from '../src';
import { cleanup, render } from '@testing-library/react';
import {
    mockMatchMedia,
    unmockMatchMedia,
} from './__fixtures__/mockMatchMedia';
import React from 'react';
import mockContextContent from './__fixtures__/mockContextContent';

describe('useResponsive()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockMatchMedia();
    });

    afterEach(() => {
        cleanup();
        unmockMatchMedia();
    });

    test('should return the context values from the hook correctly', () => {
        window.resizeTo(1024, 768);
        const MockComponent = ({ children }) => {
            const responsive = useResponsive();

            return children(responsive);
        };

        const mockRenderProp = jest.fn(() => null);

        render(
            <ResponsiveProvider>
                <MockComponent>{mockRenderProp}</MockComponent>
            </ResponsiveProvider>
        );

        expect(mockRenderProp).toHaveBeenCalledTimes(2);
        expect(mockRenderProp).toHaveBeenLastCalledWith(mockContextContent);
    });
});
