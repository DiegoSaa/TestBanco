import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import FinancialProductService from "../../data/services/financialProduct";
import {
  ConstructorFinancialProduct,
  FinancialProduct,
} from "../../data/models/FinancialProductModel";
import {
  EditProductMutationContext,
  FINANCIAL_PRODUCTS_QUERY_KEY,
} from "../context/query";
import { Alert } from "react-native";

const financialProductService = new FinancialProductService();

const useAddFinancialProduct = (): UseMutationResult<
  void,
  Error,
  ConstructorFinancialProduct,
  EditProductMutationContext
> => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    ConstructorFinancialProduct,
    EditProductMutationContext
  >({
    mutationFn: async (newProductData: ConstructorFinancialProduct) => {
      await financialProductService.createFinancialProduct(newProductData);
    },
    onMutate: async (newProductData) => {
      await queryClient.cancelQueries({
        queryKey: [FINANCIAL_PRODUCTS_QUERY_KEY],
      });

      const previousProducts = queryClient.getQueryData<FinancialProduct[]>([
        FINANCIAL_PRODUCTS_QUERY_KEY,
      ]);

      if (previousProducts) {
        queryClient.setQueryData<FinancialProduct[]>(
          [FINANCIAL_PRODUCTS_QUERY_KEY],
          [...previousProducts, { ...newProductData, id: "temporary-id" }]
        );
      }

      return { previousProducts };
    },
    onError: (error, variables, context) => {
      Alert.alert("Error al añadir: ", error.message);
      if (context?.previousProducts) {
        queryClient.setQueryData(
          [FINANCIAL_PRODUCTS_QUERY_KEY],
          context.previousProducts
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FINANCIAL_PRODUCTS_QUERY_KEY],
      });
    },
  });
};

export default useAddFinancialProduct;
