import React from "react";
import { ConstructorFinancialProduct } from "../../../data/models/FinancialProductModel";
import useAddFinancialProduct from "../../hooks/useAddFinantialProduct";
import { ScreenProps } from "../../navigation/navigationTypes";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import ProductForm from "../../components/ProductForm";

const AddProductScreen = ({
    navigation,
}: ScreenProps<NavigationRoutes.AddProduct>) => {
    const { mutate: addProduct } = useAddFinancialProduct();

    const initialValues: ConstructorFinancialProduct = {
        id: "",
        name: "",
        description: "",
        logo: "",
        date_release: new Date(),
        date_revision: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
        ),
    };

    const handleAddProduct = (values: ConstructorFinancialProduct) => {
        addProduct(values);
        navigation.goBack();
    };

    return (
        <ProductForm
            initialValues={initialValues}
            onSubmit={(values) => handleAddProduct(values)}
        />
    );
};

export default AddProductScreen;