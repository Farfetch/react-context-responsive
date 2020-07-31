import { ResponsiveProvider, withResponsive } from '../src';
import { breakpoints, breakpointsMax } from './__fixtures__/mockBreakpoints';
import { cleanup, render } from '@testing-library/react';
import {
    mockMatchMedia,
    unmockMatchMedia,
} from './__fixtures__/mockMatchMedia';
import React from 'react';
import mockContextContent from './__fixtures__/mockContextContent';

const props = { breakpoints, breakpointsMax };

describe('withResponsive()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockMatchMedia();
    });

    afterEach(() => {
        cleanup();
        unmockMatchMedia();
    });

    test('should render correctly', () => {
        window.resizeTo(1024, 768);
        const MockComponent = jest.fn(() => <h1>Mock test</h1>);
        const MockComponentWithResponsive = withResponsive(MockComponent);

        const { asFragment } = render(
            <ResponsiveProvider {...props}>
                <MockComponentWithResponsive />
            </ResponsiveProvider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('should pass the context values to the `responsive` prop correctly', () => {
        window.resizeTo(1024, 768);
        const MockComponent = jest.fn(() => <h1>Mock test</h1>);
        const MockComponentWithResponsive = withResponsive(MockComponent);

        render(
            <ResponsiveProvider {...props}>
                <MockComponentWithResponsive />
            </ResponsiveProvider>
        );

        expect(MockComponent).toHaveBeenLastCalledWith(
            {
                responsive: mockContextContent,
            },
            {}
        );
    });

    test('should pass the context values to the `responsive` prop and the additional props correctly', () => {
        window.resizeTo(1024, 768);
        const MockComponent = jest.fn(() => <h1>Mock test</h1>);
        const MockComponentWithResponsive = withResponsive(MockComponent);

        render(
            <ResponsiveProvider {...props}>
                <MockComponentWithResponsive test={'hello'} myProp={'world'} />
            </ResponsiveProvider>
        );

        expect(MockComponent).toHaveBeenLastCalledWith(
            {
                responsive: mockContextContent,
                test: 'hello',
                myProp: 'world',
            },
            {}
        );
    });
});
