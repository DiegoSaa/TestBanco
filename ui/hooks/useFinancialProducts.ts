import FinancialProductService from "../../data/services/financialProduct";
import { FinancialProduct } from "../../data/models/FinancialProductModel";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FINANCIAL_PRODUCTS_QUERY_KEY } from "../context/query";

const financialProductService = new FinancialProductService();

const useFinancialProducts = (): UseQueryResult<FinancialProduct[], Error> => {
  return useQuery<FinancialProduct[], Error>({
    queryKey: [FINANCIAL_PRODUCTS_QUERY_KEY],
    queryFn: () => financialProductService.getFinancialProducts(),
  });
};

export default useFinancialProducts;
