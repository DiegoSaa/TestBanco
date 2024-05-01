import * as Yup from "yup";
import {
  descriptionValidation,
  idValidation,
  nameValidation,
} from "./ProductValidation";

export const AddProductSchema = Yup.object().shape({
  id: idValidation,
  name: nameValidation,
  description: descriptionValidation,
  logo: Yup.string().url("URL invalida").required("Requerido"),
  date_release: Yup.date().required("Requerido"),
  date_revision: Yup.date().required("Requerido"),
});
