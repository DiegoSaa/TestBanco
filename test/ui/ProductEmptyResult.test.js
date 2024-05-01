import React from 'react';
import { render } from '@testing-library/react-native';
import { ProductEmptyResult } from "../../ui/screens/ProductListingScreen/components/ProductEmptyResult";

describe('ProductEmptyResult', () => {
    it('renders the provided text correctly', () => {
        const testText = "No products found";
        const { getByText } = render(<ProductEmptyResult text={testText} />);

        expect(getByText(testText)).toBeTruthy();
    });
});
