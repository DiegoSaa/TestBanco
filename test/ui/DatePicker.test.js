import React from 'react';
import { render } from '@testing-library/react-native';
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
});
