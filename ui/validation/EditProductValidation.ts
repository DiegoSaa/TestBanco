import * as Yup from "yup";
import {
  descriptionValidation,
  idValidation,
  nameValidation,
} from "./ProductValidation";

export const EditProductSchema = Yup.object().shape({
  id: idValidation,
  name: nameValidation,
  description: descriptionValidation,
});
