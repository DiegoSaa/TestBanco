import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DatePickerInput from '../../ui/components/DatePickerInput';

describe('DatePickerInput', () => {
    it('renders correctly with given value', () => {
        const onChangeMock = jest.fn();
        const { getByDisplayValue } = render(
            <DatePickerInput
                name="date_release"
                value="2021-01-01"
                onChange={onChangeMock}
                errors=""
                touched={false}
            />
        );
        expect(getByDisplayValue('2021-01-01')).toBeTruthy();
    });

    it('shows DatePicker when TextInput is touched', async () => {
        const onChangeMock = jest.fn();
        const { getByPlaceholderText } = render(
            <DatePickerInput
                name="date_release"
                onChange={onChangeMock}
                value="2021-01-01"
                errors=""
                touched={true}
            />
        );

        const input = getByPlaceholderText('Release date');
        expect(input).toBeTruthy();
    });

    it('opens the modal when TextInput is touched', async () => {
        const onChangeMock = jest.fn();
        const { findByTestId } = render(
            <DatePickerInput
                name="date_release"
                value="2021-01-01"
                onChange={onChangeMock}
                errors=""
                touched={false}
            />
        );

        const input = await findByTestId('textInput');
        fireEvent(input, 'onTouchStart');

        await waitFor(() => {
            const modal = findByTestId('datePickerModal');
            return expect(modal).toBeTruthy();
        }, {
            timeout: 1000
        });
    });


    it('displays errors when touched and errors are provided', () => {
        const { getByText } = render(
            <DatePickerInput
                name="date_release"
                onChange={jest.fn()}
                value="2021-01-01"
                errors="Please select a valid date"
                touched={true}
            />
        );

        const errorMessage = getByText('Please select a valid date');
        expect(errorMessage).toBeTruthy();
    });

    it('does not display an error message when not touched', () => {
        const { queryByText } = render(
            <DatePickerInput
                name="date_release"
                onChange={jest.fn()}
                value="2021-01-01"
                errors="Please select a valid date"
                touched={false}
            />
        );

        expect(queryByText('Please select a valid date')).toBeNull();
    });


    it('closes the modal when Done is pressed', async () => {
        const onChangeMock = jest.fn();
        const { findByTestId, queryByTestId } = render(
            <DatePickerInput
                name="date_release"
                value="2021-01-01"
                onChange={onChangeMock}
                errors=""
                touched={false}
            />
        );

        // Open the modal by touching the TextInput
        const input = await findByTestId('textInput');
        fireEvent(input, 'onTouchStart');

        await waitFor(() => {
            const modal = findByTestId('datePickerModal');
            return expect(modal).toBeTruthy();
        }, {
            timeout: 1000
        });

        await waitFor(() => {
            const doneButton = findByTestId('doneButton');
            return expect(doneButton).toBeTruthy();
        }, {
            timeout: 1000
        });

        await waitFor(() => {
            expect(queryByTestId('datePickerModal')).toBeFalsy();
        }, {
            timeout: 5000
        });
    });

});
