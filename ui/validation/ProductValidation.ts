import * as Yup from "yup";

export const idValidation = Yup.string()
  .min(3, "El id debe tener minimo 3 caracteres")
  .max(10, "El id no debe tener más de 10 caracteres")
  .required("Requerido");

export const nameValidation = Yup.string()
  .min(5, "El nombre debe tener minimo 5 caracteres")
  .max(100, "El nombre no debe tener más de 100 caracteres")
  .required("Requerido");

export const descriptionValidation = Yup.string()
  .min(10, "La descripción debe tener minimo 10 caracteres")
  .max(200, "La descripción no debe tener más de 200 caracteres")
  .required("Requerido");
