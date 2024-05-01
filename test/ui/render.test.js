import { render, fireEvent } from '@testing-library/react-native';
import { renderItem } from '../../ui/screens/ProductListingScreen/components/render';
import { NavigationRoutes } from '../../ui/navigation/NavigationRoutes';

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

describe('renderItem', () => {
    const mockNavigate = jest.fn();
    const itemMock = {
        id: '123',
        name: 'Test Financial Product',
    };
    const navigationMock = {
        navigate: mockNavigate,
    };

    it('renders the financial product correctly', () => {
        const { getByText, getByTestId } = render(renderItem({ item: itemMock, navigation: navigationMock }));

        expect(getByText(itemMock.name)).toBeTruthy();
        expect(getByText(`ID: ${itemMock.id}`)).toBeTruthy();
        expect(getByTestId('rightArrowIcon')).toBeTruthy();
    });

    it('navigates on press', () => {
        const { getByTestId } = render(renderItem({ item: itemMock, navigation: navigationMock }));
        const pressable = getByTestId('pressableItem');

        fireEvent.press(pressable);
        expect(mockNavigate).toHaveBeenCalledWith(NavigationRoutes.ProductDetails, {
            productId: itemMock.id,
        });
    });
});
