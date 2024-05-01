import { FinancialProduct } from "../../data/models/FinancialProductModel";

export type EditProductMutationContext = {
  previousProducts?: FinancialProduct[];
};

export const FINANCIAL_PRODUCTS_QUERY_KEY = "financialProducts";
