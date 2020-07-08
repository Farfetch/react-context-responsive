import {
    Responsive,
    ResponsiveProvider,
    useResponsive,
    withResponsive,
} from '../src';

describe('Export', () => {
    test('should export the correct API', () => {
        expect(ResponsiveProvider).toBeDefined();
        expect(Responsive).toBeDefined();
        expect(useResponsive).toBeDefined();
        expect(withResponsive).toBeDefined();
        expect(typeof ResponsiveProvider).toBe('function');
        expect(typeof Responsive).toBe('function');
        expect(typeof withResponsive).toBe('function');
        expect(typeof useResponsive).toBe('function');
    });
});
