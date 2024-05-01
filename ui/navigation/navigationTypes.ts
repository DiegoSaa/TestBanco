import { StackScreenProps } from "@react-navigation/stack";
import { FinancialProduct } from "../../data/models/FinancialProductModel";

export type RootStackParamList = {
  ProductListing: undefined;
  ProductDetails: { productId: string };
  AddProduct: undefined;
  EditProduct: { product: FinancialProduct };
};

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
