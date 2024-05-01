import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductDetailScreen from '../../../ui/screens/ProductDetailScreen';
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

jest.mock('../../../ui/components/DeleteProductModal', () => 'DeleteProductModal');

describe('ProductDetailScreen', () => {
    it('renders product details and handles interactions', () => {
        // Mock route params
        const route = { params: { productId: '1' } };

        const { getByText } = render(<ProductDetailScreen route={route} navigation={{ navigate: mockNavigate }} />);

        // Verify product details are rendered
        expect(getByText('Product 1')).toBeTruthy();
        expect(getByText('Description 1')).toBeTruthy();
        // Add checks for other product details

        // Simulate pressing the 'Editar' button
        const editButton = getByText('Editar');
        fireEvent.press(editButton);
        expect(mockNavigate).toHaveBeenCalledWith(NavigationRoutes.EditProduct, {
            product: expect.any(Object),
        });

        // Simulate pressing the 'Eliminar' button
        const deleteButton = getByText('Eliminar');
        fireEvent.press(deleteButton);
    });
});