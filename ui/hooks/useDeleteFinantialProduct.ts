import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import FinancialProductService from "../../data/services/financialProduct";
import { FinancialProduct } from "../../data/models/FinancialProductModel";
import {
  EditProductMutationContext,
  FINANCIAL_PRODUCTS_QUERY_KEY,
} from "../context/query";
import { Alert } from "react-native";

const financialProductService = new FinancialProductService();

const useDeleteFinancialProduct = (): UseMutationResult<
  void,
  Error,
  string,
  EditProductMutationContext
> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, EditProductMutationContext>({
    mutationFn: async (productId: string) => {
      await financialProductService.deleteFinancialProduct(productId);
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({
        queryKey: [FINANCIAL_PRODUCTS_QUERY_KEY],
      });

      const previousProducts = queryClient.getQueryData<FinancialProduct[]>([
        FINANCIAL_PRODUCTS_QUERY_KEY,
      ]);

      if (previousProducts) {
        queryClient.setQueryData<FinancialProduct[]>(
          [FINANCIAL_PRODUCTS_QUERY_KEY],
          previousProducts.filter((product) => product.id !== productId)
        );
      }

      return { previousProducts };
    },
    onError: (error, productId, context) => {
      Alert.alert("Error al borrar: ", error.message);
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

export default useDeleteFinancialProduct;
