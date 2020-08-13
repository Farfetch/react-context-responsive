import { act, cleanup, render } from '@testing-library/react';
import { breakpoints, breakpointsMax } from './__fixtures__/mockBreakpoints';
import {
    mockMatchMedia,
    unmockMatchMedia,
} from './__fixtures__/mockMatchMedia';
import React from 'react';
import ResponsiveProvider from '../src/ResponsiveProvider';
import mockContextContent from './__fixtures__/mockContextContent';

const props = { breakpoints, breakpointsMax };

jest.mock('../src/ResponsiveContext');

global.console = {
    log: jest.fn(),
    group: jest.fn(),
    groupEnd: jest.fn(),
    error: jest.fn(),
};

describe('<ResponsiveProvider />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockMatchMedia();
    });

    afterEach(() => {
        cleanup();
        unmockMatchMedia();
    });

    test.each`
        width   | height
        ${240}  | ${320}
        ${320}  | ${240}
        ${375}  | ${812}
        ${812}  | ${375}
        ${320}  | ${568}
        ${768}  | ${1024}
        ${1024} | ${768}
        ${1024} | ${1366}
        ${1336} | ${1024}
        ${1440} | ${900}
        ${2560} | ${1440}
    `(
        'should pass to the context the correct value when the width is $width and the height is $height, after calculation',
        ({ width, height }) => {
            window.resizeTo(width, height);

            render(
                <ResponsiveProvider {...props}>
                    <div>Responsive test</div>
                </ResponsiveProvider>
            );

            const { default: Context } = require('../src/ResponsiveContext');

            // One time with default values, the other with the calculated
            expect(Context.Provider).toHaveBeenCalledTimes(2);

            const passedValues = Context.Provider.mock.calls[1][0].value;

            expect(passedValues).toMatchSnapshot();
        }
    );

    test('should pass to the context the default values, before calculation', () => {
        render(
            <ResponsiveProvider {...props}>
                <div>Responsive test</div>
            </ResponsiveProvider>
        );

        const { default: Context } = require('../src/ResponsiveContext');
        const passedValues = Context.Provider.mock.calls[0][0].value;

        expect(passedValues).toMatchSnapshot();
    });

    test('should pass to the context the props values, before calculation, if available', () => {
        render(
            <ResponsiveProvider
                {...props}
                initialMediaType={'xl'}
                defaultOrientation={'portrait'}
            >
                <div>Responsive test</div>
            </ResponsiveProvider>
        );

        const { default: Context } = require('../src/ResponsiveContext');
        const passedValues = Context.Provider.mock.calls[0][0].value;

        expect(passedValues).toMatchSnapshot();
    });

    test('should pass to the context the correct values, on resize', () => {
        window.resizeTo(1024, 768);
        render(
            <ResponsiveProvider {...props}>
                <div>Responsive test</div>
            </ResponsiveProvider>
        );

        act(() => {
            window.resizeTo(1440, 900);
        });

        const { default: Context } = require('../src/ResponsiveContext');

        const passedValues = Context.Provider.mock.calls[1][0].value;

        expect(passedValues).toMatchSnapshot();
    });

    test('should remove all the added matchMedia listeners on unmount', () => {
        window.resizeTo(1024, 768);

        const { unmount } = render(
            <ResponsiveProvider {...props}>
                <div>Responsive test</div>
            </ResponsiveProvider>
        );

        const listenersAdded = window._mockMatchMedia.reduce(
            (memo, mockMatchMedia) => {
                return memo + mockMatchMedia.addListener.mock.calls.length;
            },
            0
        );
        const listenersRemoved = window._mockMatchMedia.reduce(
            (memo, mockMatchMedia) => {
                return memo + mockMatchMedia.removeListener.mock.calls.length;
            },
            0
        );

        // All the 6 breakpoints + 1 orientation
        expect(listenersAdded).toBe(7);
        expect(listenersRemoved).toBe(0);

        unmount();

        const listenersRemovedAfterUnmount = window._mockMatchMedia.reduce(
            (memo, mockMatchMedia) => {
                return memo + mockMatchMedia.removeListener.mock.calls.length;
            },
            0
        );

        expect(listenersRemovedAfterUnmount).toBe(listenersAdded);
    });

    test.each(
        ['production', 'test'],
        'should not call console.log in the % environment',
        (env) => {
            process.env.NODE_ENV = env;
            window.resizeTo(1024, 768);

            render(
                <ResponsiveProvider {...props}>
                    <div>Test</div>
                </ResponsiveProvider>
            );

            expect(global.console.group).not.toHaveBeenCalled();
            expect(global.console.log).not.toHaveBeenCalled();
            expect(global.console.groupEnd).not.toHaveBeenCalled();

            // Clean the global changes
            process.env.NODE_ENV = 'test';
        }
    );

    test('should call console.log only for development environment', () => {
        process.env.NODE_ENV = 'development';
        window.resizeTo(1024, 768);

        const { unmount } = render(
            <ResponsiveProvider {...props}>
                <div>Test</div>
            </ResponsiveProvider>
        );

        expect(global.console.group).toHaveBeenCalledTimes(2);
        expect(global.console.group).toHaveBeenCalledWith(
            '%c @farfetch/react-context-responsive updated!',
            'color:#c4aa84; font-weight:bold;'
        );
        expect(global.console.log).toHaveBeenCalledTimes(4);
        expect(global.console.log).toHaveBeenCalledWith(
            '%c Context:',
            'font-weight:bold;',
            mockContextContent
        );
        expect(global.console.groupEnd).toHaveBeenCalledTimes(2);

        // Clean the global changes
        process.env.NODE_ENV = 'test';
        unmount();
    });
});
