import { FinancialProductCreationData } from "./FinancialProductCreation";

export type UpdateProductParams = Partial<FinancialProductCreationData> & {
  id: string;
};
