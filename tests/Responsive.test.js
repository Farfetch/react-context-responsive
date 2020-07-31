import { Responsive, ResponsiveProvider } from '../src';
import { breakpoints, breakpointsMax } from './__fixtures__/mockBreakpoints';
import { cleanup, render } from '@testing-library/react';
import {
    mockMatchMedia,
    unmockMatchMedia,
} from './__fixtures__/mockMatchMedia';
import React from 'react';
import mockContextContent from './__fixtures__/mockContextContent';

const props = { breakpoints, breakpointsMax };

describe('<Responsive />', () => {
    beforeEach(() => {
        mockMatchMedia();
    });

    afterEach(() => {
        unmockMatchMedia();
        cleanup();
    });

    test('should render correctly', () => {
        window.resizeTo(1024, 768);
        const mockRenderProp = jest.fn(() => <h1>Mock test</h1>);

        const { asFragment } = render(
            <ResponsiveProvider {...props}>
                <Responsive>{mockRenderProp}</Responsive>
            </ResponsiveProvider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('should return the context values to the render prop correctly', () => {
        window.resizeTo(1024, 768);
        const mockRenderProp = jest.fn(() => null);

        render(
            <ResponsiveProvider {...props}>
                <Responsive>{mockRenderProp}</Responsive>
            </ResponsiveProvider>
        );

        expect(mockRenderProp).toHaveBeenCalledTimes(2);
        expect(mockRenderProp).toHaveBeenLastCalledWith(mockContextContent);
    });
});
