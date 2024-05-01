import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductListingScreen from '../../../ui/screens/ProductListingScreen';
import { NavigationRoutes } from '../../../ui/navigation/NavigationRoutes';

jest.mock('../../../ui/hooks/useFinancialProducts', () => ({
    __esModule: true,
    default: () => ({
        data: [
            { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo-url-1', date_release: new Date(), date_revision: new Date() },
        ],
    }),
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual('@react-navigation/native'),
        useNavigation: () => ({
            navigate: mockNavigate,
        }),
    };
});

describe('ProductListingScreen', () => {
    it('renders correctly and handles interactions', () => {
        const { getByPlaceholderText, getByText, queryByText } = render(<ProductListingScreen navigation={{ navigate: mockNavigate }} />);

        // Check if the search bar is rendered
        const searchBar = getByPlaceholderText('Search...');
        expect(searchBar).toBeTruthy();

        // Simulate typing in the search bar
        fireEvent.changeText(searchBar, 'Product');

        // Check if the products list is rendered
        expect(getByText('Product 1')).toBeTruthy();

        // Check for the absence of the EmptyProducts component
        expect(queryByText('No Products Found')).toBeNull();

        // Simulate pressing the 'Agregar' button
        const addButton = getByText('Agregar');
        fireEvent.press(addButton);

        // Verify navigation to AddProduct screen
        expect(mockNavigate).toHaveBeenCalledWith(NavigationRoutes.AddProduct);
    });
});