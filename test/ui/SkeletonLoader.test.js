import React from 'react';
import { act, render } from '@testing-library/react-native';
import SkeletonLoader from '../../ui/screens/ProductListingScreen/components/SkeletonLoader';

describe('SkeletonLoader', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<SkeletonLoader />);
        expect(getByTestId('loaderContainer')).toBeTruthy();
    });

    it('handles animation', () => {
        jest.useFakeTimers();
        const { getByTestId } = render(<SkeletonLoader />);

        act(() => {
            jest.advanceTimersByTime(600);
        });

        const animatedView = getByTestId('skeletonItem-0');
        expect(animatedView.props.style.opacity).toEqual(expect.any(Number));

        expect(animatedView.props.style.opacity).toBeGreaterThanOrEqual(0);
        expect(animatedView.props.style.opacity).toBeLessThanOrEqual(1);
    });

});
