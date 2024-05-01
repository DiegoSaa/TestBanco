import React from "react";
import { View, TextInput, Text } from "react-native";
import { Formik } from "formik";
import DatePickerInput from "../../components/DatePickerInput";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyledButton } from "../../components/StyledButton";
import { COLORS } from "../../constants/colors";
import { AddProductSchema } from "../../validation/AddProductValidation";
import { EditProductSchema } from "../../validation/EditProductValidation";

const inputFields = [
    { name: "id", type: "input", placeholder: "ID" },
    { name: "name", type: "input", placeholder: "Nombre" },
    { name: "description", type: "input", placeholder: "Descripción" },
    { name: "logo", type: "input", placeholder: "Logo URL" },
    { name: "date_release", type: "date", placeholder: "Fecha de liberación" },
    { name: "date_revision", type: "input", placeholder: "Fecha de revisión" },
];

const ProductForm = ({ initialValues, onSubmit, canEditId = true }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={canEditId ? AddProductSchema : EditProductSchema}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
                resetForm,
            }) => (
                <View style={styles.container}>
                    <KeyboardAwareScrollView>
                        {inputFields.map((field) => {
                            let isFieldEditable = field.name !== "date_revision";
                            if (field.name === "id") {
                                isFieldEditable = canEditId;
                            }

                            let inputValue = values[field.name];
                            if (
                                field.name === "date_revision" &&
                                values[field.name] instanceof Date
                            ) {
                                inputValue = values[field.name].toDateString();
                            }
                            const errorMessage = errors[field.name];
                            const displayError =
                                touched[field.name] && errorMessage
                                    ? errorMessage.toString()
                                    : "";

                            return (
                                <View key={field.name}>
                                    {field.type === "input" && (
                                        <>
                                            <View style={styles.inputContainer}>
                                                <TextInput
                                                    style={[
                                                        styles.input,
                                                        !isFieldEditable && styles.disable,
                                                    ]}
                                                    onChangeText={handleChange(field.name)}
                                                    onBlur={handleBlur(field.name)}
                                                    value={inputValue}
                                                    placeholder={field.placeholder}
                                                    editable={isFieldEditable}
                                                />
                                                {touched[field.name] && errors[field.name] && (
                                                    <Text style={styles.errorText}>{displayError}</Text>
                                                )}
                                            </View>
                                        </>
                                    )}
                                    {field.type === "date" && field.name === "date_release" && (
                                        <DatePickerInput
                                            name={field.name}
                                            value={values[field.name]}
                                            onChange={(name, value) => {
                                                setFieldValue(name, value);
                                                const nextYear = new Date(value);
                                                nextYear.setFullYear(nextYear.getFullYear() + 1);
                                                setFieldValue("date_revision", nextYear);
                                            }}
                                            errors={errors[field.name]}
                                            touched={touched[field.name]}
                                        />
                                    )}
                                </View>
                            );
                        })}
                        <View style={styles.buttonContainer}>
                            <StyledButton onPress={handleSubmit} title='Enviar' />
                        </View>
                        <View style={styles.buttonContainer}>
                            <StyledButton
                                onPress={resetForm}
                                title='Reiniciar'
                                backgroundColor={COLORS.LIGTH_BLUE_PICHINCHA}
                            />
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            )}
        </Formik>
    );
};

export default ProductForm;