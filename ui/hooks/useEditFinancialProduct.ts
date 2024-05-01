import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import FinancialProductService from "../../data/services/financialProduct";
import { FinancialProduct } from "../../data/models/FinancialProductModel";
import { UpdateProductParams } from "../../data/repositories/FinancialProductEdit";
import {
  EditProductMutationContext,
  FINANCIAL_PRODUCTS_QUERY_KEY,
} from "../context/query";
import { Alert } from "react-native";

const financialProductService = new FinancialProductService();

const useEditFinancialProduct = (): UseMutationResult<
  void,
  Error,
  UpdateProductParams,
  EditProductMutationContext
> => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    UpdateProductParams,
    EditProductMutationContext
  >({
    mutationFn: async (updatedProductData: UpdateProductParams) => {
      await financialProductService.updateFinancialProduct(updatedProductData);
    },
    onMutate: async (updatedProductData) => {
      await queryClient.cancelQueries({
        queryKey: [FINANCIAL_PRODUCTS_QUERY_KEY],
      });

      const previousProducts = queryClient.getQueryData<FinancialProduct[]>([
        FINANCIAL_PRODUCTS_QUERY_KEY,
      ]);

      if (previousProducts) {
        queryClient.setQueryData<FinancialProduct[]>(
          [FINANCIAL_PRODUCTS_QUERY_KEY],
          previousProducts.map((product) =>
            product.id === updatedProductData.id
              ? { ...product, ...updatedProductData }
              : product
          )
        );
      }

      return { previousProducts };
    },
    onError: (error, variables, context) => {
      Alert.alert("Error al editar: ", error.message);
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

export default useEditFinancialProduct;
