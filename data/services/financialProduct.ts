import { FinancialProduct } from "../models/FinancialProductModel";
import { AxiosHttpManager } from "../network/http";
import { FinancialProductCreationData } from "../repositories/FinancialProductCreation";
import { UpdateProductParams } from "../repositories/FinancialProductEdit";

const httpManager = new AxiosHttpManager();

class FinancialProductService {
  async getFinancialProducts(): Promise<FinancialProduct[]> {
    const data = await httpManager.get("/bp/products");
    return (
      Array.isArray(data) && data.map((item) => FinancialProduct.fromJson(item))
    );
  }

  async createFinancialProduct(
    productData: FinancialProductCreationData
  ): Promise<FinancialProduct> {
    const response = await httpManager.post("/bp/products", productData);
    return FinancialProduct.fromJson(response);
  }

  async updateFinancialProduct(
    productData: UpdateProductParams
  ): Promise<FinancialProduct> {
    const response = await httpManager.put("/bp/products", productData);
    return FinancialProduct.fromJson(response);
  }

  async deleteFinancialProduct(productId: string): Promise<void> {
    await httpManager.delete(`/bp/products?id=${productId}`);
  }

  async verifyProductId(productId: string): Promise<boolean> {
    const response = await httpManager.get(
      `/bp/products/verification?id=${productId}`
    );
    return typeof response === "boolean" && response;
  }
}

export default FinancialProductService;
