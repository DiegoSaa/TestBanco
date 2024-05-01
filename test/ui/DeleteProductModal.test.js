import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DeleteProductModal from '../../ui/components/DeleteProductModal';

jest.mock('../../ui/hooks/useDeleteFinantialProduct', () => ({
    __esModule: true,
    default: () => ({
        mutate: jest.fn(),
    }),
}));

describe('DeleteProductModal', () => {
    it('renders correctly when visible', () => {
        const setVisibleMock = jest.fn();
        const { queryByText } = render(
            <DeleteProductModal
                productId="123"
                productName="Test Product"
                visible={true}
                setVisible={setVisibleMock}
                navigation={{ navigate: jest.fn() }}
            />
        );

        expect(queryByText('Estás seguro de eliminar el producto Test Product?')).toBeTruthy();
    });

    it('calls setVisible on cancel', () => {
        const setVisibleMock = jest.fn();
        const { getByText } = render(
            <DeleteProductModal
                productId="123"
                productName="Test Product"
                visible={true}
                setVisible={setVisibleMock}
                navigation={{ navigate: jest.fn() }}
            />
        );

        const cancelButton = getByText('Cancelar');
        fireEvent.press(cancelButton);

        expect(setVisibleMock).toHaveBeenCalledWith(false);
    });
});