

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductForm from '../../ui/components/ProductForm';

jest.mock('formik', () => ({
    __esModule: true,
    Formik: ({ children, initialValues, onSubmit }) => {
        const formikBag = {
            handleSubmit: onSubmit,
            handleChange: jest.fn(),
            handleBlur: jest.fn(),
            setFieldValue: jest.fn(),
            values: initialValues,
            errors: {},
            touched: {},
        };

        return children(formikBag);
    },
}));

jest.mock('../../ui/components/DatePickerInput', () => 'DatePickerInput');

jest.mock('react-native-keyboard-aware-scroll-view', () => ({
    KeyboardAwareScrollView: ({ children }) => children,
}));

describe('ProductForm', () => {
    it('renders correctly', () => {
        const initialValues = {
            id: '',
            name: '',
            description: '',
            logo: '',
            date_release: '2021-01-02',
            date_revision: '2022-01-01',
        };
        const onSubmitMock = jest.fn();

        const { getByPlaceholderText, getByText } = render(
            <ProductForm initialValues={initialValues} onSubmit={onSubmitMock} canEditId={true} />
        );

        // Check if one of the input fields is rendered
        expect(getByPlaceholderText('Nombre')).toBeTruthy();

        // Check if the submit button is rendered
        expect(getByText('Enviar')).toBeTruthy();

        // Simulate form submission
        const submitButton = getByText('Enviar');
        fireEvent.press(submitButton);

        // Since onSubmit is a mock, we can check if it was called
        expect(onSubmitMock).toHaveBeenCalled();
    });
});