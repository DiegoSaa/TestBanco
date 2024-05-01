
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StyledButton } from '../../ui/components/StyledButton'; // Update the import path as needed

describe('StyledButton', () => {
    it('renders correctly with given title', () => {
        const title = 'Click Me';
        const { getByText } = render(<StyledButton onPress={() => { }} title={title} />);

        expect(getByText(title)).toBeTruthy();
    });

    it('calls onPress when the button is pressed', () => {
        const onPressMock = jest.fn();
        const title = 'Submit';
        const { getByText } = render(<StyledButton onPress={onPressMock} title={title} />);

        const button = getByText(title);
        fireEvent.press(button);

        expect(onPressMock).toHaveBeenCalled();
    });
});
